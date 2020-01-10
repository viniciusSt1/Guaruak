import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import DictionaryReducer from '../dictionary/dictionaryReducer';
import TemplateReducer from '../admin/template/templateReducer';
import dictionaryAdminReducer from '../admin/index/dictionaryAdminReducer';
import AuthReducer from '../admin/auth/authReducer';

export default combineReducers({
    dictionary: DictionaryReducer,
    form: formReducer,
    toastr: toastrReducer,
    template: TemplateReducer,
    dictionaryAdmin: dictionaryAdminReducer,
    auth: AuthReducer
});