import { Component, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cat } from '../cat';
import { ALL_CAT_OPTION, CAT_BREEDS, CAT_CITIES } from '../cat-options';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {
  
  model:Cat;
  options: object;
  breeds = [ALL_CAT_OPTION].concat(CAT_BREEDS);
  cities = [ALL_CAT_OPTION].concat(CAT_CITIES);
  @Output() searchEvent = new EventEmitter<object>();
  @ViewChild('ageField') ageField: ElementRef;
  @ViewChild('vaccinatedCheck') vaccinatedCheck: ElementRef;
  @ViewChild('castratedCheck') castratedCheck: ElementRef;


  //vaccinatedCheck
  //CONSTRUCTOR
  constructor() {
    this.model = new Cat('', ALL_CAT_OPTION, 0, null, null, null, null, null, ALL_CAT_OPTION)
  }
  
  
  
  //FUNCTIONS
  test(){
    //VARIABLES
    let ageValue = parseInt(this.ageField.nativeElement.value);
    let vaccinated = this.vaccinatedCheck.nativeElement.checked;
    let castrated = this.castratedCheck.nativeElement.checked;
    //TESTING
    console.log(this.model.age + " vaccinated: " + vaccinated, castrated);
    //SETTING DATA
    this.model.castrated = castrated;
    this.model.vaccinated = vaccinated;
    this.model.age = ageValue;
    //EMITTING
    this.options = this.model;
    this.searchEvent.emit(this.options);
  }
  
  ngOnInit(){
    //VALUES FROM MODEL
    this.ageField.nativeElement.value = 0;
    let vaccinated = this.vaccinatedCheck.nativeElement.checked;
    let castrated = this.castratedCheck.nativeElement.checked;
    this.model.castrated = castrated;
    this.model.vaccinated = vaccinated;
    //EMITTING MODEL
    this.model.age = parseInt(this.ageField.nativeElement.value);
    this.model.city = ALL_CAT_OPTION; this.model.breed = ALL_CAT_OPTION;
    console.log(this.model);
    this.options = this.model;
    this.searchEvent.emit(this.options);
  }

}
