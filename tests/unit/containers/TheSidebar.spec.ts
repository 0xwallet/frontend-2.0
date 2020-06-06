import { shallowMount, createLocalVue } from '@vue/test-utils';
import CoreuiVue from '@coreui/vue'
import Vuex from 'vuex'
import TheSidebar from '@/containers/TheSidebar.vue'

const localVue = createLocalVue()
localVue.use(CoreuiVue)
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false
  }
})

describe('TheSidebar.vue', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(TheSidebar, { store, localVue })
    expect(wrapper.element).toMatchSnapshot()
  })
})