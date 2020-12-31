
import React from 'react';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { storeNewTask } from '../../services/TaskService';

class TaskCreate extends React.Component{

  state = {
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
     project_id: this.props.projectId,
   }

   const response = await storeNewTask(postBody);
   
   if(response.success)
   {
    this.setState({
      name: '',
      discription: '',
      isLoading:true,
      errors:'',
    });
    
    this.props.onCompleteTaskCreate(response.data);
    
    //Call api to fetch data
    Axios.get(`http://127.0.0.1:8000/api/projects/${this.props.match.params.id}`)
    .then(res =>{
      const projects = res.data.data;
      const tasks = res.data.data.tasks;
      this.setState({
        project:projects,
        taskLists:tasks,
      });
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

    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle"><strong>Create your task</strong></h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          {
          this.state.isLoading && <div className=" mt-2 alert bg-success alert-dismissible fade show" role="alert">
          <strong>Task Created</strong>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          </button></div>
          }
          <form  onSubmit={this.submitForm}>
            <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder="Enter task name" 
                value={this.state.name} 
                onChange={(e) => this.changeInput(e)}/>
                {
                  this.state.errors && this.state.errors.name && <strong className="text-danger">{this.state.errors.name[0]}</strong>
                }
            </div>

            <div className="form-group">
              <textarea type="text" name="discription" className="form-control" 
                rows="1"
                placeholder="Enter task discription" value={this.state.discription} onChange={(e) => this.changeInput(e)} name="discription"/>
                {
                  this.state.errors && this.state.errors.discription && <strong className="text-danger">{this.state.errors.discription[0]}</strong>
                }
            </div>
            <div className="form-group">
            <input id="test" type="submit" className="btn btn-success form-control" value="Submit"/>
               
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  }
}

export default withRouter(TaskCreate);