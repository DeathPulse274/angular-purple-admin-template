import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment } from './../../../environments/environment'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  accountDropDownResult : any;
  comapnyName :any;
  accountName:any;
  cloudAccountList:any;
  filteredCloudAccountList: any;
  errorCode:any;
  response :any;
  switchAccountResponse :any;
  project:any;
  userResponseCode :any;
  inputPassword :any;
  
  constructor(config: NgbDropdownConfig, private router: Router, private http: HttpClient,private modalService: NgbModal) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    
    this.fetchCustomerProjects();
  }

  


  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/user-pages/login']);

  }

  openMediumModal( mediumModalContent ) {
    this.modalService.open( mediumModalContent );
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if(this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if(this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  // toggle right sidebar
  toggleRightSidebar() {
    document.querySelector('#right-sidebar').classList.toggle('open');
  }


  fetchCustomerProjects() {
    let headers = new HttpHeaders().set('loginToken',sessionStorage.getItem('token').toString());
    headers = headers.append('userid',sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid',sessionStorage.getItem('accountId').toString());
    console.log('After header in fetchCloudAccounts');
 
    var accountIdVal = sessionStorage.getItem('switchAccountId');
    if(accountIdVal === null){
     accountIdVal = sessionStorage.getItem('accountId');
    }
    
    let params = 'accountId=' + accountIdVal.toString();
    if(sessionStorage.getItem('roleType').toString() !== 'USER'){
      params = 'dashboard/get/current_org/details?accountId=' + accountIdVal.toString();
    }else{
      params = 'dashboard/get/current_org/details/user?accountId=' + accountIdVal.toString()+'&userId='+sessionStorage.getItem('userId').toString();
    }
    this.http.get(environment.envUrl +  params, {headers}).subscribe(data => {
            this.accountDropDownResult = data;
            this.accountDropDownResult = this.accountDropDownResult.data;
            this.comapnyName = this.accountDropDownResult.accountBo.companyName;
            if(this.accountDropDownResult.cloudBo !== null){
              if(sessionStorage.getItem('cloudAccountName') == null){
                sessionStorage.setItem('cloudAccountId', this.accountDropDownResult.cloudBo.cloudAccountId);
                sessionStorage.setItem('masterAccount',this.accountDropDownResult.cloudBo.masterAccount);
              
                this.accountName = this.accountDropDownResult.cloudBo.accountName;
              }else{
               
                this.accountName = sessionStorage.getItem('cloudAccountName');
              }
              // this.downInfraSheet();
            this.cloudAccountList = this.accountDropDownResult.cloudBoList;
            this.filteredCloudAccountList = [...this.cloudAccountList];
            //alert("list");
            console.log(this.cloudAccountList);
            this.comapnyName = this.accountDropDownResult.accountBo.companyName;
            }else{
              //this.router.navigate(['setting/cadd']);
            }

        },
        (err: HttpErrorResponse) => {
            console.log(err);
            this.errorCode = err;
        }
    );
  }

  switchDifferentOrganisation(){
    let headers = new HttpHeaders().set('loginToken',sessionStorage.getItem('token').toString());
    headers = headers.append('userid',sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid',sessionStorage.getItem('accountId').toString());
    console.log('After header in fetchCloudAccounts');
    let params = 'accountId=' + this.project;
    this.http.post(environment.envUrl + 'switch/account', {
      "accountId": this.project,
      "password": this.inputPassword,
      "loginAccountId": sessionStorage.getItem('accountId').toString(),
      "loginUserId": sessionStorage.getItem('userId').toString()
  }, {
      headers: headers
  }).subscribe(data => {
          this.response = data;
          if (this.response.data.statusCode !== "SWITCH_0000") {
              this.switchAccountResponse = this.response.data.statusMsg;
              //this.toasterService.pop('error', 'Error!', this.switchAccountResponse);
              return;
          } else {
              sessionStorage.setItem('cloudAccountName',null);
              sessionStorage.setItem('switchAccountId',  this.response.data.accountId);
              sessionStorage.setItem('switchRoleType', this.response.data.roleType);
              sessionStorage.setItem('switchUserId', this.response.data.userId);
              this.http.get(environment.envUrl + 'dashboard/get/current_org/details?' + params, {headers}).subscribe(data => {
                this.response = data;
                this.accountDropDownResult = this.response.data;
                if(this.accountDropDownResult.cloudBo !== null){
                  sessionStorage.setItem('cloudAccountId', this.accountDropDownResult.cloudBo.cloudAccountId);
                  sessionStorage.setItem('masterAccount',this.accountDropDownResult.cloudBo.masterAccount);
                this.cloudAccountList = this.accountDropDownResult.cloudBoList;
                this.accountName = this.accountDropDownResult.cloudBo.accountName;
                this.comapnyName = this.accountDropDownResult.accountBo.companyName;
                this.router.navigate(['account/insights/dashboard']);
                console.log('Logged in successful');
                this.userResponseCode = 'SUCCESS';
             
                this.switchAccountResponse = this.response.data.statusMsg;
                //this.toasterService.pop('success', 'Success', this.switchAccountResponse);
                }else{
                  //this.router.navigate(['setting/cadd']);
                }
    
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                this.errorCode = err;
            }
        );
             
      }
     },
      (err: HttpErrorResponse) => {
          console.log(err);
      }
  );
}


  filter(searchText) {
    console.log(searchText)
    this.filteredCloudAccountList = this.cloudAccountList.filter(item =>
      item.accountName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

}
