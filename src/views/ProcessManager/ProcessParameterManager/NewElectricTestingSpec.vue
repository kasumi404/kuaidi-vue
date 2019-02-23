<template>
  <div id="newElectricTestingSpec-container">
    <div class="form-container">
      <el-row>
        <el-col>
          <h2 class="title">新建电芯检测规格</h2>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <el-card style="width:33%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm">
          <el-form-item label="产品编码：" prop="productionID">
            <el-autocomplete v-model="ruleForm.productionID" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>

          <el-form-item label="电压上下限偏差范围：±" prop="voltageLimits">
            <el-input-number v-model="ruleForm.voltageLimits" :precision="2" :step="0.01" :max="10"/>
          </el-form-item>

          <el-form-item label="内阻上下限偏差范围：±" prop="resistanceLimits">
            <el-input-number v-model="ruleForm.resistanceLimits" :precision="2" :step="0.01" :max="10"/>
          </el-form-item>

          <el-form-item label="规格取样数量（个）：" prop="electricCount">
            <el-input-number v-model="ruleForm.electricCount" :min="1" :max="10" label="描述文字" @change="handleChange"/>
          </el-form-item>
                </el-form-item>

          <el-form-item label="规格计算方法" prop="computingMethod">
            <el-select v-model="ruleForm.computingMethod" placeholder="请选择"><el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        productionID: '', // 产品编号
        voltageLimits: '1', // 电压上下限偏差
        resistanceLimits: '1', // 内阻上下限偏差
        electricCount: '1', // 取电芯样本数量
        computingMethod: '1'// 规格计算方法
      },
      rules: {
        // 产品编号
        productionID: [
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 电压上下限偏差
        voltageLimits: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 内阻上下限偏差
        resistanceLimits: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 取电芯样本数量
        electricCount: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 规格计算方法
        computingMethod: [
          { required: true, message: '请输入规格计算方法', trigger: 'blur' }
        ]

      },
      options: [{
        value: '选项1',
        label: '状态1'
      }, {
        value: '选项2',
        label: '状态2'
      }],
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
.title {
  width: 120px;
}
.el-input {
  width: 100%;
}

.el-form-item {
  margin-bottom: 22px;
  text-align: left;
}
.el-select {
  display: inline;
  position: relative;
}
</style>
