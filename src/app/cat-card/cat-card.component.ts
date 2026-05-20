import { Component, OnInit, Input, Output } from '@angular/core';
import { Cat } from '../cat';
import remote from "../services/kinvey-remote-service.service.js";
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css']
})
export class CatCardComponent implements OnInit {
  @Input() cat: Cat;
  @Input() searchOptions2:object;
  @Output() numberOfCats = new EventEmitter<object>();
    fallbackCatImage = 'assets/demo/cat-01.svg';
    picUrl;
    index;
    information;
    
    constructor(private router: Router) {
   }
  
  ngOnInit() {
    this.index=1;
    this.picUrl=this.cat.imgUrl;
    console.log(this.searchOptions2);
  }
  
  loadInfo(){
  this.information = this.cat.information;
  let id = this.cat._id;
  this.router.navigate(['/view-cat/' + id])
  }

  getCatImage(imgUrl) {
    return imgUrl || this.fallbackCatImage;
  }

  useFallbackImage(event) {
    event.target.src = this.fallbackCatImage;
  }
  
  //VALIDATION TESTS  
  isCastrated(){
    if(this.cat.castrated){
      return true;
    }
  }

  isVaccinated() {
    if (this.cat.vaccinated) {
      return true;
    }
  }

  isCreator(){
    let user = localStorage.getItem("userId");
    let catCreator = this.cat._acl.creator;
    if(user===catCreator){
      return(true);
    }
  }


  //SORTING OPTIONS
  isSorted(){
    let searchAge = this.searchOptions2['age'];
    let castrated = this.searchOptions2['castrated'];
    let vaccinated = this.searchOptions2['vaccinated'];
    let breed = this.searchOptions2['breed'];
    let city = this.searchOptions2['city'];

    if(city==="Всички" && breed==="Всички")
    {
      if (this.cat.age >= searchAge && this.cat.castrated === castrated && this.cat.vaccinated === vaccinated){
        return true}  
    }
    else if (city==="Всички"){
      if (this.cat.age >= searchAge && this.cat.castrated === castrated && this.cat.vaccinated === vaccinated && this.cat.breed === breed){ 
        return true }
    }


    //if (this.cat.age >= searchAge && this.cat.castrated === castrated && this.cat.vaccinated === vaccinated && this.cat.breed === breed && this.cat.city===city){return true}
  }

  //SLIDER FUNC
  funcMove(input){
    let index = this.index;
    if(input==='left'){
        func: {
          let index = this.index;
          if (index === 1) {
            this.index = 4;
            break func;
          }
          this.index--;
        }
      }
    else if(input==="right"){
      func: {
        let index = this.index;
        if (index === 4) {
          this.index = 1;
          break func;
        }
        this.index++;
      }
    }
  }
  

  //SLIDER CONDITIONS
  is1() {
    let index = this.index;
    if (index === 1) {
      return true;
    }
  }

  is2() {
    let index = this.index;
    if (index === 2) {
      return true;
    }
  }

  is3() {
    let index = this.index;
    if (index === 3) {
      return true;
    }
  }

  is4() {
    let index = this.index;
    if (index === 4) {
      return true;
    }
  }

}
