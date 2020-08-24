<template>
  <div class="container is-center">
    <section class="is-center">
      <div
        v-for="(post, index) in visiblePosts"
        :key="index"
        class="post-box box column is-6 m-auto mb-6">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h3>
                <strong>{{post.title}}</strong>
              </h3>
              <p>
                {{post.description}}
              </p>
            </div>
            <div class="columns">
              <div class="column is-4">
                <small>31m</small>
              </div>
              <div v-if="auth" class="column is-8 has-text-right">
                <div v-if="permission.like" class="is-inline-block">
                  <a @click="requestClapPost(post, index)" class="button is-link is-light is-info is-medium" aria-label="like">
                    <span class="icon is-small">
                      <i class="fas fa-hands-wash" aria-hidden="true"></i>
                    </span>
                    <span>{{post.claps}}</span>
                  </a>
                </div>
                <div v-if="user.id === post.userId && permission.edit && permission.destroy" class="is-inline-block">
                  <a @click="requestEditPost(post)" class="button is-link is-light is-info is-inline-block is-medium" aria-label="like">
                    <span class="icon is-small">
                      <i class="far fa-edit" aria-hidden="true"></i>
                    </span>
                    <span>Изменить</span>
                  </a>
                  <a @click="requestDeletePost(post, index)" class="button is-link is-light is-info is-inline-block ml-3 is-medium" aria-label="like">
                    <span class="icon is-small">
                      <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </span>
                    <span>Удалить</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <b-pagination
        :current="pagination.currentPage"
        :total="pagination.total"
        :per-page="pagination.perPage"
        :order="pagination.order"
        :icon-pack="pagination.iconPack"
        @change="paginationAction"
      >
      </b-pagination>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Posts',
  data () {
    return {
      request: {
        getPost: {
          option: {
            method: 'get',
            pointName: 'posts',
            args: []
          },
          mutation: {
            name: 'setPosts'
          }
        },
        setPost: {
          option: {
            method: 'put',
            pointName: 'postId',
            args: []
          },
          mutation: {
            name: 'clapPost',
            args: {}
          },
          data: {}
        },
        deletePost: {
          option: {
            method: 'delete',
            pointName: 'postId',
            args: []
          },
          mutation: {
            name: 'deletePost',
            args: {}
          }
        }
      },
      paginationCurrentPage: 1,
      paginationMaxItems: 10
    }
  },
  computed: {
    ...mapGetters(['auth', 'user', 'posts', 'visiblePosts']),
    permission () {
      return this.user.permission.current.posts
    },
    pagination () {
      return {
        total: this.posts.length + 1,
        currentPage: this.paginationCurrentPage,
        perPage: this.paginationMaxItems,
        order: 'is-centered',
        iconPack: 'fas'
      }
    }
  },
  methods: {
    ...mapMutations(['clapPost']),
    ...mapActions(['makeRequestPost']),
    async getPosts () {
      const request = this.request.getPost
      const page = this.paginationCurrentPage
      const limit = this.paginationMaxItems

      request.option.args = [page, limit]

      await this.makeRequestPost(request)
    },
    async updateVisiblePosts () {
      await this.getPosts()
    },
    async requestClapPost (post) {
      this.clapPost({ post })
      const requestData = this.request.setPost.data = post
      const requestOption = this.request.setPost.option

      requestOption.args = [post.id]

      await this.makeRequestPost({
        option: requestOption,
        data: requestData
      })
    },
    requestEditPost (post) {
      const id = post.id
      this.$router.push({ name: 'Post-edit', params: { id } })
    },
    async requestDeletePost (post, indexVisiblePost) {
      const id = post.id
      const requestOption = this.request.deletePost.option
      const requestMutation = this.request.deletePost.mutation
      const index = this.posts.findIndex(statePost => statePost.id === post.id)

      requestOption.args = [id]
      requestMutation.args = { index, indexVisiblePost }

      await this.makeRequestPost({
        option: requestOption,
        mutation: requestMutation
      })
    },
    writeCurrentPage (page = 1) {
      this.paginationCurrentPage = page
      return this
    },
    async paginationAction (currentPage) {
      await this.writeCurrentPage(currentPage).updateVisiblePosts()
      await this.$router.push({ name: 'Posts', params: { page: currentPage } })
    }
  },
  mounted () {
    const radix = 10
    const currentPage = parseInt(this.$route.params.page, radix)
    this.writeCurrentPage(currentPage).updateVisiblePosts()
  }
}
</script>

<style scoped>
  .post-box {
    margin: auto;
  }
</style>
