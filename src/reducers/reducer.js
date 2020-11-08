const intialState = []

export const reducer = (state =intialState, action) => {
       if(action.type == 'add') {
           return action.payload
       }    
    return state 
}

