import { Injectable } from '@angular/core';
import { Observable ,Subject } from 'rxjs';
//import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  constructor() { }

  private subject = new Subject<any>();
  private headerSubject = new Subject<any>();
  private leftSubject = new Subject<any>();
  private rightSubject = new Subject<any>();
  private dashboardSubject = new Subject<any>();
 

 // ---------------------------------START HEADER COMPNENT--------------------------
    sendLatestGenerateFile(message: string) {
        this.subject.next({ data: message });              
    }

    getLatestFile(): Observable<any> {
        return this.subject.asObservable();
    }
// ---------------------------------START HEADER COMPNENT--------------------------





    // ---------------------------------START HEADER COMPNENT--------------------------
           // Get the component name from header component
           sendComponentName(message :any){
               this.headerSubject.next({ name : message });              
           }

           getMessageFromHeader(): Observable<any> {
                return this.headerSubject.asObservable();
            }
   // ---------------------------------END HEADER COMPNENT--------------------------


   // ---------------------------------START LEFT SIDE COMPNENT--------------------------
           // Get the component name from header component
           sendDataFromLeft(message :any){
               this.headerSubject.next({ data : message });              
           }

           getMessageFromLeft(): Observable<any> {
                return this.headerSubject.asObservable();
            }
   // ---------------------------------END LEFT SIDE COMPNENT--------------------------

    // ---------------------------------START DASHBOARD COMPNENT--------------------------
           // Get the component name from header component
           sendDataFromDashboard(message :any){
               this.dashboardSubject.next({ data : message });              
           }

           getMessageFromDashboard(): Observable<any> {
                return this.dashboardSubject.asObservable();
            }
   // ---------------------------------END DASHBOARD COMPNENT--------------------------

         

    clearMessage() {
        this.subject.next();
        this.leftSubject.next();
        this.rightSubject.next();
        this.headerSubject.next();
    }
 }
