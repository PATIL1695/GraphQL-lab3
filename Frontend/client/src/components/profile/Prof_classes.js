import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import logo from './img.jpg'; // with import
import './style.css';
import P_Navigate from '../navbar/prof_nav'

import Sidebar from "react-sidebar";
import { Jumbotron } from 'react-bootstrap';
const mql = window.matchMedia(`(min-width: 800px)`);




class Prof_classes extends Component {
    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: []
        }

        //bind
        this.onPress = this.onPress.bind(this)
    }

    componentDidMount(){
        
        console.log('Component Did Mount of Products Main');
        axios.get('http://localhost:3001/prof_add_sub')
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: [... response.data.dataToDisp]

                    })
                }
            });
    }
    

    // componentWillMount(){
    //     console.log('Component Will Mount of Products Main');
    // }

    onPress (data) {
        console.log("======>",data);
       
        axios({
            method: 'post',
            url: 'http://localhost:3001/prof_delete_sub',
            data: {
              data
            }

        })
          .then(response => {
            if(response.status == 200) {
               window.location.reload();
            }
        });  
        
    }

    

    
    render() {
        
        var productResult = null;
        console.log("_--------", this.state.products.length);


        if (this.state.products.length> 0) {
            //let count=0;
            console.log("========",this.state.products)
            productResult = this.state.products.map(products => {
        
        return (
            
<div class="col-3 mt-3 mb-3" id="main"style={{paddingLeft:'80px',paddingBottom: '100px',paddingRight:'250px'}}>
<div className="border product">
        
            

            <div className="card" style={{width: '16rem' ,height: '16rem'}}  >
        <img className="card-img-top" src={logo} alt="Card image cap" />
        <div className="card-body" style={{backgroundColor:"black"}} >
         <div className="card-title">{products.course_id} - {products.course_name}</div>


          <div className="card-text"></div>
          <div className="btn btn-success"   style={{padding: '1px 25px'}}> Course Details</div>
          <br></br>
          <br></br>
          <div className="btn btn-success" onClick ={()=>this.onPress(products.course_id)} style={{paddingTop:'2px'}} style={{padding: '1px 25px'}}> Drop Course</div>

        </div>
      </div>
        </div>
    </div>



        )
    })
}
return (
    <div className="mt-8">
    <P_Navigate/>
    <div style={{paddingLeft:'250px'}}>
                <Jumbotron>
<h1 allign="left">Dashboard</h1>
            <h2>___________________________________</h2>
            </Jumbotron>
            </div>
        <div className="row mb-5 results-container" style={{paddingLeft:'150px'}}>
            {productResult}
        </div>
        
    </div>
)
}
}
 export default Prof_classes;
