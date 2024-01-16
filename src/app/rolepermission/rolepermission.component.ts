import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DistrictService } from "../service/district.service";
import { Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-rolepermission",
  templateUrl: "./rolepermission.component.html",
  styleUrls: ["./rolepermission.component.css"],
})
export class RolepermissionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  status: boolean = false;
  modalReference: any;

  clickEvent() {
    this.status = !this.status;
  }
  roleSelected: boolean = false;
  displayedColumns1: string[] = [
    "id",
    "name",
    "view",
    "insert",
    "update",
    "delete",
  ];
  // 'insert','update','delete'
  dataSource: any;
  selection: any;
  createRoleForm!: FormGroup;
  roleList: any;
  id: any;
  roleForm!: FormGroup;
  permissionRecord: any;
  roleId: any;
  roleName: any;
  moduleRecord: any;
  permissionUrls: any = [];
  inserted = true;
  updated = true;
  views = true;
  deleted = true;
  download = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private distService: DistrictService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.allRoleList();
    this.distService.resouceList().subscribe((data) => {
      if (data.status == 200) {
        this.permissionRecord = data.data;
      }
    });
    this.roleForm = this.fb.group({
      name: ["", [Validators.required]],
      status: ["", [Validators.required]],
      insert: ["", [Validators.required]],
      update: ["", [Validators.required]],
      delete: ["", [Validators.required]],
      view: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.createRoleForm = this.fb.group({
      name: [false, Validators.required],
      view: [false, Validators.required],
      insert: [false, Validators.required],
      update: [false, Validators.required],
      delete: [false, Validators.required],
    });
  }

  ngAfterViewInit() {}

  roleCreate() {
    if (this.createRoleForm.valid) {
      this.distService
        .createRole(this.createRoleForm.value)
        .subscribe((responce) => {
          this.toastr.success("Role Created Successfully!!");
          this.modalReference.close();
          this.router.navigate(["/role-list"]);
        });
    }
  }

  allRoleList() {
    this.distService.roleList().subscribe((result) => {
      this.roleList = result.data;
      this.dataSource = new MatTableDataSource(this.roleList);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }

      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  chkFunction(value) {
  
  }

  update: boolean = false;
  updateRoleById(id, data, type) {
    if (type == 1)
      if (data.checked == true) {
        this.createRoleForm.patchValue({
          view: true,
        });
      } else {
        this.createRoleForm.patchValue({
          view: false,
        });
      }

    if (type == 2)
      if (data.checked == true) {
        this.createRoleForm.patchValue({
          insert: true,
        });
      } else {
        this.createRoleForm.patchValue({
          insert: false,
        });
      }

    if (type == 3)
      if (data.checked == true) {
        this.createRoleForm.patchValue({
          update: true,
        });
      } else {
        this.createRoleForm.patchValue({
          update: false,
        });
      }
    if (type == 4)
      if (data.checked == true) {
        this.createRoleForm.patchValue({
          delete: true,
        });
      } else {
        this.createRoleForm.patchValue({
          delete: false,
        });
      }
    this.distService
      .updateRole(id, {
        view: this.createRoleForm.value.view,
        insert: this.createRoleForm.value.insert,
        update: this.createRoleForm.value.update,
        delete: this.createRoleForm.value.delete,
      })
      .subscribe((responce) => {
       
      });
  }

  openVerticallyCentered(content) {
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeRole() {

    this.roleSelected = true;
    this.roleId = this.roleForm.value.name;
    this.distService.getRoleById(this.roleId).subscribe((data: any) => {
      if (data.status == 200) {
        this.roleName = data.data;
      }
    });
    this.distService
      .permissionListByRoleId(this.roleId)
      .subscribe((results: any) => {
        if (results.status == 200) {
          this.moduleRecord = results.data;
          this.moduleRecord.forEach((element: any) => {
            this.permissionUrls.push({
              permissionId: element.permissionId,
              roleId: element.roleId,
              insert: element.insert,
              update: element.update,
              delete: element.delete,
              download: element.download,
              view: element.view,
            });
            this.permissionRecord.forEach((ele) => {
              if (ele.id === element.permissionId) {
                if (element.insert == true) {
                  ele.insert = true;
                }
                if (element.update == true) {
                  ele.update = true;
                }
                if (element.delete === true) {
                  ele.delete = true;
                }
                if (element.view == true) {
                  ele.view = true;
                }
                if (element.download == true) {
                  ele.download = true;
                } else if (element.download == "null") {
                  ele.download = false;
                } else if (element.insert == "null") {
                  ele.insert = false;
                } else if (element.view == "null") {
                  ele.view = false;
                } else if (element.delete == "null") {
                  ele.delete = false;
                } else if (element.update === "null") {
                  ele.update = false;
                }
              }
            });
          });
        } else if (results.status == 404) {
   
        } else if (results.status == 500) {
          this.toastr.error("Unable to process");
        }
      });
  }
  change(event, permissionId, values) {

    let roleId = this.roleId;
    let permission = 0;
    if (permissionId.prmissionId) {
      permission = permissionId.prmissionId;
    }
    if (permissionId.id) {
      permission = permissionId.id;
    }
    if (event == true) {
      if (values == "Write")
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            insert: true,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.success("Permission Create Successfully");
            }
          });
    }
    if (values == "Edit") {
      this.distService
        .createPermission({
          permissionId: permission,
          roleId: roleId,
          update: true,
        })
        .subscribe((data: any) => {
          if (data.status == 200) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 208) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 500) {
            this.toastr.success("Permission Create Successfully");
          }
        });
    }

    if (values == "Delete") {
      this.distService
        .createPermission({
          permissionId: permission,
          roleId: roleId,
          delete: true,
        })
        .subscribe((data: any) => {
          if (data.status == 200) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 208) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 500) {
            this.toastr.success("Permission Create Successfully");
          }
        });
    }

    if (values == "Read") {
      this.distService
        .createPermission({
          permissionId: permission,
          roleId: roleId,
          view: true,
        })
        .subscribe((data: any) => {
          if (data.status == 200) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 208) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 500) {
            this.toastr.error("Permission Create Successfully");
          }
        });
    }

    if (values == "Download") {
      this.distService
        .createPermission({
          permissionId: permission,
          roleId: roleId,
          download: true,
        })
        .subscribe((data: any) => {
          if (data.status == 200) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 208) {
            this.toastr.success("Permission Updated");
          } else if (data.status == 500) {
            this.toastr.error("Permission Create Successfully");
          }
        });
    }

    if (event == false) {
      if (values == "Write") {
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            insert: false,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.success("Permission Create Successfully");
            }
          });
      }

      if (values == "Edit") {
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            update: false,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.success("Permission Create Successfully");
            }
          });
      }
      if (values == "Delete") {
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            delete: false,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.success("Permission Create Successfully");
            }
          });
      }
      if (values == "Read") {
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            view: false,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.error("Permission Create Successfully");
            }
          });
      }
      if (values == "Download") {
        this.distService
          .createPermission({
            permissionId: permission,
            roleId: roleId,
            download: false,
          })
          .subscribe((data: any) => {
            if (data.status == 200) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 208) {
              this.toastr.success("Permission Updated");
            } else if (data.status == 500) {
              this.toastr.error("Permission Create Successfully");
            }
          });
      }
    }
  }
}
