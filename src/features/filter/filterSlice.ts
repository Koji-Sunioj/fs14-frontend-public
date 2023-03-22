import { createSlice } from '@reduxjs/toolkit'

import { FilterStateType } from '../../types/types'

export const initialFilterState: FilterStateType = {
  page: 1,
  direction: 'ascending',
  sortField: 'artistName',
  query: null
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    resetFilter: () => initialFilterState,
    setFilter: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { resetFilter, setFilter } = filterSlice.actions
export default filterSlice.reducer
