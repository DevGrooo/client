<template>
  <div v-if="user !== null && userGroup !== null" class="row">
    <div class="col-sm-8">
      <form name="formUpdate" class="form-horizontal" @submit.prevent="onSubmit">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t('user.Update role user') }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <label class="col-md-12 col-form-label">{{ userGroup.name }}</label>
            </div>
            <div class="row">
              <div class="col-md-12">
                <treeselect
                  v-model="values"
                  :multiple="true"
                  :options="options"
                  :always-open="true"
                  :searchable="false"
                  :max-height="400"
                  placeholder="Select roles ..."
                />
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary">{{ $t('user.Update role user') }}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-4">
      <div class="card card-user">
        <div class="card-header no-padding">
          <div class="card-image">
            <img src="~/assets/img/full-screen-image-3.jpg" />
          </div>
        </div>
        <div class="card-body">
          <div class="author">
            <a href="#">
              <img class="avatar border-gray" src="~/assets/img/default-avatar.png" />
              <h5 class="card-title">{{ user.fullname }}</h5>
            </a>
            <p class="card-description">{{ user.email }}</p>
          </div>
          <p class="card-description text-center">{{ userGroup.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { callApiUserDetail, callApiUserUpdateRole } from '@/apis/user'
import { callApiUserGroupGetRoleList } from '@/apis/user_group'

export default {
  validate ({ params }) {
    return new RegExp(/^\d+$/).test(params.id)
  },
  components: {
    Treeselect
  },
  data () {
    return {
      options: [],
      values: [],
      user: null,
      userGroup: null
    }
  },
  async created () {
    const userResult = await callApiUserDetail(this, { user_id: this.$route.params.id })
    if (userResult.status === true) {
      this.user = userResult.response
      const userGroupResult = await callApiUserGroupGetRoleList(this, { user_group_id: this.user.user_group_id })
      if (userGroupResult.status === true) {
        this.userGroup = userGroupResult.response
        const roleIds = this.getUserRoleIds()
        this.values = this.getValues(roleIds)
        this.options = this.getTreeOptions(roleIds)
      } else {
        this.$nuxt.context.error(userGroupResult)
      }
    } else {
      this.$nuxt.context.error(userResult)
    }
  },
  methods: {
    getTreeOptions (roleIds) {
      const options = []
      let groupIndex = 0
      for (const roleGroupId in this.userGroup.role_groups) {
        const roleGroup = this.userGroup.role_groups[roleGroupId]
        options[groupIndex] = {
          label: roleGroup.name,
          id: 'group_' + roleGroup.id
        }
        if (!_.isEmpty(roleGroup.roles)) {
          options[groupIndex].children = []
          let index = 0
          for (const roleId in roleGroup.roles) {
            const role = roleGroup.roles[roleId]
            options[groupIndex].children[index] = {
              label: role.name,
              id: role.id
            }
            if (!_.isEmpty(role.sub_roles)) {
              options[groupIndex].children[index].children = []
              let subIndex = 0
              for (const subRoleId in role.sub_roles) {
                const subRole = role.sub_roles[subRoleId]
                options[groupIndex].children[index].children[subIndex] = {
                  label: subRole.name,
                  id: subRole.id
                }
                if (roleIds.includes(subRole.id)) {
                  options[groupIndex].children[index].isDefaultExpanded = true
                }
                subIndex++
              }
            }
            if (roleIds.includes(role.id) || options[groupIndex].children[index].isDefaultExpanded) {
              options[groupIndex].isDefaultExpanded = true
            }
            index++
          }
        }
        groupIndex++
      }
      return options
    },
    getUserRoleIds () {
      return this.user.roles.map(({ id }) => id)
    },
    getValues (roleIds) {
      let result = []
      let groupIndex = 0
      for (const roleGroupId in this.userGroup.role_groups) {
        const roleGroup = this.userGroup.role_groups[roleGroupId]
        if (!_.isEmpty(roleGroup.roles)) {
          let values = []
          let index = 0
          let all = true
          for (const roleId in roleGroup.roles) {
            const role = roleGroup.roles[roleId]
            if (!_.isEmpty(role.sub_roles)) {
              const subValues = []
              let subIndex = 0
              let subAll = true
              for (const subRoleId in role.sub_roles) {
                const subRole = role.sub_roles[subRoleId]
                if (roleIds.includes(subRole.id)) {
                  subValues[subIndex++] = subRole.id
                } else {
                  subAll = false
                }
              }
              if (subAll) {
                values[index++] = role.id
              } else {
                all = false
                values = values.concat(subValues)
              }
            }
            if (roleIds.includes(role.id)) {
              values[index++] = role.id
            } else {
              all = false
            }
          }
          if (all) {
            result[groupIndex++] = 'group_' + roleGroup.id
          } else {
            result = result.concat(values)
          }
        }
      }
      return result
    },
    getRoleIds (values) {
      const roleIds = []
      for (const roleGroupId in this.userGroup.role_groups) {
        const roleGroup = this.userGroup.role_groups[roleGroupId]
        if (!_.isEmpty(roleGroup.roles)) {
          for (const roleId in roleGroup.roles) {
            const role = roleGroup.roles[roleId]
            if (!_.isEmpty(role.sub_roles)) {
              for (const subRoleId in role.sub_roles) {
                const subRole = role.sub_roles[subRoleId]
                if (values.includes('group_' + roleGroup.id) || values.includes(role.id) || values.includes(subRole.id)) {
                  roleIds.push(subRole.id)
                }
              }
            }
            if (values.includes('group_' + roleGroup.id) || values.includes(role.id)) {
              roleIds.push(role.id)
            }
          }
        }
      }
      return roleIds
    },
    async onSubmit () {
      const params = {
        user_id: this.user.id,
        role_ids: this.getRoleIds(this.values)
      }
      const result = await callApiUserUpdateRole(this, params)
      if (result.status === true) {
        this.flashMessage.success({
          title: this.$t('user.Update Role Success'),
          message: this.$t('user.Update Role Success')
        })
        this.$router.push('/user')
      } else {
        this.flashMessage.error({
          title: this.$t('user.Update Role Error'),
          message: result.message
        })
      }
    }
  }
}
</script>
<style>
.vue-treeselect__control {
  display: none;
}
.vue-treeselect__menu-container {
  position: inherit;
}
.vue-treeselect--open-below .vue-treeselect__menu {
  position: inherit;
  border-top-color: #cccccc;
}
</style>
