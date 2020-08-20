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
      formCurrent: {}
    }
  },
  computed: {
    ...mapGetters(['posts', 'currentPost']),
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
      const option = this.formCurrent.request
      const id = this.id

      option.args = [id]

      this.setCurrentPost({ ...data, id })
      await this.makeRequestPost({ option, data })
      await this.$router.push({ name: 'Posts' })
    },
    async formActionCreate () {
      const data = this.currentPost
      const option = this.formCurrent.request

      await this.makeRequestPost({ option, data })
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
