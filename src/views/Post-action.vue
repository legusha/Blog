<template>
  <div class="container is-center">
    <form-post
      :action-text="formCurrent.action.text"
      :post="currentPost"
      @action="formCurrent.action.handler"
    ></form-post>
  </div>
</template>

<script>
import FormPost from '@/components/Form-post'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Post-action',
  components: {
    FormPost
  },
  data () {
    return {
      form: {
        edit: {
          action: {
            text: 'Edit',
            handler: this.formActionEdit
          },
          request: {
            method: 'put',
            pointName: 'postId',
            args: [],
            mutation: {
              name: 'updatePost',
              args: {}
            }
          }
        },
        create: {
          action: {
            text: 'Create',
            handler: this.formActionCreate
          },
          request: {
            method: 'post',
            pointName: 'posts',
            mutation: {
              name: 'createPost'
            }
          }
        }
      },
      formCurrent: {}
    }
  },
  computed: {
    ...mapGetters(['posts', 'currentPost', 'user', 'timePost']),
    id () {
      const radix = 10
      const id = this.$route.params.id
      return parseInt(id, radix)
    },
    index () {
      return this.posts.findIndex(post => post.id === this.id)
    }
  },
  methods: {
    ...mapActions(['makeRequestPost']),
    ...mapMutations(['setCurrentPost']),
    async formActionEdit () {
      const data = this.currentPost
      const optionRequest = this.formCurrent.request
      const optionMutation = optionRequest.mutation
      const id = this.id

      optionRequest.args = [id]
      optionMutation.args = { index: this.index }

      this.setCurrentPost({ ...data, id })
      await this.makeRequestPost({
        data,
        option: optionRequest,
        mutation: optionMutation
      })
      await this.$router.push({ name: 'Posts' })
    },
    async formActionCreate () {
      const currentPost = this.currentPost
      const optionRequest = this.formCurrent.request
      const optionMutation = optionRequest.mutation
      const id = this.user.id

      const data = {
        title: currentPost.title,
        description: currentPost.description,
        claps: 0,
        userId: id,
        ...this.timePost
      }

      await this.makeRequestPost({
        data,
        option: optionRequest,
        mutation: optionMutation
      })
      await this.$router.push({ name: 'Posts' })
    },
    formCurrentAssign () {
      if (this.$route.name === 'Post-edit') {
        this.formCurrent = this.form.edit
        return
      }
      this.formCurrent = this.form.create
    }
  },
  created () {
    this.formCurrentAssign()
  }
}
</script>
