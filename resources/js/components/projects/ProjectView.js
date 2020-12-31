import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import { UpdateTaskStatus } from '../../services/TaskService';
import TaskCreate from '../tasks/TaskCreate';

class ProjectView extends React.Component{

  state = {
    project:{}, // an object
    taskLists:[], // an array
    isLoading: false,
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
          <div className="card-header bg-success">
            <div className="row">
              <div className="col-md-6 ">
                <button className="btn btn-sm bg-danger" onClick={()=> this.UpdateTaskStatus(task)}><i className=""><strong>X</strong></i></button>&nbsp;
                &nbsp;<span className="h2"><strong>{task.name}</strong>&nbsp;</span>
              </div>
            </div>
          </div>
        }
        {
          task.status == 0 &&
          <div className="card-header bg-dark text-light">
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-sm bg-success" onClick={()=> this.UpdateTaskStatus(task)}><i className="fas fa-check"></i></button>&nbsp;
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
                <button className="btn btn-sm bg-warning"><i className="fas fa-edit"></i></button>&nbsp;
                <button className="btn btn-sm bg-danger"><i className="fas fa-trash"></i></button>
              </div>
          </div>
        </div>
        </div>
        ))
      }
    </div>
    
            
    <TaskCreate projectId={this.props.match.params.id} onCompleteTaskCreate = {this.onCompleteTaskCreate} />
    </>
  );
  }
}

export default ProjectView;