import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import remote from "../services/kinvey-remote-service.service.js";
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Message } from '../message';


@Component({
  selector: 'app-pm-writer',
  templateUrl: './pm-writer.component.html',
  styleUrls: ['./pm-writer.component.css']
})
export class PmWriterComponent implements OnInit {
  model: Message;
  Message;

  constructor(private route: ActivatedRoute, private remote: remote, private router: Router, private toastr: ToastrService) { 
    this.model = new Message("", "false", "", "");
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.remote.GetCatById(id).subscribe((data)=>{
      this.model.catName = data['name'];
      this.model.receiver = data['_acl'].creator;
      this.model.sender = this.remote.getCurrentUserId();
      console.log(this.model);
    })
    
  }

  sendMessage(){  
    //Variables
    let message = this.model.message;
    let receiver = this.model.receiver;
    let catName = this.model.catName;
    let sender = this.model.sender;
    let open = this.model.open;
    let senderName = this.remote.getCurrentUsername();

    if(receiver===sender){
      this.toastr.info("Messaging Yourself?");
    }
    //Creating Message
    else if(message.length<=0){
      this.toastr.error("Message is required!")
    }
    else if (message.length > 1069 ){
      this.toastr.error("Message should be shorter!")
    }
    else{
    let madeDate = new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM
    this.remote.CreateMessage(message, receiver, sender, open, senderName, madeDate, catName).subscribe((data)=>{
      this.toastr.success("Message Sent!")
    },(error: any)=>{
      this.toastr.error(error);
    })
    }
  
  }
}
  
