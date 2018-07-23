import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidebarleft',
  templateUrl: './sidebarleft.component.html',
  styleUrls: ['./sidebarleft.component.css']
})
export class SidebarleftComponent implements OnInit {

  componentName : any;
  subscription : Subscription;
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

  // position
  positionprop : any;
  top: string;
  bottom: string;
  left: string;
  right: string;
  // margin
  marginTop : any;
  marginBottom : any;
  marginLeft : any;
  marginRight : any;
  // padding
  paddingTop : any;
  paddingBottom : any;
  paddingLeft : any;
  paddingRight : any;


  totalComponents : any = {textbox : [], textArea : [], button:[], image :[], column1 : [], coulmn2 :[], column3:[], column4 :[]};

  constructor( private messageService : MessageService) { 
     this.subscription = this.messageService.getMessageFromHeader().subscribe(message => {  
            this.componentName = message.name;     
      });

       this.subscription = this.messageService.getMessageFromDashboard().subscribe(message => {                 
            this.openMainPanel = true;  
            this.count = message.data.count;  
            this.totalComponents = message.data.totalComponents;                 
            
            if(message.data.enableModel){
              this.textBoxPanelSettings = true;
              this.buttonPanelSettings = false;
              var element = document.getElementById("dynamic_text_"+this.count);
              if (element) {
                this.height = element.style.height.split('%')[0];
                this.width = element.style.width.split('%')[0];
                this.fontsize = element.style.fontSize;
                this.color = element.style.color;
                this.bgcolor = element.style.backgroundColor;
              }
            }

            if(message.data.enableApi){
              this.textBoxPanelSettings = false;
              this.buttonPanelSettings = true;
              var element = document.getElementById("dynamic_button_"+this.count);
              if(element){
                this.height = element.style.height.split('%')[0];
                this.width = element.style.width.split('%')[0];
                this.name = (<HTMLInputElement>document.getElementById("dynamic_button_"+this.count)).value;
              }
            }

            this.count = message.data.count;
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
       data.setAttribute("draggable",true);
       data.onclick = this.clickCurrentImage.bind(this,count);
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
       data.setAttribute("draggable",true);
       data.className ="dynamic_text";
       data.id = "dynamic_text_"+count;
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
       data.setAttribute("draggable",true);
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';
       var count = document.getElementsByClassName("dynamic_coulmn1").length;
       data.className ="dynamic_coulmn1";
       data.id = "dynamic_coulmn1_"+count;
       data.innerHTML = '<div class="col-md-12 border" id="'+data.id+'1"></div>';
       this.totalComponents.column1.push({column1 : data.id});
       break;

     case 'column 2':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column2');
       data.setAttribute('class', 'row');
       data.setAttribute("draggable",true);
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
   
   if(data){
     ev.target.appendChild(data);
     this.openMainPanel = true;
     this.messageService.sendLatestGenerateFile(this.totalComponents);
     data = '';
     localStorage.removeItem('drawShape');
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
     
      // if((<HTMLInputElement>document.getElementById("dynamic_text_"+count)).value) this.modelName = (<HTMLInputElement>document.getElementById("dynamic_text_"+count)).value;
      // else this.modelName = element.id;
    }

    // this.enableModel = true;
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

      let sendObj = { enableModel : false, enableApi : true, count : this.count }
      this.messageService.sendDataFromDashboard(sendObj);
      // this.functionName = (<HTMLInputElement>document.getElementById("dynamic_button_"+count)).value;
    }

    // this.enableApi = true;
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
          this.totalComponents.image.push({imageName : data.id, src : data.src});
      }

 }

    changeFont(){

     if(this.buttonPanelSettings){
        var element = document.getElementById("dynamic_button_"+this.count);
        element.style.fontSize = this.fontsize+"px";
      }
      else if(this.textBoxPanelSettings){
        var element = document.getElementById("dynamic_text_"+this.count);
        element.style.fontSize = this.fontsize+"px";
      }
      else if(this.imagePanelSetting){
        var element = document.getElementById("dynamic_image_"+this.count);
            
      }
  }

  
changePositionStyle(type){
    console.log(type);
    var element = document.getElementById("dynamic_button_" + this.count);
     switch(type){
       case 'top' : element.style.top = this.top + "px"; break;
       case 'bottom' : element.style.bottom = this.bottom + "px"; break;
       case 'left' : element.style.left = this.left + "px"; break;
       case 'right' : element.style.right = this.right + "px"; break;
     }
  }
  changeMarginStyle(type){
    console.log(type);
    var element = document.getElementById('dynamic_button_' + this.count);
     switch(type){
       case 'top' : element.style.marginTop = this.marginTop+"px"; break;
       case 'bottom' : element.style.marginBottom = this.marginBottom+"px"; break;
       case 'left' : element.style.marginLeft = this.marginLeft+"px"; break;
       case 'right' : element.style.marginRight = this.marginRight+"px"; break;
     }
  }
  changePaddingStyle(type){
    console.log(type);
    var element = document.getElementById('dynamic_button_' + this.count);
     switch(type){
       case 'top' : element.style.paddingTop = this.paddingTop+"px"; break;
       case 'bottom' : element.style.paddingBottom = this.paddingBottom+"px"; break;
       case 'left' : element.style.paddingLeft = this.paddingLeft+"px"; break;
       case 'right' : element.style.paddingRight = this.paddingRight+"px"; break;
     }
  }

 saveProperty(){
  if(this.buttonPanelSettings){
      var element = document.getElementById("dynamic_button_"+this.count);
      element.style.height = this.height+"%";
      element.style.width = this.width+"%";
      element.style.color = this.color;   

      element.style.backgroundColor = this.bgcolor;
      element.setAttribute('value',this.name);
    }
    else if(this.textBoxPanelSettings){
      var element = document.getElementById("dynamic_text_"+this.count);
      element.style.height = this.height+"%";
      element.style.width = this.width+"%"; 
      element.style.color = this.color;   
      element.style.backgroundColor = this.bgcolor;
    }
    else if(this.imagePanelSetting){
      var element = document.getElementById("dynamic_image_"+this.count);
      element.style.height = this.height+"%";
      element.style.width = this.width+"%";    
    }

  this.messageService.sendLatestGenerateFile(this.totalComponents);
}

 changeWrapperColor() {
    document.getElementById('newArea').style.background = this.divBgcolor;
 }

deleteElement(){
  if(this.buttonPanelSettings){ 
    document.getElementById("dynamic_button_"+this.count).remove();
    this.totalComponents.button.splice(1,this.count);   
  }
  if(this.textBoxPanelSettings){
     document.getElementById("dynamic_text_"+this.count).remove();
     this.totalComponents.textbox.splice(1,this.count);   
  }

  if(this.imagePanelSetting){
     document.getElementById("dynamic_image_"+this.count).remove();
     this.totalComponents.image.splice(1,this.count);   
   }
  this.textBoxPanelSettings = false;
  this.imagePanelSetting = false;
  this.buttonPanelSettings = false;
  this.messageService.sendLatestGenerateFile(this.totalComponents);
// this.openMainPanel = false;
}

}
