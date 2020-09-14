<template>
  <test-form :test="test" />
</template>

<script>
import TestForm from '@/components/Tests/TestForm.vue'

export default {
    components: { TestForm },
    data: () => ({
      test: {
        id: null,
        name: '',
        email: '',
        age: '',
        address: ''
      }
    })
}
</script>

<style>

</style>
