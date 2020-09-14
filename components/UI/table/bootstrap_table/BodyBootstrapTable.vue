<template>
  <tbody v-if="rows">
    <tr v-for="(row, index) in rows" :key="index" :data-index="index">
      <td v-for="field in fields" :key="field.name" :class="field.css">{{ getValue(row, field) }}</td>
      <td v-if="actions.length > 0" class="td-actions text-right" style>
        <a
          v-for="(action, actionIndex) in actions"
          :key="actionIndex"
          rel="tooltip"
          title="View"
          class="btn btn-link btn-info table-action view"
          href="#"
        >
          <i class="fa fa-image"></i>
        </a>
      </td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td :colspan="fields.length">Data empty</td>
    </tr>
  </tbody>
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
      },
      rows: {
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
  },
  methods: {
    getValue (row, field) {
      if (field.formatter !== null) {
        return field.formatter(row[field.name])
      }
      return row[field.name]
    }
  }
}
</script>
