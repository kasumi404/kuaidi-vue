<template>
<div>
  <el-table :data="packList" border fit highlight-current-row >
    <el-table-column label="电池包类型" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.pack_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="模块类型" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.module_type }}</span>
      </template>
    </el-table-column>

    <!-- <el-table-column label="单体电芯类型" align="center" >
      <template slot-scope="scope">
       <span>{{ scope.row.spec_type }}</span>
      </template>
    </el-table-column> -->

    <el-table-column label="规格代码" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.spec_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="电池包所含模块个数">
      <template slot-scope="scope">
        <span>{{ scope.row.module_count }}  </span>
      </template>
    </el-table-column>
    <el-table-column label="客户车型代码" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.vehiclemodel_code }} {{ scope.vehiclemodel_num }} {{ scope.row.vehiclemodel_name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="是否加热" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.is_heating }}</span>
      </template>
    </el-table-column>
    <el-table-column label="描述" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.remark }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="180" >
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="clickParent(scope.row)">{{ $t('table.edit') }}</el-button>
       <el-button size="mini" type="danger" @click="handlePackeDel(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
   <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getPackList" />
   <creat-dialog ref="tab3headeAdd" @refreshListTab3="reFreshTab2" :tablecontent="tablecontent" ></creat-dialog>
</div>
</template>

<script>
import {
packsList, 
packDel 
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
      packList: [],
      tablecontent:{},
      createdTimes: 1,
      dialogStatus: '',
      TotalPages:0,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      EleTextMap: {
        update: '编辑',
        create: '新建'
      },
      loading: false,
      dialogModuleVisible: false,
    }
  },
    created() {
    this.getPackList()
  },
  methods: {
   clickParent(abc) {
   // 父组件通过$ref调用子组件1中的事件方法
      debugger
    this.tablecontent = abc
    this.$refs.tab3headeAdd.handleUpadteModule(abc)

   }, 
    reFreshTab2(){
      this.getPackList()
   },
   
    getPackList() {
      this.loading = true
      this.$emit('create') // for test
      packsList(this.listQuery).then(response => {
        if(response.data.list.length>0){
            this.packList = response.data.list
        this.TotalPages = response.data.recordCount
        console.log(this.packList)
        }
        this.loading = false
      })
    },

    // 点击 删除 - 模块
    handlePackeDel(row) {
      packDel({'module_type':row.module_type}).then(response => {
        this.packList = response.data.List
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
      this.getPackList()
    }
  }
}
</script>

