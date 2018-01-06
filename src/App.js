import React, { Component } from 'react';
import { createStore ,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Route} from 'react-router-dom'
import { Layout } from 'antd';
import reducer from './components/Sider/reducer'
import SiderBar from './components/Sider/SiderBar'
import Template from './components/Template/Template'
import Default from './components/Default'
import Customfield from  './components/CustomField/index';
import TemplateAdd from './components/Template/TemplateAdd'
import './App.less'
import TemplateEdit from './components/Template/TemplateEdit';
import OrderCenter from './components/OrderCenter/OrderCenter'

const { Sider } = Layout;
let store = createStore(reducer,applyMiddleware(logger));
class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      siderWidth:false
    }
  }
  getSiderWidth(value){
    this.setState({
        siderWidth:value
    })
  }
  render() {
    let siderStyleConfig = {
      background:'#ffffff',
      borderRight:'5px solid #f9fcfe',
      height:'100vh',
      float:'left'
    }
    let siderWidth = this.state.siderWidth ? 60  : 200
    return (
      <Layout style={{background:'#edf4fa'}}>
        <Provider store = {store}>
              <Router>
                <div>
                    <Sider width={siderWidth} style={siderStyleConfig}>
                      <SiderBar getSiderWidth={this.getSiderWidth.bind(this)}/>
                    </Sider>
                    <Layout>
                      <Route exact path="/" component={Default}/>
                      <Route exact path="/CustomField" component={Customfield}/>
                      <Route exact path="/Template" component={Template}/>
                      <Route exact path="/Template/Edit" component={TemplateEdit}/>
                      <Route exact path="/Template/Add" component={TemplateAdd}/>
                      <Route exact path="/OrderCenter" component={OrderCenter}/>
                    
                    </Layout>
                </div>
              </Router>
        </Provider>
      </Layout>
    )
  }
}
export default App
