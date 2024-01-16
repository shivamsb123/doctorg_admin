import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DistrictService } from '../service/district.service';
import { OthenticationService } from '../service/othentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
export interface UserData {
}

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})


export class RoleListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status: boolean = false;
  modalReference: any;
  isloading:boolean=true;

  clickEvent() {
    this.status = !this.status;
  }

  displayedColumns1: string[] = ['id', 'name', 'action'];
  // 'insert','update','delete'
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  createRoleForm!: FormGroup;
  roleList: any;
  id: any;
  constructor(
    private othentication: OthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private distService: DistrictService,
    private toastr: ToastrService,
    private modalService: NgbModal

  ) {
    this.allRoleList()

  }

  ngOnInit(): void {
    this.createRoleForm = this.fb.group({
      name: ['', Validators.required],

    })
  }

  ngAfterViewInit() {
  }

  roleCreate() {
    if (this.id > 0) {
      this.update();
    }
    else {
      if (this.createRoleForm.valid) {
        this.distService.createRole(this.createRoleForm.value).subscribe(responce => {
          if (responce.status == 200) {
            this.toastr.success("Role created successfully")
            this.router.navigate(['/role-list'])
          } if (responce.status == 500) {
            this.toastr.success("unable to proceess")
          }
          this.modalReference.close();

        })
      }
    }


  }


  allRoleList() {
    this.distService.roleList().subscribe(result => {
      this.isloading=false
      this.roleList = result.data;
      this.dataSource = new MatTableDataSource(this.roleList);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }

      if (this.sort) {
        this.dataSource.sort = this.sort
      }
    })
  }

  chkFunction(value) {


  }
modelName:any;
  update() {
    this.distService.updateRole(this.id, {
      name: this.createRoleForm.value.name,
    }).subscribe((responce: any) => {
      if (responce.status == 200) {
        this.modalReference.close();
        this.toastr.success("updated successfully")
      } if (responce.status == 500) {
        this.toastr.success("unable to process")
      }
    })
  }

  openVerticallyCentered(content, num: any, formData: any) {
    if (num == 1) {
      this.modelName='Create role'
      this.id='';
      this.createRoleForm.patchValue({
        name: ''
      })
    }
    if (num == 2) {
      this.modelName='Update role'
      this.id = formData.id;
      this.createRoleForm.patchValue({
        name: formData.name
      })

    }
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

