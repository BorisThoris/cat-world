import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClientModule } from '@angular/common/http';
import remote from "../services/kinvey-remote-service.service.js"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model:User;
  username:String;
  picurl:String;
  
  constructor(private remote: remote, private toastr: ToastrService ){
    this.model = new User(this.remote.getCurrentUsername(), null, this.remote.getCurrentProfilePic(),null)
    this.username = this.remote.getCurrentUsername();
    this.picurl = this.remote.getCurrentProfilePic();
    
   
  }
  
  //UPDATE FUNC
  testfunc(){
    console.log(this.model.username);
    this.remote.updateUser(this.model.username, null, this.remote.getCurrentUserId(), this.model.picUrl).subscribe((UserData) =>
    {
      this.remote.saveSession(UserData);
      this.model = new User(this.remote.getCurrentUsername(), null, this.remote.getCurrentProfilePic(), null)
      this.username = this.remote.getCurrentUsername();
      this.picurl = this.remote.getCurrentProfilePic();
      this.toastr.info("User Information Changed!")
      
    });
  }
    
  ngOnInit() {
   
  }
   
  isAdmin(){
    return this.remote.isAdminUser();

  }

}





