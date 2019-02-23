<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('materialTable.query')" style="width:340px;" prefix-icon="el-icon-document" v-model="listQuery.queries"/>
      </div>
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.status') }}：</label>
        <el-select v-model="listQuery.status" :placeholder="$t('table.doing')" clearable style="width: 150px" class="filter-item">
          <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.key"/>
        </el-select>
      </div>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table v-loading="listLoading" :key="tableKey" :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">      <!--查询-->
      <el-table-column :label="$t('materialTable.material_code')" prop="material_code" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.material_code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.material_name')" prop="material_name" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.material_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.material_spec')" prop="material_spec" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.material_spec }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.secondary_attr')" width="150" prop="secondary_attr" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.secondary_attr }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.unit')" width="150" prop="unit" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.is_enable')" width="150px" prop="is_enable" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_enable }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.filepath')" width="150" prop="filepath" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.filepath }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('materialTable.updatetime')" prop="updatetime" width="150px" align="center">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      
      <el-table-column :label="$t('materialTable.operation')" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>

       <el-popover placement="top" width="160" :ref="popover3"  v-model="scope.row.deleted">
              <p>确定删除该数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" @click="scope.row.deleted=false">取消</el-button>
                <el-button type="danger" size="mini" @click="scope.row.deleted=false;handleDelete(scope.row)">确定</el-button>
              </div>
               <el-button size="mini" type="danger" slot="reference">{{ $t('table.delete') }}</el-button>           </el-popover>
         <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>-->
        </template>
        
      </el-table-column>
    </el-table>

    <!--新建更新-->
    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item label="物料号：" prop="material_code">
          <el-input v-model="temp.material_code" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        <el-form-item label="物料名称：" prop="material_name">
          <el-input v-model="temp.material_name" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        <el-form-item label="规格型号：" prop="material_spec">
          <el-input v-model="temp.material_spec" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>

        <el-form-item label="物料辅助属性：" prop="secondary_attr">
          <el-input v-model="temp.secondary_attr" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        
        <el-form-item label="计量单位：" prop="unit">
          <el-input v-model="temp.updateuser" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="图片名称：" prop="filepath">
          <!-- action处填写上传地址 -->
          <el-upload action="" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"><i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible"><img width="100%" :src="dialogImageUrl" alt=""></el-dialog>
        </el-form-item>
        <el-form-item label="状态" prop="is_enable">
          <el-radio v-model="radio2" label="1">{{ $t('materialTable.yes') }}</el-radio>
          <el-radio v-model="radio2" label="0">{{ $t('materialTable.no') }}</el-radio>
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
<style scorp>

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

margin-bottom:15px;
}
.el-form-item .el-form-item__error {
padding-top: 1px;
margin-top: -10px;
}
</style>
<script>
import {
  fetchList, fetchPv, createMater, updateMater,deleteMater,ContentfetchList } from '@/api/operatorMaterialInfo'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' }]

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
      dialogImageUrl: '',
      dialogVisible: false,
      radio2:'1',
      tableKey: 0,
      date: '',
      list: null,
      TotalPages: 0,
      listLoading: true,
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        status: '全部',
        queries: '',
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
        material_code: '',
        material_name: '',
        material_spec: '',
        secondary_attr: '',
        unit: '',
        updatetime: new Date(),
        filepath: '',
        updateuser:''
      
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
        /* type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ],
        material_code:[
               { required: true, message: '请输入物料编码！', trigger: 'blur' }

            ],*/

        material_name: [
          { required: true, message: '请输入物料名称！', trigger: 'blur' },
          
        ],
        material_spec: [
          { required: true, message: '请输入规格型号!', trigger: 'blur' },
         
        ],
        secondary_attr: [
          { required: true, message: '请输入物料辅助属性!', trigger: 'blur' }

        ],
        unit: [
          { required: true, message: '请输入计量单位!', trigger: 'blur' }

        ],
        filepath: [
          { required: true, message: '请上传图片!', trigger: 'blur' }

        ],
        material_code: [
          { required: true, message: '请输入物料号！', trigger: 'blur' }

        ]
      },
      downloadLoading: false,
       popodialog: false,
      popover3: "popover3",
       deleteData: {
        material_code: -1
      }
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取后台数据
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.TotalPages = response.data.recordCount;
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleFilter(queries,status) {
      this.listQuery.PageIndex = 1
      this.getList()
      // if(queries === '' && status.key === -1){
      //   this.listQuery.PageIndex = 1
      //   this.getList()
      // }
      // else{
      //   if (status.key === -1) {
      //     this.listQuery. === queries
      //   }
      // }
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
        material_code: 0,
        material_name: '',
        material_spec: '',
        secondary_attr: '',
        unit: '',
        updatetime: new Date(),
        filepath: '',
        updateuser:''
       
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

    // 新建物料
    createData() {
      //console.log('AAA')
      this.$refs['dataForm'].validate(valid => {
      //  console.log('BBB')
        if (valid) { // userid
        //  console.log('CCC')
          this.temp.material_code = parseInt(Math.random() * 100)// mock a id
          createMater(this.temp).then(() => {
          ///  console.log('DDD')
            debugger
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)// copy obj
      this.temp.updatetime = new Date(this.temp.updatetime)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },   
    //更新
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updatetime = +new Date(tempData.updatetime) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // console.log(this.temp);
          updateMater(this.temp).then(() => {
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

       //删除
    handleDelete(row) {
    this.deleteData.material_code = row.material_code;
      console.log(this.deleteData);
      deleteMater(this.deleteData).then(() => {
         this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
        });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
      });
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
        const tHeader = ['updatetime', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'updatetime',
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
          if (j === 'updatetime') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    //图片上传函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
