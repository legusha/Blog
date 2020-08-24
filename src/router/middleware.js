export default {
  postEdit (store, to, from, next) {
    const defaultCountPage = '1'
    const defaultPostPage = { name: 'Posts', params: { page: defaultCountPage } }
    const isHasId = to.params?.id

    if (isHasId) {
      const radix = 10
      const id = parseInt(to.params.id, radix) || false // if not parse to integer,expected false instead NaN
      const post = store.getters.posts.find(post => post.id === id)
      const isId = id === 0 ? true : id
      if (isId && post) {
        store.commit('setCurrentPost', post)
        next()
        return
      }
      next(defaultPostPage)
      return
    }
    next(defaultPostPage)
  },
  postCreate (store, to, from, next) {
    store.commit('setCurrentPost')
    next()
  }
}
