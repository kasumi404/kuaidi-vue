<template>
    <div>
		<header class="header">投诉信息管理</header>
		<div class="table_container">
			<el-table
		      :data="holderData"
		      stripe
		      style="width: 100%">
		      <el-table-column
		        prop="holderid"
		        label="#"
		        v-if="false">
		        <template slot-scope="scope">
		        	{{ scope.row.complaintId }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holdername"
		        label="投诉人"
		        width="150">
		        <template slot-scope="scope">
		        	{{ scope.row.adminInfo.adminName }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holdersex"
		        label="投诉人电话"
		        width="200">
		        <template slot-scope="scope">
		        	{{ scope.row.adminInfo.adminCell }}
		        </template>
		      </el-table-column>
		      <el-table-column
		        prop="holderword"
		        label="投诉内容"
		        width="750">
		        <template slot-scope="scope">
		        	{{ scope.row.context }}
		        </template>
		      </el-table-column>
		      <el-table-column
		      	label="操作"
		      	width="200">
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
			    :total="3" 
			    style="margin:0 auto;text-align: center;"
			    @current-change="getComplaint">
			</el-pagination>

		    <el-dialog title="添加新住户" :visible.sync="addDialogFormVisible">
				  	<el-form :rules="buildrules" :model="addHolderForm" ref="addHolderForm" label-width="110px" class="form build_form">
				  		<el-form-item label="住户姓名" prop="holdername">
							<el-input clearable v-model="addHolderForm.holdername" placeholder="请输入住户姓名"></el-input>
						</el-form-item>
						<el-form-item label="性别">
							<el-select clearable class="query_select" v-model="addHolderForm.holdersex">
							    <el-option
							      v-for="item in holderSexOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-form-item>
					    <el-form-item label="职业" prop="holderword">
							<el-input clearable v-model="addHolderForm.holderword" placeholder="请输入职业"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" prop="holdercall">
							<el-input clearable v-model="addHolderForm.holdercall" placeholder="请输入联系电话"></el-input>
						</el-form-item>
						<el-form-item label="备注" prop="holdertext">
							<el-input clearable type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addHolderForm.holdertext" placeholder="请输入备注"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="addDialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="addUser">确 定</el-button>
				  </div>
				</el-dialog>

				<el-dialog title="编辑投诉" :visible.sync="updateDialogFormVisible">
				  	<el-form :rules="buildrules" :model="updateHolderForm" ref="updateHolderForm" label-width="110px" class="form build_form">
						<el-form-item label="投诉人" prop="holdername">
							<el-input clearable v-model="updateHolderForm.adminName" :disabled="true"></el-input>
						</el-form-item>
					    <el-form-item label="投诉人电话" prop="holderword">
							<el-input clearable v-model="updateHolderForm.adminCell" placeholder="请输入投诉人电话"></el-input>
						</el-form-item>
						<el-form-item label="内容" prop="holdertext">
							<el-input clearable type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="updateHolderForm.context" placeholder="请输入内容"></el-input>
						</el-form-item>
				  	</el-form>
				  <div slot="footer" class="dialog-footer">
				    <el-button @click="updateDialogFormVisible = false;">取 消</el-button>
				    <el-button type="primary" @click="updateUser">确 定</el-button>
				  </div>
				</el-dialog>
		</div>
    </div>
</template>
<script>
	import store from '@/store'
	import {getComplaint,updateComplaint,insertComplaint,deleteComplaint} from '@/api/Complaint'
    export default {
    	data(){
    		return {
    			pageIndex: 1,
    			pageSize: 5,
    			holderData: [],
		    	addHolderForm: {
	    			holdername: '',
	    			holdersex: '',
	    			holderword: '',
	    			holdercall: '',
		            holdertext: '',
		    	},
		    	updateHolderForm: {
		    		adminId: '',
		    		complaintId: '',
	    			adminName: '',
	    			adminCell: '',
	    			context: '',
		    	},
		    	holderSexOptions: [{
		          value: 'man',
		          label: '男'
		        }, {
		          value: 'women',
		          label: '女'
		        }],
				buildrules: {
					
				},
				getComplaintValue: '',
				comfortuserpassword: '',
				queryOptionsValue: 'holdername',
		        addDialogFormVisible: false,
		        updateDialogFormVisible: false,
    		}
    	},
    	created(){
            this.getComplaint();
        },
    	methods: {
	      handleEdit(index, row) {
	        this.updateHolderForm={
	        		adminName: row.adminInfo.adminName,
	        		adminId: row.adminInfo.adminId,
	        		complaintId: row.complaintId,
	        		adminCell: row.adminInfo.adminCell,
	        		context: row.context,
		    	}
		    this.updateDialogFormVisible = true;
	      },
	      handleDelete(index, row) {
	        this.$confirm('是否删除该条记录?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {

        	deleteComplaint(row.complaintId).then(response => {
        		console.log(response)
		        if(response.data.result === 200){
		        	this.$message({
			            type: 'success',
			            message: '用户信息删除成功！'
			          	});
			        this.getComplaint();
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
	      getComplaint(){
	      		getComplaint(this.pageIndex,this.pageSize).then(response => {
		        //console.log("typegetComplaint"+response.data)
		        this.holderData = response.data.express
		        
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		      })
	      },
	      addUser(){
	        	this.$message({
		            type: 'success',
		            message: '添加住户成功！'
		          	});
	        	this.addDialogFormVisible = false;
	        	this.addHolderForm = {
	        		holdername: '',
	    			holdersex: '',
	    			holderword: '',
	    			holdercall: '',
		            holdertext: '',
		        }
	      },
	      updateUser(){
  			updateComplaint(this.updateHolderForm.complaintId,this.updateHolderForm.adminId,this.updateHolderForm.context).then(response => {
		        //console.log("typegetComplaint"+response.data)
		        this.getComplaint()
		        this.$message({
		            type: 'success',
		            message: '投诉信息修改成功！'
		          	});
	        	this.updateDialogFormVisible = false;
	        	this.updateHolderForm = {
		    		adminId: '',
		    		complaintId: '',
	    			adminName: '',
	    			adminCell: '',
	    			context: '',
		            }
		        setTimeout(() => {
		          
		        }, 1 * 1000)
		    })
	        	
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
