import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron, Badge } from 'reactstrap'
import navigate from '../navbar/navigate'
import Navigate from '../navbar/prof_nav'
import img from './img1.jpg'
import { graphql, compose } from 'react-apollo';
import { updateProfile } from '../../mutation/mutations';
class show extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            display: []
        }
    }
    // onChange (e) {
    //     this.setState({ [e.target.name]: e.target.value })
    // }


    getprofiledetails=()=>{

        this.props.onGetProfile(this.state.uid);
       }
       componentDidMount(){
       this.getprofiledetails();
       }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }

    async submit(e){
        e.preventDefault();
        let {
          firstName,
          lastName,
          About,
          Student_id,
          phone,
          language,
          hometown,
          gender,
          citycountry,
          school
        }=this.state;
        let res=await this.props.updateProfile({
          variables: {
            firstName,
            lastName,
            About,
            Student_id,
            phone,
            language,
            hometown,
            gender,
            citycountry,
            school,
            uid:cookie.load('cookie').email
          },
      });
      await this.setState({
        ...res.data.profileUpdate
      })
    }
    render() { 

        var productResult = null;

        if (this.state.display != null) {
            console.log("Entered")
            productResult = this.state.display.map(display => {
                return (
                    <div className="form" style={{paddingLeft:'150px'}}  key={display.Student_id} >
                    <Navigate/>
                        <div className="form">
                        
                            <h4><b>Name: {display.name}</b></h4>
                            <br></br>
                            <h4><b>Email: {display.email}</b></h4>
                            <br></br>
                            <h4><b>Professor ID: {display.Student_id}</b></h4>
                            <br></br>
                            <h4><b>City and Country: {display.citycountry}</b></h4>
                            <br></br>
                            <h4><b>Company: {display.school}</b></h4>
                            <br></br>
                            <h4><b>Language: {display.language}</b></h4>
                            <br></br>
                            <h4><b>Phone Number: {display.phone}</b></h4>
                            <br></br>
                            <h4><b>About: {display.About}</b> </h4>                           
                             <br></br>
                            <h4><b>Gender: {display.gender}</b></h4>
                        </div>

                    </div>
                )
            })
        }
        return (
            <div className="mt-5">
            <h1><b><u><Badge color="secondary">Profile Information</Badge></u></b></h1>
            <Jumbotron align="left" style={{paddingLeft:'200px'}}>
            <img src={img} alt="img"style={{ width: '200px', height:'200px', float: 'right'}}/>

                <div className="container ">
                    {productResult}
                </div>
                </Jumbotron>
                
            </div>
         );
    }
}
 
export default show;