<template>
  <div id="newElectricTestingSpec-container">
    <div class="form-container">
      <el-card style="width:65%">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" class="demo-ruleForm" inline="true">
          <el-form-item label="工单号： " prop="ProductCode">
            <el-autocomplete v-model="ruleForm.ProductCode" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>

          <el-form-item label="生产批次： " prop="ProductCode">
            <el-autocomplete v-model="ruleForm.ProductCode" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
          </el-form-item>

          <el-form-item label="产品编码： " prop="ProductCode">
            <el-autocomplete v-model="ruleForm.ProductCode" :fetch-suggestions="querySearch" class="inline-input" placeholder="请输入内容" @select="handleSelect"/>
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
        setSOC: '1', // 设置SOC
        SOCtoDRCleft: '1', // SOC对应DRC左范围（mΩ）：
        SOCtoDRCright: '1', // SOC对应DRC右范围（mΩ）：
        pressure: '1', // SOC对应压差（V）：≤
        temperature: '1', // SOC对应温差（℃）：≤
        dynamic: '1', // SOC对应动态压差
        Accuracy: '1' // 电流精度
      },
      rules: {
        // 产品编号
        ProductCode: [
          { required: true, message: '请输入产品编号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到15 个字符', trigger: 'blur' }
        ],
        // 设置SOC
        setSOC: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // SOC对应DRC左范围（mΩ）：
        SOCtoDRCleft: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        // SOC对应DRC右范围（mΩ）：
        SOCtoDRCright: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        // SOC对应压差（V）：≤
        pressure: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // SOC对应温差（℃）：≤
        temperature: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        // SOC对应动态压差
        dynamic: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        // 电流精度
        Accuracy: [{ required: true, message: '请输入数量', trigger: 'blur' }]
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
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        }
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
hr {
  background-color: #c0c0c0;
  height: 1px;
  border: none;
}
.explaintitle {
  border-left: 5px solid green;
  margin: 10px 10px 10px 8%;
  padding-left: 5px;
  font: 25px bold;
  text-align: left;
}
</style>
