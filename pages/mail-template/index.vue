<template>
  <div>
    <v-server-table ref="vuetable" url="" :columns="columns" :options="options">
      <div slot="afterFilterWrapper">
        <div class="pull-right">
          <role-button :props="{class: 'btn btn-primary'}" role="/user/create" to="/user/create">{{ $t('mail_template.add') }}</role-button>
        </div>
        <div class="search-bar">
          <div class="row">
            <div class="col-md-3">
              <input v-model="filters.locale" :placeholder="$t('mail_template.locale')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <input v-model="filters.subject" :placeholder="$t('mail_template.subject')" type="text" class="form-control" />
            </div>
            <div class="col-md-3 pl-1">
              <button class="btn btn-warning" @click.prevent="onSearch">{{ $t('common.search') }}</button>
            </div>
          </div>
        </div>
        <div class="clear-fix"></div>
      </div>
      <div slot="action" slot-scope="props">
        <role-button
          :props="{class: 'btn btn-link btn-warning table-action edit'}"
          role="/user/update"
          :to="`/user/update/${props.row.id}`"
        >
          <i class="fa fa-edit"></i>
        </role-button>
      </div>
    </v-server-table>
  </div>
</template>
<script>
import RoleButton from '@/components/UI/form/RoleButton'
import { callApiMailTemplateLocaleGetList } from '@/apis/mail_template_locale'
export default {
  components: {
    RoleButton
  },
  data () {
    return {
      filters: {
        locale: '',
        subject: ''
      },
      columns: ['id', 'locale', 'subject', 'mail_template.name', 'mail_template.code', 'action'],
      options: {
        headings: {
          id: this.$t('mail_template.id'),
          locale: this.$t('mail_template.locale'),
          subject: this.$t('mail_template.subject'),
          'mail_template.name': this.$t('mail_template.name'),
          'mail_template.code': this.$t('mail_template.code'),
          action: this.$t('common.action')
        },
        sortable: [
          'id',
          'locale'
        ],
        filterByColumn: true,
        requestFunction (data) {
          return callApiMailTemplateLocaleGetList(this, data)
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
    }
  }
}
</script>
