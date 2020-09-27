import React from 'react'
import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteFromShortList} from '../../redux/actions';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

function ShortLists() {

        const shortListData = useSelector(state => state.shortListData)
            const {loading,data,error}=shortListData;
        const dispatch = useDispatch();
    
    
        return (
            data.length<1?<div className="no_data">
                <div>
                    <SearchIcon/>
                    <p>you have nothing in shortlist</p>
                </div>
            </div>:
            <div>
                <div className="filter">
                    <div className="chart">
                        <label>State</label>
                        <label>District</label>
                        <label>City</label>
                        <label>Action</label>

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
                    return <div key={key} style={style} className="item">
                           <div>{d?.State}</div>
                            <div>{d?.District}</div>
                            <div>{d?.City}</div>
                            
                        <div><IconButton onClick={()=>dispatch(deleteFromShortList(d,index))}>
                            <RemoveCircleIcon />
                        </IconButton></div>
                    
                    </div>
                }} />)}
                </AutoSizer>}
            </div>
    
            </div>
        )
    }
    
export default ShortLists
