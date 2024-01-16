import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-sidenavbar',
  templateUrl: './doctor-sidenavbar.component.html',
  styleUrls: ['./doctor-sidenavbar.component.css']
})
export class DoctorSidenavbarComponent implements OnInit {
  showTab1 = false;
  showTab2 = false;
  showTab3 = false;
  showTab4 = false;
  showTab5 = false;
  tabToggle1() {
    this.showTab1 = !this.showTab1;
    this.showTab2 = false;
    this.showTab3 = false;
    this.showTab4 = false;
    this.showTab5 = false;
  }
  tabToggle2() {
    this.showTab1 = false;
    this.showTab3 = false;
    this.showTab4 = false;
    this.showTab5 = false;
    this.showTab2 = !this.showTab2;
  }
  tabToggle3() {
    this.showTab1 = false;
    this.showTab2 = false;
    this.showTab4 = false;
    this.showTab5 = false;
    this.showTab3 = !this.showTab3;
  }
  tabToggle4() {
    this.showTab1 = false;
    this.showTab3 = false;
    this.showTab2 = false;
    this.showTab5 = false;
    this.showTab4 = !this.showTab4;
  }

  tabToggle5() {
    this.showTab1 = false;
    this.showTab3 = false;
    this.showTab2 = false;
    this.showTab4 = false;
    this.showTab5 = !this.showTab5;
  }

  clsubmenu() {
    this.showTab1 = false;
    this.showTab2 = false;
    this.showTab3 = false;
    this.showTab4 = false;
    this.showTab5 = false;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
