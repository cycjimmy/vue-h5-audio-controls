import { mount } from '@vue/test-utils';

import H5AudioControls from '../src/h5-audio-controls';

describe('H5AudioControls', () => {
  beforeAll(() => {
    // mock audio events
    window.HTMLMediaElement.prototype.load = () => {
      /* do nothing */
    };
    window.HTMLMediaElement.prototype.play = function() {
      Object.defineProperty(this, 'paused', {
        configurable: true,
        get() {
          return false;
        }
      });
    };
    window.HTMLMediaElement.prototype.pause = function() {
      Object.defineProperty(this, 'paused', {
        configurable: true,
        get() {
          return true;
        }
      });
    };
  });

  const wrapper = mount(H5AudioControls, {
    propsData: {
      src: 'https://www.xxx.com/foo.mp3'
    }
  });
  const { vm } = wrapper;

  it('h5AudioControls is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('h5AudioControls methods', () => {
    vm.changeButtonUI();
    vm.stop();
    expect(vm.isPlaying()).toBe(false);
    vm.play();
    expect(vm.isPlaying()).toBe(true);
    vm.pause();
    expect(vm.isPlaying()).toBe(false);
  });
});
