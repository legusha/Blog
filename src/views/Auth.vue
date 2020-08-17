<template>
  <div class="container is-center">
    <section>
      <b-field
        label="Username"
        :type="{ 'is-danger': hasError }"
        :message="{ 'Username is not available': hasError }"
      >
        <b-input value="johnsilver" maxlength="30"></b-input>
      </b-field>

      <b-field
        label="Password"
        :type="{ 'is-danger': hasError }"
        :message="[
              { 'Password is too short': hasError },
              { 'Password must have at least 8 characters': hasError }
            ]"
      >
        <b-input value="123" type="password" maxlength="30"></b-input>
      </b-field>
      <a class="button is-success is-right">
        Enter
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      hasError: true
    }
  }
}
</script>

<style scoped>

</style>
