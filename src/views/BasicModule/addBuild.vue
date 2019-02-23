<template>
    <div>
		<header class="header">用户信息管理</header>
		<div class="table_nav">
			<el-select clearable class="query_select" v-model="queryOptionsValue" placeholder="">
			    <el-option
			      v-for="item in queryOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			<el-input clearable class="nav_input" v-model="searchValue" placeholder="请输入"></el-input>
			<el-button class="nav_searchBtn" type="primary" @click="search">搜索</el-button>
			<el-button class="nav_addBtn" type="primary" @click="addDialogFormVisible = true">添加用户</el-button>
		</div>
		<div class="table_container">
			<el-table
		      :data="buildData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="buildid"
		        label="#"
		        width="50"
		        v-if="false"
		        >
		        <template slot-scope="scope">
		        	{{ scope.row.buildid }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="userName"
		        label="用户名"
		        align="center"
		        width="100"
		        >
		        <template slot-scope="scope">
		        	{{ scope.row.userName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="password"
		        label="密码"
		        align="center"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.password }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="adminName"
		        label="姓名"
		        align="center"
		        width="100">
		        <template slot-scope="scope">
		        	{{ scope.row.adminName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="adminCell"
		        label="电话号"
		        align="center"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.adminCell }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="adminIDCard"
		        label="身份证"
		        align="center"
		        width="200">
		        <template slot-scope="scope">
		        	{{ scope.row.adminIDCard }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="adminPlace"
		        label="地址"
		        align="center"
		        width="200">
		        <template slot-scope="scope">
		        	{{ scope.row.adminPlace }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="adminRoot"
		        label="是否注册用户"
		        align="center"
		        width="200">
		        <template slot-scope="scope">
		        	{{ scope.row.adminRoot }}
		        </template>
		      </el-table-column>
		      <el-table-column label="操作" width="150">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
		    </el-table>

		    <!-- <pagination v-show="TotalPages>0" :total="TotalPages" :page.sync="pageIndex" :limit.sync="pageSize" @pagination="search" /> -->
			<el-pagination
				:current-page.sync="pageIndex"
				:page-size="pageSize"
			    layout="prev, pager, next"
			    :total="totalSize" 
			    style="margin:0 auto;text-align: center;"
			    @current-change="search">
			</el-pagination>

		    <el-dialog title="添加用户信息" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="buildForm" ref="buildForm" label-width="110px" class="form build_form">
				  		<el-form-item label="用户名" prop="username">
							<el-input clearable v-model="buildForm.username" placeholder="请输入用户号"></el-input>
						</el-form-item>
					    <el-form-item label="密码" prop="password">
							<el-input clearable v-model="buildForm.password" placeholder="请输入密码"></el-input>
						</el-form-item>
				  		<el-form-item label="姓名" prop="adminName">
							<el-input clearable v-model="buildForm.adminName" placeholder="请输入姓名"></el-input>
						</el-form-item>
					    <el-form-item label="电话号" prop="adminCell">
							<el-input clearable v-model="buildForm.adminCell" placeholder="请输入电话号"></el-input>
						</el-form-item>
						<el-form-item label="身份证" prop="adminIDCard">
							<el-input clearable v-model="buildForm.adminIDCard" placeholder="请输入身份证"></el-input>
						</el-form-item>
						<el-form-item label="地区" prop="adminPlace">
							<el-input clearable v-model="buildForm.adminPlace" placeholder="请输入地区"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addBuild">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑用户信息" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateBuildForm" ref="updateBuildForm" label-width="110px" class="form build_form">
				  		<el-form-item label="用户名" prop="username">
							<el-input clearable v-model="updateBuildForm.username" placeholder="请输入用户号"></el-input>
						</el-form-item>
					    <el-form-item label="密码" prop="password">
							<el-input clearable v-model="updateBuildForm.password" placeholder="请输入密码"></el-input>
						</el-form-item>
				  		<el-form-item label="姓名" prop="adminName">
							<el-input clearable v-model="updateBuildForm.adminName" placeholder="请输入姓名"></el-input>
						</el-form-item>
					    <el-form-item label="电话号" prop="adminCell">
							<el-input clearable v-model="updateBuildForm.adminCell" placeholder="请输入电话号"></el-input>
						</el-form-item>
						<el-form-item label="身份证" prop="adminIDCard">
							<el-input clearable v-model="updateBuildForm.adminIDCard" placeholder="请输入身份证"></el-input>
						</el-form-item>
						<el-form-item label="地区" prop="adminPlace">
							<el-input clearable v-model="updateBuildForm.adminPlace" placeholder="请输入地区"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="updateBuild">确 定</el-button>
				  </div>
				</el-dialog>
		</div>
    </div>
</template>

<script>
	import {fetchBuildListByBuildType,fetchBuildListByBuildNo,fetchBuildList,fetchBuildCount,addBuild,updateBuild,deleteBulid} from '@/api/build'
	import {getAdmin,edit,updateAdmin,register,deleteAdmin} from '@/api/admin'
    export default {
    	data(){
    		return {
    			TotalPages:10,
    			pageIndex: 1,
    			pageSize: 10,
    			totalSize:10,
    			buildData: [],
		        updateBuildForm: {
	    			id: '',
	    			username: '',
		            password: '',
		            adminId: '',
		            adminName: '',
		            adminCell: '',
		            adminIDCard: '',
		            adminPlace: '',
		    	},
	    		buildForm: {
	    			id: '',
	    			username: '',
		            password: '',
		            adminId: '',
		            adminName: '',
		            adminCell: '',
		            adminIDCard: '',
		            adminPlace: '',
		    	},
		    	queryOptions: [{
		          value: 'buildtype',
		          label: '按姓名'
		        }, {
		          value: 'buildno',
		          label: '按地址'
		        }],
				buildrules: {
					
				},
		        queryOptionsValue: 'buildtype',
		        searchValue: '',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
    		}
    	},
    	created(){
            this.search();
        },
    	methods: {
	      handleEdit(index, row) {
	      	console.log(row)
	        this.updateBuildForm={
	        		id: row.adminId,
	    			username: row.userName,
		            password: row.password,
		            adminId: row.adminId,
		            adminName: row.adminName,
		            adminCell: row.adminCell,
		            adminPlace: row.adminPlace,
		            adminIDCard: row.adminIDCard,
		    	}
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {

	      	this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

        	deleteAdmin(row.adminId).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '用户信息删除成功！'
			          	});
			        this.search();
		        }
		        else if(response.data.result === 500){
		        	this.$message.error(response.data.result.message);
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
	      },
	      search(){
	      	if(this.queryOptionsValue == "buildtype"){
	      		getAdmin(this.searchValue,"",this.pageIndex,this.pageSize).then(response => {
		        //console.log("typesearch"+response.data)
		        this.buildData = response.data.adminInfos
		        console.log(response.data)
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else if(this.queryOptionsValue == "buildno"){
	      		getAdmin("",this.searchValue,this.pageIndex,this.pageSize).then(response => {
		        //console.log("nosearch"+response.data)
		        this.buildData = response.data.adminInfos
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else{
	      		getAdmin(this.searchValue,this.pageIndex,this.pageSize).then(response => {
		        //console.log("nosearch"+response.data)
		        this.buildData = response.data.adminInfos
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      },
	      addBuild(){
	      	register(this.buildForm.username,this.buildForm.password,this.buildForm.adminName,this.buildForm.adminCell,this.buildForm.adminIDCard,this.buildForm.adminPlace).then(response => {
		        if(response.data === 200){
		        	this.$message({
			            type: 'success',
			            message: '用户信息录入成功！'
			          	});
		        	this.addDialogFormVisible = false;
		        	this.buildForm = {
		    			id: '',
		    			username: '',
			            password: '',
			            adminId: '',
			            adminName: '',
			            adminCell: '',
			            adminIDCard: '',
			            adminPlace: '',}
			        this.getBuilds();
		        }
		        else if(response.data === 400){
		        	this.$message.error('用户信息录入失败！');
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      updateBuild(){
	      	updateAdmin(this.updateBuildForm.id,this.updateBuildForm.username,this.updateBuildForm.password).then(response => {
		        if(response.data.result === 200){
			        edit(this.updateBuildForm.adminId,this.updateBuildForm.adminName,this.updateBuildForm.adminCell,this.updateBuildForm.adminIDCard,this.updateBuildForm.adminPlace).then(res => {

		        	this.$message({
			            type: 'success',
			            message: '用户信息修改成功！'
			          	});
		        	this.updateDialogFormVisible = false;
		        	this.updateBuildForm = {
		    			id: '',
		    			username: '',
			            password: '',
			            adminId: '',
			            adminName: '',
			            adminCell: '',
			            adminIDCard: '',
			            adminPlace: '',}
			        this.search();
		      		})
		        }
		        else if(response.data === 400){
		        	this.$message.error('用户信息修改失败！');
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      getBuilds(){
	      	fetchBuildCount().then(response => {
		        //console.log(response.data)
		        this.totalSize = response.data
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	fetchBuildList(this.pageIndex,this.pageSize).then(response => {
		        //console.log(response.data)
		        this.buildData = response.data
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
          }
	    },
    	components: {
    	}
    }
</script>

<style>
	.header{
		text-align: center;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 20px;
		font-weight: bold;
	}
	.table_nav{
        padding: 10px 50px;
    }
    .table_nav .query_select{
    	width: 130px;
    }
    .table_nav .nav_input{
    	width: 200px;
    }
    .table_nav .nav_addBtn{
    	float: right;
    }
	.table_container{
        padding: 10px 50px;
    }
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.build_form{
		border: 1px solid #eaeefb;
		padding: 10px 80px 10px 20px;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
</style>
