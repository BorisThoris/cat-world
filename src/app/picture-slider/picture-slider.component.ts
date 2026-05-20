import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-slider',
  templateUrl: './picture-slider.component.html',
  styleUrls: ['./picture-slider.component.css']
})
export class PictureSliderComponent implements OnInit {
  slides = [
    'assets/demo/cat-01.svg',
    'assets/demo/cat-02.svg',
    'assets/demo/cat-03.svg'
  ];
  currentSlide = 0;

  constructor() { }

  previous() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  next() {
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }

  ngOnInit() {
  }

}
