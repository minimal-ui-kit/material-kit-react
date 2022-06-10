import { types } from "../types/types";


export const authReducer = ( state = {}, action = {} ) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName
      };
    case types.logout:
      return {};

    default:
      return state;
  }
};



// cons initialState = {
//     datasToSave:[]
// };

// const warehouse = (state = initialState, {type, payload}) => {
//     switch(type) {
//         case SAVE_ACTION: {
//             const {datasToSave} = payload
//             return {
//                 ...state,
//                 dataToSave
//                 };
//             }

//         default:
//             return state;
//     }
// };

// export default warehouse;


// const warehouse = (state = initialState, {type, payload} = {}) => {
//     switch(type) {
//         case SAVE_ACTION: {
//             const {datasToSave} = payload
//             return {
//                 ...state,
//                 dataToSave
//                 };
//             }

//         default:
//             return state;
//     }
// };

// export default warehouse;