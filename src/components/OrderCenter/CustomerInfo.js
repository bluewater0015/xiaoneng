import React from "react";
import {Form, Input,Select} from 'antd';
// import moment from 'moment';
// import { GAPIURL } from '../../ServerConfig';
import  "./OrderCenterStyle/CustomerInfo.less"
const FormItem = Form.Item;
// const {TextArea} = Input;
const Option = Select.Option;

class CustomerInfo extends React.Component{
    constructor(props,context){
        super(props,context)
       // console.log(props)
        this.state={
            // visible:false,
            loading:false,
            OrderUserNameNum:'',
            newOrderUserName:'',
            helpName:'',
            OrderUserNameNum2:'',
            newOrderUserName2:'',
            helpName2:'',
            userTel:'',
            tipTel:'',
            UserEmail:'',
            tipEmail:'',
            newOrderLevel:'',
            companyName:'',
            companyNum:'',
            tipCompany:'',
            userAddress:'',
            userAddressNum:'',
            tipUserAddress:'',
            customerProvince:'',//省
            customerCity:''//市
        }
    }

   
    //客户信息窗口关闭
    customerClose = () =>{
        this.props.customerClose()
    }

    //检测用户名
    
    checkUserName(e){
        this.setState({
            newOrderUserName:e.target.value,
            OrderUserNameNum : e.target.value.length
        })
       this.props.callback(e.target.value)

         //console.log(e.target.value)
        if(e.target.value.length>20){
            this.setState({   
                helpName:'用户名过长,最多20字符',
            }) 
        }else if(e.target.value.length<=20 &&e.target.value.length>0){
            this.setState({
                helpName:''
            })
          
        }else if(e.target.value===""){
            this.setState({
                helpName:'不能为空'
            })           
        }
    }
    checkUserName2(e){
        this.setState({
            newOrderUserName2:e.target.value,
            OrderUserNameNum2 : e.target.value.length
        })
        this.props.callbackFullName(e.target.value)
        if(e.target.value.length>10){
            this.setState({   
                helpName2:'姓名过长,最多10字符',
            })
        }else if(e.target.value.length<=10){
            this.setState({
                helpName2:''
            })       
        }
    }
    //检查手机
    checkTel(e){
        this.setState({
            userTel:e.target.value,
            tipTel:''
        })
       
        //console.log(e.target.value)
         let regTel=/^[0-9]{6,11}$/g
      
        if(regTel.test(e.target.value)){
            this.setState({
                tipTel:'',
                userTel:e.target.value,
            })
             this.props.callbackTel(e.target.value)
        }else if(e.target.value===""){
            this.setState({
                tipTel:'',
                
            })
           
        }
        else{
            this.setState({
                tipTel:'请您重新输入号码'
            })     
        }  
    }
    checkTel2(e){
        this.setState({
            tipTel:''
        })
    }
   
    //检查邮箱
    checkEmail(e){
        this.setState({
            UserEmail:e.target.value,
            tipEmail:''
        })
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
        if(reg.test(e.target.value)){
            this.setState({
                tipEmail:'',
                UserEmail:e.target.value,
            })  
             this.props.callbackEmail(e.target.value)  
        }else if(e.target.value===""){
            this.setState({
                tipEmail:''
            })
        }
        else{
            this.setState({
                tipEmail:'请您重新输入邮箱'
            })     
        }  
    }
    checkEmail2(e){
        this.setState({
          
            tipEmail:''
        })
    }
    
    //获取客户等级内容
   
