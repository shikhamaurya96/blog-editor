import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title:"",
    myContent:""   
}
const editorSlice = createSlice({
    name:"editor",
    initialState,
    reducers:{

        setTitleState:(state,action)=>{
            
                state.title = action.payload;
        },
       setContentState:(state,action)=>{
        state.myContent = action.payload
       }
            
        

    }
})
export const{setTitleState,setContentState} = editorSlice.actions;
export default editorSlice.reducer;