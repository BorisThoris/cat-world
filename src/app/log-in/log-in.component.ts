import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import remote from "../services/kinvey-remote-service.service.js";
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';

import { ToastrModule } from 'ngx-toastr';
// public id:
// public userName:
// public password:
// public picUrl:
 
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  
})
export class LogInComponent implements OnInit {
  model: User;
  
  constructor(private remote: remote, private router: Router, private toastr: ToastrService) {
   this.model = new User("","",null,null); 
  }
  
  //FUNCTIONS
  testFunc(){
    //VALIDATION
      if(this.model.username === "" || this.model.password === ""){
          this.toastr.error("Fields should not be empty")}
    //LOGIN
      else if (this.remote.isLoggedInUser()) { this.toastr.error("Already Logged In!"); this.router.navigate(['/viewAll']);}
      else{
        this.toastr.info("Logging in!");
        this.remote.login(this.model.username, this.model.password).subscribe((userData) =>
        {
          this.remote.saveSession(userData);
          this.toastr.success("Logged in!");
          this.router.navigate(['/about'])
        }, (error: any) => {
          this.toastr.error("LogIn Error");
        })
      }
    }
    
    submit():void{
    } 
    ngOnInit(){
    }
    ngOnChange(){
    }
    
  }
    

    
    

   

          
          
    
    

   
    

  
