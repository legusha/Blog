import { shallowMount } from '@vue/test-utils'
import FormPost from '@/components/Form-post'

describe('Form-post.vue', () => {
  it('renders props.actionText when passed', () => {
    const actionText = 'new message'
    const wrapper = shallowMount(FormPost, {
      propsData: { actionText }
    })
    expect(wrapper.text()).toMatch(actionText)
  })
})
