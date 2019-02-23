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
         <el-select v-model="listQuery.status" :placeholder="$t('table.doing')" clearable style="width:120px" class="filter-item">
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
      <el-table-column type="expand">
         <template slot-scope="scope">  <!--以下内容有改动过-->
         <div v-for=" (b,index) in scope.row.stationinfo" :key="index">
           <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="">
            <span> {{b.station_code}}</span>
          </el-form-item>
           <el-form-item label="">
            <span> {{b.station_name}}</span>
          </el-form-item>
          <el-form-item label="">
            <span> {{b.is_enable}}</span>
          </el-form-item>
          <el-form-item label="">
            <span> {{b.station_order}}</span>           
          </el-form-item>
          <el-form-item label="">
            <span> {{b.station_ip}}</span>
          </el-form-item>
          <el-form-item label="">
            <span> {{b.remark}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="stationUpdate(scope.row)" >{{ $t('table.edit') }}</el-button>
            <el-button size="mini" type="danger" >{{ $t('table.delete') }}</el-button>
          </el-form-item>
           </el-form>
         </div>
        </template>
      </el-table-column>     <!--以上内容有改动过-->
      <el-table-column :label="$t('ProductionLineTable.linecode')" prop="line_code" sortable="custom" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.line_code }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ProductionLineTable.linename')" prop="line_name" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.line_name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ProductionLineTable.location')" prop="positon" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positon }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ProductionLineTable.is_enable')" width="80px" prop="is_enable" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.is_enable == 1">{{ $t('userTable.yes') }}</span>
          <span v-else-if="scope.row.is_enable == 0">{{ $t('userTable.no') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ProductionLineTable.updateuser')" width="120" prop="updateuser" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateuser }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ProductionLineTable.updatetime')" prop="updatetime" width="120px" align="center">
        <template slot-scope="scope">
        <!-- <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        <span>{{ scope.row.updatetime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('userTable.operation')" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="stationCreate(scope.row)">添加工位</el-button>
          <el-button type="primary" size="small"  @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="small " type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }}</el-button>
        </template>
      </el-table-column>
    
    </el-table>

    <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('ProductionLineTable.linename')" prop="line_name">
          <el-input v-model="temp.line_name" type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item :label="$t('ProductionLineTable.location')" prop="positon">
          <el-input  v-model="temp.positon" type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item :label="$t('ProductionLineTable.is_enable')" prop="is_enable">
          <el-radio v-model="temp.is_enable" label="1">{{ $t('ProductionLineTable.yes') }}</el-radio>
          <el-radio v-model="temp.is_enable" label="0">{{ $t('ProductionLineTable.no') }}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>


    <el-dialog :title="stationMap[dialogStation]" :visible.sync="dialogFormStation">
      <el-form ref="stationForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 500px; margin-left:50px;">
        <el-form-item label="工位编码：" prop="station_code">
          <el-input  v-model="temp.station_code" type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item label="工位名称：" prop="station_name">
          <el-input  v-model="temp.station_name"  type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item label="工位顺序号：" prop="station_order">
          <el-input  v-model="temp.station_order"  type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item label="是否有效：" prop="is_enable">
          <el-radio  v-model="temp.is_enable" label="1">{{ $t('ProductionLineTable.yes') }}</el-radio>
          <el-radio  v-model="temp.is_enable" label="0">{{ $t('ProductionLineTable.no') }}</el-radio>
        </el-form-item>
        <el-form-item label="工位IP地址：" prop="station_ip">
          <el-input   v-model="temp.station_ip" type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input  v-model="temp.remark"  type="type" :placeholder="$t('table.input')"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormStation = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary">{{ $t('table.confirm') }}</el-button>
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


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 85px;
    color: #99a9bf;
  }
  .demo-table-expand .el-fo
  
  rm-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 14%;
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
  fetchProductionLineList,
  fetchPv,
  createProductionLine,
  updateProductionLine
} from "@/api/operatorProductionLine";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

const calendarTypeOptions = [{ key: "CN", display_name: "China" }];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    var checkIP = (rule, value, callback) => {
    const phoneReg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
    if (!value) {
      return callback(new Error("IP不能为空"))
    }
    setTimeout(() => {
      if (!Number.isInteger(+value)) {
        
      } else {
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error("IP地址格式不正确"))
        }
      }
    }, 100)
  }

    return {
      tableKey: 0,
      date: "",
      list: [],
      TotalPages: 0,
      listLoading: true,
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        status: "全部"
      },
      status: [{ label: "全部", key: "2" },{ label: "有效", key: "1" }, { label: "无效", key: "0" }],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        is_enable: '1',
        line_code: "",
        line_name: "",
        positon: "",
        remark: "",
        updatetime: new Date(),
        updateuser: "",
        stationinfo: [
          {
            station_code: '',
            station_name: '',
            is_enable: '',
            station_order: '',
            station_ip: '',
            remark: ''
          }
        ]
      },
      dialogFormStation: false,
      dialogFormVisible: false,
      dialogStatus: "",
      dialogStation: "",
      textMap: {
        update: "编辑",
        create: "新建"
      },
      stationMap: {
        update: "编辑",
        create: "添加工位"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        line_code: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        updatetime: [
          { type: "date", required: true,  message: "内容不能为空",  trigger: "change" }
        ],
        line_name: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        positon: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        is_enable: [
          { required: true, message: '必须选择一个', trigger: 'change' }
        ],
        updateuser: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        station_code: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        station_name: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        station_order: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        station_ip: [
           { validator: checkIP, trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchProductionLineList(this.listQuery).then(response => {
        console.log(this.listQuery);
        console.log(response.data);
        this.list = response.data.list;
        this.TotalPages = response.data.recordCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 1 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.PageIndex = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        is_enable: '1',
        line_code: "",
        line_name: "",
        positon: "",
        remark: "",
        updatetime: new Date(),
        updateuser: "",
        stationinfo: [
          {
            station_code: '',
            station_name: '',
            is_enable: '',
            station_order: '',
            station_ip: '',
            remark: ''
          }
        ]
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      console.log('aaaa')
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.line_code = parseInt(Math.random() * 100); // mock a id
          console.log('ddd')
          createProductionLine(this.temp).then(() => {
            console.log('eee')
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
             console.log('FFF')
          });
          console.log('GGG')
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.updatetime = new Date(this.temp.updatetime);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        console.log(this.temp);
        if (valid) {
          console.log("AAA");
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateProductionLine(this.temp).then(() => {
             console.log("BBB");
            for (const v of this.list) {
              console.log("CCC");
              if (v.id === this.temp.id) {
                console.log("DDD");
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    stationCreate(row){
      this.dialogStation = "create";
      this.dialogFormStation = true;
      this.$nextTick(() => {
        this.$refs["stationForm"].clearValidate();
      });
    },
    stationUpdate(row){
      this.dialogStation = "update";
      this.dialogFormStation = true;
      this.$nextTick(() => {
        this.$refs["stationForm"].clearValidate();
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>s