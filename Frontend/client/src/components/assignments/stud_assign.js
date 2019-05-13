import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate'
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

class Stud_Assign extends React.Component {

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

        console.log("History data");
        if(this.props.location.state){
            console.log(this.props.location.state.c_id,"-------------")
        }
        const data = {
            course_id: this.props.location.state.c_id,
            course_name: this.props.location.state.c_name

        }
       
            axios.post('http://localhost:3001/show_assign1',data)
            .then(response =>{
                if(response.data.status == 200){
                    console.log("------------->",response.data.dataToDisp);
                    this.setState({
                        display: response.data.dataToDisp,
                        course_id: this.props.location.state.c_id
                    })
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }

    onPress = (e) =>{
        this.props.history.push('/sub_assign');
    }


  render() {
    var productResult = null;

    if (this.state.display != null) {
        console.log("Entered")
        productResult = this.state.display.map(display => {
    return (
        <div style={{paddingTop:'30px',paddingLeft:'40px'}}>
    
    <Accordion atomic={true}>

<AccordionItem title={display.Assign_topic}>
  <p style={{textAlign:'justify'}} >{display.Assign_desc}</p>
</AccordionItem>
</Accordion>
      <button type="button" class="btn btn-primary" style={{position:'relative', float:'right'}} onClick={this.onPress}> + Submit Assignment </button>
      <br></br>

      
      </div>
    );
        })
    }

    return (
         <div style={{paddingTop:'30px',paddingLeft:'170px'}}>
                <Navigate></Navigate>

<Jumbotron  >
    <h2>Assignments {this.props.location.state.c_name}-{this.props.location.state.c_id}</h2>
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

export default Stud_Assign