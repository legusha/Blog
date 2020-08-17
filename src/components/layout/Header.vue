<template>
  <b-navbar class="is-info">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link :to="{name: 'Auth'}" class="button is-light">
            {{auth}}
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isAuth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      authDescription: {
        signIn: 'Sign in',
        signOut: 'Sign out'
      }
    }
  },
  computed: {
    auth () {
      if (this.isAuth) {
        return this.authDescription.signOut
      }
      return this.authDescription.signIn
    }
  }
}
</script>

<style scoped>

</style>
