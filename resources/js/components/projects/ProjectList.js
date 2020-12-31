import Axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import { deleteProject } from '../../services/ProjectService';
import EditProject from '../projects/EditProject';

class ProjectList extends React.Component{

  state = {
    projectLists:[],
    isLoading: false,
    edit:false,
    editId:'',
    editName:'',
    editDiscription:''
  }

  componentDidMount()
  {
    this.getProjectLists();
  }


  getProjectLists = () => {
    this.setState({
      isLoading:true
    });

    //Call api to fetch data
    Axios.get('http://127.0.0.1:8000/api/projects')
    .then(res =>{
      const projectList = res.data.data;
      this.setState({
        projectLists:projectList,
        isLoading:false,
      });
    });
  }

  projectUpdate = (id,name,dis) =>{
    console.log(id);
    this.setState({
      edit:true,
      editId:id,
      editName:name,
      editDiscription:dis,
    });
  }


  projectDelete = async (id) => {     
    
    const response = await deleteProject(id);
    if(response.success)
    {
     this.getProjectLists();
     
    }else{
     this.setState({
       isLoading:false
     });
    }
  }





  render(){ 
    
    return (
    <>
    <div className="card mt-2">
      <div className="card-header text-center bg-dark">
        <div className="float-center">
          <span className="text-danger h1">Project List 
            <div>
              <i className="fas fa-trophy text-success"></i> 
              <span className="text-danger h2">{this.state.projectLists.length}</span>
            </div>
          </span>
        </div>
        <div className="float-right">
          <Link to="/projects/create">
            <button className="btn btn-sm bg-danger"><i className="fas fa-plus"></i>&nbsp; Create Project</button>
          </Link>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
    <div className="row">
      {/* Show loading.... functionalty before loading data */}
      {this.state.isLoading && <h2>Loading......</h2>}
      <div className="col-md-12 m-auto">          
        {
          /* uee map functonality to access all project one by one*/
          this.state.projectLists.map((project,index) =>(
            <div className="card mt-2" key={index}>
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <span className="h2">
                     <strong>{project.name}</strong>&nbsp;
                  </span>
                </div>
  
              <div className="col-md-6 text-right">
                <i className="fas fa-trophy text-success"></i> 
                <span className="text-danger h2">{project.tasks_count}</span>
              </div>
              
              </div>
            </div>
            <div className="card-body">
              <div className="card-text">
               {project.discription}
              </div>
              <div className="mt-4 text-right">
              <Link to={`/project/view/${project.id}`}><button className="btn btn-sm bg-success"><i className="fas fa-eye"></i></button></Link>&nbsp;

              <Link to={`/project/edit/${project.id}`}><button className="btn btn-sm bg-warning"><i className="fas fa-edit"></i></button></Link>&nbsp;

              <button className="btn btn-sm bg-danger" onClick={()=> this.projectDelete(project.id)}><i className="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
          ))
        }
        
        
      </div>
    </div>

    </>
  );
  }
}

export default ProjectList;