<template>
  <thead v-if="fields.length > 0">
    <tr>
      <th v-for="(field, index) in fields" :key="index" :data-field="field.name">
        <div :class="{'th-inner': true, 'sortable both': field.sortable, 'desc' : (field.sortable && field.sortDesc), 'asc' : (field.sortable && field.sortAsc)}">{{ field.title }}</div>
        <div class="fht-cell"></div>
      </th>
      <th v-if="actions.length > 0" class="td-actions text-right" data-field="actions">
        <div class="th-inner">Actions</div>
        <div class="fht-cell"></div>
      </th>
    </tr>
  </thead>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    actions: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  computed: {
      fields () {
          return this.headers
      }
  }
}
</script>
