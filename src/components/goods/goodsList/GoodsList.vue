<template>
<div>
  <breadcrumb>
    <span slot="one">商品管理</span>
    <span slot="two">商品列表</span>
  </breadcrumb>
  <el-card>
    <goods_addGoods
      @getGoodsMes="getGoodsList"
      :goodsMes="goodsMes"
      @addGoods="addGoods"/>
    <goods_table
      :goods="goodsList"
      :total="total"
      :goodsMes="goodsMes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @reGet="deleteGood"
      />
<!--    @change="change"-->

<!--    @editUserMes="editUserMes"-->
<!--    @updateMes="getUsersMes"-->
  </el-card>
</div>
</template>

<script>
import breadcrumb from '@/components/common/breadcrumb'
import goods_addGoods from './childComponents/goods_addGoodsInput'
import goods_table from './childComponents/goods_table'
export default {
  name: "GoodsList",
  components:{
    breadcrumb,
    goods_addGoods,
    goods_table
  },
  created() {
    this.getGoodsList()
  },
  data(){
    return{
      goodsList: [],
      goodsMes:{
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: null
    }
  },
  methods:{
    async getGoodsList(){
      const {data: res} = await this.$http.get('goods', {
        params: this.goodsMes
      })
      if(res.meta.status !== 200) return this.$message.error('获取商品列表失败！')
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    //分类项一页显示多少数据
    handleSizeChange(newSize){
      this.goodsMes.pagesize = newSize
      this.getGoodsList()
    },
    //分类项当前有多少页数据
    handleCurrentChange(newPage){
      this.goodsMes.pagenum = newPage
      this.getGoodsList()
    },
    addGoods(){
      this.$router.push('/goods/add')
    },
    async deleteGood(index){
      const {data: res} = await this.$http.delete(`goods/${this.goodsList[index].goods_id}`)
      if(res.meta.status !== 200) return this.$message.error('删除商品失败！')
      this.$message.success('删除商品成功！')
      this.goodsList.splice(index, 1)
      await this.getGoodsList()
    }
  }
}
</script>

<style scoped>

</style>
