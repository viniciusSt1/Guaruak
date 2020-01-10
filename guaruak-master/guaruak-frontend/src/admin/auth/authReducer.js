const userKey = '_guaruak_user';
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem(userKey)),
    validToken: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case 'TOKEN_VALIDATED':

            if (action.payload) {
                return { ...state, validToken: true };
            } else {
                localStorage.removeItem(userKey);
                return { ...state, validToken: false, user: null };
            };

        case 'USER_FETCHED':
            let user  = action.payload.user;
            user.token = action.payload.token;

            localStorage.setItem(userKey, JSON.stringify(user));
            return { ...state, user, validToken: true };

        default:
            return state;
    }
}