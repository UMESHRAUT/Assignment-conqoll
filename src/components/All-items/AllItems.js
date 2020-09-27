import './AllItems.css'
import React, { useEffect, useState } from 'react'
import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { shortList, getList} from '../../redux/actions';
import { ADD_TO_LIST, LIST_DELETE } from '../../redux/constants';
import AddIcon from '@material-ui/icons/Add';
import { Icon, IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ClearIcon from '@material-ui/icons/Clear';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

function AllItems() {
    const listData = useSelector(state => state.listData);
    const {loading,data,error}=listData;
    const dispatch = useDispatch();

    const [err,setErr]=useState(false);

    const[sortBy,SetSortBy]=useState({
        State:"",
        District:"",
        City:""
    })

    //Turn on edit mode to add new data 
    const [editmode,setEditMode]=useState(false)

    // Change input filed data
    const handleChnage=async(e)=>{
        const{name,value}=e.target;
        SetSortBy(prev=>{
            return {...prev,[name]:value}
        })
        if(value===""){
            dispatch(getList(sortBy))
        }
    }       


    // to add new city
    const handleAddNew=(e)=>{
        e.preventDefault();
        if(sortBy.State!==""&& sortBy.District!=="" && sortBy.City!==""){
        dispatch({type:ADD_TO_LIST,payload:sortBy})
        setStateToDefault()
        }else{
            setErr("to add new city enter all details");
            setTimeout(() => {
                setErr(false);
            }, 3000);
        }
    }


    useEffect(() => {
        // get filtered data on every change on state
        dispatch(getList(sortBy))
        return () => {
            // cleanup
        }
    }, [sortBy,dispatch])


    //add row to shortlisted data 
    const handleShortList=(d,index)=>{
            dispatch(shortList(d,index))
            dispatch(getList(sortBy));
    }

    const setStateToDefault=()=>{
        SetSortBy({State:"",District:"",City:""})
        setEditMode(false)
        setErr(false)
        dispatch(getList(sortBy))
    }
    return (
        <div>
            <div className="filter">
                {err&&<h5 className="err">{err}</h5>}
                {editmode?<label>Add new City</label>:
            <label className="label">filter by -</label>}

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
            {editmode&&<IconButton><CheckIcon onClick={handleAddNew} /></IconButton>}
            </div>
            <div>
                Shortlist / Remove
            </div>
            </div>
            <div className="buttons">
                <span>clear all</span>
                <div onClick={setStateToDefault}>
                <IconButton>
                <ClearIcon  />
                </IconButton>
                </div>
                
                {!editmode&&<span>Add new</span>}
                {!editmode&&<div onClick={()=>setEditMode(true)}>
                <IconButton>
                <AddToPhotosIcon />
                </IconButton>
                </div>}
                </div>
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
                        <IconButton onClick={()=>handleShortList(d,index)}>
                        <AddIcon />
                        </IconButton>
                        <IconButton onClick={()=>{dispatch({type:LIST_DELETE,payload:d});dispatch(getList(sortBy))} }>
                            <RemoveCircleIcon />
                        </IconButton></div>
                </div>
            }} />)}
            </AutoSizer>}
        </div>
    
        </div>
    )
}

export default AllItems
