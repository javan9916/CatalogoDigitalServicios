import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit {
  onChosen = false;
  maplat = 9.937236533452204;
  maplng = -84.09428348902404;
  markerlat = 0;
  markerlng = 0;
  circle: number = 0;
  radius: number;
  
  constructor() { }

  ngOnInit(): void { }

  onMapClicked(event) {
    console.log(event);
    this.markerlat = event.coords.lat;
    this.markerlng = event.coords.lng;
    this.onChosen = true;
  }

  onEnter() {
    if (this.onChosen) {
      this.circle = this.radius; 
    }
  }

}