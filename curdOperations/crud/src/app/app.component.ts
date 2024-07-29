import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
  ifform=false;
  formName="Register New Member";
  d:any={}
  response:any={}
  name:string='';
  email:string=''
  password:string='';
  id=null;
  constructor(private http:HttpClient){}
  ngOnInit():void{
this.getData()
  }
  getData(){
    this.http.get("http://localhost:1000/getData").subscribe((data:any)=>{
      this.d=data;
      
      console.log(this.d[0]['id'])
    },(error)=>{
      console.log(error)
    })
  }
  delete(id:Number){
    this.http.delete("http://localhost:1000/delete/"+id).subscribe((res)=>{
     this.response=res;
     alert(this.response['message']) 
     this.getData()
    },(err)=>{
      console.log(err)
    })

  }
  postData(){
    this.ifform=false;
    let body={
      name:this.name,
      email:this.email,
      password:this.password
    }
    if(this.id){
      
          this.http.put("http://localhost:1000/update/"+this.id,body).subscribe((res)=>{
            console.log(res)
          },(err)=>{
            console.log(err)
          })
    }
    else{
    this.http.post("http://localhost:1000/postData",body).subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }
  }

  form(ifdata=null){
    this.ifform=true;
    if(ifdata){
      this.name=ifdata['name'];
      this.email=ifdata['email'];
      this.password=ifdata['password'];
      this.formName="Edit Details"
    }
    else{
      this.name="";
      this.email="";
      this.password="";
      this.formName="Register New Member"
    }
  }
  closeForm(){
    this.ifform=false;
    this.clearForm();
  }
  clearForm(){
    this.name="";
    this.email="",
    this.password="";
  }

}
