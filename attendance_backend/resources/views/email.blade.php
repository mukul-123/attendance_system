@extends('layouts.app')

@section('content')
<div class="container">
  <h1>Hello {{$name}}.</h1>
  <span>You are requested to get verified for the admission in xyz school.</span><br>
  <p>Your verification code is :<b>{{$code}}</b>.</p>
  <span> Please provide this authentication code to your school head 
      to get verified.<br>
      This code will be valid for 48 hours.
</span>

  </p>
</div>
@endsection