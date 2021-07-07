<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">商品分类</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "Categories",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
