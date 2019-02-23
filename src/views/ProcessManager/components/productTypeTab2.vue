<template>
<div>
  <el-table :data="moduleList" border fit highlight-current-row >
    <el-table-column label="模块类型" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.module_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="单体电芯类型" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.cell_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="规格代码" align="center" >
      <template slot-scope="scope">
       <span>{{ scope.row.spec_type }}</span>
      </template>
    </el-table-column>

    <el-table-column label="模块所含单体个数" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.cell_count }}</span>
      </template>
    </el-table-column>

    <el-table-column label="单体并串联方式">
      <template slot-scope="scope">
        <span>{{ scope.row.parallel_count }} 并 {{ scope.row.series_count }} 串 </span>
      </template>
    </el-table-column>
    <el-table-column label="尺寸(mm)" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.thickness }}*{{ scope.row.width }}*{{ scope.row.height }}</span>
      </template>
    </el-table-column>
    <el-table-column label="额定容量(Ah)" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.rated_capacity }}</span>
      </template>
    </el-table-column>
    <el-table-column label="标称电压(V)" align="center" >
      <template slot-scope="scope">
       <span>{{ scope.row.nominal_voltage }}</span>
      </template>
    </el-table-column>
    <el-table-column label="额定质量(kg)" align="center" >
      <template slot-scope="scope">
        <span>{{ scope.row.rated_quality }}</span>
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
       <el-button size="mini" type="danger" @click="handleModuleDel(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
   <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getModuleList" />
   <creat-dialog ref="tab2headeAdd" @refreshListTab2="reFreshTab2" :tablecontent="tablecontent" ></creat-dialog>
</div>
</template>

<script>
import {
moduleList, 
addModuleList,
updateModuleList,
moduleDel 
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
      moduleList: [],
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
    this.getModuleList()
  },
  methods: {
   clickParent(abc) {
   // 父组件通过$ref调用子组件1中的事件方法
      debugger
    this.tablecontent = abc
    this.$refs.tab2headeAdd.handleUpadteModule(abc)

   }, 
    reFreshTab2(){
      this.getModuleList()
   },
    getModuleList() {
      this.loading = true
      this.$emit('create') // for test
      moduleList(this.listQuery).then(response => {
        if(response.data.list.length>0){
            this.moduleList = response.data.list
        this.TotalPages = response.data.recordCount
        console.log(this.moduleList)
        }
        this.loading = false
      })
    },

    // 点击 删除 - 模块
    handleModuleDel(row) {
      moduleDel({'module_type':row.module_type}).then(response => {
        this.moduleList = response.data.List
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
      this.getModuleList()
    }
  }
}
</script>

