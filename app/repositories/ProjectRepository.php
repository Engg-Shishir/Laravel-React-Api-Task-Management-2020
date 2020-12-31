<?php

namespace App\repositories;

use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

use App\Models\Project;


class ProjectRepository implements CrudInterface
{

  ######## Get all project ########
  public function getAll(){
     $projects = Project::withCount('tasks')->orderBy('id','desc')->get();
     return $projects;
  }
  ######## Get project by id ########
  public function findById($id){
    $project = Project::with('tasks')->find($id);
    return $project;
  }
  ######## Store Project ########
  public function create(Request $request){
    $project = new Project();
    $project->name = $request->name;
    $project->discription = $request->discription;
    $project->user_id = $request->user_id;
    $project->save();

    return $project;
  }
  ######## Update Project ########
  public function edit(Request $request,$id){
    $project = $this->findById($id);
    $project->name = $request->name;
    $project->discription = $request->discription;
    $project->user_id = $request->user_id;
    $project->save();

    return $project;
  }
  ######## destroy Project ########
  public function delete($id){
    $project = $this->findById($id);
    $project->tasks()->delete();
    $project->delete();
    return $project;
  }

}