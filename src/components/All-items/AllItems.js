import './AllItems.css'
import React, { useEffect, useState } from 'react'
import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { shortList, getList} from '../../redux/actions';
import { LIST_DELETE } from '../../redux/constants';
import AddIcon from '@material-ui/icons/Add';
import { Icon, IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ClearIcon from '@material-ui/icons/Clear';
function AllItems() {
    const listData = useSelector(state => state.listData);
    const {loading,data,error}=listData;
    const dispatch = useDispatch();

    const[sortBy,SetSortBy]=useState({
        State:"",
        District:"",
        City:""
    })

    const handleChnage=async(e)=>{
        const{name,value}=e.target;
        SetSortBy(prev=>{
            return {...prev,[name]:value}
        })
        if(value==""){
            dispatch(getList(sortBy))
        }
    }       

    useEffect(() => {
        
        dispatch(getList(sortBy))
        return () => {
            // cleanup
        }
    }, [sortBy,dispatch])


    const handleShortList=(d,index)=>{
            dispatch(shortList(d,index))
            dispatch(getList(sortBy));
    }
    return (
        <div>
            <div className="filter">
            <label className="label">filter by -</label>

            <div className="chart">
            <div>
                <label>State:</label>
            <select value={sortBy.State} name="State" onChange={handleChnage} className="sort"> 
            {sortBy.State===""&&<option value="">Select</option>}       
        {[...new Map(data?.map(item =>[item['State'], item]))
            .values()]
            .map((l,index)=><option key={index} value={l.State}>{l.State}</option>)}
            <option value="">All</option>
            </select>
            </div>
            <div>
                <label>District:</label>
                <select value={sortBy.District} name="District" onChange={handleChnage} className="sort">  
                {sortBy.District===""&&<option value="">Select</option>}       
        {[...new Map(data?.map(item =>[item['District'], item])).values()]
            .map((l,index)=><option key={index} value={l.District}>{l.District}</option>)}
            <option value="">All</option>

            </select>
            </div>
            <div>
                <label>city:</label>
            <input type="text" value={sortBy.City} onChange={handleChnage} name="City" className="sort" placeholder="search for.."/>
            </div>
            <div>
                Shortlist / Remove
            </div>
            </div>
                <span>clear all</span>
                <IconButton>
                <ClearIcon  onClick={()=>SetSortBy({State:"",District:"",City:""})}/>
                </IconButton>
            </div>
        <div style={{width:"100vw", height:"90vh", outline:"none"}} className="container">
            {loading&&<div>Loading..</div>}
            {error&&<div>{error}</div>}
            {data&&
            <AutoSizer>
                {({width,height})=>(
            <List 
            width={width} 
            height={height}
            rowHeight={50}
            rowCount={data?.length ||0 }
            rowRenderer={({key,index,style})=>{
                const d=data?.[index];
                return <div key={key} style={style} className={"item"}>
                       <div>{d?.State}</div>
                        <div>{d?.District}</div>
                        <div>{d?.City}</div>
                    <div>
                        <IconButton>
                        <AddIcon onClick={()=>handleShortList(d,index)}/>
                        </IconButton>
                        <IconButton>
                            <RemoveCircleIcon onClick={()=>{dispatch({type:LIST_DELETE,payload:d});dispatch(getList(sortBy))} }/>
                        </IconButton></div>
                
                </div>
            }} />)}
            </AutoSizer>}
        </div>
    
        </div>
    )
}

export default AllItems
