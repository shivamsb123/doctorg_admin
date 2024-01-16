import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { DistrictService } from '../service/district.service';
import { OthenticationService } from '../service/othentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profiledata: any ;
  storeLocaldata: any;
  user:any = "";
  constructor( private othentication: OthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    // private distService: DistrictService,
  
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.othentication.getProfile().subscribe(res => {
      this.profiledata = res.data;

      this.user = this.profiledata.firstName;
    })
  }

  editprofile(profdata: any) {
    localStorage.setItem('profiledata', JSON.stringify(profdata))

    this.storeLocaldata = localStorage.setItem('prifiledata', JSON.stringify(profdata));
    // this.router.navigate(['/edit/' + campaign.id])`
    this.router.navigate(['/edit/' + profdata.id])
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
    this.toastr.success('Logout sucessfully')
  }

}
