import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';
import { Http} from '@angular/http';
import {MessageService} from '../message.service';
import { Subscription } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DotsComponent implements OnInit {
  subscription: Subscription;
  buttonPanelSettings : boolean = false;
  textBoxPanelSettings : boolean = false;
  imagePanelSetting : boolean = false;
  openMainPanel : boolean = false;

  name : any;
  height : any;
  width : any;
  color :any;
  bgcolor : any;
  fontsize : any;
  position : any;
  count : number =0;
  textFile : any;
  divBgcolor : any;


  


 totalComponents : any = {textbox : [], textArea : [], button:[], image :[], column1 : [], coulmn2 :[], column3:[], column4 :[]};
  modelName : any;
  functionName : any;
  enableApi : boolean = false;
  enableModel : boolean = false;

  componentName : any;

 constructor(private http: Http, private messageService : MessageService) {
    // $('textarea#froala-editor').froalaEditor();
     this.subscription = this.messageService.getMessageFromHeader().subscribe(message => {                 
            this.componentName = message.name;     
     });

     this.subscription = this.messageService.getMessageFromLeft().subscribe(message => {                 
            this.count = message.count;     
     });
 }

 ngOnInit() {
 }


 allowDrop(ev) {
   ev.preventDefault();
 }

 drag(ev, type) {
   localStorage.setItem('drawShape',type);
   ev.dataTransfer.setData('text', ev.target.id);
 }

drop(ev) {
    if(!this.componentName){
      alert("Please add page name first!.");
      ev.preventDefault();
      return false;
    }

   ev.preventDefault();
   var type = localStorage.getItem('drawShape');
   var data;

   switch (type) {

     case 'input':
       this.buttonPanelSettings = false;
       this.textBoxPanelSettings = true;

       data = document.createElement('input');
       data.style.height = "10%";
       data.style.width = "100%";
       var count = document.getElementsByClassName("dynamic_text").length;
       data.className ="dynamic_text";
       data.id = "dynamic_text_"+count;
       data.style.position = "relative";
       data.style.margin = '8px 0px';
       data.onclick = this.clickCurrentInput.bind(this,count);
       data.setAttribute("placeholder","TextBox"+count);
       data.setAttribute("draggable",true);
       this.fontsize = data.style.fontSize;
       this.position = data.style.position;
       // var node =`<input type="text" [(ngModel)]="dynamic_text_`+count+`" id="dynamic_text_`+count+`" placeholder="dynamic_text_`+count+`" style="height:10%;width:100%" class="dynamic_text">`;
       // var wrapper= document.createElement('div');
       // wrapper.innerHTML = node;
       // data = wrapper;
       
       // this.WriteToFile(data.id);
       // this.downloadNew(data.id, "login.component.ts", "text/plain");
       this.totalComponents.textbox.push({modelName : data.id, style :data.style});
       break;

     case 'image':
     this.imagePanelSetting = true;

       data = document.createElement('img');
       data.style.height = '50%';
       data.style.width = '20%';
       this.performClick(data,'file');
       data.style.position = "relative";
       var count = document.getElementsByClassName("dynamic_image").length;
       data.className ="dynamic_image";
       data.id = "dynamic_image_"+count;
       data.onclick = this.clickCurrentImage.bind(this,count);
       data.setAttribute("draggable",true);
       // this.totalComponents.image.push({imageName : data.id, src : data.src});
       console.log('image src::',data,data.src);
     break;

     case 'textArea' :
     this.textBoxPanelSettings = true;

       data = document.createElement('textarea');
       data.style.position = "relative";
       data.rows = "2";
       data.cols = "50";
       data.style.margin = '8px 0px';
       var count = document.getElementsByClassName("dynamic_text").length;
       data.setAttribute("placeholder","TextArea"+count);
       data.className ="dynamic_text";
       data.id = "dynamic_text_"+count;
       data.setAttribute("draggable",true);
       data.onclick = this.clickCurrentInput.bind(this,count);
       
       this.totalComponents.textArea.push({modelName : data.id});
       break;

     case 'button':
       this.buttonPanelSettings = true;
       data = document.createElement('input');
       data.style.height = "auto";
       data.style.width = "auto";
       data.style.position = "relative";
       var count = document.getElementsByClassName("dynamic_button").length;
       data.className ="dynamic_button";
       data.id = "dynamic_button_"+count;
       data.onclick = this.clickCurrentButton.bind(this,count);


       // data.setAttribute('onClick',data.id+'();')
       data.setAttribute("type" ,"button");
       data.setAttribute("name" ,"button");
       data.setAttribute("value","Button"+count);
       data.setAttribute("draggable",true);
       this.fontsize = data.style.fontSize;
       this.position = data.style.position;

       this.totalComponents.button.push({buttonName : data.id,defination:''});
       break;

     case 'column 1':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column1');
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';
       var count = document.getElementsByClassName("dynamic_coulmn1").length;
       data.className ="dynamic_coulmn1";
       data.id = "dynamic_coulmn1_"+count;
       data.innerHTML = '<div class="col-md-12 border" id="'+data.id+'1"></div>';
       data.setAttribute("draggable",true);
       this.totalComponents.column1.push({column1 : data.id});
       break;

     case 'column 2':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column2');
       data.setAttribute("draggable",true);
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';
       var count = document.getElementsByClassName("dynamic_coulmn2").length;
       data.className ="dynamic_coulmn2";
       data.id = "dynamic_coulmn2_"+count;
       data.innerHTML = '<div class="col-md-6 border" id="'+data.id+'1"></div><div class="col-md-6 border" id="'+data.id+'2"></div>';
       this.totalComponents.column2.push({column2 : data.id});
       break;

       case 'column 3':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column2');
       data.setAttribute('class', 'row');
       data.setAttribute("draggable",true);
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';
       var count = document.getElementsByClassName("dynamic_coulmn3").length;
       data.className ="dynamic_coulmn3";
       data.id = "dynamic_coulmn3_"+count;
       data.innerHTML = '<div class="col-md-4 border" id="'+data.id+'1"></div><div class="col-md-4 border" id="'+data.id+'2"></div><div class="col-md-4 border" id="'+data.id+'3"></div>';
       this.totalComponents.column3.push({column3 : data.id});
       break;

       case 'column 4':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column4');
       data.setAttribute('class', 'row');
       data.setAttribute("draggable",true);
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';
       var count = document.getElementsByClassName("dynamic_coulmn4").length;
       data.className ="dynamic_coulmn4";
       data.id = "dynamic_coulmn4_"+count;
       data.innerHTML = '<div class="col-md-3 border" id="'+data.id+'1"></div><div class="col-md-3 border" id="'+data.id+'2"></div><div class="col-md-3 border" id="'+data.id+'3></div><div class="col-md-3 border" id="'+data.id+'4"></div>';
       this.totalComponents.column4.push({column4 : data.id});
       break;

     default:
       // code...
       break;
   }

   ev.target.appendChild(data);
   this.openMainPanel = true;
   this.messageService.sendLatestGenerateFile(this.totalComponents);
   data = '';
   localStorage.removeItem('drawShape');
 }


performClick(data,elemId) {
  var elem = document.getElementById(elemId);
  if(elem && document.createEvent) {
     var evt = document.createEvent('MouseEvents');
     evt.initEvent('click', true, false);
     elem.dispatchEvent(evt);
     var image = this.previewFile(data,elem,evt);
     console.log('i perform on click');
     debugger;
  }
}

previewFile(data, element, event) {
      console.log(data, element, event);
      var file;
      let imageURL = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(element.files);
        },2000);
      });


      var reader  = new FileReader();
      var URL = imageURL.then((success) => {
        reader.readAsDataURL(success[0]);
      });

      reader.onloadend = ()=> {
        console.log('going to set current src for image');
          data.setAttribute('src',reader.result);
          // data.src = reader.result;
          this.totalComponents.image.push({imageName : data.id, src : data.src});
      }
 }


  clickCurrentInput(count) {
    this.buttonPanelSettings = false;
    this.textBoxPanelSettings = true;
    this.imagePanelSetting = false;
    this.count = count;

    var element = document.getElementById("dynamic_text_"+count);

    if (element) {
      this.height = element.style.height.split('%')[0];
      this.width = element.style.width.split('%')[0];
      this.fontsize = element.style.fontSize;
      this.color = element.style.color;
      this.bgcolor = element.style.backgroundColor;
      
      
    }
    this.enableModel = true;
    let sendObj = { enableModel : true, enableApi : false, count : this.count,totalComponents : this.totalComponents }
    this.messageService.sendDataFromDashboard(sendObj);
  }

  clickCurrentButton(count) {
    this.buttonPanelSettings = true;
    this.textBoxPanelSettings = false;
    this.imagePanelSetting = false;
    this.count = count;

    var element = document.getElementById("dynamic_button_"+count);
    if(element){
      this.height = element.style.height.split('%')[0];
      this.width = element.style.width.split('%')[0];
      this.name = (<HTMLInputElement>document.getElementById("dynamic_button_"+count)).value;
      this.functionName = (<HTMLInputElement>document.getElementById("dynamic_button_"+count)).value;
    }

    this.enableApi = true;
    let sendObj = { enableModel : false, enableApi : true, count : this.count,totalComponents : this.totalComponents }
    this.messageService.sendDataFromDashboard(sendObj);
    // element.onclick = function(){
    //   alert((<HTMLInputElement>document.getElementById("dynamic_text_"+count)).value);
    // }
  }

  clickCurrentImage(count) {
    this.buttonPanelSettings = false;
    this.textBoxPanelSettings = false;
    this.imagePanelSetting = true;
    this.count = count;
    var element = document.getElementById("dynamic_image-"+count);
    if(element){
      this.height = element.style.height.split('%')[0];
      this.width = element.style.width.split('%')[0];
      // this.name = element.value;
    }
  }
}

