<template>
<div>
  <breadcrumb>
    <span slot="one">订单管理</span>
    <span slot="two">订单列表</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "Orders",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
