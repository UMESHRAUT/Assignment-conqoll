import { LIST_GET_FAIL, LIST_GET_REQUEST, LIST_GET_SUCESS, SHORT_LIST_FAIL, LIST_GET_API_SUCESS,LIST_GET_API_FAIL, LIST_GET_API_REQUEST, ADD_TO_SHORT_LIST, LIST_DELETE, ADD_TO_LIST, DELETE_FROM_SHORT_LIST } from "./constants";

function ListReducer(state={data:[]},action){
    switch (action.type) {
        case LIST_GET_REQUEST:
            return {loading:true};
        case LIST_GET_SUCESS:
            return {loading:false,data:action.payload}
        case LIST_GET_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

function permanentListReducer(state={data:[]},action){
    switch (action.type) {
        case LIST_GET_API_REQUEST:
            return {loading:true};
        case LIST_GET_API_SUCESS:
            return {loading:false,data:action.payload}
        case LIST_GET_API_FAIL:
                return {loading:false,error:action.payload}
        case ADD_TO_LIST:
            console.log(state.data);
            console.log(action.payload);
            return {data:[action.payload,...state.data]}
        case LIST_DELETE:
            return {data:[...state.data.filter(d=>d.City!==action.payload.City)]}
        default:
            return state;
    }
}


function ShortListReducer(state={data:[]},action){
    switch (action.type) {

        case ADD_TO_SHORT_LIST:
            return {data:[...state.data,action.payload]}
        case DELETE_FROM_SHORT_LIST:
            return {data:[...state.data.slice(0,action.payload) ,...state.data.slice(action.payload+1)]}
        case SHORT_LIST_FAIL:
            return {error:action.payload}
        default:
            return state
    }
}

export {ListReducer,ShortListReducer,permanentListReducer}