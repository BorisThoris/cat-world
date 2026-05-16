import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import remote from "../services/kinvey-remote-service.service.js";
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-naivagtion-bar',
  templateUrl: './naivagtion-bar.component.html',
  styleUrls: ['./naivagtion-bar.component.css']
})
export class NaivagtionBarComponent implements OnInit {
  model: User;
  username: string;
  imgUrl: string;
  newMessages: number;
  messages;
  constructor(private remote: remote, private router: Router, private toastr: ToastrService) {
    this.model = new User(this.remote.getCurrentUsername(), null, this.remote.getCurrentProfilePic(), null)
    this.username = this.model.username;
    this.imgUrl = this.model.picUrl;
    this.newMessages;
   }
  
  
  Logout(){
    this.remote.logout().subscribe((dataBase)=>{
      console.log("logged out");
      this.toastr.info("Logged out!");
      this.router.navigate(['/about']);
      if (!this.remote.isAuth()) {
        console.log("lol, inside if")
        this.remote.login("Guest2", "Guest2").subscribe((data) => {
          this.remote.saveSession(data);
          this.toastr.success("Guest")
        })
      }
    })
  }

  isAuth(){
    if (this.remote.isLoggedInUser()){
      this.model = new User(this.remote.getCurrentUsername(), null, this.remote.getCurrentProfilePic(), null)
      this.username = this.model.username;
      this.imgUrl = this.model.picUrl;
      return true;
    }
    
  }

  isGuest(){
    if (this.remote.isGuestUser()) {
      return true;
    }
    else return false;
  }

  isNotGuest(){
    if(this.remote.isGuestUser()){
      return false;
    }
  }

  isAdmin(){
    if(this.remote.isAdminUser()){
      return true;
    }
  }


  isNotAuth(){
    return !this.remote.isAuth();
  }

  ngOnInit() {
    let id = this.remote.getCurrentUserId()
    this.newMessages=0;
    this.remote.GetAllMessages().subscribe((messages) => {
      for(let index in messages){
        //VARIABLES
        let receiver = messages[index]["receiver"];
        let open = messages[index]["open"]
        //CODE FOR NewMessages
        if(id===receiver && open==="false" ){
        console.log("receiver")
        this.newMessages++;
        }
      }
      this.messages = messages;
    })
  }

  messagesNew(){
    if(this.newMessages===0){
      return false
    } else return true;
  }

}


