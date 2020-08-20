import api from '@/api'
import { getTime } from '@/utils'

const structPost = {
  id: 0,
  title: '',
  description: '',
  claps: 0,
  createdAt: 0,
  updateAt: 0,
  userId: 0
}

export default {
  state: {
    posts: [],
    startIdPost: 100,
    currentPost: structPost,
    request: {
      methods: ['get', 'post', 'put', 'delete']
    }
  },
  getters: {
    posts: state => state.posts,
    currentPost: state => state.currentPost,
    newPost: state => {
      const post = structPost
      const id = state.currentPost.id ||
        state.posts[state.posts.length - 1]?.id + 1 ||
        state.startIdPost
      return {
        ...post,
        id,
        createdAt: getTime()(),
        updateAt: getTime()()
      }
    }
  },
  mutations: {
    createPost (state, { data }) {
      state.posts.push(data)
      state.currentPost = structPost
    },
    setPosts (state, { data }) {
      state.posts = data
    },
    updatePost (state, { data, index }) {
      state.posts.splice(index, 1, data)
      state.currentPost = structPost
    },
    deletePost (state, { index }) {
      state.posts.splice(index, 1)
      state.currentPost = structPost
    },
    setCurrentPost (state, partPost) {
      state.currentPost = { ...state.currentPost, ...partPost }
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
