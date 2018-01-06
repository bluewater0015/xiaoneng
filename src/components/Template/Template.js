import React, { Component } from 'react';
import { Table ,Modal, Button} from 'antd';
import { APIURL } from'../../ServerConfig';
import { Link } from 'react-router-dom'
export default class Template extends Component {
    constructor(props){
        super(props)
        this.state={
            page:1,
            templateId:1,
        }
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
        let page = this.state.page
        this.getData(`${APIURL}wo/woTemplet/findAllTemplets/kf_1000/${page}/500`)
      }
      //删除模板
      deleteTemplate(id){
        let templateId = this.state.templateId
        fetch(`${APIURL}wo/woTemplet/delTemplet/${id}`)
        .then((res)=>{
            if(res.status === 200){
                this.getData(`${APIURL}wo/woTemplet/findAllTemplets/kf_1000/${this.state.page}/500`)
            }else{
                console.log('模板删除异常')
            }
        })
      }
      //模板搜索
      searchTemplate(e){
        let searchValue = e.target.value
        let page = this.state.page
            fetch(`${APIURL}wo/woTemplet/searchTemplets`,{
              method: 'POST',
              body: `siteId=kf_1000&templetName=${searchValue}&pageIndex=${page}&pageSize=500`,
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then((res)=>{
              return  res.json()
            }).then((resoult)=>{
              this.setState({
                  fetchTemplateData:resoult.data,
                  total:resoult.totalNumber
                }) 
            })
        }
    render(){
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
          const columns = [{
            title: '模板名称',
            dataIndex: 'templetName',
            key: 'name',
          }, {
            title: '模板描述',
            dataIndex: 'templetDesc',
            key: 'age',
          },{
            title: '操作',
            key: 'action',
            render:(text,record)=>{
                return <div>
                        <Link to="/Template/Edit">
                                <span style={{marginRight:'10px',color:'blue'}} >编辑</span>
                        </Link>
                        <span onClick={()=>{
                            this.deleteTemplate(record.templetId)
                        }} style={{color:'blue'}}>删除</span>
                    </div>
            }
          }
        ]
        return(
        <div style={{width:'80vw',height:'100vh',padding:'20px',background:'#edf4fa'}}>
            <div>工单模板</div>
            <div style={{paddingRight:"10px",textAlign:"right"}}>
                <button className="addFields">
                  <Link to='/Template/Add'> <i className="iconfont icon-jiahao"></i> 新增模板</Link>
                </button>
                <input  onChange={this.searchTemplate.bind(this)}  style={searchStyle} placeholder='请输入要搜索的字段'/>
                {/* <i className='iconfont icon-sousuo'></i> */}
                <button style={searchButtonStyle}>搜索</button>
          </div>
        <Table
        columns={columns}
        dataSource={this.state.fetchTemplateData}
        style={{padding:'20px',width:'80vw'}}
        ></Table>
        </div>
        )
    }
}