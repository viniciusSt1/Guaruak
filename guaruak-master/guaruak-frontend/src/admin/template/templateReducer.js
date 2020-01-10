const initialState = { openSidebar: false };

export default (state = initialState, action) => {
    switch(action.type){

        case 'OPEN_SIDEBAR':
            return {...state, openSidebar: !state.openSidebar};

        default:
            return state;
    }
}