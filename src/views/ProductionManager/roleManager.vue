<template>
  <div id="components-layout-demo-side">
        <div class="contenthead">
          <span>查询内容：<el-input v-model="searchName" placeholder="请输入用户名称或工号查询" style="width: 15%" @blur="blur('blur')"/></span>
          <span><el-button type="primary">查询</el-button></span>
          <span><el-button>重置</el-button></span>
        </div>
        <div class="newbutton">
          <el-button type="primary" @click="newRole">新建</el-button>
        </div>
        <div class="msg">
          <el-alert type="success" title="已查询5项" center show-icon/>
        </div>
        <div class="datatable">
          <el-table :data="roleDatas" style="width: 100%;">
            <el-table-column
              v-for="(label,index) in labels"
              :key="index"
              :label="label.label"
              :prop="label.prop"
              width="210px"/>
            <el-table-column fixed="right" label="操作" width="150px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteRow(scope.$index, userDatas)">
                  移除
                </el-button>
                <el-button type="text" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :current-page="pageIndex"
              :page-sizes="[10,20,30,40,50]"
              :page-size="pageSize"
              :total="Total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      
  </div>
</template>

<style scoped>
.contenthead {
  margin: 10px;
  text-align: left;
}
.newbutton {
  margin: 10px;
  padding: 10px;
  text-align: left;
}
span {
  margin: 10px;
}
.datatable {
  height: 600px;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
}
.msg {
  padding-left: 20px;
  padding-right: 20px;
}

.el-pagination__sizes {
  margin: 10px 10px 0 0;
  font-weight: 400;
  color: #606266;
}

.el-input__suffix {
  left: 50px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  top: -9px;
}

.el-pagination button:disabled {
  color: #c0c4cc;
  background-color: #fff;
  cursor: not-allowed;
  margin-top: 10px;
}
.el-pager {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  list-style: none;
  font-size: 0;
  margin-top: 10px;
}
</style>
<style>
.el-message-box {
  width: 600px;
  padding: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      Total: 0,
      roleDatas: [],
      labels: [
        { label: '编号', prop: 'roleid' },
        { label: '角色名称', prop: 'rolename' },
        { label: '登录名称', prop: 'remark' },
        { label: '修改时间', prop: 'updatetime' },
        { label: '姓名', prop: 'updateuser' },
        { label: '工号', prop: 'roleid' }
      ],
      searchName: ''
    }
  },
  created() {
    this.getRoleDatas()
  },
  methods: {
    getRoleDatas: function() {
      // console.log(this.pageIndex + "       " + this.pageSize);
      // this.$axios
      //   .get("/apis/v1.0/Role/Getsystem_role", {
      //     params: {
      //       PageIndex: 1,
      //       PageSize: 10
      //     }
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     this.roleDatas = GetUserData(res.data["List"]);
      //     //console.log(this.roleDatas);
      //   });

      var qs = require('qs')
      var instance = this.$axios.create({
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      })
      var params = {
        PageIndex: this.pageIndex,
        PageSize: this.pageSize
      }
      instance
        .post('/apis/v1.0/Role/Getsystem_role', qs.stringify(params))
        .then(res => {
          if (res.status == 200) {
            console.log(res)
            this.roleDatas = GetRoleData(res.data['List'])
            this.Total = res.data['RecordCount']
          }
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoleDatas()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getRoleDatas()
    },
    newRole() {
      // console.log(this.$router);
      // this.$router.push("/AddRole");
      this.$msgbox({
        title: '新建用户',
        message: this.$createElement(NewRole),
        lockScroll: false,
        showConfirmButton: false
      })
    },
    handleEdit(val, obj) {
      this.$msgbox({
        title: '修改用户',
        message: this.$createElement(EditRole),
        lockScroll: false,
        showConfirmButton: false
      })
    }
  }
}
</script>
