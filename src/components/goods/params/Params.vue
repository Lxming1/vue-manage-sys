<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">分类参数</span>
  </breadcrumb>
  <el-card>
    <params_alert/>
    <params_selectCate
      :cateList="cateList"
      @showBtn="showBtn"/>
    <params_tabs :btnShow="btnShow"/>
  </el-card>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import params_alert from './childComponents/params_alert'
import params_selectCate from './childComponents/params_selectCate'
import params_tabs from './childComponents/params_tabs'
export default {
  name: "Params",
  components:{
    breadcrumb,
    params_alert,
    params_selectCate,
    params_tabs
  },
  data(){
    return {
      cateList: [],
      btnShow: false
    }
  },
  created() {
    this.getCateMes()
  },
  methods:{
    //获取商品分类列表
    async getCateMes(){
      const {data: res} = await this.$http.get('categories')
      if(res.meta.status !== 200) return this.$message.error('获取商品分类失败！')
      this.cateList = res.data
    },
    showBtn(bol){
      this.btnShow = bol
    }
  }
}
</script>

<style scoped>

</style>
