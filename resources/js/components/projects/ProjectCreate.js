import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { storeNewProject } from '../../services/ProjectService';

class ProjectCreate extends React.Component{

  state = {
    isLoading: false,
    name: '',
    discription: '',
    errors:[],
  }

  componentDidMount()
  {
  }

  
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoading:false,
      errors:'',
    })
  }

  submitForm = async (e) => {
   e.preventDefault();

   const postBody = {
     name: this.state.name,
     discription: this.state.discription,
   }
   const response = await storeNewProject(postBody);
   
   if(response.success)
   {
    this.setState({
      name: '',
      discription: '',
      isLoading:true,
      errors:'',
    });

   }else{
    this.setState({
      errors:response.errors,
      isLoading:false
    });
   }
  }
  




  render(){ 
    
    return (
    <>
    {/* Show alert message */}

    {this.state.isLoading && <div class=" mt-2 alert bg-success alert-dismissible fade show" role="alert">
      <strong>Project Added Successfully</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      </button></div>}

    <div className="card  bg-dark">

      <div className="card-header">
      {this.state.isLoading && 
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-7"><strong><span className="text-success h3">Prtoject Saved</span></strong></div>
        </div>
        }

        {!this.state.isLoading && 
        <div className="row">
          <div className="col-md-5">
            <Link to="/projects"className="fas fa-arrow-left btn bg-success"><span ></span>&nbsp;Back</Link>
          </div>
          <div className="col-md-7"><strong><span className="text-danger h3">Create Project</span></strong></div>
        </div>
        }
      </div>
      <div className="card-body text-light">
        <form  onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Enter your name" className="form-control" value={this.state.name} onChange={(e) => this.changeInput(e)}/>
            {
              this.state.errors && this.state.errors.name && <strong className="text-danger">{this.state.errors.name[0]}</strong>
            }
          </div>
          <div className="form-group">
            <label htmlFor="discription">Discription</label>
            <textarea type="text" placeholder="Enter your description" className="form-control" value={this.state.discription} onChange={(e) => this.changeInput(e)} name="discription"/>
            {
              this.state.errors && this.state.errors.discription && <strong className="text-danger">{this.state.errors.discription[0]}</strong>
            }
          </div>

          {/* Show loading.... functionalty before loading data */}

          {!this.state.isLoading && <input type="submit" className="btn btn-info form-control text-light" value="Submit"/>}

          {this.state.isLoading && <input type="button" className="btn bg-success form-control text-light disable" value="Saved"/>}
          
        </form>
      </div>
    </div>
    <div className="row">
    </div>
    </>
  );
  }
}

export default ProjectCreate;