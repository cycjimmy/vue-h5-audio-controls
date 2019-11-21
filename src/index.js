import H5AudioControls from './h5-audio-controls';

const install = (Vue) => {
  Vue.component(H5AudioControls.name, H5AudioControls);
};

H5AudioControls.install = install;

export default H5AudioControls;
