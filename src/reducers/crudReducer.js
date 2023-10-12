let initialState = {
     users: localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [],
     user: {}
}
const Crud = (state = initialState, action) => {
     switch (action.type) {
          case "ADD_RECORD":
               let insertData = action.payload;
               let data = [...state.users, insertData];
               localStorage.setItem('crud', JSON.stringify(data));
               return {
                    ...state,
                    users: data
               }
          case "DELETE_RECORD":
               let deleteRecord = state.users.filter((val) => {
                    return val.id !== action.payload
               })
               localStorage.setItem('crud', JSON.stringify(deleteRecord));
               return {
                    ...state,
                    users: deleteRecord
               }
          case "EDIT_RECORD":
               let editRecord = state.users.find((val) => {
                    return val.id == action.payload
               })
               return {
                    ...state,
                    user: editRecord
               }
          case "UPDATE_RECORD":
               let updateRecord = state.users.map((val) => {
                    if (val.id === action.payload.id) {
                         return {
                              ...val,
                              name: action.payload.name,
                              email: action.payload.email,
                         }
                    }
                    return val;
               })
               localStorage.setItem('crud', JSON.stringify(updateRecord));
               return {
                    ...state,
                    users: updateRecord
               }

          default:
               return state;
     }
}
export default Crud;