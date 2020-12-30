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