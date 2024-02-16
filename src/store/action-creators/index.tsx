import * as LoginActionCreators from '../../components/auth/Login/actions';
import * as RegisterhActionCreators from '../../components/auth/Register/actions';
import * as LoguotActionCreators from '../../components/auth/Logout/actions';
import * as AuthActionCreators from '../../components/auth/actions';
import * as HomePageCreators from '../../components/HomePage/actions';

export default {
    ...LoginActionCreators,
    ...RegisterhActionCreators,
    ...LoguotActionCreators,
    ...AuthActionCreators,
    ...HomePageCreators,
}