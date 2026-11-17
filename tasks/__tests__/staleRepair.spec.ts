import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'
// `?raw` is resolved relative to this file, so the test reads the shipped
// workflow from any working directory (Vitest's `test.root` does not change
// `process.cwd()`). Nothing is copied out of the workflow: the text that runs is
// the text that ships.
import staleWorkflow from '../../.github/workflows/stale.yml?raw'

const SNAPSHOT = '2026-11-01T00:00:00Z'
const BOT = 'github-actions[bot]'
const REPORTER = 'reporter'
const MAINTAINER = 'cycjimmy'

interface TimelineEvent {
  event: 'commented' | 'closed' | 'labeled'
  created_at?: string
  user?: { login: string }
  actor?: { login: string }
  body?: string
}

interface Comment {
  user: { login: string }
  created_at: string
  body?: string
}

interface Scenario {
  /** `repair` starts from the closed listing, `cleanup` from the open one. */
  mode: 'repair' | 'cleanup'
  labels?: string[]
  updated_at?: string
  body?: string
  timeline?: TimelineEvent[]
  lateComments?: Comment[]
  failReopen?: number
  failAddLabels?: number
}

interface Recorder {
  opened: number[]
  closed: number[]
  closeReasons: (string | undefined)[]
  labelsAdded: string[][]
  comments: string[]
  removedLabels: string[]
}

function readProgram(): string {
  const workflow = parse(staleWorkflow) as {
    jobs: Record<string, { steps: { with: { script: string } }[] }>
  }

  return workflow.jobs['needs-info-cleanup'].steps[0].with.script
}

function at(seconds: number): string {
  return new Date(new Date(SNAPSHOT).getTime() + seconds * 1000).toISOString()
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

function closeNotification(snapshot: string): string {
  return 'This issue was closed because the requested information was not provided '
    + 'within 7 days. Please reopen it or open a new issue with the requested details.\n\n'
    + `<!-- issue-bot:needs-info-close ${snapshot} -->`
}

/**
 * Runs the shipped program against one issue and records every write instead of
 * performing it. The mock mirrors the calls the program actually makes: the
 * `github.paginate(fn, params)` identity check, the `issues.*` signatures and the
 * `event`/`actor`/`user`/`body`/`created_at` fields of the timeline.
 */
async function runScenario(scenario: Scenario): Promise<Recorder> {
  const recorder: Recorder = {
    opened: [],
    closed: [],
    closeReasons: [],
    labelsAdded: [],
    comments: [],
    removedLabels: [],
  }
  const issue = {
    number: 42,
    state: scenario.mode === 'repair'
      ? 'closed'
      : 'open',
    labels: (scenario.labels ?? ['needs-info']).map(name => ({ name })),
    updated_at: scenario.updated_at ?? daysAgo(8),
    body: scenario.body ?? 'the issue body',
    user: { login: REPORTER },
  }
  let reopenAttempts = 0
  let addLabelCalls = 0

  const listForRepo = async () => []
  const listEventsForTimeline = async () => []
  const listComments = async () => []

  const github = {
    paginate: async (fn: unknown, params: { state?: string }) => {
      if (fn === listForRepo) {
        const wanted = scenario.mode === 'repair'
          ? 'closed'
          : 'open'

        return params.state === wanted
          ? [issue]
          : []
      }
      if (fn === listEventsForTimeline)
        return scenario.timeline ?? []
      if (fn === listComments)
        return scenario.lateComments ?? []

      return []
    },
    rest: {
      issues: {
        listForRepo,
        listEventsForTimeline,
        listComments,
        get: async () => ({ data: issue }),
        update: async (params: { issue_number: number, state?: string, state_reason?: string }) => {
          if (params.state === 'open') {
            reopenAttempts += 1
            if (reopenAttempts <= (scenario.failReopen ?? 0))
              throw new Error('reopen failed')

            recorder.opened.push(params.issue_number)
          }
          if (params.state === 'closed') {
            recorder.closed.push(params.issue_number)
            recorder.closeReasons.push(params.state_reason)
          }

          return { data: issue }
        },
        addLabels: async (params: { labels: string[] }) => {
          addLabelCalls += 1
          if (addLabelCalls <= (scenario.failAddLabels ?? 0))
            throw new Error('label write failed')

          recorder.labelsAdded.push(params.labels)

          return { data: issue }
        },
        removeLabel: async (params: { name: string }) => {
          recorder.removedLabels.push(params.name)

          return { data: [] }
        },
        createComment: async (params: { body: string }) => {
          recorder.comments.push(params.body)

          return { data: {} }
        },
      },
    },
  }
  const context = {
    repo: { owner: MAINTAINER, repo: 'vue-h5-audio-controls' },
  }
  const core = {
    info: () => {},
    warning: () => {},
    setFailed: () => {},
  }

  // eslint-disable-next-line no-new-func -- the program only exists as YAML text
  const run = new Function('github', 'context', 'core', `return (async () => {\n${readProgram()}\n})()`)
  await run(github, context, core)

  return recorder
}

describe('stale needs-info repair', () => {
  it('ships a program that reads the issue timeline', () => {
    expect(readProgram()).toContain('listEventsForTimeline')
  })

  it('reopens when the reporter replied between the final read and the notification', async () => {
    // This is the regression: the reply is older than the notification comment but
    // newer than the snapshot the close was decided on, so comparing comment
    // positions instead of timestamps would drop it and leave the issue closed.
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: 'here are the details',
        },
        {
          event: 'commented',
          user: { login: BOT },
          created_at: at(2),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(3),
        },
      ],
    })

    expect(recorder.opened).toEqual([42])
    expect(recorder.removedLabels).toEqual(['needs-info', 'stale'])
    expect(recorder.comments).toHaveLength(1)
  })

  it('reopens when the reply already made issueBot drop the needs-info label', async () => {
    // The reporter answered, issueBot removed `needs-info`, and the close landed on
    // the stale snapshot afterwards. Listing candidates by `needs-info` would never
    // look at this issue again.
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: 'here are the details',
        },
        {
          event: 'commented',
          user: { login: BOT },
          created_at: at(2),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(3),
        },
      ],
    })

    expect(recorder.opened).toEqual([42])
  })

  it('leaves the close alone when the reply was already part of the decision', async () => {
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(-60),
          body: 'an older reply',
        },
        {
          event: 'commented',
          user: { login: BOT },
          created_at: at(1),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(2),
        },
      ],
    })

    expect(recorder.opened).toEqual([])
    expect(recorder.comments).toEqual([])
  })

  it('leaves a close by a maintainer alone', async () => {
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: 'here are the details',
        },
        {
          event: 'commented',
          user: { login: BOT },
          created_at: at(2),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: MAINTAINER },
          created_at: at(3),
        },
      ],
    })

    expect(recorder.opened).toEqual([])
    expect(recorder.comments).toEqual([])
  })

  it('ignores a notification written by a user', async () => {
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(2),
        },
      ],
    })

    expect(recorder.opened).toEqual([])
    expect(recorder.comments).toEqual([])
  })

  it('leaves a triaged issue alone', async () => {
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale', 'triaged'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: 'here are the details',
        },
        {
          event: 'commented',
          user: { login: BOT },
          created_at: at(2),
          body: closeNotification(SNAPSHOT),
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(3),
        },
      ],
    })

    expect(recorder.opened).toEqual([])
    expect(recorder.comments).toEqual([])
  })

  it('leaves a close without a notification alone', async () => {
    const recorder = await runScenario({
      mode: 'repair',
      labels: ['needs-info', 'stale'],
      timeline: [
        {
          event: 'commented',
          user: { login: REPORTER },
          created_at: at(1),
          body: 'here are the details',
        },
        {
          event: 'closed',
          actor: { login: BOT },
          created_at: at(2),
        },
      ],
    })

    expect(recorder.opened).toEqual([])
  })
})

