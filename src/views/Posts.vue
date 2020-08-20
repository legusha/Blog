<template>
  <div class="container is-center">
    <section class="is-center">
      <div
        v-for="(post, index) in posts"
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
                  <a @click="clapPost(post, index)" class="button is-link is-light is-info is-medium" aria-label="like">
                    <span class="icon is-small">
                      <i class="fas fa-hands-wash" aria-hidden="true"></i>
                    </span>
                    <span>{{post.claps}}</span>
                  </a>
                </div>
                {{user.id === post.userId}}
                <div v-if="permission.edit && permission.destroy" class="is-inline-block">
                  <a @click="editPost(post)" class="button is-link is-light is-info is-inline-block is-medium" aria-label="like">
                    <span class="icon is-small">
                      <i class="far fa-edit" aria-hidden="true"></i>
                    </span>
                    <span>Изменить</span>
                  </a>
                  <a @click="deletePost(post, index)" class="button is-link is-light is-info is-inline-block ml-3 is-medium" aria-label="like">
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
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Posts',
  data () {
    return {
      request: {
        getPost: {
          option: {
            method: 'get',
            pointName: 'posts'
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
      }
    }
  },
  computed: {
    ...mapGetters(['auth', 'user', 'posts']),
    permission () {
      return this.user.permission.current.posts
    }
  },
  methods: {
    ...mapActions(['makeRequestPost']),
    async clapPost (post) {
      post.claps = ++post.claps

      this.request.setPost.data = post
      this.request.setPost.option.args = [post.id]

      await this.makeRequestPost(this.request.setPost)
    },
    editPost (post) {
      const id = post.id
      this.$router.push({ name: 'Post-edit', params: { id } })
    },
    async deletePost (post, index) {
      const id = post.id
      const requestOption = this.request.deletePost.option
      const requestMutation = this.request.deletePost.mutation

      requestOption.args = [id]
      requestMutation.args = { index }
      console.log({ option: requestOption, mutation: requestMutation })
      await this.makeRequestPost({ option: requestOption, mutation: requestMutation })
    }
  },
  async mounted () {
    if (this.posts.length === 0) {
      await this.makeRequestPost(this.request.getPost)
    }
  }
}
</script>

<style scoped>
  .post-box {
    margin: auto;
  }
</style>
