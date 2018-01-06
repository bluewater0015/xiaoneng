import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Table ,Modal, Button, Alert,notification} from 'antd';
import {FieldTypeForm} from "./fieldTypeForm"
import './CustomField.less'
import { APIURL } from'../../ServerConfig'
import CustomizedForm from './editForm'

export default class CustomField  extends Component{
    constructor(props){
      
      super(props)
      this.state={
        fetchFieldData:[],
        page:1,
        editShow:false,
        addModalVisible: false,
        total:0,
        count:0,
        inputCount:0,
        nameDisable:false,
        descDisable:false,
      }
    }
    //新增字段弹出层状态
    closeModal() {this.setState({addModalVisible: false});this.upDate()};
    showModal() {this.setState({addModalVisible: true});}
     openNotification = (msg,desc) => {
      notification.open({
        message: msg,
        description: desc,
      });
    };
    //封装请求方法
    getData(url){
        let page = this.state.page
        fetch(url).then((res)=>{
          return res.json();
        }).then((resoult) => {
          this.setState({
              fetchFieldData:resoult.data,
              total:resoult.totalNumber
          })
        })
      }
    //点击新增字段之后列表页面更新
    upDate(){
        let page = this.state.page
       this.getData(`${APIURL}/wo/woField/findAllfields/kf_1000/${page}/500`)    
    }

    componentWillMount(){
      let page = this.state.page
      this.getData(`${APIURL}/wo/woField/findAllfields/kf_1000/${page}/500`)    
    }
    //搜索post请求(注意传参方式)
    getSearchValue(e){
      let searchValue = e.target.value
      let page = this.state.page
          fetch(`${APIURL}wo/woField/searchField`,{
            method: 'POST',
            body: `siteId=kf_1000&fieldName=${searchValue}&pageIndex=${page}&pageSize=500`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((res)=>{
            return  res.json()
          }).then((resoult)=>{
            this.setState({
                fetchFieldData:resoult.data,
                total:resoult.totalNumber
              }) 
          })
    }



    //编辑弹出层
    showEditModal(){this.setState({editShow: true})};
    //点击确定之后告诉后台更改
    handleEditOk = () => {
      this.setState({loading:true})
      let editNewData = {
        siteId:"kf_1000",
        userId:"kf_1000_admin",
        fieldId:this.state.editRecordFieldId,
        fieldName:this.state.nowFieldName || this.state.editRecordfieldName,
        fieldContent:this.state.nowFieldContent,
        fieldSign:this.state.editRecordfieldSign,
        fieldDesc:this.state.nowFieldDesc || this.state.editRecordfieldDesc ,
        ifUse:this.state.editRecordifUse,
        typeId:this.state.editRecordtypeId
    }
        fetch(`${APIURL}/wo/woField/updapteWoField`, {
          method: 'POST',
          body: JSON.stringify( editNewData ),
          headers: {
              'Content-Type': 'application/json'
          }
          }).then((response) => {
          if(response.status === 200){
            this.upDate()
            this.openNotification('保存成功,返回列表页','')
            setTimeout(() => {  
              this.setState({
                loading:false,
                editShow: false
              })
           }, 1000);
          }
      }).catch((error) => {
          this.openNotification('保存失败','服务出现故障')
      });
  }
      buttonControll(){
        if(this.state.descDisable===true||this.state.nameDisable===true){
            return true
        }else if(this.state.descDisable===false&&this.state.nameDisable===false){
            return false
        }
      }

    getFieldContent(value){
          this.setState({
              nowFieldContent:value
          })  
    }

    getFieldName(value,bool){
      this.setState({
          nowFieldName:value,
          nameDisable:bool
      })   
    }
    getFieldDesc(value,bool){
      this.setState({
          nowFieldDesc:value,
          descDisable:bool
      })
    }
    callBack(bool){
      console.log(bool)
      this.setState({disabled:bool})
    }
    handleEditCancel = () => {this.setState({editShow: false})}
    render(){
      let pagination = {
        total:this.state.total,
        showQuickJumper:true,
      }
      let searchStyle={
        borderRadius:'20px',
        width:'200px',
        height:'30px',
        border:'1px solid white',
        outline:'none',
        textIndent:'30px',
        margin:'0px 10px'
      }
      let searchButtonStyle = {
        background:'blue',
        width:'80px',
        borderRadius:'20px',
        height:'30px',
        color:'#fff',
        outline:'none',
        cursor:'pointer'
      }
     
      
      //table数据渲染
      const columns = [{
        title: '字段id',
        dataIndex: 'fieldId',
        key: 'id',
      }, {
        title: '字段名称',
        dataIndex: 'fieldName',
        key: 'name',
      },{
        title: '字段类型',
        dataIndex: 'typeName',
        key: 'type',
      },{
        title: '操作',
        key: 'action',
        render: (text,record,index) => (
          <div>
              <Button  type="primary" onClick={()=>{
                this.setState({
                    editShow: true,
                    edit:record,
                    editRecordtypeName:record.typeName,
                    editRecordfieldName:record.fieldName,
                    editRecordfieldContent:record.fieldContent,
                    editRecordFieldId:record.fieldId,
                    editRecordfieldSign:record.fieldSign,
                    editRecordfieldDesc:record.fieldDesc,
                    editRecordifUse:record.ifUse,
                    editRecordtypeId:record.typeId,
                  })
                  }}>编辑</Button>
          </div>
        ),
      },];
      
     
      return (
        <div style={{width:'80vw',height:'100vh',padding:'20px',background:'#edf4fa'}}>
          <span>自定义字段</span>
          <div style={{paddingRight:"10px",textAlign:"right"}}>
                <button className="addFields" onClick={this.showModal.bind(this)}>
                   <i className="iconfont icon-jiahao"></i> 新增字段
                </button>
                <input onChange={this.getSearchValue.bind(this)} style={searchStyle} placeholder='请输入要搜索的字段'/>
                {/* <i className='iconfont icon-sousuo'></i> */}
                <button style={searchButtonStyle}>搜索</button>
          </div>
              <div>
                  <Table columns={columns} 
                  dataSource={this.state.fetchFieldData}
                  pagination={pagination}
                  style={{padding:'20px',width:'80vw'}}
                  />
               <FieldTypeForm  addModalVisible={this.state.addModalVisible} closeModal={this.closeModal.bind(this)} />
            </div>            
            <Modal
                title="编辑字段"
                visible={this.state.editShow}
                onOk={this.handleEditOk }
                onCancel={this.handleEditCancel}
                key={this.state.editRecordFieldId}
                footer={[
                  <Button key="back" onClick={this.handleEditCancel}>取消</Button>,
                  <Button key="submit" 
                  disabled={this.state.nameDisable==false && this.state.descDisable==false? false : true} 
                  type="primary" loading={this.state.loading} onClick={this.handleEditOk}>
                    保存
                  </Button>,
                ]}
            >
            <CustomizedForm 
              getFieldContent={this.getFieldContent.bind(this)} 
              getFieldName={this.getFieldName.bind(this)}
              getFieldDesc={this.getFieldDesc.bind(this)}
              callBack={this.callBack.bind(this)}
              edit={this.state.edit} />
          </Modal>
        </div> 
      )
    }
  }

