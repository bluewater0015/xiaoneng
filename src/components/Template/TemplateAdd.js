import React, { Component } from 'react'
import {  Table,Button,Input,Form,Radio,TreeSelect,Select} from 'antd';
const FormItem = Form.Item;

export default class TemplateAdd extends Component{
    render(){
        const columns = [{
            title: '顺序调整',
            dataIndex: 'name',
            key: 'name',
            render: text => <i className='iconfont icon-paixu' style={{color:'#3c79f6'}}></i>,
          }, {
            title: '字段名称',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: '字段类型',
            dataIndex: 'address',
            key: 'address',
          },{
            title: '字段描述',
            dataIndex: 'address',
            key: 'address',
          },{
            title: '是否必填',
            dataIndex: 'name',
            key: 'name',
            render: text =>1213 ,
          },{
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            render: text =><a>删除</a> ,
          }
          ];
        return(
            
                <div style={{width:'80vw',height:'100vh',padding:'20px',background:'#edf4fa'}}>
                新增字段
                    <div style={{width:'70vw',height:'90vh',padding:'20px',background:'white'}}>
                    <Form>
                        <FormItem  label="模板名称">
                           <Input placeholder='请输入模板名称'/>
                        </FormItem>
                        <FormItem label="模板名称">
                           <Input.TextArea  placeholder='请输入模板描述'/>
                        </FormItem>
                    </Form>
                    <div>
                        字段列表
                        <Button>添加字段</Button>
                        <Button>预览</Button>
                    </div>
                    </div>
                    
                </div> 
        )
    }
}