import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './auth.css';

import { login, signup } from './authActions';
import Messages from '../../utils/messages';
import Input from './inputAuth';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = { loginMode: true };
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode });
    }

    onSubmit(values) {
        const { login, signup } = this.props;
        this.state.loginMode ? login(values) : signup(values);
    }

    render() {
        const { loginMode } = this.state;
        const { handleSubmit } = this.props;

        return (
            <div className="login-box">
                <div className="login-logo">
                    <b>Gua</b>ruak
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))} style={{ marginBottom: '1em' }}>
                        <Field component={Input} type="input" name="name" placeholder="Nome" icon='user' hide={loginMode} />
                        <Field component={Input} type="email" name="email" placeholder="E-mail" icon='envelope' />
                        <Field component={Input} type="password" name="password" placeholder="Senha" icon='lock' />
                        <Field component={Input} type="password" name="confirm_password" placeholder="Confirmar Senha" icon='lock' hide={loginMode} />
                        <button type="submit"
                            className="btn btn-success btn-block btn-flat">
                            {loginMode ? 'Entrar' : 'Registrar'}
                        </button>

                    </form>

                    <a href="#/" onClick={() => this.changeMode()} className="text-success">
                        {loginMode ? 'Novo usuário? Registrar aqui!' :
                            'Já é cadastrado? Entrar aqui!'}
                    </a>

                </div>

                <Messages />

            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth);
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch);
export default connect(null, mapDispatchToProps)(Auth);