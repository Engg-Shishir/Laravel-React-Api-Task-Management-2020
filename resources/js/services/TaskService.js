import Axios from "axios";

export const getTaskList = () => {

}

export const storeNewTask = async (data) => {
  data.project_id = parseInt(data.project_id);
  return await Axios.post('http://127.0.0.1:8000/api/tasks', data)
  .then(res =>{
    return res.data;
  });
}

export const UpdateTaskStatus = async (data) => {
  if(data.status == 0){
    data.status = 1;
  }else{
    data.status = 0;
  }
  data.user_id = 1;
  return await Axios.put(`http://127.0.0.1:8000/api/tasks/${data.id}`, data)
  .then(res =>{
    /* console.log(res.data); */
    return res.data;
  });
}

export const UpdateTaskData = async (data) => {
 data.project_id = parseInt(data.project_id);
 data.status = parseInt(data.status);
  return await Axios.put(`http://127.0.0.1:8000/api/tasks/${parseInt(data.taskid)}`, data)
  .then(res =>{
    return res.data;
  });
}

export const deleteTask = async (id) => {
  return await Axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
  .then(res =>{
    return res.data;
  });
}