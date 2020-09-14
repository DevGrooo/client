<template>
  <div>
    <Navbar :page-title="test.id ? $t('test.edit test') : $t('test.add test')" />
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">{{ test.id ? $t('test.edit test') : $t('test.add test') }}</h4>
              </div>
              <div class="card-body">
                <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
                <form @submit.prevent="save">
                  <div class="row">
                    <div class="col-md-8 pr-1">
                      <div class="form-group">
                        <label>{{ $t('test.name') }}</label>
                        <input
                          v-model="test.name"
                          type="text"
                          autofocus
                          class="form-control"
                          :placeholder="$t('test.name')"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8 pr-1">
                      <div class="form-group">
                        <label>{{ $t('test.email') }}</label>
                        <input
                          v-model="test.email"
                          type="email"
                          class="form-control"
                          :placeholder="$t('test.email')"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8 pr-1">
                      <div class="form-group">
                        <label>{{ $t('test.age') }}</label>
                        <input
                          v-model="test.age"
                          type="text"
                          class="form-control"
                          :placeholder="$t('test.age')"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8 pr-1">
                      <div class="form-group">
                        <label>{{ $t('test.address') }}</label>
                        <input
                          v-model="test.address"
                          type="text"
                          class="form-control"
                          :placeholder="$t('test.address')"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-info btn-fill pull-right"
                  >{{ test.id ? $t('test.update') : $t('test.add new') }}</button>
                  <nuxt-link
                    class="btn btn-primary pull-right"
                    style="margin-right: 10px"
                    to="/test"
                  >{{ $t('test.cancel') }}</nuxt-link>
                  <div class="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from '@/components/UI/bar/Navbar.vue'

export default {
  components: {
    Navbar
  },
  props: {
    test: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    error: '',
    options: [
      { name: 'Vue.js', language: 'JavaScript' },
      { name: 'Rails', language: 'Ruby' },
      { name: 'Sinatra', language: 'Ruby' },
      { name: 'Laravel', language: 'PHP' },
      { name: 'Phoenix', language: 'Elixir' }
    ]
  }),
  computed: {
    ...mapState(['globalErrors'])
  },
  methods: {
    ...mapActions('tests', ['createOrUpdateTest']),
    async save () {
      this.error = ''
      this.loading = true
      const test = await this.createOrUpdateTest(this.test)
      this.loading = false
      if (test) {
        this.$router.push('/test')
      } else {
        this.error = this.$t('test.' + this.globalErrors[0])
      }
    },
    nameWithLang ({ name, language }) {
      return `${name} — [${language}]`
    }
  }
}
</script>

<style>
</style>
