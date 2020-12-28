<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\repositories\ProjectRepository;

use Illuminate\Support\Facades\Validator;


class ProjectController extends Controller
{
  public $projectRepository;
  
  public function __construct(ProjectRepository $ProjectRepository){
      $this->projectRepository = $ProjectRepository;
  }

  ######## Get all project ########
  public function index()
  {
      $projects = $this->projectRepository->getAll();

      return response()->json([
        'success' => true,
        'message' => 'Project List',
        'data' => $projects
      ]);
  } 
  ######## Get project by id ########
  public function show($id)
  {
      $projects = $this->projectRepository->findById($id);

      if(is_null($projects))
      {
        return response()->json([
          'success' => false,
          'message' => 'Project Details',
          'data' => null
          ]);
      }
      
      return response()->json([
        'success' => true,
        'message' => 'Project Details',
        'data' => $projects
      ]);
  }
  ######## Store Project ########
  public function store(Request $request)
  {
    $formData = $request->all();
    $validator = \Validator::make($formData,[
      'name' => 'required',
      'discription' => 'required',
      'user_id' => 'required',
    ],[
      'name.required' => 'Please give me your project name',
      'discription.required' => 'Please give me your project discription',

    ]);
    if($validator->fails())
    {
      return response()->json([
        'success' => false,
        'message' => $validator->getMessageBag()->first(),
        'errors' => $validator->getMessageBag(),
      ]);
    }

    $project = $this->projectRepository->create($request);
    return response()->json([
        'success' => true,
        'message' => 'Project Stored',
        'data' => $project,
      ]);
  } 
  ######## Update Project ########
  public function update(Request $request, $id)
  {
    $project = $this->projectRepository->findById($id);
    if(is_null($project))
    {
      return response()->json([
        'success' => false,
        'message' => "Project not found",
        'data' => null,
      ]);
    }


    $formData = $request->all();
    $validator = \Validator::make($formData,[
      'name' => 'required',
      'discription' => 'required',
      'user_id' => 'required',
    ],[
      'name.required' => 'Please give me your project name',
      'discription.required' => 'Please give me your project discription',

    ]);
    if($validator->fails())
    {
      return response()->json([
        'success' => false,
        'message' => $validator->getMessageBag()->first(),
        'errors' => $validator->getMessageBag(),
      ]);
    }

    $projectss = $this->projectRepository->edit($request,$id);
    return response()->json([
        'success' => true,
        'message' => 'Project Updated',
        'data' => $projectss,
      ]);
  }
  ######## destroy Project ########
  public function destroy($id)
  {
    $project = $this->projectRepository->findById($id);
    if(is_null($project))
    {
      return response()->json([
        'success' => false,
        'message' => "Project not found",
        'data' => null,
      ]);
    }
    
    $projectss = $this->projectRepository->delete($id);
    return response()->json([
        'success' => true,
        'message' => 'Project Deleted',
        'data' => $projectss,
      ]);
  }
}
