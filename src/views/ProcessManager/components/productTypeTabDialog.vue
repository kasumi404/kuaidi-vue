<template>
   <div>
        <!-- 新建电芯类型 -->
    <el-dialog :title="EleTextMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="EleDataForm" :rules="EleRules" :inline="true" :model="temp" label-position="left" label-width="150px" style="width: 500px; margin-left:10px;">
        <el-form-item label="单体电芯类型：" prop="cell_type">
          <el-input v-model="temp.cell_type" :placeholder="$t('table.input')" type="type" />
        </el-form-item>
        <el-form-item label="规格代码：" prop="spec_type">
          <el-input v-model="temp.spec_type" :placeholder="$t('table.input')" type="type" />
        </el-form-item>
        <el-form-item label="形状代码：" prop="shape_code">
           <el-select v-model="temp.shape_code" placeholder="请选择形状" clearable  class="filter-item">
               <el-option v-for="item in CellShapeList" :key="item.shape_code" :label="item.shape_code+' '+item.shape_name" :value="item.shape_code"/>
           </el-select>
          <!-- <el-input v-model="temp.shape_code" :placeholder="$t('table.input')" type="type"/> -->
        </el-form-item>
        <el-col>
          <el-form-item label="尺寸（厚*宽*高）：" prop="thickness" >
            <input v-model.number="temp.thickness" type="number" name="thickness" style="margin-right:10px;" class="sizeborder"> *
          </el-form-item>
          <el-form-item prop="width">
            <input v-model.number="temp.width" type="number" name="width" style="margin-left:10px;" class="sizeborder"> *
          </el-form-item>
          <el-form-item prop="height">
            <input v-model.number="temp.height" type="number" name="height" style="margin-left:10px;" class="sizeborder">
          </el-form-item>
        </el-col>
        <el-form-item label="生产地址：" prop="address_code">
          <el-select v-model="temp.address_code" placeholder="请选择地址" clearable  class="filter-item">
               <el-option v-for="item in AddressList" :key="item.address_code" :label="item.address_code+' '+item.address_name" :value="item.address_code"/>
           </el-select>
        </el-form-item>
        <el-form-item label="电池类型代码：" prop="cathode_code">
          <el-select v-model="temp.cathode_code" placeholder="请选择电池类型" clearable  class="filter-item">
               <el-option v-for="item in CathodeList" :key="item.cathode_code" :label="item.cathode_code+' '+item.cathode_name" :value="item.cathode_code"/>
           </el-select>
          <!-- <el-input v-model="temp.cathode_code" :placeholder="$t('table.input')" type="type"/> -->
        </el-form-item>
         <el-form-item label="备注" prop="remark">
          <el-input v-model="temp.remark" :placeholder="$t('table.input')" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createElectric():updateElectric()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新建模块类型 -->
    <el-dialog :title="EleTextMap[dialogStatus]" :visible.sync="dialogModuleVisible">
      <el-form ref="ModuleDataForm" :rules="ModuleRules" :inline="true" :model="moduleTemp" label-position="left" label-width="150px" style="width: 500px; margin-left:10px;">
        <el-form-item label="电池包类型:" prop="module_type">
          <el-input v-model="moduleTemp.module_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="规格代码：" prop="spec_type">
          <el-input v-model="moduleTemp.spec_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="单体电芯类型：" prop="cell_type">
          <el-input v-model="moduleTemp.cell_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-col>
          <el-form-item label="尺寸（厚*宽*高）：" prop="thickness" >
            <input v-model.number="moduleTemp.thickness" type="number" name="thickness" style="margin-right:10px;" class="sizeborder"> *
          </el-form-item>
          <el-form-item prop="width">
            <input v-model.number="moduleTemp.width" type="number" name="width" style="margin-left:10px;" class="sizeborder"> *
          </el-form-item>
          <el-form-item prop="height">
            <input v-model.number="moduleTemp.height" type="number" name="height" style="margin-left:10px;" class="sizeborder">
          </el-form-item>
        </el-col>
        <el-form-item label="模块所含单体个数：" prop="cell_count">
          <el-input v-model="moduleTemp.cell_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="单体串并联方式：" prop="parallel_count">
          <el-input v-model="moduleTemp.parallel_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="单体串并联方式：" prop="series_count">
          <el-input v-model="moduleTemp.series_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="额定容量(Ah)：" prop="rated_capacity">
          <el-input v-model="moduleTemp.rated_capacity" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="标称电压(V)：：" prop="nominal_voltage">
          <el-input v-model="moduleTemp.nominal_voltage" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="额定质量(kg)：" prop="rated_quality">
          <el-input v-model="moduleTemp.rated_quality" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="描述：" prop="remark">
          <el-input v-model="moduleTemp.remark" :placeholder="$t('table.input')" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogModuleVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createModule():updateModule()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新建模块类型 -->
    <el-dialog :title="EleTextMap[dialogStatus]" :visible.sync="dialogPackVisible">
      <el-form ref="PackDataForm" :rules="PackRules" :inline="true" :model="moduleTemp" label-position="left" label-width="150px" style="width: 500px; margin-left:10px;">
        <el-form-item label="电池包类型：：" prop="pack_type">
          <el-input v-model="moduleTemp.pack_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="规格代码：" prop="spec_type">
          <el-input v-model="moduleTemp.spec_type" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="模块所含单体个数：" prop="module_count">
          <el-input v-model="moduleTemp.module_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
          <el-form-item label="模块类型：" prop="parallel_count">
          <el-select v-model="temp.address_code" placeholder="请选择地址" clearable  class="filter-item">
               <!-- <el-option v-for="item in AddressList" :key="item.address_code" :label="item.address_code+' '+item.address_name" :value="item.address_code"/> -->
           </el-select> 
        </el-form-item>
        <!-- <el-form-item label="单体电芯类型：" prop="series_count">
          <el-input v-model="moduleTemp.series_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item> -->
        <!-- <el-form-item label="电池包所含模块个数：" prop="module_count">
          <el-input v-model="moduleTemp.module_count" :placeholder="$t('table.input')" type="type"/>
        </el-form-item> -->
        <el-form-item label="客户车型：" prop="vehiclemodel_code">
          <el-input v-model="moduleTemp.vehiclemodel_code" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
        <el-form-item label="客户车款序号：" prop="vehiclemodel_num">
          <el-input v-model="moduleTemp.vehiclemodel_num" :placeholder="$t('table.input')" type="type"/>
        </el-form-item>
         <el-form-item label="是否加热：" prop="is_heating">
           <el-select v-model="temp.address_code" placeholder="请选择地址" clearable  class="filter-item">
               <el-option v-for="item in isHeating" :key="item.is_heating" :label="item.name" :value="item.key"/>
           </el-select>
         </el-form-item> 
        <el-form-item label="描述：" prop="remark">
          <el-input v-model="moduleTemp.remark" :placeholder="$t('table.input')" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPackVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createModule():updateModule()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  
    </div>
