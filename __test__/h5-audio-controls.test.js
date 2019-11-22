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

  const parent = mount({
    template: `
    <div>
      <h5-audio-controls src="https://www.xxx.com/foo.mp3" />
    </div>`,
    components: {
      H5AudioControls
    }
  });

  const wrapper = parent.find(H5AudioControls);
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
