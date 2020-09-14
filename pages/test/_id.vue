<template>
  <test-form :test="test" />
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import TestForm from '@/components/Tests/TestForm.vue'

export default {
  components: { TestForm },
  async asyncData ({ store, params }) {
    const test = await store.dispatch('tests/getSelectedTest', {
      testId: params.id
    })
    return { test: cloneDeep(test) }
  }
}
</script>

<style>
</style>
