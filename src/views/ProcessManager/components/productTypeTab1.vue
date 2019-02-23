<template>
  <div class="one">
    <el-table :data="electritList" border fit highlight-current-row>
      <el-table-column label="单体电芯类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cell_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="规格代码" align="center" >
        <template slot-scope="scope">
           <span>{{ scope.row.spec_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="形状代码" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.shape_code }} ({{ scope.row.shape_name }})</span>
        </template>
      </el-table-column>

      <el-table-column label="尺寸(mm)" align="center">
        <template slot-scope="scope">
           <span>{{ scope.row.thickness }} * {{ scope.row.width }} * {{ scope.row.height }}</span>
        </template>
      </el-table-column>

      <el-table-column label="生产地址" align="center">
        <template slot-scope="scope">
         <span>{{ scope.row.address_code }} ( {{ scope.row.address_name }} )</span>
        </template>
        </el-table-column>

      <el-table-column label="电池类型代码" align="center" >
        <template slot-scope="scope">
           <span>{{ scope.row.cathode_code }} ( {{ scope.row.cathode_name }} )</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
         <el-button type="primary" size="mini" @click="clickParent(scope.row)">{{ $t('table.edit') }}</el-button>
       <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
<pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getElectricList" />
    <!-- <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getElectricList" /> -->
     
 <creat-dialog ref="tabheadeAdd" @refreshListTab1="reFreshTab1" :tablecontent="tablecontent" ></creat-dialog>
  </div>
</template>

<script>
import {
electricList, 
addElectricList,
updateElectricList,
electricDel 
} from '@/api/operatoProductionType'
import CreatDialog from './productTypeTabDialog'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination,CreatDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  data() {
    return {
      electritList: [],
      createdTimes: 1,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      tablecontent:{},
      TotalPages: 0,
      loading: false,
      dialogStatus: '',
      dialogPvVisible: false,
      dialogFormVisible: false,

      EleTextMap: {
        update: '编辑',
        create: '新建'
      },
    }
  },
  created() {
    this.getElectricList()
   this.$emit('clickBrotherBtn', true)
  },
  methods: {
    triggerBrotherUpdateEle(abc) {
       debugger
       this.tablecontent = abc
      this.$emit('clickBrotherBtn', true)
      },
    clickParent(abc) {
   // 父组件通过$ref调用子组件1中的事件方法
      debugger
    this.tablecontent = abc
    this.$refs.tabheadeAdd.handleUpdateEle(abc)

   }, 
   reFreshTab1(){
      this.getElectricList()
   },
    getElectricList() {
      this.loading = true
      this.$emit('create') // for test
      electricList(this.listQuery).then(response => {
        if(response.data.list.length>0){
          debugger
        this.electritList = response.data.list
        this.TotalPages = response.data.recordCount
        }
        this.loading = false
      })
    },
  
    // 点击 删除 - 单体电芯
    handleDelete(row) {
      electricDel({'ell_type':row.cell_type}).then(response => {
        debugger
        this.electritList = response.data.electritList
      
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
         this.getElectricList()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },



  }
}
</script>

