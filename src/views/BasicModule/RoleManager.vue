<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('roleTable.query')" style="width:340px;" prefix-icon="el-icon-document"/>
      </div>
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <!-- <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.status') }}：</label>
         <el-select v-model="listQuery.status" :placeholder="$t('table.doing')" clearable style="width: 90px" class="filter-item">
         <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select> -->
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
      <el-table-column :label="$t('roleTable.roleid')" prop="aaa[0].buildarea" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.roleid }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('roleTable.rolename')" prop="rolename" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.rolename }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('roleTable.updatetime')" width="150" prop="updatetime" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('roleTable.updateuser')" prop="updateuser" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('roleTable.remark')" prop="remark" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('roleTable.opeartor')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-popover v-model="scope.row.deleted" :ref="popover3" placement="top" width="160">
            <p>确定要删除该角色信息的数据吗？？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleted=false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(scope.row,'deleted')">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">{{ $t('table.delete') }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :current-page.sync="listQuery.pageIndex" :page-size.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 8 0%; margin-left: 50px;">
        <!--
        <el-form-item :label="$t('roleTable.roleid')" prop="roleid">
          <el-input v-model="temp.roleid" :placeholder="$t('table.input')" type="type" :disabled="true"/>
        </el-form-item>
        -->

        <el-form-item label="角色名称：" prop="rolename">
          <el-input v-model="temp.rolename" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        <!--
        <el-form-item :label="$t('roleTable.updateuser')" prop="updateuser">
          <el-input v-model="temp.updateuser" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        -->

        <!-- <el-form-item :label="$t('roleTable.updatetime')" prop="updatetime">
            <el-date-picker v-model="temp.updatetime" type="datetime" :placeholder="$t('table.choosedate')"/>
        </el-form-item> -->

        <el-form-item label="备注：" prop="remark">
          <el-input v-model="temp.remark" :placeholder="$t('table.input')" type="text"/>
        </el-form-item>
           <el-form-item label="模块权限：">
           <template>
           <el-checkbox-group 
           v-model="checkItem"
            :min="0"
            :max="1">
            <el-checkbox v-for="item in chooseItem" :label="item.title" :key="item.key"  @change="getChange">{{item.title}}</el-checkbox>
          </el-checkbox-group>
            </template>
        </el-form-item>
        <div class="Tree" style="width:300px;height:200px;overflow: auto;">
           <el-tree
                style="padding-left:100px;"
                :data="data2"
              show-checkbox
             node-key="id"
           :default-expanded-keys="[1, 4]"
         :default-checked-keys="[4]"
        :props="defaultProps">
     </el-tree>
      </div>
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
  text-align: left;
}
.el-dialog__body {
  padding: 10px 20px;
}
.el-dialog__header {
  background: #f2f2f2;
  text-align: center;
}

.el-dialog {
  width: 35%;
  min-width: 300px;
}
/*
.el-form{
  min-width: 300px;
}
*/
  .el-form-item .el-input{
  margin-bottom: 15px;
}
.el-form-item .el-form-item__error {
    padding-top: 1px;
    margin-top: -5px;
}
.el-input {

    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 70%;

}
</style>
<style scoped>
.el-table__header {
  width: 100%;
}

