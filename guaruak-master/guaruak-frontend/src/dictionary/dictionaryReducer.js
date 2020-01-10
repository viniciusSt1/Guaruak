const initialState = {words: [], sumSearch: 0};

export default (state = initialState, action) => {
    switch(action.type){

        case 'WORDS_FETCHED':
            return {...state, words: action.payload.data};

        case 'SUM_SEARCH':
            return {...state, sumSearch: ++state.sumSearch};

        case 'RESET_SEARCH':
            return {...state, sumSearch: 0};

        default:
            return state;
    }
}