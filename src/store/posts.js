import api from '@/api'

export default {
  state: {
    posts: [],
    request: {
      methods: ['get', 'post', 'put', 'delete']
    }
  },
  getters: {
    posts: state => state.posts
  },
  mutations: {
    setPosts (state, { data }) {
      state.posts = data
    }
  },
  actions: {
    async makeRequestPost ({ state, commit }, { option, data = null, mutation = null }) {
      const { method, pointName, args } = option

      try {
        const hasMethod = state.request.methods.includes(method)
        if (!hasMethod) return

        const dataRequest = await api(method, { pointName, args }, data)

        if (mutation !== null) {
          commit(mutation.name, { data: dataRequest, ...mutation.args })
        }
        return dataRequest
      } catch (e) {
        console.error(e)
      }
    }
  }
}
