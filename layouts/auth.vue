<template>
  <div class="wrapper wrapper-full-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-wrapper">
          <a class="navbar-brand" href="#">FMC project</a>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-bar burger-lines" />
            <span class="navbar-toggler-bar burger-lines" />
            <span class="navbar-toggler-bar burger-lines" />
          </button>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="full-page section-image" data-color="black">
      <div class="content">
        <Nuxt />
      </div>
      <div
        class="full-page-background"
        style="background-image: url(/img/full-screen-image-2.jpg); z-index: 3"
      />
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest'
}
</script>
