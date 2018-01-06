import React from 'react';
import {  Button,Input,Form,Radio,TreeSelect,Select} from 'antd';
import Drag from './Drag.js'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class CustomizedForm extends React.Component {
    constructor(props){
        super(props)
        this.state={
            editNameCount:0,
            editDescCount:0,
            addFieldContent:[],
            w:false,
            q:false
        }
    }
    getfieldContent(filedContentValue){
        this.props.getFieldContent(filedContentValue)
    }


    checkFieldName(e){
        this.setState({
            editNameCount:e.target.value.length,
        })
       if(e.target.value.length>50){
            this.setState({
                helpName:"您输入的字符长度过长,最大长度是50个字符",
            })   
            this.props.getFieldName(e.target.value,true)
       }else if(e.target.value.length<=50){
            this.setState({
                helpName:"",
            }) 
            this.props.getFieldName(e.target.value,false)
       }
    }
    
    checkFieldDesc(e){
        this.setState({
            editDescCount:e.target.value.length
        })
        if(e.target.value.length > 100){
            this.setState({
                 helpDesc:'您输入的字符长度过长，最大长度是100个字符',
            })
            this.props.getFieldDesc(e.target.value,true)
        }else if(e.target.value.length <= 100){
            this.setState({
                  helpDesc:'',
             }) 
            this.props.getFieldDesc(e.target.value,false)
        } 
    }
    render(){
        const {edit,form} = this.props;
        return(
            
            <Form className='form'>  
                <FormItem  label="字段名称"    help={this.state.helpName}>  
                    {form.getFieldDecorator('Name', { initialValue: edit.fieldName})(  
                        <Input onChange={this.checkFieldName.bind(this)} className="FieldNameInputStyle"/>  
                    )}
                    <span className="TextPromptStyle" style={{}}>{this.state.editNameCount}/50</span>
                </FormItem>  
                <FormItem label="字段描述"  help={this.state.helpDesc}>
                {form.getFieldDecorator('Desc', { initialValue: edit.fieldDesc })(  
                        <Input.TextArea style={{height:'100px',resize:'none'}}  onChange={this.checkFieldDesc.bind(this)} className="TextAreaInputStyle"/>  
                )}
                <span className="TextPromptStyle">{this.state.editDescCount}/100</span>
                </FormItem>
                <FormItem label="字段类型" style={{}}>
                    <span >{edit.typeName}</span>
                </FormItem>
                <div  style={edit.typeName === '单选框' ? {display:'block'} :{display:'none'}}>
                    <Radio disabled={true}   defaultChecked={true} value={1}>选项1</Radio>
                    <Radio disabled={true}   value={2}>选项2</Radio>
                </div>
                <div style={edit.typeName === '复选框' ? {display:'block'} :{display:'none'}}>
                    <Radio disabled={true} defaultChecked={true} value={1}>选项1</Radio>
                    <Radio disabled={true} defaultChecked={true} value={2}>选项2</Radio>
                </div>
                <div style={edit.typeName === '下拉列表' ? {display:'block'} :{display:'none'}}>
                    <TreeSelect style={{ width: 300 }} placeholder="下拉列表" disabled={true}/>
                </div>
                <div style={edit.typeName==='主-详细信息关系'? {display:'block'} :{display:'none'}}>
                    <Select style={{ width: 100 }} placeholder="北京市" disabled={true}/>
                    <Select style={{ width: 100,margin:'0px 10px' }} placeholder="海淀区" disabled={true}/>
                    <Select style={{ width: 100 }} placeholder="宝盛广场" disabled={true}/>
                </div>
                <Drag getfieldContent={this.getfieldContent.bind(this)} dargValue={this.state.addFieldContent} edit={edit.typeName}/>
          </Form>  
        )
    }
}
export default  CustomizedForm = Form.create({})(CustomizedForm);
