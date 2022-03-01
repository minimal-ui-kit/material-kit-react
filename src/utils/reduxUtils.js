import _ from 'lodash'

export const modelCreator = key => ({
  [key]: {
    payload: null,
    loading: false,
    loaded: false,
    error: null,
  },
})

export const extraCreator = (thunk, key) => {
  return {
    [thunk.pending]: (state, action) => {
      state[key].loading = true
      state[key].loaded = false
      state[key].error = null
    },
    [thunk.rejected]: (state, action) => {
      state[key].loading = false
      state[key].loaded = false
      state[key].error = action.payload || action.error?.error || action.error?.message || `Error in ${thunk.rejected}`
    },
    [thunk.fulfilled]: (state, action) => {
      state[key].loading = false
      state[key].loaded = true
      state[key].error = null
      state[key].payload = action.payload
    },
  }
}

export const extraNestedCreator = (thunk, stateKey, pathBuilder) => {
  return {
    [thunk.pending]: (state, action) => {
      const keys = [stateKey, ...pathBuilder(action.meta.arg)]
      _.set(state, keys, {
        loading: true,
        loaded: false,
        error: null,
      })
    },
    [thunk.rejected]: (state, action) => {
      const keys = [stateKey, ...pathBuilder(action.meta.arg)]
      _.set(state, keys, {
        loading: false,
        loaded: false,
        error: action?.payload || action.error?.error || action.error?.message || `Error in ${thunk.rejected}`,
      })
    },
    [thunk.fulfilled]: (state, action) => {
      const keys = [stateKey, ...pathBuilder(action.meta.arg)]
      _.set(state, keys, {
        payload: action.payload,
        loading: false,
        loaded: true,
        error: null,
      })
    },
  }
}

export const mapDataWithMeta = (data) => {
  return data.rowMode === 'array'
    ? data.data.map((e) => {
      return e.reduce((acc, cur, index) => {
        return {
          ...acc,
          [data.metaData[index].name]: cur,
        }
      }, {})
    })
    : data.data
}