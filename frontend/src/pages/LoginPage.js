import React from 'react';
import axios from 'axios';
import Input from '../components/Input';
import   { withTranslation } from 'react-i18next';

class LoginPage extends React.Component {
    state = {
        username : null,
        password : null,
        language : 'tr'
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    onChangeLanguage = language =>{
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        this.setState({language : language });

    }

    render() {

        const { t } = this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center"> { t('Sign Up') }</h1> 
                    <Input name="username" label= { t('Username') } onChange={this.onChange}  />
                    <Input name="password" label= {t('Password')} type="password" onChange={this.onChange} />
                    <div className="text-center">
                        <button className="btn btn-primary"> {t('Login') }  </button>
                    </div>
                    <div>
                        <img 
                            src="https://www.countryflags.io/tr/flat/24.png" 
                            alt="Turkish Flag" 
                            onClick={ () => this.onChangeLanguage('tr')}
                            style={{cursor:'pointer'}} ></img>
                            <img 
                                src="https://www.countryflags.io/us/flat/24.png" 
                                alt="USA Flag" 
                                onClick={ () => this.onChangeLanguage('en')}
                                style={{cursor:'pointer'}} ></img>
                    </div>
                </form>
            </div>
        )


    }

    
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
export default LoginPageWithTranslation;
//export default LoginPage;