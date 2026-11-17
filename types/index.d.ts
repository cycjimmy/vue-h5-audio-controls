import type { DefineComponent } from 'vue'

export interface H5AudioControlsMethods {
  play: () => void
  pause: () => void
  stop: () => void
  changeButtonUI: () => void
  isPlaying: () => boolean
}

export interface H5AudioControlsProps {
  src?: string
  position?: 'left-top' | 'top-right' | 'right-bottom' | 'left-bottom'
  positionType?: 'fixed' | 'absolute' | 'relative' | 'sticky' | 'static'
  buttonSize?: string | number
  iconSize?: string | number
  playIcon?: string
  pauseIcon?: string
  autoPlay?: boolean
}

declare const H5AudioControls: DefineComponent<H5AudioControlsProps, H5AudioControlsMethods>

export default H5AudioControls
