import React, {Component} from 'react';
import Search from './Search';
import ProductsResults from './ProductsResults';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate'
import { graphql, compose,withApollo } from 'react-apollo';
import { dashboardCourses } from '../../queries/queries';


class ProductMain extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: []
        }

        //bind

        this.searchProduct = this.searchProduct.bind(this);
    }

    componentDidMount(){
        this.shouldComponentUpdate()
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }


    searchProduct = (event)=>{
        console.log('search');
        const target = event.target;
       // const name = target.name;
        const value = target.value;
        var data = 
        {
            "search": value
        }
        axios.post('http://localhost:3001/search/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: response.data
                    });
                }
            });
    }

    onPress = (e) => {
        this.props.history.push('/Profile')
    }
    async load(){
        try{
          let data=cookie.load("cookie");
          let res=await this.props.client.query({
            query:dashboardCourses,
            variables: {
               id:data.email
            },
        });
        this.setState({
          courseList:res.data.dashboardCourses
        })
      }catch(error){
          throw error;
      }
      }
    

    render(){
        return(
            <div className="center-align container mt-5" style={{paddingLeft: '200px'}}>
            <Navigate></Navigate>
            <Jumbotron>
                <div>
                    <h1>Available courses</h1>
                </div>
                <div>
                    <Search searchProduct={this.searchProduct}/>
                    <ProductsResults products={this.state.products}/>
                </div>
                <button onClick ={this.onPress} className="btn btn-success">Profile</button>

                </Jumbotron>
            </div>
        )
    }
}

export default ProductMain;