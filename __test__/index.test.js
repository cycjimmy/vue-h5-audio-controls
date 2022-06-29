/* eslint no-undef: off */
import Vue from 'vue';

import H5AudioControls from '../src/index';

describe('install H5AudioControls', () => {
  it('install H5AudioControls', () => {
    Vue.use(H5AudioControls);

    // eslint-disable-next-line no-new
    new Vue({
      template: `
      <div>
        <h5-audio-controls />
      </div>`,
    });
  });
});
