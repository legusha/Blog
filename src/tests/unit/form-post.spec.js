import { shallowMount } from '@vue/test-utils'
import FormPost from '@/components/Form-post'

describe('Form-post.vue', () => {
  const component = (options = null) => shallowMount(FormPost, options)

  it('renders props.actionText when passed', () => {
    const actionText = 'new message'
    const wrapper = component({
      propsData: { actionText }
    })
    expect(wrapper.text()).toMatch(actionText)
  })
  it('renders props.post when passed', () => {
    const post = {
      title: 'Post',
      description: 'Example description'
    }
    const wrapper = component({
      propsData: { post }
    })
    expect(wrapper.props().post).toBe(post)
  })
  it('check data.maxLengthDescription', async () => {
    const data = { maxLengthDescription: 100 }
    const wrapper = await component()
    wrapper.setData({ maxLengthDescription: data.maxLengthDescription })
    expect(wrapper.vm.maxLengthDescription).toBe(data.maxLengthDescription)
  })
})