</template>

<script>
import {
electricList,
addElectricList,
updateElectricList,
updateModuleList,
moduleList,
addModuleList,
packsList,
addPackList,
updatePackList
} from '@/api/operatoProductionType'
import {
getCathodeList,
getAddressList,
getCellShapeList
} from '@/api/operatoPublic'
export default {
  props: {
      tablecontent: Object,
      required: true
    },
  data() {
    return {
      electritList:[],
      moduleList: [],
      packList:[],
      CathodeList:[],
      AddressList:[],
      CellShapeList:[],
      createdTimes: 1,
      TotalPages:1,
      dialogStatus: '',
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      },
      EleTextMap: {
        update: '编辑',
        create: '新建'
      },
      loading: false,
      dialogModuleVisible: false,
      dialogFormVisible: false,
      dialogPackVisible:false,
       temp: {
        cell_type: '',
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
        module_type:'',
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
        pack_type:'',
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
      EleRules: {
        cell_type: [
          { required: true, message: '电芯类型为必填', trigger: 'blur' }
        ],
        spec_type: [
          { required: true, message: '规格代码为必填', trigger: 'blur' }
        ],
        shape_code: [
          { required: true, message: '形状代码为必填', trigger: 'blur' }
        ],
        thickness: [
          { required: true, message: '厚度为必填', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '宽度为必填', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '高度为必填', trigger: 'blur' }
        ],
        address_code: [
          { required: true, message: '生产地址为必填', trigger: 'blur' }
        ],
        cathode_code: [
          { required: true, message: '电芯类型代码为必填', trigger: 'blur' }
        ]
      },
      ModuleRules: {
        module_type: [
          { required: true, message: '模块类型为必填', trigger: 'blur' }
        ],
        spec_type: [
          { required: true, message: '规格代码为必填', trigger: 'blur' }
        ],
        cell_type: [
          { required: true, message: '单体电芯类型为必填', trigger: 'blur' }
        ],
        cell_count: [
          { required: true, message: '模块所含单体个数：', trigger: 'blur' }
        ],
        parallel_count: [
          { required: true, message: '单体并联个数', trigger: 'blur' }
        ],
        series_count: [
          { required: true, message: '单体串联个数', trigger: 'blur' }
        ],
        thickness: [
          { required: true, message: '厚度为必填', trigger: 'blur' }
        ],
        width: [
          { required: true, message: '宽度为必填', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '宽度为必填', trigger: 'blur' }
        ],
        rated_capacity: [
          { required: true, message: '额定容量(Ah)', trigger: 'blur' }
        ],
        nominal_voltage: [
          { required: true, message: '额定质量(kg)', trigger: 'blur' }
        ],
        rated_quality: [
          { required: true, message: '生产地址为必填', trigger: 'blur' }
        ]
      },  
       PackRules: {
        pack_type: [
          { required: true, message: '模块类型为必填', trigger: 'blur' }
        ],
        module_type: [
          { required: true, message: '规格代码为必填', trigger: 'blur' }
        ],
        spec_type: [
          { required: true, message: '单体电芯类型为必填', trigger: 'blur' }
        ],
        is_heating: [
          { required: true, message: '模块所含单体个数：', trigger: 'blur' }
        ],
        module_count: [
          { required: true, message: '单体并联个数', trigger: 'blur' }
        ],
        vehiclemodel_num: [
          { required: true, message: '单体串联个数', trigger: 'blur' }
        ],
        vehiclemodel_name: [
          { required: true, message: '厚度为必填', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '生产地址为必填', trigger: 'blur' }
        ]
      }, 
      isHeating:[
        { name: '是', key: 0 },
        { name: '否',key: 0 }
        ]
    }
  },
    created() {
    
      this.getElectricList()
      this.getModuleList()
      this.getPackList()
      this.getCathode()
      this.getAddress()
      this.getCellShape()
  },
  methods: {
      getElectricList() {
      this.loading = true
      
      this.$emit('create') // for test
      electricList(this.listQuery).then(response => {
        if(response.data.list.length>0){
            this.electritList = response.data.list
        this.TotalPages = response.data.recordCount
        console.log(this.electritList)
        }
        this.loading = false
      })
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
   // 新建 电芯类型
     // 新建 电芯类型
    headAddEletcric() {
     
      this.resetTemp()
      this.resetModuleTemp()
       this.resetPackTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['EleDataForm'].clearValidate()
      })
      
    },
    createElectric() {
      this.$refs['EleDataForm'].validate(valid => {
        if (valid) {
          this.temp.updateuser = 'admin'
          addElectricList(this.temp).then(() => {
            debugger
            this.electritList.unshift(this.temp)
            this.dialogFormVisible = false

            this.$emit('refreshListTab1') //刷新列表
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success',
              duration: 2000
            })
         
          })
        }
      })
    },
   // 弹出 编辑框 -单体电芯
    handleUpdateEle(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      debugger
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['EleDataForm'].clearValidate()
      })
    },

    updateElectric() {
      this.$refs['EleDataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateElectricList(tempData).then(() => {
            for (const v of this.electritList) {
              if (v.id === this.temp.id) {
                const index = this.electritList.indexOf(v)
                this.electritList.splice(index, 1, this.temp)
                break
              }
            }
           this.$emit('refreshListTab1') //刷新列表

            this.getElectricList()
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

    // 新建 模块
    headAddModule() {
     
      this.resetTemp()
      this.resetModuleTemp()
      this.resetPackTemp()
      this.dialogStatus = 'create'
      this.dialogModuleVisible = true
      this.$nextTick(() => {
        this.$refs['ModuleDataForm'].clearValidate()
      })
    },
    createModule() {
      this.$refs['ModuleDataForm'].validate(valid => {
        if (valid) {
          this.moduleTemp.updateuser = 'admin'
          addModuleList(this.moduleTemp).then(() => {
            this.moduleList.unshift(this.moduleTemp)
            this.dialogModuleVisible = false
             this.$emit('refreshListTab2') //刷新列表
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
      this.getModuleList()
    },

     // 弹出 编辑框 -模块
    handleUpadteModule(row) {
      this.moduleTemp = Object.assign({}, row) // copy obj
      this.moduleTemp.timestamp = new Date(this.moduleTemp.timestamp)
      this.dialogStatus = 'update'
      this.dialogModuleVisible = true
      this.$nextTick(() => {
        this.$refs['ModuleDataForm'].clearValidate()
      })
    },
   updateModule() {
      this.$refs['ModuleDataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.moduleTemp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateModuleList(tempData).then(() => {
            for (const v of this.moduleList) {
              if (v.id === this.moduleTemp.id) {
                const index = this.moduleList.indexOf(v)
                this.moduleList.splice(index, 1, this.moduleTemp)
                break
              }
            }
            this.$emit('refreshListTab3') //刷新列表
            this.dialogModuleVisible = false
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

     // 新建 电池包类型
    headAddPack() {
      this.resetTemp()
      this.resetModuleTemp()
      this.resetPackTemp()
      this.dialogStatus = 'create'
      this.dialogPackVisible = true
      this.$nextTick(() => {
        this.$refs['PackDataForm'].clearValidate()
      })
    },
    createBatteryPack() {
    
      this.$refs['PackDataForm'].validate(valid => {
        if (valid) {
          addPackList(this.packTemp).then(() => {
            debugger
            this.packList.unshift(this.packTemp)
            this.dialogPackVisible = false
              this.$emit('refreshListTab3') //刷新列表
            this.$notify({
              title: '成功',
              message: '新建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
        // 弹出 编辑框 -电池包
    handleUpadtePack(row) {
      this.packTemp = Object.assign({}, row) // copy obj
      this.packTemp.timestamp = new Date(this.packTemp.timestamp)
      this.dialogStatus = 'update'
      this.dialogModuleVisible = true
      this.$nextTick(() => {
        this.$refs['PackDataForm'].clearValidate()
      })
    },
   updatePack() {
      this.$refs['PackDataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.moduleTemp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updatePackList(tempData).then(() => {
            for (const v of this.packList) {
              if (v.id === this.packTemp.id) {
                const index = this.packList.indexOf(v)
                this.packList.splice(index, 1, this.packTemp)
                break
              }
            }
            this.$emit('refreshListTab2') //刷新列表
            this.dialogModuleVisible = false
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
    //获取电池类型-代码和名称
    getCathode(){ 
        getCathodeList().then(response => {
        if(response.data.length>0){
            this.CathodeList = response.data
           
        }
      })
    },
    //获取形状-代码和名称
    getCellShape(){ 
        getCellShapeList().then(response => {
        if(response.data.length>0){
            this.CellShapeList = response.data
           
        }
      })
    },
    //获取地址-代码和名称
    getAddress(){ 
        getAddressList().then(response => {
        if(response.data.length>0){
            this.AddressList = response.data
           
        }
      })
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
  }
}
</script>

