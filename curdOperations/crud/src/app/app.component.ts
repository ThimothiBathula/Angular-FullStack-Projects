import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,RouterOutlet,CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
  d:any={}
  response:any={}
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

}
