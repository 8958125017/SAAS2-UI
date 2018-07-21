import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DotsComponent implements OnInit {

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


  constructor() {
    // $('textarea#froala-editor').froalaEditor();
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
       this.fontsize = data.style.fontSize;
       this.position = data.style.position;
       // var node =`<input type="text" [(ngModel)]="username" placeholder="username">`;
       // var wrapper= document.createElement('div');
       // wrapper.innerHTML = node;
       // data = wrapper;
       
       this.WriteToFile(data.id);
       // this.downloadNew(data.id, "login.component.ts", "text/plain");
       console.log("Node::",data);
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
       data.onclick = this.clickCurrentInput.bind(this,count);
       
       break;

     case 'button':
       this.buttonPanelSettings = true;
       data = document.createElement('input');
       data.style.height = "auto";
       data.style.width = "10%";
       data.style.position = "relative";
       var count = document.getElementsByClassName("dynamic_button").length;
       data.className ="dynamic_button";
       data.id = "dynamic_button_"+count;
       data.onclick = this.clickCurrentButton.bind(this,count);


       data.setAttribute('onClick',data.id+'();')
       data.setAttribute("type" ,"button");
       data.setAttribute("name" ,"button");
       data.setAttribute("value","Button"+count);
       this.fontsize = data.style.fontSize;
       this.position = data.style.position;
     break;
     case 'column 1':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column1');
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';

       data.innerHTML = '<div class="col-md-12 border"></div>';

       break;

     case 'column 2':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column2');
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';

       data.innerHTML = '<div class="col-md-6 border"></div><div class="col-md-6 border"></div>';

       break;

       case 'column 3':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column2');
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';

       data.innerHTML = '<div class="col-md-4 border"></div><div class="col-md-4 border"></div><div class="col-md-4 border"></div>';

       break;

       case 'column 4':
       this.buttonPanelSettings = true;
       data = document.createElement('div');
       data.setAttribute('id', 'column4');
       data.setAttribute('class', 'row');
       data.style.height = '200px';
       data.style.width = 'auto';
       data.style.backgroundColor = 'yellow';

       data.innerHTML = '<div class="col-md-3 border"></div><div class="col-md-3 border"></div><div class="col-md-3 border"></div><div class="col-md-3 border"></div>';

       break;

     default:
       // code...
       break;
   }

   ev.target.appendChild(data);
   this.openMainPanel = true;
    // var mainDiv = document.getElementById('newArea');
    // mainDiv.appendChild(data);
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

      // var file    = element.files[0]; //sames as here
      // var reader  = new FileReader();

      // reader.onloadend = function () {
      //   console.log('going to set current src for image');
      //     data.setAttribute('src',reader.result);
      //     return reader.result;
      // }

      // if (file) {
      //   console.log('got file');
      //     reader.readAsDataURL(file); //reads the data as a URL
      // }
      // else {
      //     console.log('got file else');
      // }

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

      reader.onloadend = function () {
        console.log('going to set current src for image');
          data.setAttribute('src',reader.result);
      }

 }

 // to download the files
 download(){

   var downloadHTML = document.getElementById("newArea");
   
   var elements = (<HTMLInputElement>document.getElementById("newArea")).children;
   var script = '';

   if(elements){
       for (var i = 0; i < elements.length; i++){

         if(elements[i].id.indexOf('text')!=-1){

           script = script + 'var '+elements[i].id+'= document.getElementById("'+elements[i].id+'").value;'

         }else if(elements[i].id.indexOf('button') != -1){
           script = script +'function '+elements[i].id+'(){ alert('+elements[i-1].id+','+elements[i-2].id+');};'

         }else if(elements[i].id.indexOf('image') != -1){


         }
       }
      
   }

   var download = `<!DOCTYPE html>
     <html>
     <title>HTML Tutorial</title>
     <style>.wrapper{ width: 600px; margin:0px auto; padding:40px; box-shadow: 0px 0px 7px #ededed;} </style>
     <body class="wrapper">` + downloadHTML.innerHTML + `
     </body>
     </html>
     <script>`+script+`
     </script>`;
   console.log(download);
   this.downloadNew(download, "login.component.html", "text/plain");
 }


 downloadNew(data, filename, type) {
   var file = new Blob([data], {type: type});
   if (window.navigator.msSaveOrOpenBlob) // IE10+
       window.navigator.msSaveOrOpenBlob(file, filename);
   else { // Others
       var a = document.createElement('a'),
               url = URL.createObjectURL(file);
       a.href = url;
       a.download = filename;
       document.body.appendChild(a);
       a.click();
       setTimeout(function() {
           document.body.removeChild(a);
           window.URL.revokeObjectURL(url);
       }, 0);
   }
}

parseHTML(html) {
  var el = document.createElement('div');
  el.innerHTML = html;

  return el.childNodes;
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
    }

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

    // var element = document.getElementById("dynamic_text_"+this.count);
    // element.style.fontSize = this.fontsize+"px";
  }

  changePosition(){
    if(this.buttonPanelSettings){
        var element = document.getElementById("dynamic_button_"+this.count);
        element.style.position = this.position;
      }
      else if(this.textBoxPanelSettings){
        var element = document.getElementById("dynamic_text_"+this.count);
        element.style.position = this.position;
      }
      else if(this.imagePanelSetting){
        var element = document.getElementById("dynamic_image_"+this.count);
            
      }

    // var element = document.getElementById("dynamic_text_"+this.count);
    // element.style.position = this.position;
  }

  deleteElement(){
    if(this.buttonPanelSettings) document.getElementById("dynamic_button_"+this.count).remove();
    if(this.textBoxPanelSettings) document.getElementById("dynamic_text_"+this.count).remove();
    if(this.imagePanelSetting) document.getElementById("dynamic_image_"+this.count).remove();
    this.textBoxPanelSettings = false;
    this.imagePanelSetting = false;
    this.buttonPanelSettings = false;
    // this.openMainPanel = false;
  }

 WriteToFile(data) {
       var loginComponent = `
       import { Component } from '@angular/core';
          @Component({
            selector: 'login-root',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
          })
          export class LoginComponent {
            constructor(){};
            title = 'login';
            `+data+` : any;
          }`;  

       const blob = new Blob([loginComponent], { type: 'text/plain' });
       saveAs(blob, 'login.component.ts');
    if (this.textFile !== null) {
      window.URL.revokeObjectURL(this.textFile);
    }

    this.textFile = window.URL.createObjectURL(blob);
    debugger;
 }

 changeWrapperColor() {
    document.getElementById('newArea').style.background = this.divBgcolor;
 }

}

