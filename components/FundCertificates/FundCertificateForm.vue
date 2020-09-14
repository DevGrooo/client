<template>
  <div>
    <Navbar :page-title="fundCertificate.id ? $t('fund_certificate.edit fund certificate') : $t('fund_certificate.add fund certificate')" />
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">{{ fundCertificate.id ? $t('fund_certificate.edit fund certificate') : $t('fund_certificate.add fund certificate') }}</h4>
              </div>
              <div class="card-body">
                <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
                <form @submit.prevent="save">
                  <div class="row">
                    <div class="col-md-8 pr-1">
                      <div class="form-group">
                        <label>{{ $t('fund_certificate.name') }}</label>
                        <input
                          v-model="fundCertificate.name"
                          type="text"
                          autofocus
                          class="form-control"
                          :placeholder="$t('fund_certificate.name')"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-info btn-fill pull-right"
                  >{{ fundCertificate.id ? $t('fund_certificate.update') : $t('fund_certificate.add new') }}</button>
                  <nuxt-link
                    class="btn btn-primary pull-right"
                    style="margin-right: 10px"
                    to="/fund-certificate"
                  >{{ $t('fund_certificate.cancel') }}</nuxt-link>
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
import Navbar from '@/components/UI/bar/Navbar.vue'

export default {
  components: {
    Navbar
  },
  props: {
    fundCertificate: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
