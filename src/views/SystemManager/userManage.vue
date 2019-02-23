<template>
    <div>
		<header class="header">管理员管理</header>
		<div class="table_nav">
			管理员权限：
			<el-select clearable class="query_select" v-model="queryOptionsValue" placeholder="">
			    <el-option
			      v-for="item in queryOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			管理员名称：
			<el-input clearable class="nav_input" v-model="searchValue" placeholder="请输入"></el-input>
			<el-button class="nav_searchBtn" type="primary" @click="search">搜索</el-button>
			<el-button class="nav_addBtn" type="primary" @click="addDialogFormVisible = true">添加管理员</el-button>
		</div>
		<div class="table_container">
			<el-table
		      :data="userData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="userid"
		        label="#"
		        v-if="false">
		        <template slot-scope="scope">
		        	{{ scope.row.id }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="username"
		        label="管理员名称">
		        <template slot-scope="scope">
		        	{{ scope.row.username }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="password"
		        label="密码">
		        <template slot-scope="scope">
		        	{{ scope.row.password }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="root"
		        label="管理员权限">
		        <template slot-scope="scope">
		        	{{ scope.row.root }}
		        </template>
		      </el-table-column>
		      <el-table-column label="操作">
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

		    <el-pagination
				:current-page.sync="pageIndex"
				:page-size="pageSize"
			    layout="prev, pager, next"
			    :total="25" 
			    style="margin:0 auto;text-align: center;"
			    @current-change="search">
			</el-pagination>

		    <el-dialog title="添加新管理员" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="addUserForm" ref="addUserForm" label-width="110px" class="form build_form">
				  		<el-form-item label="管理员名" prop="username">
							<el-input clearable v-model="addUserForm.username" placeholder="请输入管理员名"></el-input>
						</el-form-item>
					    <el-form-item label="密码" prop="password">
							<el-input clearable v-model="addUserForm.password" type="password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="comfortpassword">
							<el-input clearable v-model="comfortpassword" type="password" placeholder="请确认密码"></el-input>
						</el-form-item>
						<el-form-item label="管理员权限">
							<el-select clearable class="query_select" v-model="addUserForm.root" placeholder="管理员">
							    <el-option
							      v-for="item in userRootOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addUser">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑管理员信息" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateUserForm" ref="updateUserForm" label-width="110px" class="form build_form">

						<el-form-item label="管理员名" prop="username">
							<el-input clearable v-model="updateUserForm.username" placeholder="请输入管理员名"></el-input>
						</el-form-item>
					    <el-form-item label="密码" prop="password">
							<el-input clearable v-model="updateUserForm.password" type="password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="comfortpassword">
							<el-input clearable v-model="comfortpassword" type="password" placeholder="请确认密码"></el-input>
						</el-form-item>
						<el-form-item label="管理员权限">
							<el-select clearable class="query_select" v-model="updateUserForm.root" placeholder="">
							    <el-option
							      v-for="item in userRootOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false;comfortpassword = ''">取 消</el-button>
				    <el-button type="primary" @click="updateUser">确 定</el-button>
				  </div>
				</el-dialog>
		</div>
    </div>
</template>
<script>
	import store from '@/store'
	import { getManage,register,updateManage,deleteManage } from '@/api/manage'
    export default {
    	data(){
    		return {
    			pageIndex: 1,
    			pageSize: 5,
    			userData: [],
		        queryOptions: [{
		          value: 'admin',
		          label: '超级管理员'
		        }, {
		          value: 'normal',
		          label: '普通管理员'
		        }],
		    	addUserForm: {
	    			username: '',
		            password: '',
		            root: 'admin',
		    	},
		    	updateUserForm: {
		    		id: '',
	    			username: '',
		            password: '',
		            root: '',
		    	},
		    	userRootOptions: [{
		          value: 'admin',
		          label: '超级管理员'
		        }, {
		          value: 'normal',
		          label: '普通管理员'
		        }],
				buildrules: {
					
				},
				searchValue: '',
				comfortpassword: '',
				queryOptionsValue: '',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
    		}
    	},
    	created(){
            this.search();
        },
    	methods: {
	      handleEdit(index, row) {
	        this.updateUserForm={
	        		id: row.id,
	    			username: row.username,
		            password: row.password,
		            root: row.root,
		    	}
		    /*if(row.root === 'admin'){

		    }*/
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {
	        this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

        	deleteManage(row.id).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '管理员信息删除成功！'
			          	});
			        this.search();
		        }
		        else if(response.data === 500){
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
      			console.log(this.pageSize)
      			console.log(this.pageIndex)
      		getManage(this.pageSize,this.pageIndex,this.searchValue,this.queryOptionsValue).then(response => {
	        this.userData = response.data.manages
      			console.log(this.userData)
	        
	        setTimeout(() => {
	          
	        }, 1 * 1000)
	      })
	      },
	      addUser(){
	      	console.log(this.addUserForm.password)
	      	console.log(this.comfortpassword)
	      	if(this.addUserForm.password === this.comfortpassword){
	      		register(this.addUserForm.username,this.addUserForm.password,this.addUserForm.root).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '添加管理员成功！'
			          	});
		        	this.addDialogFormVisible = false;
		        	this.addUserForm = {
		        		username: '',
			            password: '',
			            root: 'admin',
			        },
			        this.comfortpassword = '',
			        this.search();
		        }
		        else if(response.data.result === 500){
		        	this.$message.error(response.data.message);
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else{
	      		this.$message.error('确认密码有误！');
	      	}
	      },
	      updateUser(){
	      	if(this.updateUserForm.password === this.comfortpassword){
	      		updateManage(this.updateUserForm.id,this.updateUserForm.username,this.updateUserForm.password,this.updateUserForm.root).then(response => {
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '管理员信息修改成功！'
			          	});
		        	this.updateDialogFormVisible = false;
		        	this.updateUserForm = {
		        		id: '',
		        		username: '',
			            password: '',
			            root: '',
			            }
			        this.comfortpassword = '',
			        this.search();
		        }
		        else if(response.data.result === 400||response.data.result === 600||response.data.result === 500){
		        	this.$message.error(response.data.message);
		        }
		        else{
		        	this.$message.error('有哪里不对劲了！');
		        }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      	}
	      	else{
	      		this.$message.error('确认密码有误！');
	      	}
	      },
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
