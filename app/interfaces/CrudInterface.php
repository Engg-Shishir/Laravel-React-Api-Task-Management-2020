<?php
namespace App\interfaces;
use Illuminate\Http\Request;


interface CrudInterface {

  public function getAll();
  ######## Get all project ########

  public function findById($id);
  ######## Get project by id ########

  public function create(Request $request);
  ######## Store Project ########

  public function edit(Request $request,$id);
  ######## Update Project ########
  
  public function delete($id);
  ######## destroy Project ########

}