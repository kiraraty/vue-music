<template>
<my-header></my-header>
<my-tab></my-tab>
<router-view></router-view>
</template>

<script>
import Header from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
export default {
  components:{
    MyHeader:Header,
    MyTab:Tab
  }
}
</script>
<style lang="scss">
</style>
