import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clinic-header',
  templateUrl: './clinic-header.component.html',
  styleUrls: ['./clinic-header.component.css']
})
export class ClinicHeaderComponent implements OnInit {

  constructor(public router:Router,public toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    this.toastrService.success('Logout sucessfully')
  }
}
