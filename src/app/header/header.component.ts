import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import { Http} from '@angular/http';
import { Subscription } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  subscription : Subscription;	
  componentName : any;
  totalComponents : any = {textbox : [], textArea : [], button:[], image :[], column1 : [], coulmn2 :[], column3:[], column4 :[]};
  count : any;
  divBgcolor : any;

  constructor( private messageService : MessageService, private http:Http) { 
  	  this.subscription = this.messageService.getLatestFile().subscribe(message => {  
            this.totalComponents = message.data;     
     });
  
  }

  ngOnInit() {
  }

 clearDrawArea(){
   $('#newArea').empty();
 }

  saveComponentName(){
       this.messageService.sendComponentName({name : this.componentName});
  }

   generateFile(){
   console.log('this.totalComponents:',this.totalComponents);
   if(this.componentName &&(this.totalComponents.textbox.length || this.totalComponents.button.length || this.totalComponents.textArea.length)){
       this.http.post('http://localhost:5000/api/createFile', {totalComponent :this.totalComponents, componentName : this.componentName})
                .subscribe(data => {
                      if(data.json().status ===200){
                        alert(data.json().message);
                        this.componentName ='';
                        this.clearDrawArea();
                      }
                }, error => {
                    console.log(error.json());
                });
    }else{
      alert('Please add page first and draw components.');
    }
 }

 preview(){
 	var newArea = document.getElementById('newArea').innerHTML;
 	document.getElementById('preview').innerHTML = newArea;
 }

}
