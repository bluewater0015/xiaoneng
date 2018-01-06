import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {  Button,Input,Form } from 'antd';
import './editForm.less';
const FormItem = Form.Item;

//重新排序
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

//使用内联样式助手


const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
   background: isDragging ? 'lightgreen' : 'grey',
   ...draggableStyle,
 });
const getListStyle = isDraggingOver => ({
  width:275, 
  marginLeft:45,
});
export default class Drag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.dargValue,
            addValue:''
          };
        this.onDragEnd = this.onDragEnd.bind(this);
        console.log(this.props)
    }
    addOptions(){
      if(this.state.addValue===''){
        return;
      }else{
        let afterAdd = this.state.items.concat( 
          {id:`item-${this.state.items.length}`, content:this.state.addValue}
        )
        let afterAddJSON = JSON.stringify(afterAdd)
        this.props.getfieldContent(afterAddJSON)
        this.setState({
              items:afterAdd
        })

      }
    
    }
    newOptions(e){
        this.setState({
            addValue:e.target.value
        }) 
     }
     deleteOptions(index){
        let afterDelete= this.state.items
        afterDelete.splice(index,1)
        this.props.getfieldContent(afterDelete)
        this.setState({
          items:afterDelete
        })
        
     }
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items,
        });
      }
      
      render() {
       
        return (
          <div style={
            (this.props.edit === '单选框')||(this.props.edit === '复选框')||(this.props.edit === '下拉列表') ? {display:'block'}:{display:'none'}}>
            <FormItem label="内容选项">     
              <Input placeholder='请输入要添加的内容' style={{width:'200px'}} onChange={this.newOptions.bind(this)}/>  
              <Button onClick={this.addOptions.bind(this)}>添加</Button>
            </FormItem>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div  ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                    {this.state.items.map((item,index) => (
                      <Draggable key={index} draggableId={item.id}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.dragHandleProps}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}>
                              <i key={`TUOZHUAI-${index}`} className='iconfont icon-paixu' style={{color:'#3c79f6'}}></i>
                              <p key={`VALUE-${index}`} className="draggInput" >{item.content}</p>
                              <i key={`DELETE-${index}`}  onClick={this.deleteOptions.bind(this,index)} style={{marginLeft:'25px',color:'#3c79f6'}}  className="iconfont  icon-cha"></i>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        );
      }
}