import React from 'react';
import {notification,DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker,Radio,Button} from 'antd';
import moment from 'moment';
import { APIURL } from '../../ServerConfig';
import editor from '../../image/editor.png'
const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

const format = 'HH:mm';
let template = null;
class FieldType extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            fieldsData:[],
            type: "",
            typeName:"",
            typeDesc:"",
            typeId:"",
            editDescCount:0,
            editNameCount:0,
            nameDisabled:false,
            descDisabled:false
        }
    };

    componentDidMount() {
        this.setState({
            fieldsData: JSON.parse("[{\"typeId\":1,\"typeName\":\"单行文本\",\"typeDesc\":\"单行文本\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":2,\"typeName\":\"多行文本\",\"typeDesc\":\"多行文本\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":3,\"typeName\":\"富文本\",\"typeDesc\":\"富文本\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":4,\"typeName\":\"下拉列表\",\"typeDesc\":\"下拉列表\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":5,\"typeName\":\"日期时间\",\"typeDesc\":\"日期时间\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":6,\"typeName\":\"日期\",\"typeDesc\":\"日期\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":7,\"typeName\":\"时间\",\"typeDesc\":\"时间\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":8,\"typeName\":\"电话\",\"typeDesc\":\"电话\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":9,\"typeName\":\"数值\",\"typeDesc\":\"数值\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":10,\"typeName\":\"整数\",\"typeDesc\":\"整数\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":11,\"typeName\":\"单选框\",\"typeDesc\":\"单选框\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":12,\"typeName\":\"复选框\",\"typeDesc\":\"复选框\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":13,\"typeName\":\"链接\",\"typeDesc\":\"链接\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":14,\"typeName\":\"主-详细信息关系\",\"typeDesc\":\"主-详细信息关系\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":15,\"typeName\":\"地理定位\",\"typeDesc\":\"地理定位\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":16,\"typeName\":\"百分比\",\"typeDesc\":\"百分比\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"},{\"typeId\":17,\"typeName\":\"电子邮件\",\"typeDesc\":\"电子邮件\",\"ifUse\":1,\"createTime\":\"2017-11-2109: 54: 10\"}]")
        })
    }
    openNotification = (msg,desc) => {
        notification.open({
          message: msg,
          description: desc,
        });
      };
    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const formData = this.props.form.getFieldsValue();
                formData.siteId = "kf_1000";
                formData.userId = "kf_1000_admin";
                formData.fieldSign = "field44";
                switch(this.state.type){
                    case "1":
                    case "2":
                    case "3":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                    case "10":
                    case "13":
                    case "15":
                    case "16":
                    case "17":
                        formData.fieldContent = "111";
                        break;
                }
                fetch(`${APIURL}/wo/woField/insertField`, {
                    method: 'POST',
                    body: JSON.stringify( formData ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
            }).then((response) => {
                    return response.json()
                }).then((res)=>{
                    if(res.promitData==='该字段已经存在'){
                        this.openNotification('新建失败','该字段已经存在')
                    }else if(res.data==='success'){
                        this.openNotification('新建成功','返回列表页')
                        this.props.closeModal()
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    };

    handleCancel = () => {
        this.props.closeModal();
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }
    handleTypeNameChange= () =>{
        this.setState({
            typeName:"",
        });
    }
    //提示信息
    handleChange = (getvalue) => {
        this.setState({
            type: getvalue,
        });
    }

    checkFieldName(e){
        this.setState({
            editNameCount:e.target.value.length,
        })
       if(e.target.value.length>50){
            this.setState({
                helpName:"您输入的字符长度过长,最大长度是50个字符",
                nameDisabled:true
            })   
       }else{
            this.setState({
                helpName:"",
                nameDisabled:false
            }) 
       }
    }
    
    checkFieldDesc(e){
        this.setState({
            editDescCount:e.target.value.length
        })
        if(e.target.value.length > 100){
            this.setState({
                 helpDesc:'您输入的字符长度过长，最大长度是100个字符',
                 descDisabled:true
            })
        }else{
         this.setState({
                helpDesc:'',
                descDisabled:false
             }) 
        }
        
    }


    render() {
        //链接的开头和结尾
        const selectBefore = (
            <Select defaultValue="Http://" style={{width: 80}}>
                <Option value="Http://">Http://</Option>
                <Option value="Https://">Https://</Option>
            </Select>
        );
        const selectAfter = (
            <Select defaultValue=".com" style={{width: 70}}>
                <Option value=".com">.com</Option>
                <Option value=".jp">.jp</Option>
                <Option value=".cn">.cn</Option>
                <Option value=".org">.org</Option>
            </Select>
        );
        switch (this.state.type) {
            case "1": 
                template = <Input placeholder="00000" disabled/>;
                break;
            case "2":  
                template = <TextArea placeholder="11111" disabled/>;
                break;
            case "3":  
                 template = <div style={{border:'1xp solid red',width:'200px',height:'300px'}}><img src={editor}/></div>
                break;
            case "4":  
                template = <Select defaultValue={'下拉列表'}  disabled/>;
                break;
            case "5":      
                template = <DatePicker disabled/>;
                break;
            case "6":      
                template = <DatePicker format="MM-DD" disabled/>;
                break;
            case "7":      
                template = <TimePicker defaultValue={moment('12:08', format)} format={format} disabled/>;
                break;
            case "8":      
                template = <Input placeholder="请输入电话号码" disabled/>;
                break;
            case "9":      
                template = <Input placeholder="请输入数值" disabled/>;
                break;
            case "10":     
                template = <Input placeholder="请输入整数" disabled/>;
                break;
            case "11":     
                template =<div> 
                    <Radio disabled={true} defaultChecked={true}>选项1</Radio>
                    <Radio disabled={true}>选项2</Radio>
                    </div>;
                break;
            case "12":     
                template =<div><Radio disabled={true} defaultChecked={true}>选项1</Radio><Radio disabled={true} defaultChecked={true}>选项2</Radio></div>;
                break;
            case "13":     
                template = <div style={{marginBottom: 16}}>
                    <Input addonBefore={selectBefore} addonAfter={selectAfter}
                           defaultValue="mysite" disabled/></div>;
                break;
            case "14":     
                template =<div>
                    <Select defaultValue='北京' style={{width:'120px'}}  disabled={true}/>
                    <Select defaultValue='海淀' style={{width:'120px',margin:'0px 10px'}} disabled={true}/>
                    <Select defaultValue='宝盛广场' style={{width:'120px'}} disabled={true}/>
                    </div>
                break;
            case "15":     
                template = ''
                break;
            case "16":     
                template = <InputNumber disabled={true} formatter={value => `${value}%`} defaultValue={0}/>;
                break;
            case "17":    
                template = <Input placeholder="http:www.XXX.XX" disabled/>;
                break;
            default:
                template = null;
        }

        const {getFieldDecorator} = this.props.form;

        //下拉列表数据展示
        const fieldOptionShow = this.state.fieldsData.map((option, index) => {
            return <Option className="one-service" key={option.typeId}>{option.typeName}</Option>

        });
        return (
            <div>
                <Modal
                    title="新增字段"
                    visible={this.props.addModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit"
                        disabled={this.state.nameDisabled==false && this.state.descDisabled==false? false : true}
                         type="primary" loading={this.state.loading} onClick={this.handleOk}>
                          保存
                        </Button>,
                      ]}
                >
                    <Form className="setFields" >
                        <FormItem  className="fieldName" style={{marginTop:'20px'}} help={this.state.helpName}>
                            <label htmlFor="fieldName">字段名称:</label>
                            {getFieldDecorator('fieldName')(
                                <Input placeholder="字段名称" name="fieldName" onChange={this.checkFieldName.bind(this)}/>
                            )}
                            <span style={{position:'relative',top:'0px',left:'90%', color:'#4073f2'}}>{`${this.state.editNameCount}/50`}</span>                         
                        </FormItem>

                        <FormItem className="description" help={this.state.helpDesc} >
                            <label htmlFor="fieldDesc">字段描述:</label>
                            {getFieldDecorator('fieldDesc')(
                                <TextArea placeholder="字段描述" name="typeDesc" onChange={this.checkFieldDesc.bind(this)}/>
                            )}
                              <span style={{position:'relative',top:'0px',left:'90%', color:'#4073f2'}}>{`${this.state.editDescCount}/100`}</span>
                        </FormItem>
                        <FormItem className="fieldType" style={{marginTop:"20px"}}>
                            <label htmlFor="typeId">字段类型：</label>
                            {getFieldDecorator('typeId')(
                                <Select
                                    showSearch
                                    style={{width: 200}}
                                    placeholder="请选择字段类型"
                                    optionFilterProp="children"
                                    onChange={this.handleChange}
                                    name="typeId"
                                >
                                    {/*将下拉列表循环展示*/}
                                    {fieldOptionShow}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem className="textModal">
                            {template}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export const FieldTypeForm = Form.create()(FieldType);

