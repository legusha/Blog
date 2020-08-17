<template>
  <div id="app">
    <Header
      :isAuth="isAuth"
    ></Header>
    <router-view class="pt-4"></router-view>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      isAuth: false
    }
  }
}
</script>
