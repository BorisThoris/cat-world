import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import remote from "../services/kinvey-remote-service.service.js";
import { Cat } from '../cat';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { CAT_BREEDS, CAT_CITIES } from '../cat-options';

@Component({
  selector: 'app-view-cat-info',
  templateUrl: './view-cat-info.component.html',
  styleUrls: ['./view-cat-info.component.css']
})
export class ViewCatInfoComponent implements OnInit {
  model: Cat;
  Cat;
  imgIndex = 0;
  imageUrls = [];
  canEdit = false;
  breeds = CAT_BREEDS;
  cities = CAT_CITIES;
  fallbackCatImage = 'assets/demo/cat-01.svg';

  constructor(private route: ActivatedRoute, private remote: remote, private router: Router, private toastr: ToastrService) {
    this.model = new Cat("", "", 0, 0, "", "", "","", "");
   }
      
    isAdmin(){
      if(this.remote.isAdminUser()){
        return(true);
      }
    }

    isAuth() {
      return this.canEdit;
    }

    getCreatorId() {
      if (!this.model || !this.model._acl || !this.model._acl.creator) {
        return null;
      }

      let creator = this.model._acl.creator;
      return creator._id || creator.username || creator;
    }

    updateEditState() {
      let creatorId = this.getCreatorId();
      let userId = this.remote.getCurrentUserId();
      this.canEdit = this.remote.isAdminUser() || creatorId === userId;
    }
    
    //DELETING CAT
    deleteFunc()
    { 
    //VALIDATION
    let creatorId = this.getCreatorId();
    let userId = this.remote.getCurrentUserId();

    //DELETE REQUEST
      if(this.isAdmin() || creatorId === userId)
        {
          this.toastr.info("Deleting Cat!")
          const id = this.route.snapshot.paramMap.get('id');
          this.remote.deleteCat(id).subscribe((data)=>{
            this.toastr.success("Cat Deleted!")
            this.router.navigate(["/viewAll"])
          }, (error: any) => {
            this.toastr.error("Creation Error");
          })
        }
      else (this.toastr.error("Not Admin or Creator"))
    } 
    
    //UPDATING CAT
  testFunc(){
      //VALIDATION

      //VARIABLES
      let creatorId = this.getCreatorId();
      let userId = this.remote.getCurrentUserId();
      const id = this.route.snapshot.paramMap.get('id');
      let name = this.model.name;
      let breed = this.model.breed;
      let contactNumber = this.model.contactNumber;
      let age = this.model.age;
      let information = this.model.information;
      let imgUrl = this.model.imgUrl;
      let imgUrl2 = this.model.imgUrl2;
      let imgUrl3 = this.model.imgUrl3;
      let imgUrl4 = this.model.imgUrl4;
      
      
      //LOGIC
      if (name === "" || breed === "" || age <= 0 || contactNumber < 0 || information === "" || imgUrl === "") {
        this.toastr.error("Fields Should Not Be Empty!");
      } else if (name.length > 16) {
        this.toastr.error("Name Should Be Shorter!");
      } else if (information.length > 380) {
        this.toastr.error("Information Should Be Less!");
      } else if(breed.length>16){
        this.toastr.error("Breed Length should be shorter!")
      }
      else if (age > 17) {
        this.toastr.error("Cat Should Be Alive!");
      }
      
      else if(this.isAdmin() || creatorId===userId){
        //UPDATE REQUEST
        this.toastr.info("Updating   Cat!")
        this.remote.UpdateCat(name,breed,age,contactNumber,information,imgUrl,imgUrl2,imgUrl3,imgUrl4,this.model.vaccinated,this.model.castrated,this.model.city,id).subscribe((data)=>{
        this.toastr.info("Cat Updated!")
        this.updateImageUrls();
      }, (error: any) => {
           this.toastr.error("Creation Error");
          })}
      else{
         this.toastr.error("Not Admin or Creator")}
      }


      //SLIDER
  //INDEX LOGIC
  right() {
    func: {
      if (this.imageUrls.length === 0) {
        break func;
      }
      let index = this.imgIndex;
      if (index === this.imageUrls.length - 1) {
        this.imgIndex = 0;
        break func;
      }
      this.imgIndex++;
    }
  }

  left() {
    func: {
      if (this.imageUrls.length === 0) {
        break func;
      }
      let index = this.imgIndex;
      if (index === 0) {
        this.imgIndex = this.imageUrls.length - 1;
        break func;
      }
      this.imgIndex--;
    }
  }

  getCatImage(imgUrl) {
    return imgUrl || this.fallbackCatImage;
  }

  getCurrentImage() {
    return this.getCatImage(this.imageUrls[this.imgIndex]);
  }

  updateImageUrls() {
    this.imageUrls = [
      this.model.imgUrl,
      this.model.imgUrl2,
      this.model.imgUrl3,
      this.model.imgUrl4
    ];

    if (this.imgIndex >= this.imageUrls.length) {
      this.imgIndex = 0;
    }
  }

  useFallbackImage(event) {
    event.target.src = this.fallbackCatImage;
  }
    
  sendMessageFunc(){
        const id = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['/pm-create/' + id])
      }
    

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    //UGLY PASSING DATA FROM DB
    this.remote.GetCatById(id).subscribe((data) => {
      this.Cat = data;
      this.model.city = this.Cat.city;
      this.model.breed = this.Cat.breed;
      this.model.name = this.Cat.name;
      this.model.contactNumber = this.Cat.contactNumber;
      this.model.age = this.Cat.age;
      this.model.information = this.Cat.information;
      this.model.imgUrl = this.Cat.imgUrl;
      this.model.imgUrl2 = this.Cat.imgUrl2;
      this.model.imgUrl3 = this.Cat.imgUrl3;
      this.model.imgUrl4 = this.Cat.imgUrl4;
      this.model._acl = this.Cat._acl;
      this.model.castrated = this.Cat.castrated;
      this.model.vaccinated = this.Cat.vaccinated;
      this.imgIndex = 0;
      this.updateImageUrls();
      this.updateEditState();
      
    })
    }
  }
  
  
  
        

        
        
      
            
            
            
      
      

      
        
        
    
    
    

    



