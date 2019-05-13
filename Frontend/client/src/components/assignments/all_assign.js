import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import P_Navigate from '../navbar/prof_nav'
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class All_assign extends React.Component {

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
            axios.post('http://localhost:3001/show_assign1',data)
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
        console.log('Component Will Mount of All Assignment');
    }

    onPress = (e) =>{
        e.preventDefault();
        //console.log("Param received",param)
        this.props.history.push({
            pathname : "/add_assign",
            state : {
                c_id : this.props.location.state.c_id,
                c_name : this.props.location.state.c_name

            }
        });
    }


  render() {
    var productResult = null;

    if (this.state.display != null) {
        console.log("Entered")
        productResult = this.state.display.map(display => {
    return (
        <div style={{paddingTop:'30px',paddingLeft:'70px'}}>
    
    <Accordion atomic={true}>

<AccordionItem title={display.Assign_topic}>
  <p style={{textAlign:'justify'}} >{display.Assign_desc}</p>
</AccordionItem>
</Accordion>
      
      </div>
    );
        })
    }

    return (
         <div style={{paddingTop:'30px',paddingLeft:'170px'}}>
                <P_Navigate></P_Navigate>

<Jumbotron  >
    <h2>{this.props.location.state.c_name}-{this.props.location.state.c_id}-Assignments</h2>
<button type="button" class="btn btn-primary" style={{position:'relative', float:'right'}} onClick={this.onPress}> + Publish Assignment </button>
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

export default All_assign