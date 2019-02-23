<template>
  <div id="newElectricTestingSpec-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">新建条码模板</div>
      <v-col span="2"/>
      <v-col span="15"><hr></v-col>
      <v-col span="5"/>
            </v-row>
            </v-row>
      <br>
      <v-form ref="newOldTestingSpecForm" :model="newOldTestingSpecForm" :rules="rules" direction="horizontal" class="newElectricTestingSpec-form">
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="模块编码">
          <v-select :filter="filter" v-model="newOldTestingSpecForm.test" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="厂商代码">
          <v-input v-model="newOldTestingSpecForm.test" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="产品类型代码">
          <v-input v-model="newOldTestingSpecForm.test" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="电池类型代码">
          <v-input v-model="newOldTestingSpecForm.test" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="规格代码">
          <v-input v-model="newOldTestingSpecForm.test" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="追溯信息码">
          <v-input v-model="newOldTestingSpecForm.test" type="text" placeholder="请输入"/>
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
  name: 'NewElectricTestingSpec',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      newOldTestingSpecForm: {
        test: '1'//
      },
      Remake: '',

      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 7
      },
      wrapperCol2: {
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

