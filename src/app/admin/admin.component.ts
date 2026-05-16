import { Component, OnInit } from '@angular/core';
import remote from "../services/kinvey-remote-service.service.js";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users
  accessDenied: boolean;

  constructor(private remote: remote) { }

  ngOnInit() {
    this.accessDenied = !this.remote.isAdminUser();
    if (this.accessDenied) {
      console.log("not admin")
      this.users = [];
      return;
    }
    this.remote.GetAllUsers().subscribe((data)=>{
      this.users = data;
    
    })
  }

  getUsersAgain(){
    if (this.accessDenied) {
      return;
    }
    this.remote.GetAllUsers().subscribe((data) => {
      this.users = data;
    })
  }


}
 
