import axios from 'axios'

export const register = newUser => {
    console.log("Register function called");
    return axios
        .post('http://localhost:3001/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
        })
}

export const prof_register = newUser => {
    console.log("Register function called");
    return axios
        .post('http://localhost:3001/prof_register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered")
        })
}

export const prof_login = user => {
    console.log("Login method");
    
    return axios
        .post('http://localhost:3001/prof_login', {
            email: user.email,
            password: user.password
        })
        
        .then(res => {
            if(res.status === 200){
                this.setState({
                    authFlag : true
                })
            }else{
                this.setState({
                    authFlag : false
                })
            }
            console.log(res.data.status);
            console.log("logged in")
        })
        .catch(err => {
            console.log(err)
        })
}

export const login = user => {
    console.log("Login method");
    
    return axios
        .post('http://localhost:3001/login', {
            email: user.email,
            password: user.password
        })
        
        .then(res => {
            if(res.status === 200){
                this.setState({
                    authFlag : true
                })
            }else{
                this.setState({
                    authFlag : false
                })
            }
            console.log(res.data.status);
            console.log("logged in")
        })
        .catch(err => {
            console.log(err)
        })
}