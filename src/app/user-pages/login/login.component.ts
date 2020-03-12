import { Component, OnInit } from '@angular/core';
// import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  pswd = '';
  sessionMessage: string;
  statusText: string;
  loginResponseMessage: string;
  response: any;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  submitLogin() {

    this.sessionMessage = '';
    if (this.email.length === 0 && this.pswd.length === 0) {
            this.statusText = 'Please enter valid credentials';
            this.loginResponseMessage = this.statusText;
            // this.toasterService.pop('error', 'Error!', this.loginResponseMessage);
            return;
    }
    if (this.pswd.length < 8) {
            this.statusText = 'Please provide a password with a minimum length of 8 characters';
            this.loginResponseMessage = this.statusText;
            // this.toasterService.pop('error', 'Error!', this.loginResponseMessage);
            return;
    }
    let header1 = new HttpHeaders();
    header1 = header1.append('Content-Type', 'application/json');
    header1 = header1.append('Accept', ' application/json');
    if (this.email !== '' && this.pswd !== '') {
            // this.loaderDisplay='block';
        this.http.post(environment.envUrl + 'login', {
                password: this.pswd,
                userName: this.email
            }, {
                headers: header1
            }).subscribe(data => {

                    this.response = data;
                    // this.spinner.hide();
                    // this.loaderDisplay = 'none';
                    if (this.response.data.statusCode !== 'LOGIN_0000') {
                        console.log('login code != 200');
                        this.statusText = 'Please provide a valid password';
                        this.loginResponseMessage = this.statusText;
                        // this.toasterService.pop('error', 'Error!', this.loginResponseMessage);

                        this.loginResponseMessage = this.response.data.statusMsg;
                    } else {
                      sessionStorage.clear();
                      sessionStorage.setItem('token' , this.response.data.loginToken);
                      sessionStorage.setItem('userId' , this.response.data.userId);
                      sessionStorage.setItem('accountId' , this.response.data.accountId);
                      sessionStorage.setItem('roleType' , this.response.data.roleType);
                      sessionStorage.setItem('userName' , this.response.data.userName);
                      sessionStorage.setItem('emailId' , this.response.data.emailId);
                      sessionStorage.setItem('expiryDays' , this.response.data.expiryDays);
                      sessionStorage.setItem('planCode' , this.response.data.planCode);
                      sessionStorage.setItem('planName' , this.response.data.planName);
                      sessionStorage.setItem('subscriptionEndDate' , this.response.data.subEndDate);
                      sessionStorage.setItem('trailRemainingDays' , this.response.data.trailRemainingDays);
                      sessionStorage.setItem('trailStatus' , this.response.data.trailStatus);
                      sessionStorage.setItem('subscriptionDetails' , this.response.data.subscriptionDetails);
                      sessionStorage.setItem('addonDetails' , this.response.data.addonDetails);
                      this.statusText = 'Logged in Successfully';
                      this.router.navigate(['/main-page/main-component']);
                      console.log('Logged in successful');
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err);
                    // this.spinner.hide();
                    // this.loaderDisplay = 'none';
                    this.loginResponseMessage = err.statusText;
                    // this.toasterService.pop('error', 'Error!', this.loginResponseMessage);
                }
            );
        this.pswd = '';
        } else {
            this.statusText = 'Enter valid username and password';
            this.loginResponseMessage = this.statusText;
            // this.toasterService.pop('error', 'Error!', this.loginResponseMessage);
        }

  }

}
