<template>
  <div>
    <b-field label="Post name">
      <b-input v-model="post.name"></b-input>
    </b-field>
    <b-field label="Description post">
      <b-input v-model="post.description" :maxlength="maxLengthDescription" type="textarea"></b-input>
    </b-field>
    <b-button type="is-success is-light">{{actionText}}</b-button>
  </div>
</template>

<script>
export default {
  name: 'Form-post',
  props: {
    post: {
      type: Object,
      default: () => ({
        name: '',
        description: ''
      })
    },
    actionText: {
      type: String,
      default: 'Save'
    }
  },
  data () {
    return {
      maxLengthDescription: 200
    }
  }
}
</script>

<style scoped>

</style>
