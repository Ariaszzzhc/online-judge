import './login.css'
import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-8 d-none d-md-block d-lg-block">
                        <h1>The text will be hidden on mobile device</h1>
                        <p className="lead">mock mock mock mock mock mock mock mock</p>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h1 className="text-center login-title">Sign in to continue to Online Judge</h1>
                        <div className="account-wall">
                            <img className="profile-img" src={require("../../images/photo.png")}/>
                            <form className="form-signin">
                                <input type="email" name="username" className="form-control" placeholder="Email"
                                       required/>
                                <input type="password" name="password" className="form-control" placeholder="Password"
                                       required/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit">
                                    Sign in
                                </button>
                                <label className="checkbox pull-left">
                                    <input type="checkbox" name="remember-me" value="true"/>
                                    <span>Remember me</span>
                                </label>
                            </form>
                        </div>
                        <a href="#" className="text-center new-account">Create an account </a>
                    </div>
                </div>
            </div>
        )
    }
};
