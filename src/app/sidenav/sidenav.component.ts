import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

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
  decoded: any
  constructor() {
   
  }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    this.decoded = jwt_decode(token);
  }

}
