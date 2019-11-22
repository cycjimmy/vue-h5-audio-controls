import { mount } from '@vue/test-utils';

import H5AudioControls from '../src/h5-audio-controls';

describe('H5AudioControls', () => {
  beforeAll(() => {
    // mock audio events
    window.HTMLMediaElement.prototype.load = () => {
      /* do nothing */
    };
    // eslint-disable-next-line func-names
    window.HTMLMediaElement.prototype.play = function() {
      Object.defineProperty(this, 'paused', {
        configurable: true,
        get() {
          return false;
        }
      });
    };
    // eslint-disable-next-line func-names
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

  it('h5AudioControls watch test', (done) => {
    wrapper.setProps({
      src: 'https://www.xxx.com/bar.mp3',
      position: 'left-top',
      buttonSize: '16vw',
      iconSize: '10vw',
      playIcon: 'https://www.xxx.com/playIcon.svg',
      pauseIcon: 'https://www.xxx.com/pauseIcon.svg',
      autoPlay: false
    });

    setTimeout(done, 500);
  });
});
