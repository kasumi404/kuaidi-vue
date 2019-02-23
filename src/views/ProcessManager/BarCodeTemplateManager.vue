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
      <el-table-column :label="$t('userTable.userid')" prop="userid" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.roleid')" prop="roleid" width="65" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.loginname')" prop="loginname" width="90" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginname }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.password')" width="100" prop="password" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.username')" width="90" prop="username" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.jobnumber')" width="110px" prop="jobnumber" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jobnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.stationcode')" width="110px" prop="stationcode" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stationcode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.position')" width="110px" prop="position" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.telnumber')" width="120px" prop="telnumber" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.telnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.email')" width="120px" prop="email" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.enable')" width="80px" prop="is_enable" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_enable == 1">{{ $t('userTable.yes') }}</span>
          <span v-else-if="scope.row.is_enable == 0">{{ $t('userTable.no') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.updatetime')" prop="updatetime" width="100px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.operation')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"> <!-- 已经被改-->
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" style="width:60%; margin-left:50px;">
        <el-form-item label="登陆名称：" prop="loginname">
          <el-input v-model="temp.loginname" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item :inline="true" label="登陆密码：" prop="password">
          <el-input
            :type="passwordType"
            v-model="temp.password"
            :placeholder="$t('userTable.password')"
            name="password"
            auto-complete="on"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />

        </span></el-form-item>

        <el-form-item label="姓名：" prop="username">
          <el-input v-model="temp.username" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="工号：" prop="jobnumber">
          <el-input v-model="temp.jobnumber" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="负责工位代码：" prop="stationcode">
          <el-input v-model="temp.stationcode" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="公司职位：" prop="position">
          <el-input v-model="temp.position" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="联系电话：" prop="telnumber">
          <el-input v-model="temp.telnumber" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="temp.email" :placeholder="$t('table.input')" type="email"/>
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
  position: relative;
}
.show-pwd {
  position: absolute;
  left: 280px;
}
.el-form-item .el-input {
  margin-bottom: 10px;
}
.el-form-item .el-form-item__error {
  padding-top: 1px;
  margin-top: -5px;
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

/*

*/

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
    // 自定义验证电话号码
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      passwordType: 'password',
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
        userid: 0,
        roleid: '',
        loginname: '',
        password: '',
        username: '',
        jobnumber: '',
        stationcode: '',
        position: '',
        telnumber: '',
        email: '',
        updatetime: new Date(),
        updateuser: ''
      },
      roleids: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        roleid: [
          { required: true, message: '请选择角色信息！', trigger: 'change' }
        ],
        loginname: [
          { required: true, message: '请输入登录名称！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码！', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户姓名！', trigger: 'blur' }
        ],
        jobnumber: [
          { required: true, message: '请输入工号信息！', trigger: 'blur' }
        ],
        stationcode: [
          { required: true, message: '请输入负责工位代码！', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入公司职位！', trigger: 'blur' }
        ],
        telnumber: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
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
          { required: true, message: '请输入操作员！', trigger: 'blur' }
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
        this.roleids = response.data.List
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
        userid: 0,
        roleid: '',
        loginname: '',
        password: '',
        username: '',
        jobnumber: '',
        stationcode: '',
        position: '',
        telnumber: '',
        email: '',
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
          this.temp.userid = parseInt(Math.random() * 100) // mock a id
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
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  }
}
</script>
