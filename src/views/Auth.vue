<template>
  <div class="container is-center">
    <section>
      <b-field
        v-for="(field, index) in fields"
        :key="index"
        :label="field.label"
        :message="hasErrors(index, field)"
        :type="{ 'is-danger': hasErrors(index, field).length > 0 }"
      >
        <b-input
          v-model="field.value"
          :maxlength="field.maxLength"
          @focus="focusField(index)"
        ></b-input>
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
      hasError: true,
      fields: [
        {
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
        {
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
      ],
      fieldsOnceIndex: []
    }
  },
  methods: {
    hasErrors (index, { errors, regExp, value }) {
      const isOnceFocus = !this.fieldsOnceIndex.includes(index)

      if (isOnceFocus) return []
      return errors.filter(errorName => {
        if (!regExp.test(value)) {
          return { [errorName]: !regExp.test(value) }
        }
      })
    },
    focusField (index) {
      const fieldsOnce = this.fieldsOnceIndex
      const isHasIndex = fieldsOnce.includes(index)

      if (isHasIndex) return
      fieldsOnce.push(index)
    }
  }
}
</script>

<style scoped>

</style>
