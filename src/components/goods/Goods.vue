<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">商品列表</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "goods",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
