<template>
  <div id="newBarcode-container">
    <div class="form-container">
      <el-row>
        <el-col span="8">
          <h2 class="title">新建条码模板</h2>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <el-card style="width:33%">
        <el-form ref="newBarcodeForm" :model="newBarcodeForm" :rules="rules" label-width="110px" class="demo-newBarcodeForm">

          <el-form-item label="模板名称：" prop="TemolateName">
            <el-input v-model="newBarcodeForm.TemolateName" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="厂商代码：" prop="vendorcode">
            <el-input v-model="newBarcodeForm.vendorcode" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="产品类型代码：" prop="ProductCodeType">
            <el-input v-model="newBarcodeForm.ProductCodeType" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="电池类型代码：" prop="BatteryTypeCode">
            <el-input v-model="newBarcodeForm.BatteryTypeCode" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="规格代码：" prop="Specifications">
            <el-input v-model="newBarcodeForm.Specifications" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item label="追溯信息码：" prop="Traceability">
            <el-input v-model="newBarcodeForm.Traceability" type="text" placeholder="请输入"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('newBarcodeForm')">立即创建</el-button>
            <el-button @click="resetForm('newBarcodeForm')">重置</el-button>
            <!-- <el-button @click="goback">返回</el-button> -->
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.el-select {
  display: inline;
  position: relative;
}
.el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: left;
}
.el-input {
  width: 100%;
}
.el-form-item {
  margin-bottom: 22px;
  text-align: left;
}
</style>

<script>
export default {
  name: 'NewBarcode',
  components: {},
  data() {
    var validatetext = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空!!'))
      }
    }
    return {
      state: '1',
      newBarcodeForm: {
        TemolateName: '', // 模板名称
        vendorcode: '', // 厂商代码
        ProductCodeType: '', // 产品类型代码
        BatteryTypeCode: '', // 电池类型代码
        Specifications: '', // 规格代码
        Traceability: '' // 追溯信息码
      },
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 7
      },
      wrapperColstate: {
        span: 4
      },
      wrapperColsubmit: {
        span: 11
      },
      rules: {
        TemolateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        vendorcode: [
          { required: true, message: '请输入厂商代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2到15 个字符', trigger: 'blur' }
        ],
        ProductCodeType: [
          { required: true, message: '请输入产品类型代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ],
        BatteryTypeCode: [
          { required: true, message: '请输入电池类型代码', trigger: 'blur' },
          { min: 4, max: 11, message: '长度在 4 到11 个字符', trigger: 'blur' }
        ],
        BatteryTypeCode: [
          { required: true, message: '请输入规格代码', trigger: 'blur' },
          { min: 4, max: 11, message: '长度在 4 到11 个字符', trigger: 'blur' }
        ],
        Traceability: [
          { required: true, message: '请输入追溯信息码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到15 个字符', trigger: 'blur' }
        ]
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
    // submitForm(formName) {
    //   console.log(this.newBarcodeForm);
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       var qs = require("qs");
    //       var instance = this.$axios.create({
    //         headers: { "content-type": "application/x-www-form-urlencoded" }
    //       });
    //       var params = {
    //         TemolateName: this.newBarcodeForm.TemolateName,
    //         vendorcode: this.newBarcodeForm.vendorcode,
    //         ProductCodeType: this.newBarcodeForm.ProductCodeType,
    //         BatteryTypeCode: this.newBarcodeForm.BatteryTypeCode,
    //         Specifications: this.newBarcodeForm.Specifications,
    //         is_enable: this.newBarcodeForm.is_enable,
    //         Traceability: this.newBarcodeForm.Traceability,
    //       };
    //       instance
    //         .post(
    //           "/apis/v1.0/Barcode/Postsystem_Barcode",
    //           qs.stringify(params)
    //         )
    //         .then(res => {
    //           if (res.status == 200) {
    //             console.log(res);
    //             if (res.data.ResultCode == "200") {
    //               alert("数据添加成功！");
    //             } else {
    //               alert("数据添加发生错误，请稍候再试！");
    //             }
    //           }
    //         });
    //     } else {
    //       console.log("rerror submit!!");
    //       alert("验证失败，请检查输入的数据！");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goback() {
      this.$router.replace('/BarcodeManager')
    }
  }
}
</script>
