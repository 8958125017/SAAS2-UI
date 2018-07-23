import { Component } from '@angular/core';
                    import { Http } from '@angular/http';
                      @Component({
                        selector: 'login-root',
                        templateUrl: './login.component.html'
                        // ,
                        // styleUrls: ['./login.component.css']
                      })
                      export class LoginComponent {
                        constructor(private http : Http){};
                        title = 'login';
                        dynamic_text_0 : any;
                        dynamic_text_1 : any;
                        dynamic_button_0(){
                                          this.http
                                          .post('http://localhost:5000/api/createFile', {dynamic_text_1 : this.dynamic_text_1})
                                            .subscribe(data => {
                                                  alert('ok');
                                            }, error => {
                                                console.log(error.json());
                                            });
                                     }

                    }