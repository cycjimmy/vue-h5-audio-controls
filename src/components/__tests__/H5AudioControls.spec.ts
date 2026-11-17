import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import H5AudioControls from '@/components/h5AudioControls/H5AudioControls.vue'

describe('renders', () => {
  it('render', () => {
    const src = 'https://cycjimmy.github.io/staticFiles/media/Richard_Clayderman-LOVE_IS_BLUE.mp3'
    const wrapper = mount(H5AudioControls, {
      props: {
        src,
      },
    })
    expect(wrapper.props().src).toContain(src)
  })
})
