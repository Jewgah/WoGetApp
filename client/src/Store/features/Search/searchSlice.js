import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current : {},
  results: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: ( state,{ payload } ) => {
      state.current = payload
    },
    setResults: ( state,{ payload } ) => {
      state.results = payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setSearch ,setResults } = searchSlice.actions

export default searchSlice.reducer