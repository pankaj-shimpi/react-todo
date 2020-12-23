const initialState = {
    userData: {},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                userData: action.userData
            }
        case 'GET_USER':
            return state.userData;
        default:
            return state;
    } 
}