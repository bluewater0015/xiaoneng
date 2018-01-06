let defaultState = {
  siderWidth:false,
}
export default function reducer(state = defaultState,action){
        switch (action.type) {
          case "SIDER_WIDTH_CHANGE":
            return Object.assign({},state,{siderWidth:!state.siderWidth});
        default:
          return state;
    }
}
