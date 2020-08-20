<template>
  <div>
    <b-field label="Post name">
      <b-input v-model="post.title"></b-input>
    </b-field>
    <b-field label="Description post">
      <b-input v-model="post.description" :maxlength="maxLengthDescription" type="textarea"></b-input>
    </b-field>
    <b-button @click="$emit('action')" type="is-success">{{actionText}}</b-button>
  </div>
</template>

<script>
export default {
  name: 'Form-post',
  props: {
    post: {
      type: Object,
      default: () => ({
        title: '',
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
