<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display:inline-block;">
        <!-- $t is vue-i18n global function to translate lang -->
        <label class="radio-label" style="padding-left:0;font-size:14px;">{{ $t('table.querycontent') }}：</label>
        <el-input :placeholder="$t('userTable.query')" style="width:340px;" prefix-icon="el-icon-document"/>
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">{{ $t('table.reset') }}</el-button>
      <div style="margin:15px">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="childAddEletcric">{{ $t('prosingletypeTable.neweletype') }}</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="childAddModule">{{ $t('prosingletypeTable.newmoduletype') }}</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="childAddPack">{{ $t('prosingletypeTable.newbatterytype') }}</el-button>
      </div>
    </div>
    <div class="tab-container">

      <el-tabs v-model="activeName" style="margin-top:15px;" @tab-click="handleClick">
        <el-tab-pane label="电芯单体" name="directly">
          <el-tab1  ref="headeAddEle"  />
        </el-tab-pane>
        <el-tab-pane label="模块" name="v-directly" >
          <el-tab2  ref="headeAddMod"  />
        </el-tab-pane>
        <el-tab-pane label="电池包" name="d-directly">
          <el-tab3  />
        </el-tab-pane>
      </el-tabs>
    <creat-dialog ref="headeAdd" :temp="temp"></creat-dialog>
    </div>

 
  </div>
</template>
<style>
.sizeborder{
  border:1px solid #dcdfe6;
  border-radius:4px;
  height: 36px;
  width:80px;
  padding-left:10px;
}
.sizeborder:focus{
  border-color:#409EFF;
  outline: 0;
  border:1px solid #409EFF;
}
.el-input--medium .el-input__inner{
  width:315px;
}
</style>
<script>
import ElTab1 from './components/productTypeTab1'
import ElTab2 from './components/productTypeTab2'
import ElTab3 from './components/productTypeTab3'
import CreatDialog from './components/productTypeTabDialog'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'

// const calendarTypeOptions = [
//   { key: 'CN', display_name: 'China' }

// ]

// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'EletcricTable',
  components: { ElTab1, ElTab2, ElTab3,CreatDialog },
  directives: { waves },
  data() {
    return {
      activeName: 'directly',
      createdTimes: 0,
      tableKey: 0,
      date: '',
      packList: [],
      TotalPages: 0,
      listLoading: true,
      tab_index:0,
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      },
      // calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],

      showReviewer: false,
       temp: {
        cell_type: 0,
        spec_type: '',
        shape_code: '',
        shape_name: '',
        thickness: '',
        width: '',
        height: '',
        address_code: '',
        address_name: '',
        cathode_code: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      },
 
      moduleTemp: {
        module_type: '',
        spec_type: '',
        cell_type: '',
        cell_count: '',
        parallel_count: '',
        series_count: '',
        thickness: '',
        width: '',
        height: '',
        rated_capacity: '',
        nominal_voltage: '',
        rated_quality: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      },

      packTemp: {
        pack_type: '',
        module_type: '',
        spec_type: '',
        is_heating: '',
        module_count: '',
        vehiclemodel_num: '',
        vehiclemodel_name: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      },
      EleTextMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },

  methods: {

    handleFilter() {
      this.listQuery.PageIndex = 1
      this.$refs.headeAddEle.getElectricList()
    },
    //弹出
    childAddEletcric(){
      this.$refs.headeAdd.headAddEletcric();
    },

    childAddModule(){
      this.tab_index == 1;
      this.$refs.headeAdd.headAddModule();
    },
          //弹出
    childAddPack(){
      this.$refs.headeAdd.headAddPack();
    },
  //   triggerBrotherUpdateEle() {
  //  // 父组件通过$ref调用子组件1中的事件方法
  //     debugger
  //   this.$refs.headeAdd.handleUpdateEle(tablecontent)

  //  },
   handleClick(tab){
     
   },

    // 添加/更新-单体电芯参数变化
    resetTemp() {
      this.temp = {
        cell_type: 0,
        spec_type: '',
        shape_code: '',
        shape_name: '',
        thickness: '',
        width: '',
        height: '',
        address_code: '',
        address_name: '',
        cathode_code: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      }
    },
    resetModuleTemp() {
      this.moduleTemp = {
        module_type: 0,
        spec_type: '',
        cell_type: '',
        cell_count: '',
        parallel_count: '',
        series_count: '',
        thickness: '',
        width: '',
        height: '',
        rated_capacity: '',
        nominal_voltage: '',
        rated_quality: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      }
    },
    resetPackTemp() {
      this.packTemp = {
        pack_type: 0,
        module_type: '',
        spec_type: '',
        is_heating: '',
        module_count: '',
        vehiclemodel_num: '',
        vehiclemodel_name: '',
        remark: '',
        updatetime: new Date(),
        updateuser: ''
      }
    },
    // 弹出 新建框 -单体电芯
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['EleDataForm'].clearValidate()
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
