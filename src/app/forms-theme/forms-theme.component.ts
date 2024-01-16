import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-forms-theme',
  templateUrl: './forms-theme.component.html',
  styleUrls: ['./forms-theme.component.css']
})
export class FormsThemeComponent implements OnInit {

  status: boolean = false;
    clickEvent(){
        this.status = !this.status;       
    }

    bsInlineValue = new Date();
    bsInlineRangeValue: Date[];
    maxDate = new Date();

    name = 'Angular';
    productForm: FormGroup;

  constructor(private clickmize:FormBuilder) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];

    
    this.productForm = this.clickmize.group({
      name: '',
      quantities: this.clickmize.array([]) ,
    });
  }
  
  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.clickmize.group({
      field1: '',
      field2: '',
      field3: '',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }
   
  onSubmit() {

   }

  ngOnInit(): void {
  }

}
