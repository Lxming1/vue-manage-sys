<template>
<div>
  <breadcrumb>
    <span slot="one">数据统计</span>
    <span slot="two">数据报表</span>
  </breadcrumb>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
export default {
  name: "Reports",
  components:{
    breadcrumb
  }
}
</script>

<style scoped>

</style>
