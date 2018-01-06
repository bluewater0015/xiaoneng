import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './index.less'
import '../../font/iconfont.css'

const nav = [  
    {
        name: "工单",
        className:'zidingyi',
        router:"/CustomField",
        SunbMenu: [
            {
                child: "自定义字段",
                router:"/CustomField"
            },
            {
                child: "工单模板",
                router:"/Template"
            },
            {
                child: "触发器",
                router:"/Action"
            },
            {
                child: "全部工单",
                router:"/OrderCenter"
            }
        ]
    }
   
]
class SideBarWithoutRoute extends React.Component {
  constructor(props){
      super(props)
      this.state={
        currentIndex:0,
        SunbMenuIndex:0,
        siderWidth:true
       
       
      }
  }
  siderWidthChange = () => {
        this.setState({
            siderWidth:!this.state.siderWidth
        })
        this.props.getSiderWidth(this.state.siderWidth)
  }
  getCurrentindex = (index) =>{
    this.setState({currentIndex:index});
    if(!this.state.siderWidth){
        this.setState({
            siderWidth:true
        })
    
        this.props.getSiderWidth(this.state.siderWidth)
    }
  }

  getSubMenuCurrentindex =(index) =>{
      this.setState({SunbMenuIndex:index})
  }
  render(){
    let  currentIndex = this.state.currentIndex
    let  SubMenuCurrentindex= this.state.SunbMenuIndex
  return (
        <div>
            <ul>
            <i  onClick={this.siderWidthChange.bind(this)} className='iconfont icon-jiahao button'></i>
                {
                    nav.map((item,index)=>{
                    return(
                      <div key={`MENU_${index}`}  onClick={this.getCurrentindex.bind(this,index)}>
                            <Link to={item.router}>
                                <div style={{margin:'30px 10px'}} className={item.className}>
                                    <span className={currentIndex === index ? 'siderBorderShow':'siderBorder'}></span>
                                    <i className={`iconfont icon-${item.className}`} style={{marginLeft:'10px'}}></i>
                                </div>
                            </Link>
                         <div style={this.state.siderWidth ? {display:'block'} : {display:'none'}}>
                            <div className={currentIndex === index ? 'subMenuShow':'subMenuHidden'}>
                           
                                {
                                 item.SunbMenu && item.SunbMenu.map((submenuItem,submenuIndex)=>{
                                    return (    
                                        <Link to={submenuItem.router}>
                                            <div onClick={this.getSubMenuCurrentindex.bind(this,submenuIndex)} >
                                            
                                                <div key={`SUBMENU_${submenuIndex}`}>{submenuItem.child}</div>
                                                <span className={SubMenuCurrentindex === submenuIndex ? 'subMenuBorderShow':'subMenuBorderHidden'}></span> 
                                            </div>  
                                        </Link>    
                                      )
                                    })
                                }
                             </div>
                        </div>
                    </div>
                        )
                    })
                }
            </ul>
        </div>
      );
    }
  }
const SiderBar = withRouter(SideBarWithoutRoute);
export default SiderBar
