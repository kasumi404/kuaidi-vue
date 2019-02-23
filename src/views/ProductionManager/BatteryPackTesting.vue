<template>
  <div id="batteryPackTesting-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">电池包复测</div>
      <el-col :span="2"/>
      <el-col :span="20"><hr></el-col>
      <br>
      <div class="contenthead">
        <span>
          工单号：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in wordOrderID"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
        <span>
          生产批次：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in bantch"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
        <span>
          车次号：<el-select v-model="value" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in trainId"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </span>
      </div>
      <el-form ref="batteryPackTestingForm" :model="batteryPackTestingForm" :rules="rules" direction="horizontal" class="batteryPackTesting-form">
        <div class="Pin">PIN脚功能测试
          <el-checkbox :indeterminate="batteryPackTestingForm.indeterminate" v-model="batteryPackTestingForm.allChecked" @change="checkAll">全选</el-checkbox>
        </div>

        <el-checkbox-group v-model="batteryPackTestingForm.checkValue" class="PinInside" @change="setState">
          <el-checkbox v-for="(option,index) in battery-pack-testing-form-check-options" :label="option" :key="index" >{{ option }}</el-checkbox>
        </el-checkbox-group>

        <div class="TestingBox">
          <div v-for="(testingParameter,index) in batteryPackTestingForm.testingParameters" :key="index" class="TestingUnit">
            {{ testingParameter.label }}<br>
            <v-input v-model="testingParameter.data" :class="{'Unqualified': testingParameter.Unqualified}" type="text"/>
          </div>
        </div>
        <el-form-item :wrapper-col="wrapperColsubmit">
          <el-button type="primary" html-type="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatteryPackTesting',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      value: '',
      wordOrderID: [{// 工单号
        value: '1',
        label: 'lady'
      }],
      bantch: [{// 生产批次
        value: '1',
        label: 'lady'
      }],
      trainId: [{// 车次号
        value: '1',
        label: 'lady'
      }],
      batteryPackTestingForm: {
        indeterminate: true,
        allChecked: false,
        checkValue: ['交流充电桩充电导引电路C11C信号', '交流充电桩充电导引电路C2C信号'], // 多选模块选择
        checkOptions: [// 多选模块数据
          '交流充电桩充电导引电路C11C信号',
          '交流充电桩充电导引电路C2C信号',
          '交流充电桩充电导引电路C3C信号',
          '交流充电桩充电导引电路C4C信号',
          '交流充电桩充电导引电路C5C信号',
          '交流充电桩充电导引电路C66C信号',
          '交流充电桩充电导引电路C7C信号'
        ],
        testingParameters: [// 测试模块数据
          { label: 'BMS版本', data: '1', Unqualified: false, name: '' },
          { label: '加热电流(A)', data: '2', Unqualified: false, name: '' },
          { label: '电池包总压(V)', data: '3', Unqualified: false, name: '' },
          { label: '电池包总内阻(Ω)', data: '4', Unqualified: false, name: '' },
          { label: '电池包总内阻(Ω)', data: '5', Unqualified: false, name: '' },
          { label: '加热膜内阻(Ω)', data: '6', Unqualified: false, name: '' },
          { label: '模块压差(V)', data: '7', Unqualified: false, name: '' },
          { label: '模块温差(°C)', data: '8', Unqualified: false, name: '' },
          { label: '耐高压-箱体-总正(mA)', data: '9', Unqualified: false, name: '' },
          { label: '耐高压-箱体-总负(mA)', data: '10', Unqualified: false, name: '' },
          { label: '耐高压-箱体-PTC负(mA)', data: '11', Unqualified: false, name: '' },
          { label: '绝缘-箱体-总正(MΩ)', data: '12', Unqualified: false, name: '' },
          { label: '绝缘-箱体-总正(MΩ)', data: '13', Unqualified: false, name: '' },
          { label: '绝缘-箱体-总负(MΩ)', data: '14', Unqualified: false, name: '' },
          { label: '绝缘-箱体-PTC负(MΩ)', data: '15', Unqualified: false, name: '' },
          { label: '总串数(个)', data: '16', Unqualified: false, name: '' },
          { label: '温感数量(个)', data: '17', Unqualified: false, name: '' }
        ],
        text: '1'
      },

      wrapperColsubmit: {
        span: 11
      },
      rules: {
        //     ProductionTypeID: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],ProductionTypeName: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],ProductionTypeSize: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],supAttribute: [
        //     { required: true,
        //       validator: validatetext,
        //       trigger: 'blur'
        //     },
        //     { min: 0, max: 20,  message: '请输入长度小于20位的字符', }
        //   ],
      },
      loading: false,
      redirect: undefined
    }
  },

  watch: {
    'batteryPackTestingForm.testingParameters': {
      handler(newValue, oldValue) {
        console.log('111')
        for (let i = 0; i < newValue.length; i++) {
          if (parseInt(newValue[i].data) > 10) {
            newValue[i].Unqualified = true
          } else {
            newValue[i].Unqualified = false
          }
        }
      },
      deep: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    isUnqualified: function(key) {
    },
    checkAll(val) {
      this.batteryPackTestingForm.checkValue = val ? this.batteryPackTestingForm.checkOptions : []
      this.batteryPackTestingForm.indeterminate = false
    },
    setState(value) {
      const checkedCount = value.length
      this.batteryPackTestingForm.allChecked = checkedCount === this.batteryPackTestingForm.checkOptions.length
      this.batteryPackTestingForm.indeterminate = checkedCount > 0 && checkedCount < this.batteryPackTestingForm.checkOptions.length
    }

  }
}
</script>
<style scoped>
span{
  margin: 20px;
}
hr{
  background-color: #C0C0C0;
  height: 1px;
  border: none;
}
.explaintitle{
  border-left: 5px solid green;
  margin: 10px 10px 10px 8%;
  padding-left: 5px;
  font: 25px bold;
  text-align:left;
}
.Pin{
  margin: 10px 10px 10px 8%;
  padding-left: 5px;
  font: 15px bold;
  text-align:left;
}
.PinInside{
  margin: 2% 8% 2% 8%;
  text-align:left;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.TestingBox{
  margin: 10px 10px 10px 8%;
  padding: 5px;
  text-align:left;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr ;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.TestingUnit{
  margin: 10px 10px 10px 8%;
  padding: 5px;
  text-align:left;
  width: 70%;
}
.contenthead {
  margin:2% 9% 3% 9%;
  text-align: left;
}
</style>
<style>
.Unqualified  .el-input__inner{
  background-color: red;
  border-color: red;
}
</style>
