import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ClinicService} from '../service/clinic.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {environment} from '../../environments/environment';
// import {TokenInterceptor} from '../service/tokenInterceptors'
import {SuperAdminService} from '../service/super-admin.service';
declare var $: any;
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  imageUrl:any=environment.url + "blog/"
  images:any;
  authData:any;
  editDoctorcArr:any=[];
  fileToUpload:any;
  doctorId:any;
  dayArr:any=[];
  BlogAdd:any;
  BlogData:any;
  createDoctorForm:any;
content: any;
isloading:boolean=true;

  constructor(public clinicService:ClinicService,public toastrService:ToastrService,public superAdminService:SuperAdminService,
    public router:Router,public activatedRoute:ActivatedRoute) { 
      // console.log(this.superAdminService.getAuthUser());
      this.authData=this.superAdminService.getAuthUser()
    this.activatedRoute.params.subscribe((params: any) => {
      this.doctorId=params;
      
   })
   this.getBlog()
  }

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
  ngOnInit(): void {
    this.BlogAdd=new FormGroup({
      title:new FormControl("", [Validators.required]),
      shorttitle:new FormControl("", [Validators.required]),
      image:new FormControl("", [Validators.required]),
      description:new FormControl("", [Validators.required]),
    });
    if(this.doctorId.id){
      this.BlogAdd.get('image').clearValidators();
      this.BlogAdd.updateValueAndValidity();
    }
    this.getBlogData();
  }

  getBlog(){
    this.superAdminService.getBlog().subscribe((result:any)=>{
      this.isloading=false
       console.log("Blog Data",result);
       this.BlogData=result.data;
    })
   }

  onSubmit(){
    this.BlogAdd.markAllAsTouched();
    if(this.doctorId.id){
      this.isloading=true;

      console.log("update:",this.fileToUpload)
      const formData = new FormData();
      formData.append('id', this.doctorId.id);
      if(this.fileToUpload !=undefined)
      formData.append('blog', this.fileToUpload);
      formData.append('contentFirst', this.BlogAdd.value.title);
      formData.append('contentSecond', this.BlogAdd.value.shorttitle);
      formData.append('long_description', this.BlogAdd.value.description);

       this.superAdminService.UpdateBlog(formData).subscribe(result =>{
         if(result){
        this.isloading=false;
           this.router.navigateByUrl('/blog')
         }
       })
    }else{
      if(this.BlogAdd.valid){
        this.isloading=true;
      //  console.log('sfkhgsjdhfjskhs  4238867878')
        const formData = new FormData();
        formData.append('blog', this.fileToUpload);
        formData.append('contentFirst', this.BlogAdd.value.title);
        formData.append('contentSecond', this.BlogAdd.value.shorttitle);
        formData.append('long_description', this.BlogAdd.value.description);
          this.superAdminService.createBlog(formData).subscribe(result=>{
            // console.log(result);
        this.isloading=false;
            this.BlogAdd.reset();
            if(result.status == 200){
              this.router.navigate(['/blog'])
              this.toastrService.success('Blog Added Successfully!!');
            }
          })
      }
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.images=this.imageUrl + this.fileToUpload.name;
    console.log("uploaded file ::::",this.images)
  }

  getBlogData(){
    this.superAdminService.getBlogById(this.doctorId.id).subscribe((result:any)=>{
      if(result.data.length){
        console.log("result ",result)
      this.BlogAdd.controls.title.setValue(result.data[0].contentFirst);
      this.BlogAdd.controls.shorttitle.setValue(result.data[0].contentSecond);
      this.BlogAdd.controls.description.setValue(result.data[0].long_description);
      this.images=this.imageUrl + result.data[0].blog_name;
    }
    })
    
  }
 
  
}