describe('stale needs-info compensation', () => {
  it('closes with the stale label, the notification and the not-planned reason', async () => {
    const updatedAt = daysAgo(8)
    const recorder = await runScenario({
      mode: 'cleanup',
      labels: ['needs-info'],
      updated_at: updatedAt,
    })

    expect(recorder.labelsAdded).toEqual([
      ['stale'],
    ])
    expect(recorder.closed).toEqual([42])
    expect(recorder.closeReasons).toEqual(['not_planned'])
    expect(recorder.comments).toHaveLength(1)
    // The notification carries the snapshot the close was decided on, which is what
    // the next run replays when this one could not undo the close
    expect(recorder.comments[0]).toContain(`<!-- issue-bot:needs-info-close ${updatedAt} -->`)
    expect(recorder.opened).toEqual([])
  })

  it('does not close when the stale label cannot be written', async () => {
    const recorder = await runScenario({
      mode: 'cleanup',
      labels: ['needs-info'],
      failAddLabels: 1,
    })

    expect(recorder.labelsAdded).toEqual([])
    expect(recorder.closed).toEqual([])
    expect(recorder.comments).toEqual([])
    expect(recorder.opened).toEqual([])
  })

  it('stops retrying once a maintainer closed the issue again', async () => {
    // The first reopen attempt fails, and by the time the retry runs a maintainer
    // has closed the issue again. Retrying blindly would undo that decision.
    const recorder = await runScenario({
      mode: 'cleanup',
      labels: ['needs-info'],
      timeline: [
        {
          event: 'closed',
          actor: { login: MAINTAINER },
          created_at: new Date(Date.now() + 1000).toISOString(),
        },
      ],
      lateComments: [
        {
          user: { login: REPORTER },
          created_at: new Date().toISOString(),
          body: 'here are the details',
        },
      ],
      failReopen: 1,
    })

    expect(recorder.closed).toEqual([42])
    expect(recorder.opened).toEqual([])
    expect(recorder.removedLabels).toEqual([])
    expect(recorder.comments.some(body => body.includes('was reopened'))).toBe(false)
  })
})
