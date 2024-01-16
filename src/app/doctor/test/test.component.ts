import { Component } from '@angular/core';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  testArr: any=[];

constructor(public doctorService: DoctorService){}
  status: any;
  ngOnInit() {
    this.getTest()
  }
  clickEvent() {
    this.status = !this.status;
  }
  getTest() {
    this.doctorService.getAllTest().subscribe((result: any) => {
      this.testArr = result.data
    })
  }
}
