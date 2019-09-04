@extends('layouts.app')

@section('content')
<div class="container">
  <h1>Hello {{$name}}.</h1>
  <span>You are requested to get verified for the registration in xyz school.</span><br>
  Your email id is :- <b> {{$email}}.</b><br>
  Your password is :- <b>{{$password}}.</b><br>

  <span> Please click on the given link to get verified -<a>{{$link}}</a>.<br>
</span>

  </p>
</div>
@endsection