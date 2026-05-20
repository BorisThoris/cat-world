import { Component, OnInit } from '@angular/core';
import { Cat } from '../cat';
import remote from "../services/kinvey-remote-service.service.js";
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CAT_BREEDS, CAT_CITIES } from '../cat-options';
//public name: string,
//public breed: string,
//public age: number,
//public contactNumber: number,
//public information: string,
//public imgUrl: string,




@Component({
  selector: 'app-create-cat',
  templateUrl: './create-cat.component.html',
  styleUrls: ['./create-cat.component.css']
})
export class CreateCatComponent implements OnInit {
  model: Cat;
  url: String;
  breeds = CAT_BREEDS;
  cities = CAT_CITIES;
  picUrl;
  imgIndex;
  fallbackCatImage = 'assets/demo/cat-01.svg';
  constructor(private remote: remote, private router: Router, private toastr: ToastrService) {
    this.model = new Cat("", "", 0, 359, "", this.fallbackCatImage, "", "", "", "assets/demo/cat-02.svg", "assets/demo/cat-03.svg", "assets/demo/cat-04.svg")
    this.url = this.model.imgUrl;
   }

  createCat(){
    //VARIABLES
    let name = this.model.name;
    let age = this.model.age;
    let contactNumber = this.model.contactNumber;
    let imgUrl = this.model.imgUrl;
    let imgUrl2 = this.model.imgUrl2;
    let imgUrl3 = this.model.imgUrl3;
    let imgUrl4 = this.model.imgUrl4;
    let breed = this.model.breed;
    let information = this.model.information;
    let vaccinated = this.model.vaccinated;
    let castrated = this.model.castrated;
    let city = this.model.city;
    //VALIDATION
    if (name === "" || breed === "" || age <= 0 || contactNumber < 0 || information === "" || imgUrl === "" || imgUrl2 === "" || imgUrl3 === "" || imgUrl4 === ""){
      this.toastr.error("Fields Should Not Be Empty!");
    }else if(information.length>380){
      this.toastr.error("Information Should Be Less!");}
      else if(age>17)
    {
      this.toastr.error("Cat Should Be Alive!");
    }
    else if (contactNumber.toString().length<8){
      this.toastr.error("Provide a valid number!")    
    }
    //CAT CREATION
    else{
        this.toastr.info("Creating Cat");
        this.remote.CreateCat(name,breed,age,contactNumber,information,imgUrl, imgUrl2, imgUrl3, imgUrl4,vaccinated, castrated, city).subscribe((data) => {
        this.router.navigate(["viewAll"])
        this.toastr.success("Cat Created Succesfully!");
      }, (error: any) => {
        console.log(error);
        this.toastr.error(error.statusText);
      })
      } 
  }
        
  test2(){
    
  }
      

  //SLIDER
  //ON ERROR
  standby(){
    this.toastr.info("Incorrect image link!")
  }

  getCatImage(imgUrl) {
    return imgUrl || this.fallbackCatImage;
  }

  useFallbackImage(event) {
    event.target.src = this.fallbackCatImage;
  }

  //INDEX LOGIC
  right(){ func:{
    let index = this.imgIndex;
    if(index===4){
      this.imgIndex = 1;
      break func;
    }
    this.imgIndex++;
    }
  }

  left() {
    func: {
      let index = this.imgIndex;
      if (index === 1) {
        this.imgIndex = 4;
        break func;
      }
      this.imgIndex--;
    }
  }

  //CONDITIONS
  is1(){
    let index = this.imgIndex;
    if (index === 1) {
      return true;
    }
  }

  is2() {
    let index = this.imgIndex;
    if (index === 2) {
      return true;
    }
  }

  is3() {
    let index = this.imgIndex;
    if (index === 3) {
      return true;
    }
  }

  is4() {
    let index = this.imgIndex;
    if (index === 4) {
      return true;
    }
  }



  ngOnInit() {
    this.model.city = 'Sofia';
    this.model.breed = 'Street';
    this.imgIndex = 1;
  }

}
