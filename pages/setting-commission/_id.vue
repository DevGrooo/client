<template>
  <div v-if="data" class="row">
    <div class="col-md-12">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Setting date</th>
            <th scope="col">Type of agent</th>
            <th scope="col">Amount of investment</th>
            <th scope="col">Sell Fee (%)</th>
            <th scope="col">Holding Fee (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>{{ data.start_at }}</td>
            <td>{{ data.fund_distributor.name }}</td>
            <td>{{ data.min_amount }}</td>
            <td>{{ data.sell_commission }}</td>
            <td>{{ data.maintance_commission_amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { callApiSettingCommissionDetail } from '@/apis/setting_commission'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  data () {
    return {
      data: null
    }
  },
  async created () {
    const data = await callApiSettingCommissionDetail(this, {
      setting_commission_lines_id: this.$route.params.id
    })
    if (data.status === true) {
      this.data = data.response
    } else {
      this.$nuxt.context.error(data)
    }
  }
}
</script>
