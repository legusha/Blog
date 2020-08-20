<template>
  <div class="container is-center">
    <form-post
      :action-text="currentForm.action.text"
      :post="currentPost"
      @action="currentForm.action.handler"
    ></form-post>
  </div>
</template>

<script>
import FormPost from '@/components/Form-post'
import { mapGetters, mapMutations, mapActions } from 'vuex'

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
              name: 'setNewPost'
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
              name: 'setNewPost'
            }
          }
        }
      },
      currentForm: {}
    }
  },
  computed: {
    ...mapGetters(['posts', 'newPost', 'currentPost']),
    id () {
      const radix = 10
      const id = this.$route.params.id
      return parseInt(id, radix)
    }
  },
  methods: {
    ...mapActions(['makeRequestPost']),
    ...mapMutations(['setCurrentPost']),
    async formActionEdit () {
      const data = this.currentPost
      const option = this.currentForm.request
      const id = this.id

      option.args = [id]

      this.setCurrentPost({ ...data, id })
      await this.makeRequestPost({ option, data })
      await this.$router.push({ name: 'Posts' })
    },
    async formActionCreate () {
      const data = this.currentPost
      const option = this.currentForm.request

      await this.makeRequestPost({ option, data })
      await this.$router.push({ name: 'Posts' })
    }
  },
  created () {
    if (this.$route.name === 'Post-edit') {
      this.currentForm = this.form.edit
      return
    }
    this.currentForm = this.form.create
  }
}
</script>
