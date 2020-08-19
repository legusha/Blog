<template>
  <div class="container is-center">
    <section class="is-center">
      <div class="post-box box column is-6 m-auto">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h3>
                <strong>John Smith</strong>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
              </p>
            </div>
            <div class="columns">
              <div class="column is-4">
                <small>31m</small>
              </div>
              <div v-if="auth" class="column is-8 has-text-right">
                <div v-if="permission.like" class="is-inline-block">
                  <a class="button is-link is-light is-info" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                    <span>28</span>
                  </a>
                </div>
                <div v-if="permission.edit && permission.destroy" class="is-inline-block">
                  <a class="button is-link is-light is-info is-inline-block" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                    <span>Изменить</span>
                  </a>
                  <a class="button is-link is-light is-info is-inline-block ml-3" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-heart" aria-hidden="true"></i>
                  </span>
                    <span>Удалить</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Posts',
  computed: {
    ...mapGetters(['auth', 'user']),
    permission () {
      return this.user.permission.posts
    }
  }
}
</script>

<style scoped>
  .post-box {
    margin: auto;
  }
</style>
