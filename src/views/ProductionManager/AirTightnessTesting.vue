<template>
  <div id="oldTesting-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">气密测试</div>
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
      <el-form ref="oldTestingForm" :model="oldTestingForm" :rules="rules" direction="horizontal" class="oldTesting-form">

        <div class="TestingBox">
          <div v-for="(testingParameter,index) in oldTestingForm.testingParameters" :key="index" class="TestingUnit">
            {{ testingParameter.label }}<br>
            <el-input v-model="testingParameter.data" :class="{'Unqualified': testingParameter.Unqualified}" type="text"/>
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
  name: 'OldTesting',
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
      oldTestingForm: {
        testingParameters: [// 测试模块数据
          { label: '气密值△pa', data: '1', Unqualified: false, name: '' },
          { label: '重量(KG)', data: '2', Unqualified: false, name: '' }
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
    'oldTestingForm.testingParameters': {
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
    checkAll() {
      if (this.oldTestingForm.checkValue.length == this.oldTestingForm.options.length) {
        this.oldTestingForm.checkValue = []
        this.oldTestingForm.allChecked = false
        this.oldTestingForm.indeterminate = false
      } else {
        this.oldTestingForm.checkValue = JSON.parse(JSON.stringify(this.oldTestingForm.allCheckValue))
        this.oldTestingForm.allChecked = true
        this.oldTestingForm.indeterminate = false
      }
    },
    setState() {
      this.oldTestingForm.indeterminate = this.oldTestingForm.checkValue.length > 0 && this.oldTestingForm.checkValue.length < this.oldTestingForm.options.length
      this.oldTestingForm.allChecked = this.oldTestingForm.checkValue.length == this.oldTestingForm.options.length
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
.Unqualified{
  background-color: red;
  border-color: red;
}
</style>
