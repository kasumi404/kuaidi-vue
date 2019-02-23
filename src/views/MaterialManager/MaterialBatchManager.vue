<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('userTable.query')" style="width:340px;" prefix-icon="el-icon-document"/>
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

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column :label="$t('MaterialBatchTable.material_batch_number')" prop="material_batch_number" sortable="custom" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.material_batch_number }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.material_code')" prop="material_code" width="65" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.material_code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.material_name')" prop="material_name" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.material_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.supplier_name')" prop="supplier_name" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.supplier_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.product_date')" width="130" prop="product_date" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.product_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.warehousing_date')" width="130" prop="warehousing_date" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.warehousing_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.quantity')" width="110px" prop="quantity" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.location')" width="110px" prop="location" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.location }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.purchase_type')" width="110px" prop="purchase_type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.purchase_type }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.updatetime')" prop="updatetime" width="130px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.updateuser')" width="110px" prop="updateuser" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MaterialBatchTable.operation')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button> -->
          <!-- <el-popover placement="top" width="160" :ref="'deletePop'+scope.row.material_batch_number" trigger="click"> -->
          <el-popover :ref="popover3" v-model="scope.row.deleted" placement="top" width="160">
            <p>请问是否确定删除该条记录吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" @click="scope.row.deleted=false">取消</el-button>
              <el-button type="danger" size="mini" @click="scope.row.deleted=false;handleDelete(scope.row)">确定</el-button>
            </div>
          <el-button slot="reference" size="mini" type="danger">{{ $t('table.delete') }}</el-button>           </el-popover>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="物料号：" prop="material_code">
          <el-input v-model="temp.material_code" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="物料名称：" prop="material_name">
          <el-input v-model="temp.material_name" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="供应商名称：" prop="supplier_name">
          <el-input v-model="temp.supplier_name" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="生产日期：" prop="product_date">
          <el-date-picker v-model="temp.product_date" :placeholder="$t('table.choosedate')" type="datetime"/>
        </el-form-item>
        <el-form-item label="入库日期：" prop="warehousing_date">
          <el-date-picker v-model="temp.warehousing_date" :placeholder="$t('table.choosedate')" type="datetime"/>
        </el-form-item>
        <el-form-item label="入库数量：" prop="quantity">
          <el-input v-model="temp.quantity" :placeholder="$t('table.input')" type="number"/>
        </el-form-item>
        <el-form-item label="存放数量：" prop="location">
          <el-input v-model="temp.location" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="采购方式：" prop="purchase_type">
          <el-input v-model="temp.purchase_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <!-- <el-form-item :label="$t('MaterialBatchTable.updatetime')" prop="updatetime">
            <el-date-picker v-model="temp.updatetime" type="datetime" :placeholder="$t('table.choosedate')"/>
        </el-form-item> -->
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

    <!-- <el-popover placement="top" width="160" v-model="visible2" ref="deletePop" trigger="click">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
              </div>
           </el-popover>
          <el-button size="mini" type="danger" slot="reference" v-popover:deletePop>{{ $t('table.delete') }}</el-button> -->
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
 .el-form-item .el-input{
  margin-bottom: 15px;
}
.el-form-item .el-form-item__error {
    padding-top: 1px;
    margin-top: -10px;
}
</style>
<script>
import {
  fetchMaterialBatchList,
  fetchPv,
  createMaterialBatch,
  updateMaterialBatch,
  deleteMaterialBatch
} from '@/api/operatorMaterialBatch'
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
      tableKey: 0,
      date: '',
      list: [],
      TotalPages: 0,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
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
        material_batch_number: 0,
        material_code: '',
        material_name: '',
        supplier_name: '',
        product_date: new Date(),
        warehousing_date: new Date(),
        quantity: 0,
        location: '',
        purchase_type: '',
        updatetime: new Date(),
        updateuser: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        material_batch_number: [
          { required: true, message: '请输入物料批次', trigger: 'blur' }
        ],
        material_code: [
          { required: true, message: '请输入物料编码！', trigger: 'blur' }
        ],
        material_name: [
          { required: true, message: '请输入物料名称！', trigger: 'blur' }
        ],
        supplier_name: [
          { required: true, message: '请输入供应商名称！', trigger: 'blur' }
        ],
        product_date: [
          {
            type: 'date',
            required: true,
            message: '请选择商品的生产日期！',
            trigger: 'change'
          }
        ],
        warehousing_date: [
          {
            type: 'date',
            required: true,
            message: '请选择入库时间！',
            trigger: 'change'
          }
        ],
        quantity: [
          {
            required: true,
            message: '请输入入库数量！',
            trigger: 'blur'
          }
        ],
        location: [
          { required: true, message: '请输入存放位置！', trigger: 'blur' }
        ],
        purchase_type: [
          { required: true, message: '请输入采购方式！', trigger: 'blur' }
        ],
        updatetime: [
          {
            type: 'date',
            required: true,
            message: '请选择更新时间！',
            trigger: 'change'
          }
        ],
        updateuser: [
          { required: true, message: '请输入操作员信息！', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      popodialog: false,
      popover3: 'popover3',
      deleteData: {
        material_batch_number: -1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMaterialBatchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.TotalPages = response.data.recordCount
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
        material_batch_number: 0,
        material_code: '',
        material_name: '',
        supplier_name: '',
        product_date: new Date(),
        warehousing_date: new Date(),
        quantity: '',
        location: '',
        purchase_type: '',
        updatetime: new Date(),
        updateuser: ''
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
          // this.temp.userid = parseInt(Math.random() * 100); // mock a id
          createMaterialBatch(this.temp).then(() => {
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
      this.temp.product_date = new Date(this.temp.product_date)
      this.temp.warehousing_date = new Date(this.temp.warehousing_date)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        console.log(this.temp)
        if (valid) {
          // const tempData = Object.assign({}, this.temp);
          // tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateMaterialBatch(this.temp).then(() => {
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
      // console.log(row.material_batch_number);
      this.deleteData.material_batch_number = row.material_batch_number
      console.log(this.deleteData)
      deleteMaterialBatch(this.deleteData).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      })
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
    }
  }
}
</script>
