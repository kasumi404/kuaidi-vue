<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('prodprocTable.query')" style="width:340px;" prefix-icon="el-icon-document"/>
      </div>
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.status') }}：</label>
        <el-select v-model="listQuery.status" :placeholder="$t('table.doing')" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>
      </div>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">

      <!-- 循环加载 -->
      <el-table-column v-for="(label,index) in labels" :key="index" :label=label.label :prop=label.prop  width="80p" align="center"></el-table-column>
      

      <el-table-column :label="$t('prodprocTable.operation')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button> -->
         <el-popover placement="top" width="160" :ref="popover3"  v-model="scope.row.deleted">
              <p>请问是否确定删除该条记录吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" @click="scope.row.deleted=false">取消</el-button>
                <el-button type="danger" size="mini" @click="scope.row.deleted=false;handleDelete(scope.row)">确定</el-button>
              </div>
               <el-button size="mini" type="danger" slot="reference">{{ $t('table.delete') }}</el-button>           </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-plantime="right" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="工单号：" prop="wordno">
          <el-input v-model="temp.wordno" :placeholder="$t('table.input')"></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="type">                       <!--改过-->
          <el-autocomplete class="inline-input"  v-model="temp.classes"  :placeholder="$t('table.input')" ></el-autocomplete>
        </el-form-item>
        <el-form-item label="状态：" prop="status">                                     <!--改过-->
          <el-select v-model="temp.status" placeholder="请选择"><el-option v-for="item in item" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
        </el-form-item>
        <el-form-item label="生产批次：" prop="prodbatchno">
          <el-input v-model="temp.prodbatchno" :placeholder="$t('table.input')"></el-input>
        </el-form-item>
        <el-form-item label="产品名称：" prop="productname">                                     <!--改过-->
          <el-select v-model="temp.productname" placeholder="请选择"><el-option v-for="item in item" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
        </el-form-item>
        <el-form-item label="数量："  prop="num" ><!--改过-->
          <el-input-number v-model="temp.num" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="计划时间：" prop="plantime">
          <el-date-picker type="date" placeholder="选择日期" v-model="temp.plantime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间：" prop="completedtime">
          <el-date-picker type="date" placeholder="选择日期" v-model="temp.completedtime" ></el-date-picker>
        </el-form-item>
        <el-form-item label="预计工时：" prop="estimatetime"><!--改过-->
          <el-input-number v-model="temp.estimatetime"  :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="订单号：" prop="OrderID">
          <el-input v-model="temp.OrderID"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：" prop="clientname">
          <el-input v-model="temp.clientname"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="$t('table.input')" v-model="temp.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style>
.el-form-item {
  margin-bottom: 15px;
}
.el-dialog__body {
  padding: 10px 20px;
}
.el-dialog__header {
  background: #f2f2f2;
  text-align: center;
}
.el-dialog {
  width: 40%;
}
.el-select {
    display: initial;
    plantime: relative;
}
.show-pwd{
  plantime: absolute;
  left: 255px;
}
</style>
<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from '@/api/article'
import { fetchRoleList } from '@/api/operatorRole'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [{ key: 'CN', display_name: 'China' }]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
       
    return {
        item:[],
      deleteitem: false,
      labels: [
        { label: "工单号", prop: "wordno" },
        { label: "分类", prop: "type" },
        { label: "状态", prop: "status" },
        { label: "生产批次", prop: "prodbatchno" },
        { label: "产品名称", prop: "productname" },
        { label: "数量", prop: "num" },
        { label: "车次号", prop: "carno" },
        { label: "计划时间", prop: "plantime" },
        { label: "完成时间", prop: "completedtime" },
        { label: "预计工间", prop: "estimatetime" },
        { label: "订单号", prop: "OrderID" },
        { label: "客户名称", prop: "clientname" },
        { label: "描述", prop: "description" }
      ],
      prodbatchnoType: 'prodbatchno',
      tableKey: 0,
      date: '',
      list: null,
      TotalPages: 0,
      listLoading: true,
      listQuery: {
        PageIndex: 1,
       PageSize: 10,
        status: '有效'
      },
      status: [{ label: '有效', key: '1' }, { label: '无效', key: '0' }],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        wordno: '',
        type: '',
        status: '',
        prodbatchno: '',
        productname: '',
        num: '',
        carno: '',
        plantime: '',
        completedtime: '',
        estimatetime: '',
        OrderID: '',
        clientname: '',
        description: ''
      },
      types: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        wordno: [
          { required: true, message: '请输入工单号！', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择分类！', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态！', trigger: 'blur' }
        ],
        prodbatchno: [
          { required: true, message: '请输入生产批次！', trigger: 'blur' }
        ],
        productname: [
          { required: true, message: '请输入产品名称！', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入数量！', trigger: 'blur' }
        ],
        plantime: [
          {
            type: 'date',
            required: true,
            message: '请选择计划时间！',
            trigger: 'change'
          }
        ],
        completedtime: [
          {
            type: 'date',
            required: true,
            message: '请选择完成时间！',
            trigger: 'change'
          }
        ],
        estimatetime: [
          { required: true, message: '请输入工时！', trigger: 'blur' }
        ],
        clientname: [
          { required: true, message: '请输入客户名称！', trigger: 'blur' }
        ],

        OrderID: [
          { required: true, message: '请输入订单号！', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getRoleList()
  },
  methods: {
    getList() {
      // 获取后台数据
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.TotalPages = response.data.recordCount
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getRoleList() {
      this.listLoading = true
      fetchRoleList({ PageSize: 100, PageIndex: 1 }).then(response => {
        console.log(response.data.List)
        this.types = response.data.List
        // this.TotalPages = response.data.RecordCount;
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        wordno: '',
        type: '',
        status: '',
        prodbatchno: '',
        productname: '',
        num: '',
        carno: '',
        plantime: '',
        completedtime: '',
        estimatetime: '',
        OrderID: '',
        clientname: '',
        description: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.wordno = parseInt(Math.random() * 100) // mock a id
          console.log(this.temp)
          createArticle(this.temp).then(() => {
            debugger
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            console.log(tempData)
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    showPwd() {
      if (this.prodbatchnoType === 'prodbatchno') {
        this.prodbatchnoType = ''
      } else {
        this.prodbatchnoType = 'prodbatchno'
      }
    }
  }
}
</script>