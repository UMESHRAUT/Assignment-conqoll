import Axios from "axios"
import { ADD_TO_LIST, ADD_TO_SHORT_LIST, DELETE_FROM_SHORT_LIST, LIST_DELETE, LIST_GET_API_FAIL,LIST_GET_API_SUCESS, LIST_GET_FAIL, LIST_GET_REQUEST, LIST_GET_SUCESS, SHORT_LIST_FAIL} from "./constants"

export const getList=({State,District,City})=>async(dispatch,getState)=>{
    const data=getState();
    const list=data.permanentList.data;
    try {
        dispatch({type:LIST_GET_REQUEST})
        const A=list.filter(item => item["State"].includes(State));
        const B=A.filter(item => item["District"].includes(District));
        const C=B.filter(item => item["City"].toLowerCase().includes(City.toLowerCase()));
        dispatch({type:LIST_GET_SUCESS,payload:C}) 
        
    } catch (error) {
        dispatch({type:LIST_GET_FAIL,payload:"Error to fetch data"})
    }
}

export const availableList=()=>async(dispatch)=>{
    try {
        const list=await Axios("https://api.jsonbin.io/b/5f6f36127243cd7e824413e1")

        dispatch({type:LIST_GET_API_SUCESS,payload:list.data})
        dispatch({type:LIST_GET_SUCESS,payload:list.data})  
    } catch (error) {
        dispatch({type:LIST_GET_API_FAIL,payload:"Error to fetch data"})
    }
}

export const deleteFromShortList=(data,key)=>async(dispatch)=>{
    try {
        dispatch({type:ADD_TO_LIST,payload:data})
        dispatch({type:DELETE_FROM_SHORT_LIST,payload:key})
    } catch (error) {
        dispatch({type:SHORT_LIST_FAIL,payload:"Error to fetch data"})
    }
}

export const shortList=(data,key)=>async(dispatch)=>{
    try {
        dispatch({type:ADD_TO_SHORT_LIST,payload:data})
        dispatch({type:LIST_DELETE,payload:data})
    } catch (error) {
        dispatch({type:SHORT_LIST_FAIL,payload:"Error to fetch data"})
    }
}