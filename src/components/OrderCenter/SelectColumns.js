import React, { Children } from "react";

import { GAPIURL } from '../../ServerConfig';
import "./OrderCenterStyle/SelectColumns.less"
import { Select } from 'antd';

const Option = Select.Option;


// const children = [];
// for (let i = 10; i < 36; i++) {
// children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }

//选中的options
// function handleChange(value) {
// console.log(`selected ${value}`);
// }

class SelectColumns extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state={
            selectedRowKeys: [],
        
            columnsData:[],
            checked:false
        }
    }
   
    OrderClickCancel=() => {
        this.props.OrderClose()
    }
   
   
    //获取下拉列
    getColumnsData(){
        fetch(`${GAPIURL}/wo/workorder/workorderFieldShow/kf_1000/kf_1000_08c2b688-44ea-472b-80c9-217697b9de9f`).then((res)=>{
            return res.json()
        }).then((result)=>{
            this.setState({
                columnsData:result.showfieldS
            })
            console.log(result.showfieldS)
        }).catch((err)=>{
            console.log(err)
        })
    }
    // changeTitle(value){
    //     this.setState({
    //         checked:true
    //     })
    // }
    
    componentWillMount(){
        // this.getColumnsData()
    }
    render(){     
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
      let columnxSearch={
        borderRadius:'20px',
        width:'200px',
        height:'30px',
        border:'1px solid #e5e5e5',
        outline:'none',
        textIndent:'30px',
        margin:'20px auto'
      }
      const columnDatas=this.state.columnsData.map((item,index)=>{
          return(<Option className='Columns'  key={`COLUMN_${item.fieldId}`}>{item.fieldName}</Option>)
      })
        return(     
            <div id="columnx" style={this.props.columnX ? {display:'block'}:{display:'none'}}>                   
                {/* <input  style={columnxSearch} placeholder='请输入要搜索的字段'/>
                <i className='iconfont icon-sousuo' style={{position:'absolute',top:"22px",right:"47px"}}></i> */}

                <Select
                    mode="multiple"
                    // showSearch
                    style={{ width: '90%',height:'30px',margin:'20px auto',borderRadius:'20px' }}
                    placeholder="输入名称搜素"
                    //  onChange={handleChange}
                    onChange={this.props.getColumnsData}//当我点击时把选中的数据传给父组件了
                    //  onSelect={this.changeTitle.bind(this)}
                    //  onSelect={this.props.getColumnsData.bind(this)}
                    
                >
                    {columnDatas}
                    {/* {children} */}
                </Select>       
            </div>
          
          
        )
    }

}

export default SelectColumns

