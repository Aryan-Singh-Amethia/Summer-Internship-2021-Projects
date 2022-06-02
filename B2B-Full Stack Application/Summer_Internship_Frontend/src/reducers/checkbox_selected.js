export const d={
    check_data:[]
}
const checkdata = (state = d, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "DATA_ADD":
        let nd=[...state.check_data]
        return ({...state, 
            check_data: [...nd, action.payload]
        })
      case "DATA_REMOVE":
        let nd1=[];
        let i;
        for(i = 0; i < state.check_data.length; i++){
            if(action.payload!==state.check_data[i]){
                nd1=[...nd1,state.check_data[i]];
            }
        }
        return ({...state,
            check_data:[...nd1]
        });
      case "DATA_CLEAR":
        return ({...state,
            check_data:[]
        });
      default:
        return state;
    }
  };
  export default checkdata;