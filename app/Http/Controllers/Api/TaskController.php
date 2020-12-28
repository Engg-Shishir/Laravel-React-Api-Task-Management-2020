<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\repositories\TaskRepository;

use Illuminate\Support\Facades\Validator;


class TaskController extends Controller
{
  public $taskRepository;
  
  public function __construct(TaskRepository $TaskRepository){
      $this->taskRepository = $TaskRepository;
  }

  ######## Get all task ########
  public function index()
  {
      $tasks = $this->taskRepository->getAll();

      return response()->json([
        'success' => true,
        'message' => 'task List',
        'data' => $tasks
      ]);
  } 
  ######## Get task by id ########
  public function show($id)
  {
      $tasks = $this->taskRepository->findById($id);

      if(is_null($tasks))
      {
        return response()->json([
          'success' => false,
          'message' => 'task Details',
          'data' => null
          ]);
      }
      
      return response()->json([
        'success' => true,
        'message' => 'task Details',
        'data' => $tasks
      ]);
  }
  ######## Store task ########
  public function store(Request $request)
  {
    $formData = $request->all();
    $validator = \Validator::make($formData,[
      'name' => 'required',
      'discription' => 'required',
      'project_id' => 'required',
    ],[
      'name.required' => 'Please give me your task name',
      'discription.required' => 'Please give me your task discription',

    ]);
    if($validator->fails())
    {
      return response()->json([
        'success' => false,
        'message' => $validator->getMessageBag()->first(),
        'errors' => $validator->getMessageBag(),
      ]);
    }

    $task = $this->taskRepository->create($request);
    return response()->json([
        'success' => true,
        'message' => 'task Stored',
        'data' => $task,
      ]);
  } 
  ######## Update task ########
  public function update(Request $request, $id)
  {
    $task = $this->taskRepository->findById($id);
    if(is_null($task))
    {
      return response()->json([
        'success' => false,
        'message' => "task not found",
        'data' => null,
      ]);
    }


    $formData = $request->all();
    $validator = \Validator::make($formData,[
      'name' => 'required',
      'discription' => 'required',
      'project_id' => 'required',
    ],[
      'name.required' => 'Please give me your task name',
      'discription.required' => 'Please give me your task discription',

    ]);
    if($validator->fails())
    {
      return response()->json([
        'success' => false,
        'message' => $validator->getMessageBag()->first(),
        'errors' => $validator->getMessageBag(),
      ]);
    }

    $taskss = $this->taskRepository->edit($request,$id);
    return response()->json([
        'success' => true,
        'message' => 'task Updated',
        'data' => $taskss,
      ]);
  }
  ######## destroy task ########
  public function destroy($id)
  {
    $task = $this->taskRepository->findById($id);
    if(is_null($task))
    {
      return response()->json([
        'success' => false,
        'message' => "task not found",
        'data' => null,
      ]);
    }
    
    $taskss = $this->taskRepository->delete($id);
    return response()->json([
        'success' => true,
        'message' => 'task Deleted',
        'data' => $taskss,
      ]);
  }
}

