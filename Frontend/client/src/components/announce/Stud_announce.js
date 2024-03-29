import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate'

class Announce_stud extends React.Component {

        constructor(props) {
            super(props);
            this.state = {  
                display: [],
                course_id: '',
                course_name: ''


            }
        }

        

        componentDidMount() 
       {

        const data = {
            course_id: this.props.location.state.c_id,
            course_name: this.props.location.state.c_name
        }
        console.log("History data",this.props.location.state.c_id); 
            axios.post('http://localhost:3001/show_announce',data)
            .then(response =>{
                if(response.data.status == 200){
                    console.log("------------->",response.data.dataToDisp);
                    this.setState({
                        display: response.data.dataToDisp
                    })
                }
            });
    }

    componentWillMount(){
        console.log("History data");
        if(this.props.location.state){
            console.log(this.props.location.state.c_id,"-------------")
        }
        console.log('Component Will Mount of All Announce');
    }


  render() {
    var productResult = null;

    if (this.state.display != null) {
        console.log("Entered")
        productResult = this.state.display.map(display => {
    return (
        <div style={{paddingTop:'30px',paddingLeft:'70px'}}>
    <Accordion atomic={true}>

<b></b><AccordionItem title={display.Announce_topic}>
  <p style={{textAlign:'justify'}} >{display.Announce_desc}</p>
</AccordionItem>
</Accordion>
      
      </div>
    );
        })
    }

    return (
         <div style={{paddingTop:'30px',paddingLeft:'170px'}}>
                <Navigate></Navigate>

<Jumbotron style={{paddingTop:'30px',paddingLeft:'40px'}} >
    <h2> Announcements {this.props.location.state.c_name}-{this.props.location.state.c_id}</h2>
<br></br>
<br></br>
      <ListGroup></ListGroup>
            <div className="container ">
                {productResult}
            </div>
        
            </Jumbotron>
            
        </div>
     );
  }
}

export default Announce_stud
 
