<template>
  <div v-if="numberPage > 0" :class="css">
    <ul class="pagination">
      <li :class="{'page-first': true, 'disabled' : currentPage === 1}">
        <a href="#" @click.prevent="onSelectPage(1)">«</a>
      </li>
      <li :class="{'page-pre': true, 'disabled' : currentPage === 1}">
        <a href="#" @click.prevent="onSelectPage(pageActive - 1)">‹</a>
      </li>
      <li v-for="index in numberPage" :key="index" :class="{'page-number' : true, 'active': (index === currentPage)}">
        <a href="#" @click.prevent="onSelectPage(index)">{{ index }}</a>
      </li>
      <li :class="{'page-next': true, 'disabled' : currentPage === numberPage}">
        <a href="#" @click.prevent="onSelectPage(currentPage + 1)">›</a>
      </li>
      <li :class="{'page-last': true, 'disabled' : currentPage === numberPage}">
        <a href="#" @click.prevent="onSelectPage(numberPage)">»</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props: {
        numberPage: {
            type: Number,
            required: false,
            default: 0
        },
        currentPage: {
            type: Number,
            required: false,
            default: 0
        },
        css: {
            type: String,
            required: false,
            default: 'pull-right pagination'
        }
    },
    methods: {
        onSelectPage (pageIndex) {
            if (pageIndex > 0 && pageIndex <= parseInt(this.numberPage)) {
              this.$emit('onSelectCurrentPage', pageIndex)
            }
        }
    }
}
</script>
