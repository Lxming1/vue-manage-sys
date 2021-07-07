<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">分类参数</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "Params",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
