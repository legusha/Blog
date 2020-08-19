<template>
  <div id="app">
    <Header
      :auth="auth"
      :user="user"
      @createPost="createPost"
    ></Header>
    <router-view class="pt-4"></router-view>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapGetters(['auth', 'user'])
  },
  methods: {
    createPost () {
      console.log('create Post!')
    }
  }
}
</script>
