<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">商品分类</span>
  </breadcrumb>
  <el-card>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addGoods">添加商品</el-button>
      </el-col>
    </el-row>
    <cate_table
      :total="total"
      :cateList="cateList"
      :querInfo="querInfo"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange" @deleteCate="deleteCate"/>
  </el-card>
  <cate_addDialog :isShow="showAddDig" @isFalse="isFalse" @commit="commit" :cateMes="cateMes"/>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import cate_table from './childComponents/cate_table'
import cate_addDialog from './childComponents/cate_addDialog'
export default {
  name: "Categories",
  components:{
    breadcrumb,
    cate_table,
    cate_addDialog
  },
  data(){
    return {
      cateList: [],
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      showAddDig: false,
      cateMes: []
    }
  },
  created() {
    this.getCateMes()
  },
  methods:{
    async getCateMes(){
      const {data: res} = await this.$http.get('categories', {
        params: this.querInfo
      })
      if(res.meta.status !== 200) return this.$message.error('获取商品分类失败！')
      this.cateList = res.data.result
      this.total = res.data.total
    },
    //分类项一页显示多少数据
    handleSizeChange(newSize){
      this.querInfo.pagesize = newSize
      this.getCateMes()
    },
    //分类项当前有多少页数据
    handleCurrentChange(newPage){
      this.querInfo.pagenum = newPage
      this.getCateMes()
    },
    addGoods(){
      this.getParentMes()
      this.showAddDig = true
    },
    isFalse(){
      this.showAddDig = false
    },
    async commit(mes){
      const {data: res} = await this.$http.post('categories', mes)
      if(res.meta.status !== 201) return this.$message.error('添加商品失败！')
      this.$message.success('添加商品成功！')
      await this.getCateMes()
      this.showAddDig = false
    },
    //获取父级分类的数据列表
    async getParentMes(){
      const {data: res} = await this.$http.get('categories', {params: {type: 2}})
      if(res.meta.status !== 200) return this.$message.error('获取失败！')
      this.cateMes = res.data
    },
    async deleteCate(id){
      const {data: res} = await this.$http.delete(`categories/${id}`)
      if(res.meta.status !== 200) return this.$message.error('删除失败！')
      this.$message.success('删除成功！')
      await this.getCateMes()
    }
  }
}
</script>

<style scoped>

</style>
