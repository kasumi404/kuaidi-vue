<template>
  <div id="newProductionType-container">
    <div class="form-container">
      <br>
      <br>
      <div class="explaintitle">新建产品类型</div>
      <v-col span="2"/>
      <v-col span="15"><hr></v-col>
      <v-col span="5"/>
            </v-row>
            </v-row>
      <br>
      <v-form ref="newProductionTypeForm" :model="newProductionTypeForm" :rules="rules" direction="horizontal" class="newProductionType-form">
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="产品编号">
          <v-input v-model="newProductionTypeForm.productionTypeID" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="产品名称">
          <v-input v-model="newProductionTypeForm.productionTypeName" type="text" placeholder="请输入"/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="物料清单编号">
          <v-select :filter="filter" v-model="newProductionTypeForm.materialListId" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="工艺流程">
          <v-select :filter="filter" v-model="newProductionTypeForm.process" search/>
        </v-form-item>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="客户名称">
          <v-select :filter="filter" v-model="newProductionTypeForm.customerName" search/>
        </v-form-item>
        <v-row type="flex" justify="start">
          <v-col span="3"/>
          <v-col span="4">
            <v-form-item :label-col="labelCol2" :wrapper-col="wrapperCol2" label="电池包内模组数量">
              <v-input-number :min="1" v-model="newProductionTypeForm.moduleCount" :max="100000" size="large" @change=""/>
            </v-form-item>
          </v-col>
          <v-col span="4">
            <v-form-item :label-col="labelCol2" :wrapper-col="wrapperCol2" label="模块内电芯数量">
              <v-input-number :min="1" v-model="newProductionTypeForm.electricCount" :max="100000" size="large" @change=""/>
            </v-form-item>
          </v-col>
        </v-row>
        <v-row type="flex" justify="start">
          <v-col span="3"/>
          <v-col span="4">
            <v-form-item :label-col="labelCol2" :wrapper-col="wrapperCol2" label="模组内串联数量">
              <v-input-number :min="1" v-model="newProductionTypeForm.seriesCount" :max="100000" size="large" @change=""/>
            </v-form-item>
          </v-col>
          <v-col span="4">
            <v-form-item :label-col="labelCol2" :wrapper-col="wrapperCol2" label="模组内并联数量">
              <v-input-number :min="1" v-model="newProductionTypeForm.parallelCount" :max="100000" size="large" @change=""/>
            </v-form-item>
          </v-col>
        </v-row>
        <v-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="描述">
          <v-input :autosize="{ minRows: 3, maxRows: 5}" v-model="newProductionTypeForm.describe" type="textarea" placeholder="请输入备注"/>
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
  name: 'NewProductionType',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      newProductionTypeForm: {
        productionTypeID: '', // 产品编号
        productionTypeName: '', // 产品名称
        materialListId: '', // 物料清单编号
        describe: '', // 描述
        seriesCount: '1', // 串联包内模组数量
        electricCount: '1', // 模块内电芯数量
        parallelCount: '1', // 并联包内模组数量
        moduleCount: '1', // 电池包内模组数量
        process: '', // 工艺流程
        customerName: '' // 客户名称

      },
      Remake: '',

      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 7
      },
      labelCol2: {
        span: 16
      },
      wrapperCol2: {
        span: 4
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
