<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <label for="select_month">Select Month<span class="text-danger">*</span>: </label>
        <input id="select_month" type="date" name="select_month">
      </div>
      <div class="col-md-3">
        <label for="select_agent">Select Agent<span class="text-danger">*</span>: </label>
        <select id="select_agent" name="select_agent">
          <option value="1">Bảo Việt</option>
          <option value="2">Quang Trung</option>
          <option value="3">Nguyễn Huệ</option>
        </select>
      </div>
      <div class="col-md-3">
        <label for="select_fund">Select Fund<span class="text-danger">*</span>: </label>
        <select id="select_fund" name="select_fund">
          <option value="1">MAGEF</option>
          <option value="2">FBI</option>
          <option value="3">CIA</option>
        </select>
      </div>
      <div class="col-md-9 text-center">
        <button class="btn btn-warning">SEARCH</button>
      </div>
    </div>
    <h3>SYNTHETIC</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Trading Period</th>
          <th scope="col">1-Apr-20</th>
          <th scope="col">8-Apr-20</th>
          <th scope="col">15-Apr-20</th>
          <th scope="col">22-Apr-20</th>
          <th scope="col">29-Apr-20</th>
          <th scope="col">30-Apr-20</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">No of day</th>
          <td>1</td>
          <td>6</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>2</td>
          <td>30</td>
        </tr>
        <tr>
          <th scope="row">Number of Fund certificates</th>
          <td>1</td>
          <td>6</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>2</td>
          <td>30</td>
        </tr>
        <tr>
          <th scope="row">NAV per share</th>
          <td>7.039.52</td>
          <td>7.800.8</td>
          <td>7.926.91</td>
          <td>7.984.93</td>
          <td>8.073.09</td>
          <td></td>
          <td>8.073.09</td>
        </tr>
        <tr>
          <th scope="row">Balance of fund certificates</th>
          <td>233.642.16</td>
          <td>242.308.16</td>
          <td>242.308.16</td>
          <td>242.308.16</td>
          <td>242.308.16</td>
          <td>242.308.16</td>
          <td>242.308.16</td>
        </tr>
        <tr>
          <th scope="row">Maintenance fee</th>
          <td>22.531</td>
          <td>140.197</td>
          <td>181.252</td>
          <td>184.182</td>
          <td>185.530</td>
          <td>26.797</td>
          <td>740.489</td>
        </tr>
        <tr>
          <th scope="row">Subscription fee</th>
          <td>460.991</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>460.991</td>
        </tr>
        <tr>
          <th scope="row">Total Fee</th>
          <td>483.522</td>
          <td>140.197</td>
          <td>181.252</td>
          <td>184.182</td>
          <td>185.530</td>
          <td>26.797</td>
          <td>1.201.480</td>
        </tr>
      </tbody>
    </table>
    <h3>DETAIL</h3>
    <table class="table table-bordered">
      <thead class="text-light bg-dark">
        <tr>
          <th scope="col" rowspan="2" class="text-center" style="background-color: #110c61;">CUSTODYCD</th>
          <th scope="col" rowspan="2" class="text-center" style="background-color: #110c61;">FULLNAME</th>
          <th scope="col" rowspan="2" class="text-center" style="background-color: #110c61;">IDCODE</th>
          <th scope="col" colspan="7" class="text-center" style="background-color: #1857ca;">SUB AMOUNT</th>
          <th scope="col" colspan="6" class="text-center" style="background-color: green;">Sales Fee</th>
          <th scope="col" colspan="6" class="text-center" style="background-color: pink;">No of share</th>
          <th scope="col" colspan="7" class="text-center" style="background-color: #135f09;">Maintance Fee</th>
        </tr>
        <tr>
          <th scope="col">1-Apr-20</th>
          <th scope="col">8-Apr-20</th>
          <th scope="col">15-Apr-20</th>
          <th scope="col">22-Apr-20</th>
          <th scope="col">29-Apr-20</th>
          <th scope="col">Type of product</th>
          <th scope="col">Total sub amount</th>
          <th scope="col">1-Apr-20</th>
          <th scope="col">8-Apr-20</th>
          <th scope="col">15-Apr-20</th>
          <th scope="col">22-Apr-20</th>
          <th scope="col">29-Apr-20</th>
          <th scope="col">Total sales fee</th>
          <th scope="col">1-Apr-20</th>
          <th scope="col">8-Apr-20</th>
          <th scope="col">15-Apr-20</th>
          <th scope="col">22-Apr-20</th>
          <th scope="col">29-Apr-20</th>
          <th scope="col">30-Apr-20</th>
          <th scope="col">1-Apr-20</th>
          <th scope="col">8-Apr-20</th>
          <th scope="col">15-Apr-20</th>
          <th scope="col">22-Apr-20</th>
          <th scope="col">29-Apr-20</th>
          <th scope="col">30-Apr-20</th>
          <th scope="col">Total maintainance fee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">701FIC2904</th>
          <td>Nguyễn Văn A</td>
          <td>IC2904</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>2</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
          <td>30</td>
        </tr>
      </tbody>
    </table>
    <h3>Test</h3>
    <table class="table table-bordered">
      <thead class="text-light bg-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">EMAIL</th>
          <th scope="col">AGE</th>
          <th scope="col">Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listCommissions" :key="index">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.address }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-8">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: !pagination.first_link }">
              <a href="#" class="page-link" @click="viewCommission(pagination.first_link)">&laquo;</a>
            </li>
            <li class="page-item" :class="{ disabled: !pagination.prev_link }">
              <a href="#" class="page-link" @click="viewCommission(pagination.prev_link)">&lt;</a>
            </li>
            <li v-for="(n, index) in pagination.last_page" :key="index" class="page-item" :class="{ disabled: !pagination.current_page === n }">
              <a href="#" class="page-link" @click="viewCommission(pagination.path_page + n)">{{ n }}</a>
            </li>
            <li class="page-item" :class="{ disabled: !pagination.next_link }">
              <a href="#" class="page-link" @click="viewCommission(pagination.next_link)">&gt;</a>
            </li>
            <li class="page-item" :class="{ disabled: !pagination.last_link }">
              <a href="#" class="page-link" @click="viewCommission(pagination.last_link)">&raquo;</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   callApiCommissionGetList
// } from '@/apis/commission'

export default {
    data () {
        return {
            listCommissions: [],
            pagination: {},
            getParams (lang = 'vi', token = null) {
              return {
                lang,
                token,
                env: process.env.APP_ENV,
                app_version: process.env.APP_VERSION
              }
          }
        }
    },
    created () {
        this.viewCommission()
        // const result = await callApiCommissionGetList(this)
        // this.listCommissions = result.response.data
    },
    methods: {
      async viewCommission (pagi) {
        try {
          pagi = pagi || '/commission/list'
          const params = this.getParams(this.$i18n.locale, this.$auth.getToken('api'))
          await this.$axios
            .put(pagi, params)
            .then((response) => {
              this.listCommissions = response.data.response.data
              this.pagination = {
                  current_page: response.data.response.current_page,
                  last_page: response.data.response.last_page,
                  from_page: response.data.response.from,
                  to_page: response.data.response.to,
                  total_page: response.data.response.total,
                  path_page: response.data.response.path + '?page=',
                  first_link: response.data.response.first_page_url,
                  last_link: response.data.response.last_page_url,
                  prev_link: response.data.response.last_page_url,
                  next_link: response.data.response.next_page_url
              }
            })
        } catch (err) {
          console.log(err)
        }
      }
    }
}
</script>

<style>
</style>
