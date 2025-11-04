import { createSlice } from "@reduxjs/toolkit";

const connectionReqsSlice = createSlice({
    name: "connectionReqs",
    initialState: [],
    reducers:{
        allConnectionReqs:(state,action)=>action.payload,
        removeConnectionReq:(state, action)=>{
            const index = state.findIndex((connectionReq)=> connectionReq.id != action.payload);
            let newState = [...state];
            if(index!=-1){
                newState = [
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ]
            }
            return newState
        }
    }
})

export const {allConnectionReqs, removeConnectionReq} = connectionReqsSlice.actions;
export default connectionReqsSlice.reducer;