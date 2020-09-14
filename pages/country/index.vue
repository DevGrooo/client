<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button
            :props="{class: 'btn btn-primary btn-wd pull-right'}"
            role="/country/create"
            to="/country/create"
          >{{ $t('country.add') }}
          </role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.name" :placeholder="$t('country.name')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.code" :placeholder="$t('country.code')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="id" slot-scope="props" class="text-center">
        <span v-if="props.row.id">{{ props.row.id }}</span>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/country/update"
          :to="`/country/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action `edit', confirmText: $t('country.prop_up_lock')}"
          role="/country/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('country.prop_up_active')}"
          role="/country/active"
          @onClick="active(props.row.id)"
        >
          <i class="fa fa-unlock"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
  import RoleButton from '@/components/UI/form/RoleButton'
  import { callApiCountryList, callApiCountryLock, callApiCountryActive } from '@/apis/country'

  export default {
    components: {
      RoleButton
    },
    data () {
      return {
        filters: {
          name: '',
          code: ''
        },
        columns: ['id', 'name', 'code', 'status', 'action'],
        options: {
          headings: {
            id: this.$t('country.id'),
            name: this.$t('country.name'),
            code: this.$t('country.code'),
            status: this.$t('country.status'),
            action: this.$t('common.action')
          },
          sortable: [
            'name',
            'code'
          ],
          filterByColumn: true,
          requestFunction (data) {
            return callApiCountryList(this, data)
              .then(function (data) {
                return data.response
              })
          }
        }
      }
    },
    methods: {
      onSearch () {
        this.$refs.vuetable.setFilter(this.filters)
      },
      async active (countryId) {
        const result = await callApiCountryActive(this, { country_id: countryId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('country.Active Success'),
            message: this.$t('country.Active country success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('country.Active Error')
          })
        }
      },
      async lock (countryId) {
        const result = await callApiCountryLock(this, { country_id: countryId })
        if (result.status === true) {
          this.flashMessage.success({
            title: this.$t('country.Lock Success'),
            message: this.$t('country.Lock country success')
          })
          this.$refs.vuetable.refresh()
        } else {
          this.flashMessage.error({
            title: this.$t('country.Lock Error')
          })
        }
      }
    }
  }
</script>
