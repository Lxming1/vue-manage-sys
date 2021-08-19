<template>
<div>
  <agv_breadcrumb/>
  <el-card>
    <agv_alert/>
    <agv_steps :activeIndex="stepIndex"/>
    <agv_tabs @currentIndex="currentIndex"/>
  </el-card>
</div>
</template>

<script>
import agv_breadcrumb from './addView_childComponents/agv_brendcrumb'
import agv_alert from './addView_childComponents/agv_alert'
import agv_steps from './addView_childComponents/agv_steps'
import agv_tabs from './addView_childComponents/agv_tabs'
export default {
  name: "goods_addGoodsView",
  components:{
    agv_breadcrumb,
    agv_alert,
    agv_steps,
    agv_tabs
  },
  data(){
    return{
      stepIndex: 0
    }
  },
  methods:{
    currentIndex(index){
      this.stepIndex = index - 0
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  font-size: 13px;
  margin-bottom: 15px;
}
.el-card{
  height: 100%;
}
</style>
