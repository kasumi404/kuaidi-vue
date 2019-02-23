<template>
  <div id="newProcessData-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">添加流程数据</div>
      <v-col span="2"/>
      <v-col span="15"><hr></v-col>
      <v-col span="5"/>
            </v-row>
            </v-row>
      <br>
      <v-form ref="newProcessDataForm" :model="newProcessDataForm" :rules="rules" direction="horizontal" class="newProcessData-form">
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="选择工艺路线">
          <v-select :filter="filter" v-model="newProcessDataForm.processLine" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="工序编号">
          <v-input v-model="newProcessDataForm.processID" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="工序名称">
          <v-input v-model="newProcessDataForm.processName" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperColstate" label="加工顺序">
          <v-input-number :step="0.1" :max="100000" size="large" @change=""/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperColstate" label="最小等待时间(分钟)">
          <v-input-number :step="0.1" :max="100000" size="large" @change=""/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperColstate" label="最大等待时间(分钟)">
          <v-input-number :step="0.1" :max="100000" size="large" @change=""/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperColstate" label="最大返工次数">
          <v-input-number :step="0.1" :max="100000" size="large" @change=""/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="跳转工序标识">
          <v-select :filter="filter" v-model="newProcessDataForm.processLine" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="检验标识">
          <v-select :filter="filter" v-model="newProcessDataForm.processLine" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="是否外协">
          <v-select :filter="filter" v-model="newProcessDataForm.processLine" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="单位">
          <v-select :filter="filter" v-model="newProcessDataForm.processLine" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="描述">
          <v-input :autosize="{ minRows: 3, maxRows: 5}" v-model="newProcessDataForm.describe" type="textarea" placeholder="请输入备注"/>
        </v-form-item>
        <v-form-item :wrapper-col="wrapperColsubmit">
          <v-button type="primary" html-type="submit">提交</v-button>
        </v-form-item>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewProcessData',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      newProcessDataForm: {
        describe: '', // 描述
        productionID: '', // 产品编号
        productionName: '', // 产品名称
        voltageLimits: '1', // 电压上下限偏差
        resistanceLimits: '1', // 内阻上下限偏差
        electricCount: '1', // 取电芯样本数量
        computingMethod: '1'// 样本计算方法
      },
      Remake: '',

      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 7
      },
      wrapperColstate: {
        span: 1
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
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {

  }
}
</script>
<style scoped>
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
</style>
