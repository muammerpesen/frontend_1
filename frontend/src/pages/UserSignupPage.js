import React, { Component } from 'react'; 
import Input from '../components/Input';
import axios from 'axios';
import { signup } from '../api/apiCalls';
import   { withTranslation } from 'react-i18next';

class UserSignupPage extends React.Component{

    state = {
        username : null,
        displayName : null,
        password : null,
        passwordRepeat : null,
        pendingApiCall: false,
        errors:{
            
        },
        language: 'tr'
    }

    onChange = event => {
        const { name, value } = event.target;
        const errors = {...this.state.errors };
        const { t } = this.props;
        errors[name] = undefined;

        if(name == 'password' || name == 'passwordRepeat'){
            if(name == 'password' && value != this.state.passwordRepeat){
                errors.passwordRepeat = t( 'Password mismatch');
            }
            else if(name == 'passwordRepeat' && value != this.state.password){
                errors.passwordRepeat = t('Password mismatch');
            }
            else{
                errors.passwordRepeat = undefined;
            }
        }
        


        this.setState({
            [name] : value,
            errors
        })
    }

    onClickSignup = async event =>{
        event.preventDefault(); //button form icinde oldugu icin browserın bizim yerimize bisey yapmasini ebngelliyoruz

        const { username, displayName, password, language } = this.state;

        const body = {
            username ,
            displayName,
            password,
        }
        this.setState({pendingApiCall: true});


        // axios.defaults.headers['accept-language'] =  language; 
        // axios.post('http://localhost:8080/api/1.0/users', body)
        //     .catch((error) => {
        //         if(error.response.data.validationErrors){
        //             this.setState({ errors: error.response.data.validationErrors });
        //         }

        //         });


        try{
            const response = await signup(body);
            console.log('girdi try');
        }
        catch(error){
            console.log('girdi catch');
            console.log(error.response.data.validationErrors);
        }

        this.setState({pendingApiCall: false});
        
    }

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        axios.defaults.headers['accept-language'] = language;
        this.setState({language : language})
    }



    render(){

        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t } = this.props;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">{ t('Sign Up') }</h1>
                    <Input name="username" label= { t('Username') }  error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange}  type="password"  />
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />
                    <div className="text-center">
                        <button disabled={pendingApiCall ||passwordRepeat != undefined} className="btn btn-primary" onClick={this.onClickSignup} >
                        {pendingApiCall && <span className="spinner-border spinner-border-sm" ></span> }
                            {t('Sign Up')}</button>
                    </div>
                   
                </form>
            </div>
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;
//export default UserSignupPage;