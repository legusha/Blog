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
    visiblePosts: [],
    currentPost: structPost,
    request: {
      methods: ['get', 'post', 'put', 'delete']
    }
  },
  getters: {
    posts: state => state.posts,
    visiblePosts: state => state.visiblePosts,
    currentPost: state => state.currentPost,
    timePost: () => ({
      createdAt: getTime()(),
      updateAt: getTime()()
    })
  },
  mutations: {
    createPost (state, { data }) {
      state.posts.unshift(data)
      state.currentPost = structPost
    },
    updatePost (state, { data, index }) {
      state.posts.splice(index, 1, data)
      state.currentPost = structPost
    },
    deletePost (state, { index, indexVisiblePost }) {
      state.posts.splice(index, 1)
      state.visiblePosts.splice(indexVisiblePost, 1)
      state.currentPost = structPost
    },
    setCurrentPost (state, partPost) {
      state.currentPost = { ...state.currentPost, ...partPost }
    },
    setPosts (state, { data }) {
      const pushUniquePosts = postData => {
        const isUniquePost = post => post.id === postData.id
        const isHasPost = state.posts.some(isUniquePost)
        if (!isHasPost) {
          state.posts.push(postData)
        }
      }

      data.forEach(pushUniquePosts)
      state.visiblePosts = data
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
