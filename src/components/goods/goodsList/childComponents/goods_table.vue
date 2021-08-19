<template>
  <div>
    <!--    表格区域-->
    <el-table
      class="table"
      :data="goods"
      style="width: 100%"
      stripe
      border>
      <el-table-column type="index" label="#" width="50"/>
      <el-table-column prop="goods_name" label="商品名称"/>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100px"/>
      <el-table-column prop="goods_weight" label="商品重量" width="80px"/>
      <el-table-column label="创建时间" width="160px">
        <template slot-scope="scope">
          {{scope.row.add_time | showDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="120px">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            content="编辑商品"
            placement="top"
            :enterable="false">
            <el-button
              icon="el-icon-edit"
              type="primary"
              size="mini"
              @click="editMes(scope.$index)"/>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="删除商品"
            placement="top"
            :enterable="false">
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
              @click="deleted(scope.$index)"/>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--      分页区域-->
    <el-pagination
      class="el-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsMes.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="goodsMes.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"/>
    <goods_table_editDialog />
  </div>
</template>

<script>
import goods_table_editDialog from './goods_table_editDialog'
import {pagination} from '@/common/mixin'
import {formatDate} from '@/common/utils'

export default {
  name: "goods_table",
  components:{
    goods_table_editDialog
  },
  mixins:[pagination],
  props:{
    goods: {
      type: Array,
      default(){
        return []
      }
    },
    total:{
      type: Number,
      default: 0
    },
    goodsMes:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
    }
  },
  methods:{
    change(userInfo){
      this.$emit('change', userInfo)
    },
    async deleted(index){
      const confirm = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if(confirm !== 'confirm') return this.$message.info('已取消删除')
      this.$emit('reGet', index)
    },
    editMes(index){
      const {id, username} = this.users[index]
      this.onlyUser = {id, username, email:'', mobile:''}
      this.isShow = true
    }
  },
  filters:{
    showDate: function (value) {
      let date = new Date(value*1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.table{
  margin-top: 15px;
  font-size: 13px;
}
.el-pagination{
  margin-top: 15px;
}
</style>
