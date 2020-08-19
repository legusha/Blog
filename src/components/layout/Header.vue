<template>
  <b-navbar class="is-info">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <button
            v-if="showBtnPost"
            @click="$emit('createPost')"
            class="button is-success"
          >
            Create post
          </button>
          <button
            v-if="auth"
            @click="authAction.signOut.handler"
            class="button is-light"
          >
            {{authAction.signOut.text}}
          </button>
          <button
            v-if="showBtnSignIn"
            @click="authAction.signIn.handler"
            class="button is-light"
          >
            {{authAction.signIn.text}}
          </button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Header',
  props: {
    auth: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      authAction: {
        signIn: {
          text: 'Sign in',
          handler: this.goToAuthPage
        },
        signOut: {
          text: 'Sign out',
          handler: this.logout
        }
      }
    }
  },
  computed: {
    showBtnPost () {
      const createPermission = this.user.permission.posts.create
      return this.$route.name === 'Posts' && createPermission
    },
    showBtnSignIn () {
      return !this.auth && this.$route.name !== 'Auth'
    }
  },
  methods: {
    ...mapMutations(['logout']),
    goToAuthPage () {
      if (this.$route.name === 'Auth') return
      this.$router.push({ name: 'Auth' })
    }
  }
}
</script>

<style scoped>

</style>
