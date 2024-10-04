import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title:"",
    content:""   
}
const editorSlice = createSlice({
    name:"editor",
    initialState,
    reducers:{

        setTitleState:(state,action)=>{
            
                state.title = action.payload;
        },
       setContentState:(state,action)=>{
        console.log(action.payload)
        state.content = action.payload
       }
            
        

    }
})
export const{setTitleState,setContentState} = editorSlice.actions;
export default editorSlice.reducer;