<template>
  <div id="newElectricTestingSpec-container">
    <div class="form-container">
      <el-row>
        <el-col span="8">
          <h2 class="title">新建气密性检测规格</h2>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <el-card style="width:33%">
        <el-form ref="newBarcodeForm" :model="newBarcodeForm" :rules="rules" label-width="110px" class="demo-newBarcodeForm">

          <el-form-item label="产品编码：" prop="ProductCode">
            <el-autocomplete v-model="ruleForm.ProductCode" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>

          <el-form-item label="泄露值（△Pa）：≤" prop="CatOut">
            <el-input-number v-model="ruleForm.CatOut" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>

          <el-form-item label="重量（kG）：≤" prop="weight">
            <el-input-number v-model="ruleForm.weight" :min="1" :max="10" label="描述文字" @change="handleChange"/>
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
      ruleForm: {
        ProductCode: '', // 产品编码
        CatOut: '1', // 泄露值
        weight: '1'// 重量
      },
      rules: {
        // 产品编号
        ProductCode: [
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 电压上下限偏差
        CatOut: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 内阻上下限偏差
        weight: [{ required: true, message: '请输入数量', trigger: 'blur' }]
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
  created() {},
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' }

      ]
    },
    handleSelect(item) {
      console.log(item)
    },
    handleChange(value) {
      console.log(value)
    }
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
