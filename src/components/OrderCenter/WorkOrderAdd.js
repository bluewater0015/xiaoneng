import React from "react";
import {Form, Input,  Select, Button,Upload, message,Modal} from 'antd';

import fetch from 'isomorphic-fetch';
import CustomerInfo from './CustomerInfo'
import { GAPIURL } from '../../ServerConfig';
import  "./OrderCenterStyle/WorkOrderAdd.less"
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;


class WorkOrderAdd extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state={
            editOrderTheme:'',
            editNameCount:0,
            OrderDes:'',
            OrderdesCount:0,
            Customers:[],
            OrderCustomerId:'',
            OrderHandelGrounp:[],
            OrdergroupId:'',
            OrderUserList:[],
            OrderHandelMan:[],
            OrderUserId:'',
            OrderStatus:0,
            Ordertemp:[],
            OrderField:[],
            OrderLevel:2,
            OrdertempletId:'',
            visible: false,
            clear:false   
        }
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }  
    OrderClickCancel=() => {
        this.props.OrderClose()
    }   
    checkOrderTheme(e){
        this.setState({
            editOrderTheme:e.target.value,
            editNameCount:e.target.value.length,
        })
        // console.log(e.target.value.length)
       if(e.target.value.length>30){
            this.setState({
                helpName:"您输入的字符长度过长,最大长度是30个字符",
                editNameCount:'30'
            })   
             this.props.getFieldName(e.target.value,true)
       }else if(e.target.value.length<=30){
            this.setState({
                helpName:"",
            }) 
             this.props.getFieldName(e.target.value,false)
       }
    }
    checkOrderDes(e){
        this.setState({
            OrderDes:e.target.value,
            OrderdesCount:e.target.value.length,
        })
        if(e.target.value.length>400){
                this.setState({
                    helpDesc:"您输入的字符长度过长,最大长度是400个字符",
                    OrderdesCount:'400'
                })   
                this.props.getFieldName(e.target.value,true)
        }else if(e.target.value.length<=400){
                this.setState({
                    helpDesc:"",
                }) 
                this.props.getFieldName(e.target.value,false)
        }
    } 
    //受理人不为空
    HandelManAndStatus(value){ 
        this.setState({   
            OrderUserId:value,
        })
    } 
    //上传前检测文件大小   
    handleChange=(info)=>{
        // let fileList = info.fileList;             
        if (info.file.status !== 'uploading') {
            console.log(info.file);
            console.log( info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({
                fileListLength:info.fileList.length
            })
           
            console.log(info.fileList.length)
            console.log(this.state.fileListLength)
        } else if( info.fileList.length>2){
            return false
        }       
        else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        } 
    //新建工单保存
   changeOrderLevel=(value)=>{
       this.setState({
           OrderLevel:value
       })
       console.log(value)
   }
 
  
  componentWillMount(){  
       // 获取受理组,获取客户
        fetch(`${GAPIURL}/wo/workorder/customerAndGroupShow/kf_1000`).then((res)=>{
            return res.json()
        }).then((resultData)=>{ 
            this.setState({
                Customers:resultData.customer,
                OrderHandelGrounp:resultData.groupList,
            })
            console.log(resultData.customer)
        }).catch((err)=>{
            console.log(err)
        })
      //获取工单模板
         fetch(`${GAPIURL}/wo/workorder/basefieldAndtempletshow/kf_1000`)
         .then((res)=>{
           //  console.log(res)
             return res.json()
         }).then((resoult)=>{
         
             this.setState({
                 Ordertemp:resoult.templets
             })
         })
         
    }
    getNewCus=()=>{
        fetch(`${GAPIURL}/wo/workorder/customerAndGroupShow/kf_1000`).then((res)=>{
            return res.json()
        }).then((resultData)=>{ 
            this.setState({
                Customers:resultData.customer,
                OrderHandelGrounp:resultData.groupList,
            })
            console.log(resultData.customer)
        }).catch((err)=>{
            console.log(err)
        })
    }
    getCusName=(value)=>{
        this.setState({
            OrderCustomerId:value
        })
        console.log(value)
    }
    //选择某受理组下对应的人保存待循环237行
    selectGroup = ( value )=>{
            console.log(value)
            this.setState({
                OrderUserList:value.userList,
                OrdergroupId:value.groupId
            })
            console.log(value.groupId)
    }
   
    //选择不同模板获取数据
    selectTemplate=(value)=>{
            let selectTemplate = value.substr(5,7)  
            this.setState({
                OrdertempletId:selectTemplate
            })
        // let selectTemplate = value
        console.log(value)
        console.log(selectTemplate)
         //fetch(`${GAPIURL}/wo/workorder/Fieldshow/${selectTemplate}`)
         fetch(`${GAPIURL}/wo/workorder/Fieldshow/4`)
            .then((res)=>{
                return  res.json()
            
            }).then((result)=>{
                this.setState({
                    OrderField:result
                })
                console.log(result)
            }).catch((err)=>{
                console.log(err)
            })
        }
    callbackName(value){
        this.setState({
            callbackName:value,
        })
        console.log(value)
    }
    callbackFullName(value){
        this.setState({
            callbackFullName:value,
        })
        console.log(value)
    }
    callbackTel(value){
        this.setState({
            callbackTel:value,
        })
        console.log(value)
    }
    callbackEmail(value){
        this.setState({
            callbackEmail:value,
        })
        console.log(value)
    }
    callbackLevel(value){
        this.setState({
            callbackLevel:value,
        })
        console.log(value)
    }
    callbackCompany(value){
        this.setState({
            callbackCompany:value,
        })
        console.log(value)
    }
    callbackAddress(value){
        this.setState({
            callbackAddress:value,
        })
        console.log(value)
    }
    handleOk = (e)=>{
        if(this.state.callbackName===""){
            message.error('请输入用户名',1)
            return 
        }else{
        this.setState({loading:true,clear:true})
        let AddCusData = {
            siteId:"kf_1000",
            customerId:"",
            userId:'kf_1000_08c2b688-44ea-472b-80c9-217697b9de9f',//客服Id   
            customerName:this.state.callbackName,
            fullName:this.state.callbackFullName,
            customerMobile:this.state.callbackTel,
            customerEmail:this.state.callbackEmail,
            companyName:this.state.callbackCompany,
            customerLevel:this.state.callbackLevel,
            customerProvince:'',//省
            customerCity:'',//市           
            customerSource:0,
            rangeType:0,
            ifActivity:1
        }
        fetch(`${GAPIURL}/wo/customer/createCustomerInfo/`,{
            method:'POST',
            body:JSON.stringify(AddCusData),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((resoult)=>{
            return resoult.json() 
        }).then((res)=>{
            if(res.code===true){
                message.warning('创建成功')
                setTimeout(() => {  
                    this.setState({
                      loading:false
                    })
                 }, 500)      
                 this.setState({visible: false})
            }else{
                message.warning('创建失败')
                setTimeout(() => {  
                    this.setState({
                      loading:false
                    })
                 }, 500)
            }
        })
        .catch((error)=>{
            message.error('保存失败','服务出现故障') 
        })
    }
}
//点击新增工单保存
checkAndSend(e){ 
    // 1.没有选择受理人   默认把0发过去
    // 2.如果选了受理人   把当前选中的状态发过去 
    // 点击保存  选了受理人   传过去的默认状态是解决中
    let status = this.state.OrderStatus   
    let OrderAddData={
        'woWorkorderRecord':{
            "siteId":"kf_1000",
            'woTitle':this.state.editOrderTheme,//必填
            'woDesc':this.state.OrderDes,
            //"templetId":this.state.OrdertempletId,//模板id 
            'templetId':4,        //         必填
            'customerId':this.state.OrderCustomerId,//对应企业CRM中的客户ID  必填
            'woPriority':this.state.OrderLevel, //非必填
            'woStatus':status,
            'woGroupId':this.state.OrdergroupId,//受理组
            'userId':this.state.OrderUserId,//受理人
            'creatorType':"0",//0:客服创建1:客户创建2:系统生成必填
            'creatorId':'kf_1000_08c2b688-44ea-472b-80c9-217697b9de9f',//创建者id同创建客户客服一样    必填 
            'woChannel':'0'
        },
        "woWorkorderFieldList":[{ 
            'fieldId':'1',//字段ID必填
            'woFieldContent':'test111'}//字段内容必填
        ],
        "woWorkorderFileList": [{
            'woFileName':'1',//文件名                 必填
            'woFilePath':'http://toutiao.io/s/ios', // 文件路径               非必填
            'woFileSize':'1',//文件大小                必填
            'woFileSourse':'0',//来源 0:工单描述1:工单字段2:内部备注3回复 必填
            'woFileType':'0',//文件类型 (1:图片 0:其他)	必填
            'woFileKey':'1',//文件key                     必填
            }  
        ]     
    }
   
    
    if(!this.state.editOrderTheme || !this.state.OrdertempletId || !this.state.OrderCustomerId ){
        message.error('带*项内容请必填')
    }else{
        fetch(`${GAPIURL}/wo/workorder/createWorkorder/`,{
            method:'POST',
            body:JSON.stringify(OrderAddData),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((resoult)=>{
            return resoult.json() 
        }).then((res)=>{
            if(res.code===true){
                message.warning('创建成功')
                setTimeout(() => {  
                    this.setState({
                      loading:false
                    })
                 }, 500)
            }else{
                message.warning('创建失败')
            }
        })
        .catch((error)=>{
            message.error('保存失败','服务出现故障') 
        })
    }
}       
        //点击状态的时候做判断
    currentStatus  = (value) =>{
         this.setState({
             OrderStatus:value
            }
         )
     }    
    
    handleCancel = () => {
        this.setState({ visible: false });
      }
    render(){     
      const { visible, loading } = this.state;
      let closeBtn={
        cursor:' pointer',
        border: '0',
        background: 'transparent',
        position: 'absolute',
        right: '0',
        top: '0',
        zIndex: '10',
        fontWeight:' 700',
        width:'28px',
        height:'28px',
        outline:"none"
      }
     
      let cancelBtn={
        marginRight:'20px',
        padding:'0px 20px',
        border:'none',
        cursor:'pointer',
        borderRadius:'20px',
        outline:'none'
      }
      //上传文件的信息
      let UpLoad = {
          marginLeft:'70px'       
      }
    //获取下拉客户
    const OrderCustomer = this.state.Customers.map((item, index)=>{
        return(<Option className="Order_customer"   key={`OREDRCUSTOMER_${item.customerId}`}>{item.customerName}</Option>)
      })
    //获取受理组
      const Orderhandelgrounps = this.state.OrderHandelGrounp.map((item, index)=>{  
        return(<Option className="Order_grounp"  value={item}   key={`OREDRGROUP_${item.groupId}`}>{item.groupName}</Option>)
      })
       //获取受理人
       const OrderhandelMans = this.state.OrderUserList.map((item, index)=>{
        return<Option className="Order_man"   key={`OREDRMAN__${item.userId}`}>{item.userName}</Option>
      })
      //获取工单模板数据  
      const OrderTemplates = this.state.Ordertemp.map((option, index)=>{
        return<Option className="Order_Temp"  onSelect={this.selectTemplate.bind(this,option.templetId)}   key={`ORDER${option.templetId}`}>{option.templetName}</Option>
      })
      const OrderFields = this.state.OrderField.map((option, index)=>{
        return<li className="Order_Fields"   style={{listStyle:'none'}}  key={`ORDER_Fields${option.fieldId}`}>
            {/* option.fieldDesc ? {option.fieldDesc} :''
            {option.typeDesc}  */}
        </li>
      })
        return(
            <div className="zhezhao1" style={{display:this.props.AddOrder}}>
                <div className="zhezhao1-1" >
                    <div className="OrderAdd" style={{display:this.props.AddOrder}} >        
                    <div className="OrderAddTitle"style={{width:'100%',height:'7vh',lineHeight:'7vh',background:'#f4f6fd',paddingLeft:'30px',fontSize:'16px',boxSizing:'border-box'}}>
                        新增工单
                        <button style={closeBtn} onClick = {this.props.OrderClose}><i className="iconfont icon-cha" style={{fontSize:"12px"}}></i></button>                
                    </div>
              
                    <Form className="setWorkOrder" style={{boxSizing:'border-box',padding:'15px',height:'93vh'}}>
                                <FormItem  className="orderName" style={{marginTop:'20px'}} help={this.state.helpName}>
                                    <label className="Orderlabel" htmlFor="Ordertitle"><i className="star">*</i>工单标题:</label>                                                      
                                        <Input  name="OrderName" onChange={this.checkOrderTheme.bind(this)} style={{width:'85%',marginLeft:'10px'}}/>                            
                                    <br/>
                                        <span  className='Tip' style={{marginRight:'45px'}}>{this.state.editNameCount}/30</span>                        
                                </FormItem>
                                <FormItem className="OrderDes" help={this.state.helpDesc} >
                                    <label className="Orderlabel" htmlFor="Orderdes" style={{verticalAlign:'top'}}>工单描述:</label>
                                        <TextArea  name="Ordertext" className="Ordertexteara" onChange={this.checkOrderDes.bind(this)} /><br/>
                                        <span  className='Tip' style={{marginRight:'45px'}}>{this.state.OrderdesCount}/400</span>     
                                        <Upload                                     
                                             action= 'http://filestorage-base.ntalker.com/file/all'
                                             accept=' .jpg, .png, .gif, .jpeg, .rar, .zip, .xlsx, .xls, .ppt, .pptx, .doc'                                         
                                             showUploadList={true}                              
                                             onChange= {this.handleChange}  
                                             multiple={true}
                                             style={UpLoad} >                                            
                                                <Button>
                                                    <i className="iconfont icon-daochu" style={{fontSize:"14px"}}></i>上传附件
                                                </Button>   
                                                <span> *上传文件不得大于18M</span>
                                        </Upload>
                                    <span style={{position:'relative',top:'0px',left:'90%', color:'#4073f2'}}></span>
                                </FormItem>
                                <FormItem className="OrderCus" style={{position:'relative'}}>
                                    <label className="Ordercus" htmlFor="Ordercustomer" style={{width:'60px'}}><i className="star">*</i>客户:</label>
                                    <Select     
                                            showSearch                                 
                                            style={{width: "80%",marginLeft:'10px',display:'inline-block'}}                                        
                                            optionFilterProp="children"
                                            name="Ordercustomer" 
                                            onFocus={this.getNewCus.bind(this)}
                                            onChange={this.getCusName.bind(this)}

                                            >
                                            {OrderCustomer}
                                    </Select>  
                                   
                                    <span onClick={this.showModal} style={{cursor:'pointer',position:'absolute'}}>
                                        <i className="iconfont icon-tianjiayonghu" style={{marginLeft:'10px',fontSize:'22px',color:'#2f7af4'}}></i>
                                    </span>
                                    <Modal
                                        title="添加客户信息"
                                        visible={visible}
                                        onOk={this.handleOk}                                       
                                        onCancel={this.handleCancel}
                                        maskClosable={false}//点击蒙层是否允许关闭
                                        footer={[
                                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                            <Button key="submit"
                                            // disabled={this.state.nameDisabled==false && this.state.descDisabled==false? false : true}
                                            type="primary" loading={this.state.loading}  onClick={this.handleOk.bind(this)}>
                                            保存
                                            </Button>,
                                        ]}
                                    >
                                    <CustomerInfo  
                                        callback={this.callbackName.bind(this)}
                                        callbackFullName={this.callbackFullName.bind(this)}
                                        callbackTel={this.callbackTel.bind(this)}
                                        callbackEmail={this.callbackEmail.bind(this)}
                                        callbackLevel={this.callbackLevel.bind(this)}
                                        callbackCompany={this.callbackCompany.bind(this)}
                                        callbackAddress={this.callbackAddress.bind(this)}
                                        clearCusInfo={this.state.clear}
                                    />
                                    </Modal>

                                </FormItem>
                                <FormItem className="CusLevel" style={{width:'50%',float:'left'}}>
                                    <label htmlFor="Cuslevel" style={{width:'60px'}}>优先级:</label>                                                  
                                        <Select style={{ width: '69%',display:'inline-block',marginLeft:'10px' }} defaultValue="2" onChange={this.changeOrderLevel.bind(this)}>
                                            <Option value="0">紧急</Option>
                                            <Option value="1">高</Option>
                                            <Option value="2">中</Option>
                                            <Option value="3">低</Option>
                                        </Select>                                                     
                                </FormItem>
                                <FormItem className="OrderStatus" style={{width:'50%',float:'right'}} >
                                    <label htmlFor="Orderstatus" style={{width:'60px'}}>状态:</label>                                                  
                                        <Select   onChange={this.currentStatus}  style={{width: '69%',display:'inline-block',marginLeft:'10px'}} defaultValue='0' >
                                            <Option value="0">待解决</Option>
                                            <Option value="1">解决中</Option>
                                            <Option value="2">已解决</Option>
                                            <Option value="3">已关闭</Option>
                                        </Select> 
                                                                                      
                                </FormItem>
                                <FormItem className="OrderHandelGrounp" style={{width:'50%',float:'left'}} >
                                    <label htmlFor="Orderhandelgrounp" style={{width:'60px'}}><i className="star">*</i>受理组:</label>    
                                    <Select
                                                showSearch
                                                style={{width: "69%",marginLeft:'10px',display:'inline-block'}}
                                                placeholder="请选择处理组"
                                                optionFilterProp="children"
                                                onChange={this.selectGroup.bind(this)}
                                                name="Orderhandelgrounp"
                                               
                                            >
                                            {Orderhandelgrounps}
                                    </Select>                                                
                                    
                                </FormItem>
                                <FormItem className="OrderHandelMan" style={{width:'50%',float:'right'}}>
                                    <label htmlFor="Orderhandelman" style={{width:'60px'}}>受理人:</label>                                                                             
                                        <Select
                                                showSearch
                                                style={{width: "69%",marginLeft:'10px',display:'inline-block'}}
                                                placeholder="请选择受理人"
                                                optionFilterProp="children"
                                                onChange={this.HandelManAndStatus.bind(this)}
                                                name="Orderhandelman"
                                            >
                                            {OrderhandelMans}
                                        </Select>                             
                     
                                </FormItem>
                                <div className="clear" style={{clear:'both'}}></div>
                                <FormItem className="OrderTemplate" style={{width:'100%'}} >
                                    <label htmlFor="Ordertemplate" style={{width:'60px'}}><i className="star">*</i>工单模板:</label>                                  
                                        <Select                
                                                style={{width: 400,marginLeft:'10px'}}
                                                placeholder="请选择模板"
                                                optionFilterProp="children"
                                                onChange={this.getOrderTemplates}
                                                name="Ordertemplate"
                                                onSelect={this.selectTemplate.bind(this)}
                                            >
                                            {OrderTemplates}
                                            </Select>                                    
                                </FormItem>                              
                                <hr/>
                                <FormItem className="OrderTemplate" style={{width:'80%',display:'block',textAlign:'right',marginTop:'270px'}} >
                                   {/* {this.state.OrderField}   */}
                                   {OrderFields}  
                                </FormItem> 
                                <FormItem className="OrderTemplate" style={{width:'80%',display:'block',textAlign:'right',marginTop:'270px'}} >
                                    <button onClick={this.props.OrderClose} style={cancelBtn}>取消</button>
                                    <button onClick={this.checkAndSend.bind(this)} style={{...cancelBtn,background:'#2f7af4',color:'#fff'}}>保存</button>                       
                                </FormItem>                                                  
                        </Form>
                        
                    </div>
                </div>
            </div>
          
        )
    }
//     componentDidMount(props,state){
//         // 获取客户
//         fetch(`${GAPIURL}/wo/workorder/customerAndGroupShow/kf_1000`).then((res)=>{
//            return res.json()
//        }).then((resultData)=>{ 
//            this.setState({
//                Customers:resultData.customer   
//            })
//            console.log(props)
//            console.log(resultData.customer)
//        }).catch((err)=>{
//            console.log(err)
//        })
//    }
   
   
}
export default WorkOrderAdd

