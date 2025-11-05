import { createSlice } from "@reduxjs/toolkit";

const connectionReqsSlice = createSlice({
    name: "connectionReqs",
    initialState: {
        connectionReqCount:0,
        data:[]
    },
    reducers:{
        allConnectionReqs:(state,action)=>(
            {
                ...state,
                connectionReqCount: action.payload.length,
                data:action.payload,
            }
        ),
        removeConnectionReq:(state, action)=>{
            const index = state.data.findIndex((connectionReq)=> connectionReq._id == action.payload);
            let newState = [...state.data];
            if(index!=-1){
                newState = [
                    ...state.data.slice(0,index),
                    ...state.data.slice(index+1)
                ]
            }
            return {data:newState, connectionReqCount: state.connectionReqCount-1}
        },
        setConnectionReqCount:(state, action)=> (
            {...state, 
                connectionReqCount:action.payload
            }
        )
    }
})

export const {allConnectionReqs, removeConnectionReq, setConnectionReqCount} = connectionReqsSlice.actions;
export default connectionReqsSlice.reducer;