<template>
  <div class="container is-center">
    <section>
      <b-field
        v-for="(field, fieldKey) in fields"
        :key="fieldKey"
        :label="field.label"
        :message="hasErrors(fieldKey, field)"
        :type="{ 'is-danger': hasErrors(fieldKey, field).length > 0 }"
      >
        <b-input
          v-model="field.value"
          :maxlength="field.maxLength"
          :type="field.type"
          @focus="fieldFocus(fieldKey)"
        ></b-input>
      </b-field>
      <a
        @click="authentication"
        :disabled="!isDataReady"
        class="button is-success is-right"
      >
        Enter
      </a>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Auth',
  data () {
    return {
      hasError: true,
      fields: {
        login: {
          errors: [
            'Username is not available'
          ],
          label: 'Login',
          maxLength: 30,
          // RegExp for email
          regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          type: 'text',
          value: ''
        },
        password: {
          errors: [
            'Password must have at least 8 characters'
          ],
          label: 'Password',
          maxLength: 30,
          // Minimum eight characters, at least one letter one big letter, one number and one special character
          regExp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          type: 'password',
          value: ''
        }
      },
      fieldsKeys: [],
      notCorrectCredentials: 'Your login or password is not correct, please check your credentials'
    }
  },
  computed: {
    isDataReady () {
      if (this.fieldsKeys.length === 0) {
        return false
      }
      return this.hasErrors('login', this.fields.login).length === 0 &&
        this.hasErrors('password', this.fields.password).length === 0
    }
  },
  methods: {
    ...mapMutations(['setCurrentPassword']),
    ...mapActions(['makeRequestUser']),

    hasErrors (fieldKey, { errors, regExp, value }) {
      const isOnceFocus = !this.fieldsKeys.includes(fieldKey)

      if (isOnceFocus) return []
      return errors.filter(errorName => {
        if (!regExp.test(value)) {
          return { [errorName]: !regExp.test(value) }
        }
      })
    },
    fieldFocus (fieldKey) {
      const fieldsOnce = this.fieldsKeys
      const isHasIndex = fieldsOnce.includes(fieldKey)

      if (isHasIndex) return
      fieldsOnce.push(fieldKey)
    },
    async authentication () {
      if (!this.isDataReady) return

      const fields = this.fields
      const login = fields.login.value
      const password = fields.password.value

      this.setCurrentPassword(password)
      const user = await this.makeRequestUser(login)
      if (user) {
        await this.$router.push({ name: 'Posts' })
        return
      }
      alert(this.notCorrectCredentials)
    }
  }
}
</script>

<style scoped>

</style>
