import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import remote from "../services/kinvey-remote-service.service.js";
import { Cat } from '../cat';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-cat-info',
  templateUrl: './view-cat-info.component.html',
  styleUrls: ['./view-cat-info.component.css']
})
export class ViewCatInfoComponent implements OnInit {
  model: Cat;
  Cat;
  imgIndex;
  breeds;
  cities;

  @ViewChild('name') name: ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('number') number: ElementRef;
  @ViewChild('breed') breed: ElementRef;
  @ViewChild('city') city: ElementRef;
  @ViewChild('info') info: ElementRef;
  @ViewChild('castrated') castrated: ElementRef;
  @ViewChild('vaccinated') vaccinated: ElementRef;
  @ViewChild('link') link: ElementRef;
  @ViewChild('link') link2: ElementRef;
  @ViewChild('link') link3: ElementRef;
  @ViewChild('link') link4: ElementRef;

  constructor(private route: ActivatedRoute, private remote: remote, private router: Router, private toastr: ToastrService) {
    this.model = new Cat("", "", 0, 0, "", "", "","", "");
   }
      
    isAdmin(){
      if(this.remote.isAdminUser()){
        return(true);
      }
    }

    isAuth(){
      let acl = this.model._acl.creator;
      let userId = this.remote.getCurrentUserId();

      if (this.remote.isAdminUser() || acl === userId) {
        return (true);
      } 
      else{
        this.name.nativeElement.setAttribute('disabled', ''); 
        this.age.nativeElement.setAttribute('disabled', ''); 
        this.number.nativeElement.setAttribute('disabled', '');
        this.breed.nativeElement.setAttribute('disabled', '');
        this.city.nativeElement.setAttribute('disabled', '');
        this.info.nativeElement.setAttribute('disabled', '');
        this.castrated.nativeElement.disabled = true;
        this.vaccinated.nativeElement.disabled = true;
        this.link.nativeElement.setAttribute('disabled', '');
        this.link2.nativeElement.setAttribute('disabled', '');
        this.link3.nativeElement.setAttribute('disabled', '');
        this.link4.nativeElement.setAttribute('disabled', '');
        
        return(false);
      }
    }
    
    //DELETING CAT
    deleteFunc()
    { 
    //VALIDATION
    let acl = this.model._acl.creator;
    let userId = this.remote.getCurrentUserId();

    //DELETE REQUEST
      if(this.isAdmin() || acl === userId)
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
      let acl = this.model._acl.creator;
      let userId = this.remote.getCurrentUserId();
      const id = this.route.snapshot.paramMap.get('id');
      let name = this.model.name;
      let breed = this.model.breed;
      let contactNumber = this.model.contactNumber;
      let age = this.model.age;
      let information = this.model.information;
      let imgUrl = this.model.imgUrl;
      
      
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
      
      else if(this.isAdmin() || acl===userId){
        //UPDATE REQUEST
        this.toastr.info("Updating   Cat!")
        this.remote.UpdateCat(name,breed,age,contactNumber,information,imgUrl, id).subscribe((data)=>{
        this.toastr.info("Cat Updated!")
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
      let index = this.imgIndex;
      if (index === 4) {
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
  is1() {
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
    
  sendMessageFunc(){
        const id = this.route.snapshot.paramMap.get('id');
        this.router.navigate(['/pm-create/' + id])
      }
    

  ngOnInit() {
    this.breeds = [
      "Улична",
      "Девон рекс",
      "Герман Рекс",
      "Манкс",
      "Шотландска клепоуха котка",
      "Японски бобтейл",
      "Ориенталска котка",
      "Норвежска горска котка",
      "Персийска котка",
      "Европейска късокосместа котка",
      "Мейн Куун",
      "Сиамска котка",
      "Кимрик",
      "Регдол",
      "Турска ангорска котка",
      "Сибирска котка",
      "Сомалийска котка",
      "Руска синя котка",
      "Бурманска котка",
      "Британска късокосместа котка",
      "Бирманска котка",
      "Абисинска котка",
      "Персийска котка",
    ];
    this.cities = ["Благоевград", "Бургас", "Варна", "Велико Търново", "Видин", "Враца", "Габрово", "Добрич", "Кърджали", "Кюстендил", "Ловеч", "Монтана", "Пазарджик", "Перник", "Плевен", "Пловдив", "Разград", "Русе", "Силистра", "Сливен", "Смолян", "София", "Стара Загора", "Търговище", "Хасково", "Шумен", "Ямбол"]
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
      this.imgIndex = 1;
      
      this.remote.GetUserById(this.model._acl.creator.username).subscribe((data)=>{
        console.log(data);
      })
    })
    }
  }
  
  
  
        

        
        
      
            
            
            
      
      

      
        
        
    
    
    

    



