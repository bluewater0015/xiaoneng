import React from 'react';
import {Table} from 'antd';
import { APIURL } from'../../ServerConfig';
import {Link} from 'react-router-dom'
import WorkOrderAdd from "./WorkOrderAdd"
import SelectColumns from "./SelectColumns"
import fetch from 'isomorphic-fetch';
import { GAPIURL } from '../../ServerConfig';
//工单中心首页列表
import { address } from '../../ServerConfig';
//导出
import { exAdress } from '../../ServerConfig';
class OrderCenter extends React.Component{
  constructor(props,context){
    super(props,context)
    this.state = {
      selectedRowKeys: [], 
      isWorkAddShow:'none',
      OrderThemeNum:0,
      columnX:false,
      page:1,
      searchValue:'',
      columnsData:'',
      isOrderFiels:true,
      array: [],
      datas: [],
    }
  }
  
  //给子组件传过去
  getColumnsData(value,option){
    this.setState({isOrderFiels:!this.state.isOrderFiels})
    console.log(`selected ${value}`);
    console.log(`selected ${option}`);
    console.log(this.state.isOrderFiels)
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  OrderShow(){this.setState({isWorkAddShow:"block"})};
  OrderClose(){this.setState({isWorkAddShow:"none"})};
  columnXToggle(){this.setState({columnX:!this.state.columnX})};
  columnXClose(){this.setState({columnX:false})};
  
  buttonControll(){
    if(this.state.descDisable===true||this.state.nameDisable===true){
        return true
    }else if(this.state.descDisable===false&&this.state.nameDisable===false){
        return false
    }
  }
  getFieldName(value,bool){
    this.setState({
      nowFieldName:value,
      nameDisable:bool
    })   
  }
  callBack(bool){
    console.log(bool)
    this.setState({disabled:bool})
  }
  handleEditCancel = () => {this.setState({editShow: false})}

  getSearchValue(e){
    let getSearchValue= e.target.value;
        this.setState({
          searchValue:getSearchValue
        })
        console.log(getSearchValue)
  }
  getData(url){
    let page = this.state.page
    fetch(url).then((res)=>{
        return res.json();
    }).then((resoult) => {
        this.setState({
            fetchTemplateData:resoult.data,
            total:resoult.totalNumber

        })
    })
    
  }
  componentWillMount(){
        //封装请求方法  /{siteId}/{pageIndex}/{pageSize}
       
  }
  componentDidMount() {
    //调用接口，请求工单中心首页列表页的数据
    //this.orderData();
    //console.log('array',this.state.array);

  }
  /*
   *  orderData 工单中心首页列表渲染
   *
   *  @param { string } siteId 站点
   *  @param { number } pageIndex 当前页下标
   *  @param { number } pageSize 每页的展示的条数
   *  @param { string } woTitle 模糊搜索字段，工单标题
   *  @param { string } userId 当前用户id
   *  @param { string } 选中的过滤器id，选中“全部工单” 传值为0
   */
  
  orderData() {
    let parm = {
      "siteId":"kf_1000",
      "filterId":1,
      "pageIndex":1,
      "pageSize":3,
      "userId":"kf_1000_006ed17e-031c-45b0-9652-7fec9bbbc304",
      "woTitle":null
    }
    fetch(`${address}/wo/workorder/findAllOrders`,{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(parm)
    }).then(res=>{
      //console.log('res',res);
      return res.json()
    }).then(data=>{
      console.log("工单中心页面的数据：",data);
      //var datas = [];
      //请求到的数据渲染在这里
      this.setState({
        array: data.woMsg
      },()=>{
        //console.log("array",this.state.array.length);
        //var datas = [];
      })
      //console.log("datas",this.state.datas)
    }).catch(err=>{
      console.log(err);
    })
  }
  /*
   *  exportEvent 工单中心首页导出事件，导出结果为Excel表
   *  
   *  
   */
  exportEvent() {
    console.log('导出');
    //var siteId = 'kf_1000';
    //var kfuserId = 'kf_1000_08c2b688-44ea-472b-80c9-217697b9de9f';
    //var woIds = 26;
    fetch(`${exAdress}/wo/dataExport/workorderExport/kf_1000/kf_1000_006ed17e-031c-45b0-9652-7fec9bbbc304?woIds=26`,{
      //method: 'GET',
      // headers:{
      //     'Content-Type': 'application/json'
      // },
      //body: JSON.stringify(parm)
    }).then(res=>{
      console.log('res',res);
      //return res.json()
    }).then(data=>{
      console.log("导出工单：",data);
    }).catch(err=>{
      console.log(err);
    })
  }
  /*
   *  deleteEvent 工单中心首页删除事件
   *  
   *  
   */
  deleteEvent() {
    console.log('删除')
    fetch(`${exAdress}/wo/workorder/delworkorder?woIds=26&kfuserId=kf_1000_006ed17e-031c-45b0-9652-7fec9bbbc304`,{
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
          //'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res=>{
      console.log('res',res);
      //return res.json()
    }).then(data=>{
      console.log("删除工单：",data);
    }).catch(err=>{
      console.log(err);
    })
  }
  render(){
    let ContentBox ={
      width:'100%',
      height:'100vh',
      position:'relative'
    }
      let addOrder={
          padding:'0 12px',
          height:'26px',
          lineHeight:'26px',
          border:'none',
          borderRadius:'13px',
          background:'#fff',
          color:'#2f7af4',
          marginRight:'15px',
          cursor:'pointer',
          outline:'none'
      }
      let selectColumn={  
          height:'26px',
          padding:'0 24px 0 12px',
          lineHeight:'26px',
          background:'#2f7af4',
          color:'white',
          border:'none',
          borderRadius:'13px',
          position:"relative",
          cursor:'pointer',
          outline:'none'
      }
      let triangleStyle = {      
          border:"5px solid transparent",
          borderTop:"5px solid #fff",
          lineHeight:"28px",
          position:'absolute',
          top:'12px',
          right:'10px'
      }
      let columnxSearch={
        borderRadius:'20px',
        width:'330px',
        height:'30px',
        border:'1px solid #e5e5e5',
        outline:'none',
        textIndent:'40px',
        margin:'20px auto'
      }
     
      const {edit,form} = this.props;
     // const {getFieldDecorator} = this.props.form;
      let pagination= {showSizeChanger:true,showQuickJumper:true}
      const columns = [{
          title: '工单编号',
          dataIndex: 'WorkOrderNum',
          key: 'Num'
        }, {
          title: '主题',
          dataIndex: 'WorkOrderTheme',
          key: 'Theme'
        },{
          title: '描述',
          dataIndex:'WorkOrderDes',
          key: 'Des'
        },{
          title: '工单渠道',
          dataIndex:'Where',
          key: 'Where'
        },{
          title: '状态',
          dataIndex:'Status',
          sorter: true,
          key: 'Status'
        },{
          title: '优先级',
          dataIndex:'CustomerLevel',
          sorter: true,
          key: 'CustomerLevel'
        },{
          title: '客户',
          dataIndex:'Customer',
          key: 'Customer'
        },{
          title: '创建人',
          dataIndex:'CreateMan',
          key: 'CreateMan'
        },{
          title: '受理人',
          dataIndex:'HandelMan',
          key: 'HandelMan'
        },{
          title: '受理组',
          dataIndex:'HandelTeam',
          key: 'HandelTeam'
        },{
          title: '创建时间',
          dataIndex:'CreateTime',
          sorter: true,
          key: 'CreateTime'
        }

      ]

      for (let i = 0; i < 5; i++) {
          this.state.datas.push({
              key: i,
              WorkOrderNum: 'this.state.array[i].woId',
              WorkOrderTheme: 'this.state.array[i].woTitle',
              WorkOrderDes: 'this.state.array[i].woDesc',
              Where: 'this.state.array[i].woChannel',
              Status: 'this.state.array[i].woStatus',
              CustomerLevel: 'this.state.array[i].woPriority',
              Customer: 'this.state.array[i].customerName',
              CreateMan: 'this.state.array[i].creatorName',
              HandelMan: 'this.state.array[i].acceptName',
              HandelTeam: 'this.state.array[i].groupName',
              CreateTime: 'this.state.array[i].createTime',
          });
      }
      // for (let i = 0; i < this.state.array.length; i++) {
      //     this.state.datas.push({
      //         key: i,
      //         WorkOrderNum: this.state.array[i].woId,
      //         WorkOrderTheme: this.state.array[i].woTitle,
      //         WorkOrderDes: this.state.array[i].woDesc,
      //         Where: this.state.array[i].woChannel,
      //         Status: this.state.array[i].woStatus,
      //         CustomerLevel: this.state.array[i].woPriority,
      //         Customer: this.state.array[i].customerName,
      //         CreateMan: this.state.array[i].creatorName,
      //         HandelMan: this.state.array[i].acceptName,
      //         HandelTeam: this.state.array[i].groupName,
      //         CreateTime: this.state.array[i].createTime,
      //     });
      //   }
      const { selectedRowKeys } = this.state;

      // table行选择框
      const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          onSelection: this.onSelection
      }
    const data = this.state.array;

        
      
      return(
         <div style={ContentBox}>
          <div style={{width:'80vw',height:'100vh',padding:'20px',background:'#edf4fa'}}>
              <div>全部工单</div>
              <div style={{float:'left',width:'330px',height:'30px',position:'relative',marginLeft: '20px'}}>
                  <input  style={columnxSearch} placeholder='请输入名称搜索' onChange={this.getSearchValue.bind(this)}/>
                  <i className='iconfont icon-sousuo' style={{position:'absolute',top:"24px",right:"300px"}}></i>
              </div>
              <div style={{float:'right',marginTop:'20px'}}>
                  <button style={addOrder} onClick = {this.OrderShow.bind(this)}>                       
                          <i className="iconfont icon-jiahao" style={{fontSize:"12px"}}></i>
                           新增工单                      
                  </button>

                  <button onClick={()=>this.exportEvent()} style={addOrder}> <i className="iconfont icon-daochu" style={{fontSize:"14px"}}></i> 导出</button>
                  {/*
                  <button style={addOrder}> <i className="iconfont icon-daoru" style={{fontSize:"14px"}}></i> 导入</button>
                  */}
                  <button onClick={()=> this.deleteEvent() } style={addOrder}> <i className="iconfont icon-shanchu" style={{fontSize:"14px"}}></i> 删除</button>
                  <button style={addOrder}> <i className="iconfont icon-piliangcaozuo" style={{fontSize:"14px"}}></i> 批量操作</button>
                  <button style={selectColumn} onClick = {this.columnXToggle.bind(this)}>列<i className="triangle" style={triangleStyle}></i></button>
              </div>                                                      
                  <Table
                      columns={columns}
                      rowSelection={rowSelection}
                      dataSource={this.state.datas}
                      pagination={pagination}
                      style={{width:'80vw',height:'85vh',padding:'20px 20px 0 20px',boxSizing:'border-box',overflowY:'auto',marginTop:'45px'}}
                      >                       
                  </Table>                 
                  <WorkOrderAdd  
                      AddOrder={this.state.isWorkAddShow} 
                      OrderClose={this.OrderClose.bind(this)} 
                      getFieldName={this.getFieldName.bind(this)}
                     
                      callBack={this.callBack.bind(this)}
                      edit={this.state.edit} /> 
                  <SelectColumns 
                      columnX={this.state.columnX}
                      OrderClose={this.columnXClose.bind(this)}
                      getColumnsData={this.getColumnsData.bind(this)
                     
                      }/>            
           </div>   
          </div>  
         
        
      )
  }
}
export default OrderCenter