<template>
  <b-navbar class="is-primary">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link :to="{name: 'Auth'}" class="button is-light">
            Login
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
