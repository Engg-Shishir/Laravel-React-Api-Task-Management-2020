<?php

namespace App\repositories;

use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

use App\Models\Task;


class TaskRepository implements CrudInterface
{

  ######## Get all Task ########
  public function getAll(){
     $tasks = Task::all();
     return $tasks;
  }
  ######## Get Task by id ########
  public function findById($id){
    $task = Task::with('project')
      ->find($id);
    return $task;
  }
  ######## Store Task ########
  public function create(Request $request){
    $task = new Task();
    $task->name = $request->name;
    $task->discription = $request->discription;
    $task->project_id = $request->project_id;
    $task->save();
    return $task;
  }
  ######## Update Task ########
  public function edit(Request $request,$id){
    $task = $this->findById($id);
    $task->name = $request->name;
    $task->discription = $request->discription;
    $task->project_id = $request->project_id;
    $task->save();
    return $task;
  }
  ######## destroy Task ########
  public function delete($id){
    $task = $this->findById($id);
    $task->delete();
    return $task;
  }

}