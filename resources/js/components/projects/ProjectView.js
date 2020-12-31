import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import { UpdateTaskStatus,deleteTask, UpdateTaskData } from '../../services/TaskService';
import TaskCreate from '../tasks/TaskCreate';
import $ from '$jquery';

class ProjectView extends React.Component{

  state = {
    project:{}, // an object
    taskLists:[], // an array
    isLoading: false,
    taskeditid: '',
    name: '',
    discription: '',
    taskstatus: '',
    errors:[],
  }

  componentDidMount()
  {
    // access url id parameter 
    //this.props.match.params.id
    console.log(this.props.match.params.id);
    this.getProjectDetails();
  }

  getProjectDetails = () => {
    this.setState({
      isLoading:true
    });

    //Call api to fetch data
    Axios.get(`http://127.0.0.1:8000/api/projects/${this.props.match.params.id}`)
    .then(res =>{
      const projects = res.data.data;
      const tasks = res.data.data.tasks;
      this.setState({
        project:projects,
        taskLists:tasks,
        isLoading:false,
      });
    });
  }

  onCompleteTaskCreate = (task) =>{
    let tasks = this.state.taskLists;
    tasks.unshift(task);
    this.setState({
      taskLists: tasks,
    });
  }


  UpdateTaskStatus = async (task) => {
    const response = await UpdateTaskStatus(task);
   
    if(response.success)
    {
     this.setState({
       name: '',
       discription: '',
       isLoading:true,
       errors:'',
     });
     this.getProjectDetails();
     
    }else{
     this.setState({
       errors:response.errors,
       isLoading:false
     });
    }
  }


  taskDelete = async (id) => {
    
    const response = await deleteTask(id);
    if(response.success)
    {
      this.getProjectDetails();
     
    }else{
     this.setState({
       isLoading:false
     });
    }
  }

  taskEditModal = (task) => {
    console.log(task);
    this.setState({
      name: task.name,
      discription: task.discription,
      taskeditid: task.id,
      taskstatus: task.status,
    });
  }


  changeInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoading:false,
      errors:'',
    })
  }

  submitForms = async (e) => {
    e.preventDefault();  
    
   let postBody = {
     name: this.state.name,
     discription: this.state.discription,
     taskid: this.state.taskeditid,
     project_id: this.props.match.params.id,
     status: this.state.taskstatus
   }

      const response = await UpdateTaskData(postBody);
      
      if(response.success)
      {
        this.setState({
          name: '',
          discription: '',
          taskeditid: '',
          taskstatus: '',
          isLoading:true,
          errors:'',
        });

        this.getProjectDetails();
        $('#close').click();

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

    <div className="card">
      <div className="card-header text-center">
        <h1 className="text-danger mr-1">{this.state.project.name}</h1>
        <p className="text-dark">{this.state.project.discription}</p> 
        <div className="row">
          <div className="col-md-6">
          <Link to="/projects">
            <button className="btn btn-sm bg-success"><i className="fas fa-arrow-left"></i>&nbsp; Back</button>
          </Link>
          </div>
          <div className="col-md-6">
             <button type="button" className="btn btn-primary"  data-toggle="modal" data-target="#exampleModalCenter">
                 Create Task
              </button>
          </div>
        </div>
      </div>
      {/* Show loading.... functionalty before loading data */}
      {this.state.isLoading && <h2>Loading......</h2>}
    </div>

    <div className="row">

     { /* uee map functonality to access all project one by one*/}
      {
        this.state.taskLists.map((task,index) =>(
        <div className="col-md-6"  key={index}>
        <div className="card mt-2" key={index}>
        {
          task.status == 1 &&
          <>
          <div className="card-header bg-success">
            <div className="row">
              <div className="col-md-12 ">
                <button className="btn btn-sm bg-success" onClick={()=> this.UpdateTaskStatus(task)}>
                  <i className="fas fa-times text-danger h4"></i></button>&nbsp;
                <span className="h4"><strong>{task.name}</strong></span>
              </div>
            </div>
          </div>
          </>
        }
        {
          task.status == 0 &&
          <div className="card-header bg-dark text-light">
            <div className="row">
              <div className="col-md-12">
                <button className="btn btn-sm bg-dark" onClick={()=> this.UpdateTaskStatus(task)}><i className="fas fa-check text-success h4"></i></button>&nbsp;
                <span className="h4"><strong>{task.name}</strong>&nbsp;</span>
              </div>
            </div>
          </div>
        }
          <div className="card-body">
            <div className="card-text">
            {task.discription}
            </div>
              <div className="mt-4 text-right">
                <button data-toggle="modal" data-target="#EditTask" className="btn btn-sm bg-warning" onClick={()=> this.taskEditModal(task)}><i className="fas fa-edit"></i></button>&nbsp;

                <button className="btn btn-sm bg-danger" onClick={()=> this.taskDelete(task.id)}><i className="fas fa-trash"></i></button>
              </div>
          </div>
        </div>
        </div>
        ))
      }
    </div>
    
            
    <TaskCreate projectId={this.props.match.params.id} onCompleteTaskCreate = {this.onCompleteTaskCreate} />




    <div className="modal fade" id="EditTask" tabindex="-1" role="dialog" aria-labelledby="EditTaskTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle"><strong>Upadete your task</strong></h5>
            <button id="close" type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form  onSubmit={this.submitForms}>
            <input type="hidden" value={this.state.taskeditid} name="taskeditid"/>
            <input type="hidden" value={this.state.taskstatus} name="taskstatus"/>
            <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder="Enter task name" 
                value={this.state.name} 
                onChange={(e) => this.changeInputs(e)}/>
                {
                  this.state.errors && this.state.errors.name && <strong className="text-danger">{this.state.errors.name[0]}</strong>
                }
            </div>

            <div className="form-group">
              <textarea type="text" name="discription" className="form-control" 
                rows="3"
                placeholder="Enter task discription" value={this.state.discription} onChange={(e) => this.changeInputs(e)} name="discription"/>
                {
                  this.state.errors && this.state.errors.discription && <strong className="text-danger">{this.state.errors.discription[0]}</strong>
                }
            </div>
            <div className="form-group">
            <input type="submit" className="btn btn-success form-control" value="Submit"/>
               
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

export default ProjectView;