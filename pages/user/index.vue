<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary'}" role="/user/create" to="/user/create">{{ $t('user.Add') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.username" placeholder="username" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.email" placeholder="email" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="status" slot-scope="props" class="text-center">
        <span v-if="props.row.status === 1" class="text-success">{{ props.row.status_name }}</span>
        <span v-if="props.row.status === 2" class="text-danger">{{ props.row.status_name }}</span>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/user/update"
          :to="`/user/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
        <role-button
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('user.Confirm Reset Password') }"
          role="/user/reset-password"
          @onClick="resetPassword(props.row.id)"
        >
          <i class="fa fa-retweet"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 1"
          :props="{class: 'btn btn-link btn-danger table-action edit', confirmText: $t('user.Confirm Lock User')}"
          role="/account-commission/lock"
          @onClick="lock(props.row.id)"
        >
          <i class="fa fa-lock"></i>
        </role-button>
        <role-button
          v-if="props.row.status === 2"
          :props="{class: 'btn btn-link btn-success table-action edit', confirmText: $t('user.Confirm Unlock User')}"
          role="/account-commission/active"
          @onClick="active(props.row.id)"
        >
          <i class="fa fa-unlock"></i>
        </role-button>
        <role-button
          :props="{class: 'btn btn-link btn-info table-action edit'}"
          role="/user/update-role"
          :to="`/user/update-role/${props.row.id}`"
          @onClick="active(props.row.id)"
        >
          <i class="fa fa fa-key"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import { callApiUserGetList, callApiUserLock, callApiUserActive, callApiUserResetPassword } from '@/apis/user'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
        username: '',
        email: ''
      },
      columns: ['id', 'user_group.name', 'username', 'fullname', 'email', 'mobile', 'status', 'action'],
      options: {
        headings: {
          id: this.$t('user.ID'),
          'user_group.name': this.$t('user.User Group'),
          username: this.$t('user.Username'),
          fullname: this.$t('user.Fullname'),
          email: this.$t('user.Email'),
          mobile: this.$t('user.Mobile'),
          status: this.$t('user.Status'),
          action: this.$t('common.action')
        },
        sortable: [
          'username',
          'email'
        ],
        filterByColumn: true,
        requestFunction (data) {
          return callApiUserGetList(this, data)
          .then(function (data) {
            return data.response
          })
        }
      }
    }
  },
  methods: {
    async lock (userId) {
      const result = await callApiUserLock(this, { user_id: userId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Lock Success'),
          message: this.$t('user.Lock user success')
        })

        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('user.Lock Error'),
          message: result.message
        })
      }
    },
    async active (userId) {
      const result = await callApiUserActive(this, { user_id: userId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Active Success'),
          message: this.$t('user.Active user success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('user.Active Error'),
          message: result.message
        })
      }
    },
    async resetPassword (userId) {
      const result = await callApiUserResetPassword(this, { user_id: userId })
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Reset password Success'),
          message: this.$t('user.Reset password user success')
        })
        this.$refs.vuetable.refresh()
      } else {
        this.flashMessage.error({
          title: this.$t('user.Reset password Error'),
          message: result.message
        })
      }
    },
    onSearch () {
      this.$refs.vuetable.setFilter(this.filters)
    }
  }
}
</script>
