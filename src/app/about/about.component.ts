import { Component, OnInit } from '@angular/core';
import remote from "../services/kinvey-remote-service.service.js";
import { Stuff } from '../stuff';
import { getLocaleFirstDayOfWeek } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  //PIC1
  pic1: string;
  pic1Adress: string;
  //PIC2
  pic2: string;
  pic2Adress: string;
  //PIC3
  pic3: string;
  pic3Adress: string;
  //PIC4
  pic4: string;
  pic4Adress: string;
  constructor(private remote: remote){
    
  }

  
  ngOnInit() {
    console.log("loldsds");
    if(localStorage.length===0)
      {
        console.log("lol, inside if")
        this.remote.login("Guest2", "Guest2").subscribe((data)=>{
          this.remote.saveSession(data); this.getCats();})
        }
        else
        {
         this.getCats() 
        }
      }
       

    getCats() {
      this.remote.GetAllCats().subscribe((data) => {
        let stuff2 = data;
        let length = Object.keys(stuff2).length;
        let index = (position) => ((position % length) + length) % length;
        //PIC1
        this.pic1 = stuff2[index(length - 1)].imgUrl;
        this.pic1Adress = stuff2[index(length - 1)]._id;
        //PIC2
        this.pic2 = stuff2[index(length - 2)].imgUrl;
        this.pic2Adress = stuff2[index(length - 2)]._id;
        //PIC3
        this.pic3 = stuff2[index(length - 3)].imgUrl;
        this.pic3Adress = stuff2[index(length - 3)]._id;
        //PIC4
        this.pic4 = stuff2[index(length - 4)].imgUrl;
        this.pic4Adress = stuff2[index(length - 4)]._id;
        console.log(this.pic1Adress);
      })
    }
  }

          
         

          
      
  

      
