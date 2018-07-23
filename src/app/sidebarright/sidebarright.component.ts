import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import { Subscription } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-sidebarright',
  templateUrl: './sidebarright.component.html',
  styleUrls: ['./sidebarright.component.css']
})
export class SidebarrightComponent implements OnInit {
  subscription: Subscription;
  modelName : any;
  functionName : any;
  enableApi : boolean = false;
  enableModel : boolean = false;

  buttonName : any;
  name:any;
  count : any;
  totalComponents : any = {textbox : [], textArea : [], button:[], image :[], column1 : [], coulmn2 :[], column3:[], column4 :[]};
  
  constructor( private messageService : MessageService) { 
  	  this.subscription = this.messageService.getMessageFromDashboard().subscribe(message => {                 
            this.enableApi = message.data.enableApi;
            this.enableModel = message.data.enableModel;
            this.count = message.data.count;
            this.totalComponents = message.data.totalComponents;

            if(this.enableApi){
            	var element = document.getElementById("dynamic_button_"+this.count);
            	this.name = (<HTMLInputElement>document.getElementById("dynamic_button_"+this.count)).value;
                this.functionName = this.name;
                this.buttonName = this.name;
            }
            if(this.enableModel){
            	var element = document.getElementById("dynamic_text_"+this.count);
	            if((<HTMLInputElement>document.getElementById("dynamic_text_"+this.count)).value) this.modelName = (<HTMLInputElement>document.getElementById("dynamic_text_"+this.count)).value;
	            else this.modelName = element.id;
            }
            

       });
  }

  ngOnInit() {
  }


 login(){
   var postData = ''; 
   for(var i=0;i<this.totalComponents.textbox.length; i++){
     postData += ''+this.totalComponents.textbox[i].modelName+' : this.'+this.totalComponents.textbox[i].modelName+",";
   }
   this.totalComponents.button[this.count].defination = this.totalComponents.button[this.count].buttonName+`(){
               this.http
                  .post('/api/login', {`+postData+`})
                    .subscribe(data => {
                          alert('ok');
                    }, error => {
                        console.log(error.json());
                    });
             }
             `;
 }

 signup(){
   var postData = ''; 
   for(var i=0;i<this.totalComponents.textbox.length; i++){
     postData += ''+this.totalComponents.textbox[i].modelName+' : this.'+this.totalComponents.textbox[i].modelName+",";
   }
   this.totalComponents.button[this.count].defination = this.totalComponents.button[this.count].buttonName+`(){
                  this.http
                  .post('http://localhost:5000/api/signup', {`+postData+`})
                    .subscribe(data => {
                          alert('ok');
                    }, error => {
                        console.log(error.json());
                    });
             }`;
 }

 setProperty(){
 	if(this.enableModel) {
 		// (<HTMLInputElement>document.getElementById("dynamic_text_"+this.count)).value =this.modelName;
 		this.totalComponents.textbox[this.count].modelName = this.modelName;
 	}

 	if(this.enableApi) {
 		this.totalComponents.button[this.count].buttonName = this.functionName;
 		(<HTMLInputElement>document.getElementById("dynamic_button_"+this.count)).value = this.buttonName;
 	}

 	this.messageService.sendLatestGenerateFile(this.totalComponents);
 }

}
