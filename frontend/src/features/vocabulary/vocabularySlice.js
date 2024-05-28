import { 
    createSlice,
    createAsyncThunk,
    // createSelector,
    // createEntityAdapter
} from "@reduxjs/toolkit"

import vocabularyService from "./vocabularyService"


export const getVocabularys = createAsyncThunk(
    "vocabulary/get-vocabularys",
    async(thunkAPI)=>{
        try {
            const result = await vocabularyService.getVocabulary()
            return result
        } catch (error) {
        return thunkAPI.rejectWithValue(error)            
        }
    }

)


const initialState ={
    vocabularys:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}


const vocabularySlice =createSlice({
    name:"vocabulary",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getVocabularys.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getVocabularys.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.vocabularys=action.payload;
            })
            .addCase(getVocabularys.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.payload;
            })
    }
})

// export const { } = vocabularySlice.actions

export default vocabularySlice.reducer