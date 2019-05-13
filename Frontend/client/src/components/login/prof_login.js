import React, { Component } from 'react'
import { prof_login } from '../userfun/UserFunctions'
import Navbar from '../navbar/Navbar'
import img from "./img.png"
import { Jumbotron } from 'react-bootstrap';
import { graphql, compose,withApollo } from 'react-apollo';
import { loginQuery } from '../../queries/queries';
import { login } from '../../mutation/mutations';

class Prof_Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            hasError : "",
            loginSuc : "",
            authFlag: false

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async login(e){
        e.preventDefault();
       let {email,password}=this.state;
   
       let res=await this.props.client.query({
         query:loginQuery,
         variables: {
             email,
             password
         },
     });
    }

    render () {
        return (
            <div className="container">
            <Navbar />
            <img src={img} alt="img"style={{ position: 'relative'}}/>

                <div className="login-form">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                />
                            
                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block" onClick={this.login}>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Prof_Login