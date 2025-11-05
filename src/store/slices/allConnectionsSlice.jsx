import { createSlice } from "@reduxjs/toolkit";

const allConnectionsListSlice = createSlice({
    name:"allConnectionsList",
    initialState: {
        connectionCount:0,
        data: []
    },
    reducers:{
        setAllConnectionList:(state, action)=>(
            {...state, data:action.payload}
        ),
        setConnectionCount:(state, action)=> (
            {...state, 
                connectionCount:action.payload
            }
        ),
        incrementConnectionCount:(state, action)=>({
            ...state, connectionCount: state.connectionCount+1
        })
    }
})

export const {setAllConnectionList, setConnectionCount, incrementConnectionCount} = allConnectionsListSlice.actions;
export default allConnectionsListSlice.reducer;