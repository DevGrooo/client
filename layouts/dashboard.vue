<template>
  <div class="wrapper">
    <Sidebar />
    <div class="main-panel">
      <Navbar />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/UI/bar/Sidebar'
import Navbar from '@/components/UI/bar/Navbar'

export default {
  components: {
    Sidebar,
    Navbar
  }
}
</script>
