<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('customerTable.query')" style="width:340px;" prefix-icon="el-icon-document"/>
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
      <el-table-column :label="$t('customerTable.customer_code')" prop="jobnumber" sortable="custom" align="center" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.customer_name')" width="90" prop="username" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.contact')" width="110px" prop="" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.contact_num')" width="110px" prop="telnumber" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contact_num }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.region ')" width="110px" prop="position" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.region }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.updateuser')" width="120px" prop="loginname" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.remark')" width="120px" prop="password" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.is_enable')" width="80px" prop="is_enable" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_enable == 1">{{ $t('customerTable.yes') }}</span>
          <span v-else-if="scope.row.is_enable == 0">{{ $t('customerTable.no') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.updatetime')" prop="updatetime" width="100px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('customerTable.operation')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>

          <el-popover v-model="scope.row.deleted" :ref="popover3" placement="top" width="160">
            <p>确定要删除该客户信息的数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleted=false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(scope.row,'deleted')">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">{{ $t('table.delete') }}</el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item label="客户名称：" prop="customer_name">
          <el-input v-model="temp.customer_name" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="联系人：" prop="contact">
          <el-input v-model="temp.contact" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contact_num">
          <el-input v-model="temp.contact_num" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="所在区域：" prop="region">
          <el-input v-model="temp.region" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input v-model="temp.remark" :rows="4" :placeholder="$t('table.input')" type="textarea"/>
        </el-form-item>
        <!--
        <el-form-item :label="$t('customerTable.updatetime')" prop="updatetime">
            <el-date-picker v-model="temp.updatetime" :disabled="true"  type="datetime" :placeholder="$t('table.choosedate')"/>
        </el-form-item>
        -->
        <el-form-item label="是否有效：" prop="is_enable">

          <el-radio v-model="temp.is_enable" label="1">{{ $t('customerTable.yes') }}</el-radio>
          <el-radio v-model="temp.is_enable" label="0">{{ $t('customerTable.no') }}</el-radio>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <!--确认按钮按下，根据dialogStatus字符串的值是不是 create ，判断之前按钮点击的是新建还是修改 -->
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
<style scoped>

.el-dialog__body{
  padding:10px 20px;
}
.el-dialog__header{
  background: #f2f2f2;
  text-align: center;
}
.el-dialog{
  width:40%;
}
.el-form-item .el-input{
margin-bottom:10px;
}
.el-form-item .el-form-item__error {
padding-top: 1px;
margin-top: -8px;
}
</style>
<script>
import {
  fetchCustomerList,
  fetchPvCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '@/api/operatorCustomer'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' }

]

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
      popover3: 'popover3',
      radio2: '1',
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
      status: [
        { label: '全部', key: '-1' },
        { label: '有效', key: '1' },
        { label: '无效', key: '0' }
      ],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        customer_code: 0,
        customer_name: '',
        contact: '',
        contact_num: '',
        region: '',
        is_enable: '',
        remark: '',
        updatetime: new Date(),

        is_enable: ''
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
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        /* customer_code: [
          { required: true, message: '客户名称不能为空！！！！', trigger: 'blur' }
        ],*/
        customer_name: [
          { required: true, message: '客户名称不能为空！', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系人不能为空！', trigger: 'blur' }
        ],
        contact_num: [
          { required: true, message: '请输入电话号码！', trigger: 'blur' },
          { message: '长度必须为11位', length: 11, whitespace: true },
          { message: '请输入正确的手机号码', pattern: '^\\d{11}$' }
        ],
        region: [
          { required: true, message: '所在区域不能为空！', trigger: 'blur' }
        ],

        remark: [
          { required: true, message: '请写备注内容！', trigger: 'blur' }
        ],
        is_enable: [
          { required: true, message: '必须选择一个', trigger: 'change' }
        ]
      },
      deleteData: {
        material_batch_number: -1
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCustomerList(this.listQuery).then(response => {
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
      this.deleteData.customer_code = row.customer_code
      console.log('aaaa')
      deleteCustomer(this.deleteData).then(() => {
        console.log('bbb')
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
        customer_code: 0,
        customer_name: '',
        contact: '',
        contact_num: '',
        region: '',
        is_enable: '',
        remark: '',
        updatetime: new Date(),
        is_enable: ''
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
          this.temp.customer_code = parseInt(Math.random() * 100) // mock a id
          createCustomer(this.temp).then(() => {
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
      this.temp.updatetime = new Date(this.temp.updatetime)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
        //  const tempData = Object.assign({}, this.temp)
          //   tempData.updatetime = +new Date(tempData.updatetime) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateCustomer(this.temp).then(() => {
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
      fetchPvCustomer(pv).then(response => {
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
