import Vue from 'vue';
import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Home from '../components/Home.vue';

Vue.use(Vuetify);

describe('Home', () => {
  const wrapper = mount(Home);

  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true);
  })
});