    handleChange(value) {
        // console.log(value);
        this.setState({
            newOrderLevel:value
        })
         this.props.callbackLevel(value)
       // console.log(this.state.newOrderLevel)
      }
    //椒盐公司
    checkCompany(e){
        this.setState({
            companyName:e.target.value,
            companyNum:e.target.value.length,
            tipCompany:''
        })
         this.props.callbackCompany(e.target.value)  
        if(e.target.value.length>50){
            this.setState({
                tipCompany:'公司名称过长'
            })
        }else if(e.target.value.length<50){
            tipCompany:''
        }
    }
     //椒盐住址
     checkUserAddress(e){
        this.setState({
            userAddress:e.target.value,
            userAddressNum:e.target.value.length,
            tipUserAddress:''
        })
         this.props.callbackAddress(e.target.value)  
        if(e.target.value.length>50){
            this.setState({
                tipUserAddress:'住址名称过长'
            })
        }else if(e.target.value.length<50){
            tipUserAddress:''
        }
    }
   
   
    render(){
       
        let lableStyle={
            display: 'inlineBlock',
            width:'80px',
            textAlign:'right',
        }
        let InputStyle={
            width:'75%',
            marginLeft: '10px'

        } 
        return( 
                
                    <Form className="setFields" >
                        <FormItem  className="fieldName" style={{marginTop:'20px'}} help={this.state.helpName}>
                            <label style={lableStyle} htmlFor="fieldName"><i className="star">*</i>用户名:</label>                         
                                <Input   onBlur={this.checkUserName.bind(this)} name="fieldName" style={InputStyle}/>                            
                        </FormItem>
                        <FormItem className="description" help={this.state.helpName2} >
                            <label style={lableStyle} htmlFor="CustomerName">姓名:</label>
                            <Input  onBlur={this.checkUserName2.bind(this)} name="CustomerName" style={InputStyle}/>
                        </FormItem>
                        <FormItem className="description" help={this.state.tipTel} >
                            <label  style={lableStyle} htmlFor="CustomerTel" >手机号:</label>
                            <Input   type="text" name="CustomerTel" style={InputStyle} onFocus ={this.checkTel2.bind(this)} onBlur={this.checkTel.bind(this)} />         
                        </FormItem>
                        <FormItem className="description" help={this.state.tipEmail} >
                            <label  style={lableStyle} htmlFor="userEamil">邮箱:</label>
                            <Input name="userEamil" type="text" style={InputStyle}  onFocus ={this.checkEmail2.bind(this)} onBlur={this.checkEmail.bind(this)}/>
                        </FormItem>
                        <FormItem style={{marginTop:'15px'}} >
                            <label style={lableStyle} htmlFor="">客户等级:</label>                                                                             
                                <Select style={{display:'inlineBlock', width:'75%',marginLeft: '10px' }} defaultValue="0" onChange={this.handleChange.bind(this)}>                            
                                    <Option style={{ width: '100%' }} value="0">普通</Option>
                                    <Option value="1">VIP</Option>
                                    <Option value="2">特殊</Option>
                                </Select>                                                                             
                        </FormItem>
                        <FormItem className="description" help={this.state.tipCompany} >
                            <label style={lableStyle} htmlFor="usercompany">公司名称:</label>
                            <Input  name="usercompany" style={InputStyle} onBlur={this.checkCompany.bind(this)}/>         
                        </FormItem>
                        <FormItem className="description"  >
                            <label style={lableStyle} htmlFor="sheng">省市:</label>
                            <Input  name="sheng" style={InputStyle}/>
                        </FormItem>
                        <FormItem className="description" help={this.state.tipUserAddress} >
                            <label style={lableStyle} htmlFor="address">详细地址:</label>
                            <Input  name="address" style={InputStyle} onBlur={this.checkUserAddress.bind(this)}/>
                        </FormItem>                       
                    </Form>                
        )
    }
    componentWillReceiveProps(props,state){
        console.log(props)
        if(props.clearCusInfo==true){
            console.log(0)
            this.setState({              
                newOrderUserName:'',
                helpName:'',              
                newOrderUserName2:'',
                helpName2:'',
                userTel:'',
                tipTel:'',
                UserEmail:'',
                tipEmail:'',
                newOrderLevel:0,
                companyName:'',
                tipCompany:'',
                userAddress:'',   
                tipUserAddress:'',
                customerProvince:'',//省
                customerCity:""
            })
        }
    }

    
}

export default CustomerInfo;