</style>
<script>
import {
  fetchRoleList,
  fetchPv,
  createRole,
  updateRole,
  deleteRole
} from '@/api/operatorRole'
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
      checkItem:[],
      aaa:[{
        buildarea: "444",
        buildid: 4,
        buildlayer: "40",
        buildno: "4",
        buildtext: "4",
        buildtype: "4",
        bulidtime: null,
      }],
      chooseItem:[
        {
          title:"全选",
          key:0
        },
        {
          title:"反选",
          key:1
        }
      ],
     data2: [{
          id: 1,
          label: '基础数据管理',
          children: [{
            id: 4,
            label: '用户管理',
             children: [{
              id: 6,
              label: '添加'
            }, {
              id: 13,
              label: '编辑'
            }, {
              id: 17,
              label: '查看'
              }, {
              id: 16,
              label: '删除'
              }]
          },{
            id: 6,
            label:'角色管理', 
            children: [{
              id: 97,
              label: '添加'
            }, {
              id: 96,
              label: '编辑'
            }, {
              id: 95,
              label: '查看'
              }, {
              id: 94,
              label: '删除'
              }]
          },{
            id: 8,
            label:'产线设置', 
            children: [{
              id: 88,
              label: '添加'
            }, {
              id: 85,
              label: '编辑'
            }, {
              id: 84,
              label: '查看'
              }, {
              id: 83,
              label: '删除'
              }]
          },{
            id: 10,
            label:'客户信息管理', 
            children: [{
              id: 82,
              label: '添加'
            }, {
              id: 81,
              label: '编辑'
            }, {
              id: 80,
              label: '查看'
              }, {
              id: 29,
              label: '删除'
              }]
          }]
        }, {
          id: 2,
          label: '物料管理',
          children: [{
            id: 5,
            label: '物料信息管理',
              children: [{
              id: 28,
              label: '添加'
            }, {
              id: 27,
              label: '编辑'
            }, {
              id: 26,
              label: '查看'
              }, {
              id: 25,
              label: '删除'
              }]
          }, {
            id: 6,
            label: '物料批次管理',
            children: [{
              id: 24,
              label: '添加'
            }, {
              id: 23,
              label: '编辑'
            }, {
              id: 22,
              label: '查看'
              }, {
              id: 21,
              label: '删除'
              }]
          }]
        }, {
          id: 3,
          label: '工艺管理',
          children: [{
            id: 7,
            label: '产品类型管理',
            children: [{
              id: 62,
              label: '添加'
            }, {
              id: 63,
              label: '编辑'
            }, {
              id: 64,
              label: '查看'
              }, {
              id: 65,
              label: '删除'
              }]
          }, {
            id: 8,
            label: '工艺参数管理',
            children: [{
              id: 100,
              label: '添加'
            }, {
              id: 99,
              label: '编辑'
            }, {
              id: 89,
              label: '查看'
              }, {
              id: 69,
              label: '删除'
              }]
          },
          {
            id: 30,
            label: '工艺流程管理',
            children: [{
              id: 79,
              label: '添加'
            }, {
              id: 88,
              label: '编辑'
            }, {
              id: 77,
              label: '查看'
              }, {
              id: 66,
              label: '删除'
              }]
          },
           {
            id: 33,
            label: '条码模板管理',
            children: [{
              id: 36,
              label: '添加'
            }, {
              id: 70,
              label: '编辑'
            }, {
              id: 71,
              label: '查看'
              }, {
              id: 72,
              label: '删除'
              }]
          }]
        }, {
          id:40,
          label: '生产过程管理',
          children: [{
            id:41,
            label: '工单管理',
            children: [{
              id: 42,
              label: '添加'
            }, {
              id: 43,
              label: '编辑'
            }, {
              id: 44,
              label: '查看'
              }, {
              id: 45,
              label: '删除'
              }]
          }, {
            id: 46,
            label: '工序数据查询',
            children: [{
              id: 47,
              label: '添加'
            }, {
              id:48,
              label: '编辑'
            }, {
              id: 49,
              label: '查看'
              }, {
              id: 16,
              label: '删除'
              }]
          },
          {
            id: 35,
            label: '综合数据查询',
            children: [{
              id: 74,
              label: '添加'
            }, {
              id: 75,
              label: '编辑'
            }, {
              id: 76,
              label: '查看'
              }, {
              id: 73,
              label: '删除'
              }]
          }]
        },{
          id: 50,
          label: '报表中心',
          children: [{
            id: 51,
            label: '工单进度查询',
              children: [{
              id: 52,
              label: '添加'
            }, {
              id: 53,
              label: '编辑'
            }, {
              id: 54,
              label: '查看'
              }, {
              id: 55,
              label: '删除'
              }]
          },{
             id: 56,
            label: '出货记录查询',
              children: [{
              id: 57,
              label: '添加'
            }, {
              id: 58,
              label: '编辑'
            }, {
              id: 59,
              label: '查看'
              }, {
              id: 60,
              label: '删除'
              }]
          }]
          }],
          
          defaultProps: {
          children: 'children',
          label: 'label'
        },
       
      popover3: 'popover3',
      tableKey: 0,
      date: '',
      list: null,
      PageIndex: 1,
      PageSize: 10,
      TotalPages: 0,
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 10
        // status: "全部"
        
      },
      
      // status: [
      //   { label: "全部", key: "-1" },
      //   { label: "有效", key: "1" },
      //   { label: "无效", key: "0" }
      // ],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        roleid: 0,
        rolename: '',
        remark: '',
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
        rolename: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' }
        ],
        updatetime: [
          {
            type: 'date',
            required: true,
            message: '请选择更新日期！',
            trigger: 'change'
          }
        ],
        updateuser: [
          { required: true, message: '请输入操作员', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注信息！', trigger: 'blur' }
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
      fetchRoleList(this.listQuery).then(response => {
        console.log(response.data)
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
      this.deleteData.roleid = row.roleid
      deleteRole(this.deleteData).then(() => {
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
        roleid: '0',
        rolename: '',
        updatetime: new Date(),
        updateuser: '',
        remark: ''
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
          createRole(this.temp).then(() => {
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
      this.temp.updatetime = new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp);
          // console.log(tempData.updatetime);
          // tempData.updatetime = new Date(tempData.updatetime); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          console.log(this.temp)
          updateRole(this.temp).then(() => {
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
    getChange(event){
      console.log(event);
    }

  }
}
</script>
