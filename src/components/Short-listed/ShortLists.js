import React from 'react'
import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteFromShortList} from '../../redux/actions';

function ShortLists() {

        const shortListData = useSelector(state => state.shortListData)
            const {loading,data,error}=shortListData;
        const dispatch = useDispatch();
    
    
        return (
            <div>
                <div className="filter">
                    <div className="chart">
                        <span>State</span>
                        <span>District</span>
                        <span>City</span>
                        <span>Action</span>
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
                        <div><button onClick={()=>dispatch(deleteFromShortList(d,index))} >delete</button> </div>
                    
                    </div>
                }} />)}
                </AutoSizer>}
            </div>
    
            </div>
        )
    }
    
export default ShortLists
