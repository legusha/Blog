<template>
  <div class="container is-center">
    <form-post
      :action-text="currentForm.action.text"
      :post="currentForm.post"
      @action="currentForm.action.handler"
    ></form-post>
  </div>
</template>

<script>
import FormPost from '@/components/Form-post'
export default {
  name: 'Post-action',
  components: {
    FormPost
  },
  data () {
    return {
      form: {
        edit: {
          post: {
            name: '',
            description: ''
          },
          action: {
            text: 'Edit',
            handler: this.formActionEdit
          }
        },
        create: {
          post: {
            name: '',
            description: ''
          },
          action: {
            text: 'Create',
            handler: this.formActionCreate
          }
        }
      },
      currentForm: {}
    }
  },
  methods: {
    formActionEdit () {
    },
    formActionCreate () {
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
