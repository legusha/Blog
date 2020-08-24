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
    countPosts: 0,
    visiblePosts: [],
    currentPost: structPost,
    request: {
      methods: ['get', 'post', 'put', 'delete']
    },
    currentPage: 1
  },
  getters: {
    posts: state => state.posts,
    visiblePosts: state => state.visiblePosts,
    countPosts: state => state.countPosts,
    currentPost: state => state.currentPost,
    currentPagePost: state => state.currentPage,
    timePost: () => ({
      createdAt: getTime,
      updateAt: getTime
    })
  },
  mutations: {
    clapPost (state, { post }) {
      post.claps = ++post.claps
    },
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
    writePosts (state, { data, headers }) {
      const radix = 10
      const pushUniquePosts = postData => {
        const isUniquePost = post => post.id === postData.id
        const isHasPost = state.posts.some(isUniquePost)
        if (!isHasPost) {
          state.posts.push(postData)
        }
      }

      state.countPosts = parseInt(headers['x-total-count'], radix)
      data.forEach(pushUniquePosts)
      state.visiblePosts = data
    },
    setCurrentPost (state, partPost) {
      state.currentPost = { ...state.currentPost, ...partPost }
    },
    setCurrentPagePost (state, pageNumber = 1) {
      state.currentPage = pageNumber
    }
  },
  actions: {
    async makeRequestPost ({ state, commit }, { option, dataRequest = null, mutation = null }) {
      const { method, pointName, args } = option

      try {
        const hasMethod = state.request.methods.includes(method)
        if (!hasMethod) return

        const { data, headers } = await api(method, { pointName, args }, dataRequest)

        if (mutation !== null) {
          commit(mutation.name, {
            data,
            ...mutation.args,
            headers
          })
        }
        return data
      } catch (e) {
        console.error(e)
        return null
      }
    }
  }
}
