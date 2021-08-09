import React from 'react'
import {Form, Field} from 'react-final-form'
import Input from "../../Common/Fields/InputComponent/Input";
import {composeValidators, minLength, required} from "../../Common/Validators/validators";
import css from './LoginForm.module.css'

class LoginForm extends React.Component {
    render() {
        return <div>
            <Form onSubmit={this.onSubmit}
                  render={
                      ({handleSubmit, invalid, submitting}) => {
                          return <form onSubmit={handleSubmit}>
                              <Field
                                  validate={minLength(6)} placeholder={'Enter your Login'} name={'email'}
                                     render={Input}/>
                              <Field validate={composeValidators(required, minLength(6))}
                                     type={'password'}
                                     placeholder={'Enter your Password'} name={'password'} render={Input}/>
                              <Field name={'rememberMe'} type={'checkbox'} render={Input}/>
                              {this.props.authInfo.loginFailedInfo && <div className={css.error}>{this.props.authInfo.loginFailedInfo?.map(message => <div>{message}</div>)}</div>}
                              <button type="submit" disabled={submitting || invalid} className={css.formButton} >Login
                              </button>
                          </form>
                      }
                  }
            />
        </div>
    }


    onSubmit = event => {
        this.props.loginThunkCreator(event.email, event.password, event.rememberMe)
    }

}

export default LoginForm