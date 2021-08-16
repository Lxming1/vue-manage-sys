<template>
<el-row class="selectMes">
  <el-col>
    <span>选择商品分类：</span>
    <el-cascader
      v-model="parentChange"
      :options="cateList"
      :props="prop"
      @change="change"
      change-on-select/>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "params_selectCate",
  props:{
    cateList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      //与级联选择器双向绑定的数组
      parentChange: [],
      //显示与获取的设置
      prop:{
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children:'children'
      }
    }
  },
  methods:{
    change(){
      if(this.parentChange.length !== 3) {
        this.parentChange = []
        //没选第三级就禁用按钮
        this.$emit('showBtn', false)
        this.$message.warning('只允许为第三级分类设置相关参数！')
      }else {
        this.$emit('showBtn', true)
      }
      //向tabs发起请求，要求其根据此id请求数据
      this.$bus.$emit('getMes', this.parentChange)
    }
  },
}
</script>

<style scoped>
.selectMes{
  margin: 15px 0 5px 0;
}
</style>
