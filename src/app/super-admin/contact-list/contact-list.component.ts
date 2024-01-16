import { Component, OnInit ,ViewChild} from '@angular/core';
import {SuperAdminService} from '../../service/super-admin.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ['name','email','mobile_number', 'address','purpose',];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public superAdminService:SuperAdminService) { }
  status: boolean = false;
  isloading:boolean=true;

  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.contactListData();
  }
contactListData(){
  this.superAdminService.getContactList().subscribe((result:any)=>{
  console.log(result)
  this.isloading=false
  this.dataSource = new MatTableDataSource(result.data);
  this.dataSource.paginator = this.paginator;

  })
}
}
