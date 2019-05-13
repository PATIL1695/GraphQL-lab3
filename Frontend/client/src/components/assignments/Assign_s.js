import React from 'react'
import axios, { post } from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:3001/assign_upload';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.props.history.push('/profile')

    return  post(url, formData,config)
  }

  render() {
    return (

        <div style={{paddingLeft:'250px'}}>
                            <br></br>
                            <br></br>


            <Jumbotron>
                <br></br>
                <br></br>
                <Navigate/>
      <form onSubmit={this.onFormSubmit}>
        <h1>Submit Assignment</h1>
        <input type="file" name="file" onChange={this.onChange} />
        <button className="btn btn-success"type="submit" onClick={this.fileUpload}>Upload</button>
      </form>
      </Jumbotron>
      </div>
   )
  }
}



export default SimpleReactFileUpload