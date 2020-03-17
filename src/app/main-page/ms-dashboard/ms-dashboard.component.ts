import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { WindowRef } from '../../window-ref';
import * as zc from '@dvsl/zoomcharts';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { DaterangepickerConfig} from '../daterangepicker/config.service'

@Component({
  selector: 'app-ms-dashboard',
  templateUrl: './ms-dashboard.component.html',
  styleUrls: ['./ms-dashboard.component.scss']
})
export class MsDashboardComponent implements OnInit {
  errorCode:any;
  sessionMessage:any;
  private zc: any = zc;
  monthToDate = 0;
  todayCost = 0;
  msCloudAccounts:any;
  bestPracticesDate :any;
  bestPracticesRulesVal:any;
  NoBestPracticesRulesVal:any;
  bestPracticesRuleDateList:any;
  response:any;
  statusText:any;
  accountDropDownResult:any;
  comapnyName:any;
  accountName:any;
  cloudAccountList:any;
  msCustomerDetails:any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  costAllocationIDVal = 'block';
  snapshotAgingIdVal = 'block';
  cloudCostingIDVal = 'block';
  costAllocationIDValNoData = 'none';
  snapshotAgingIdValNoData = 'none';
  cloudCostingIDValNoData = 'none';
  cloudCostingData = "No Data Availble for Cost information. Please check you billing bucket Configuration.";
  snapshotAgingData = "No Data Available";
  snapshotAgingVal = "No Data Available";
  costAllocationVal = "No Tagging Data Availble";

  constructor(private http: HttpClient,private winRef: WindowRef,private router: Router,private daterangepickerOptions: DaterangepickerConfig) {
    winRef.nativeWindow.ZoomChartsLicense = 'ZCP-m99ri154u: ZoomCharts Development licence for Rapyder';
    winRef.nativeWindow.ZoomChartsLicenseKey = '0604503cd4bfd50552d85a73e171da182626b9310f6477ec7630e71ee06a29442552002849bf387316c093cd431e73f9c7815208e9ee256cdfa4453a1d0d26ab06aeaad3f5d513aa6417e61ecc636c94ec022e8d6a30b6a0ee0176efdab28d9c9bffc3829d66cfc151f4e7acea2e9c2d410c28da0fccde7da0644331675d2116ffe3bada1d0b70ee76e1701070f892083f0ab285077208c5182ec246b9418271e50ea18b2937cf0c6542889c1af89efe312305109386edae7b3975942d44510600bb396fc3677165d8615814bc0cff5d79a684778cec49c4b0a5e64215ff6aeef3a6b379199739ba3e7a56ccff73ede8aefea5e56aa9882954bf9bf2e0bd903c';
    this.daterangepickerOptions.settings = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      "opens": "left",  
      ranges: {
        'This Month' : [moment().startOf('month'),moment()],
        'Last Month': [ moment().date(0).startOf('month'),  moment().date(0)],
        'Last 3 Months': [moment().subtract(3, 'month'), moment()],
        'Last 6 Months': [moment().subtract(6, 'month'), moment()],
        'Last 12 Months': [moment().subtract(12, 'month'), moment()],
      }
    };
   }

  ngOnInit() {
    this.msCloudAccounts = '';
    
  }
  public chosenDate2: any = {
    start: moment().startOf('month'),
    end: moment(),
  };

  public selectedDate(value: any, dateInput: any) {
    this.chosenDate2.start = value.start;
    this.chosenDate2.end = value.end;
    this.loadAwsPricingGraphData()
  }

  loadCostAllocationChart() {
    const PieChart = this.zc.PieChart;
    /*
    Function to get the pie chat for cost allocation
    */
    this.costAllocationIDVal = 'bolck';
    this.costAllocationIDValNoData = 'none';
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());

    var accountIdVal = sessionStorage.getItem('switchAccountId');
    
    if (accountIdVal === null) {
     // accountIdVal = "1";
      accountIdVal = sessionStorage.getItem('accountId');
    }
    var switchUserIdVal = sessionStorage.getItem('switchUserId');
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem('userId');
    }
    var cloudAccountVal = sessionStorage.getItem('cloudAccountId');
    //var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }
    var graphData: any;
    let params = '&accountId=' + accountIdVal + '&cloudAccountId=0'  ;

    this.http.get(environment.envUrl + '/home/msDashboard/costComplilation?' + params, { headers }).subscribe(data => {

      graphData = data;
      graphData = graphData.data;
      if(graphData.length === 0){
        this.costAllocationIDVal = 'none';
        this.costAllocationIDValNoData = 'block';
      }else{
      const costAllocation = new PieChart({

        container: document.getElementById('costAllocationID'),
        "pie": {
          style: {
            sliceColors: ["#00A896", "#DA5211"]
          }
        },
        slice: {
          styleFunction: function(slice, data) {
            slice.label.text = data.name+" - "+data.value;
          }
      },
      "interaction": {
        "resizing": {
          "enabled": false
        }
      },
        area: { height: 145 },
        //theme: PieChart.themes.raised,
        data: {
          preloaded: graphData
        },
      });

    }

    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.costAllocationIDVal = 'none';
      this.costAllocationIDValNoData = 'block';
      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }
  loadPricingDataMtd() {
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());

    var accountIdVal = sessionStorage.getItem('switchAccountId');
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem('accountId');
    }
    var switchUserIdVal = sessionStorage.getItem('switchUserId');
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem('userId');
    }
    var cloudAccountVal =sessionStorage.getItem('cloudAccountId');
    //var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }
    var graphData: any;
    let params = 'cloudAccountId=0' + '&accountId=' + accountIdVal;

    this.http.get(environment.envUrl + 'home/pricing/mtd/data?' + params, { headers }).subscribe(data => {

      graphData = data;
      graphData = graphData.data;
      this.monthToDate = graphData.monthlyCost;
      this.todayCost = graphData.todayCost;



    }, (err: HttpErrorResponse) => {
      console.log(err);

      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }
  loadAwsPricingGraphData() {
    const TimeChart = this.zc.TimeChart;

    /*
Function TO get the bar chart for AWS Cloud Costing
*/
    this.cloudCostingIDVal = 'block';
    this.cloudCostingIDValNoData = 'none';
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid',sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());


    var accountIdVal = sessionStorage.getItem('switchAccountId');
    //var accountIdVal = "7";
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem('accountId');
    }
    var switchUserIdVal = sessionStorage.getItem('switchUserId');
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem('userId');
    }
    var cloudAccountVal = sessionStorage.getItem('cloudAccountId');
    //var cloudAccountVal = "3";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }
    var graphData: any;

    let params = '&accountId=' + accountIdVal + '&fromDate=' + this.chosenDate2.start + '&toDate=' + this.chosenDate2.end;

    this.http.get(environment.envUrl + '/home/msDashboard/AwsCosting?' + params, { headers }).subscribe(data => {
     // this.toasterService.pop('success', 'WELCOME', 'Welcome To Cloudzatic');

      graphData = data;
      if(graphData === null || graphData.data === null || graphData.data === undefined || graphData.data.length === 0){
        
        this.cloudCostingIDVal = 'none';
        this.cloudCostingIDValNoData = 'block';
    }else{
      graphData = graphData.data;
      const FacetChart = this.zc.FacetChart;
    const chart= new FacetChart({
      series: [
          {
              name: "Cost",
              data: {
                  aggregation: "sum"
              },
              style: {
                  fillColor: "#00A896"
              }
          }
      ],
      container: "demo",
      advanced: { themeCSSClass: ""},
      data: [
          {
            preloaded: graphData
          }
      ],
      toolbar: {
          fullscreen: true,
          enabled: true
      },
      interaction: {
          resizing: {
              enabled: false
          }
      }
  })


    }

    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.cloudCostingIDVal = 'none';
      this.cloudCostingIDValNoData = 'block';
      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }
  
  loadSnapshotAgingGraph(){

     /*
Function TO get the bar chart for Snapshot
*/
 this.snapshotAgingIdVal = 'block';
 this.snapshotAgingIdValNoData = 'none';
let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
headers = headers.append('userid', sessionStorage.getItem('userId').toString());
headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());

 var accountIdVal = sessionStorage.getItem('switchAccountId');
 //var accountIdVal = "7";
 if (accountIdVal === null) {
   accountIdVal = sessionStorage.getItem('accountId');
 }
  
    var graphData: any;
    let params = '&accountId=' + accountIdVal + "&resourceType=rds,instances";

    this.http.get(environment.envUrl + '/home/msDashboard/snapshot?' + params, { headers }).subscribe(data => {
      //this.toasterService.pop('success', 'WELCOME', 'Welcome To Rapydly dfsrt sbvtd trsfd');

      graphData = data;
      if(graphData === null || graphData.data === null || graphData.data === undefined || graphData.data.length === 0){
        
        this.snapshotAgingIdVal = 'none';
        this.snapshotAgingIdValNoData = 'block';
    }else{
      graphData = graphData.data;
      const FacetChart = this.zc.FacetChart;
    const chart= new FacetChart({
      container: "snapshotDemo",
      advanced: { themeCSSClass: ""},
      series: [
       
        {
          name: "12hrs",
          data: {
              field: "twelveHrs"
          },
          style: {
              fillColor: "#00A896"
          },
          "type": "columns",
          "stack": "default",
      },
      {
        name: "24hrs",
        data: {
            field: "twentyfourHrs"
        },
        style: {
            fillColor: "#00A896"
        },
        "type": "columns",
        "stack": "default",
    },
    {
      name: "48hrs",
      data: {
          field: "fortyeightHrs"
      },
      style: {
          fillColor: "#00A896"
      },
      "type": "columns",
      "stack": "default",
  },
  {
    name: ">60hrs",
    data: {
        field: "sixtyHrs"
    },
    style: {
        fillColor: "#00A896"
    },
    "type": "columns",
    "stack": "default",
}
    ],
      data: [
          {
            preloaded: graphData
          }
      ],
      toolbar: {
          fullscreen: true,
          enabled: true
      },
        area: { height: 145 },
      interaction: {
          resizing: {
              enabled: false
          }
      }
  })
    }
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.snapshotAgingIdVal = 'none';
      this.snapshotAgingIdValNoData = 'block';
      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }

  allIssues() {

    const TimeChart = this.zc.TimeChart;
  
    console.log("Fetch all the best practices issues FacetChart");
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());
  
    var accountIdVal = sessionStorage.getItem('switchAccountId');
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem('accountId');
    }
    var switchUserIdVal = sessionStorage.getItem('switchUserId');
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem('userId');
    }
    var cloudAccountVal = sessionStorage.getItem('cloudAccountId');

    //var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }
    if(this.msCloudAccounts === undefined || this.msCloudAccounts === null){
      this.msCloudAccounts = cloudAccountVal;
    }
    console.log("After Headers: allIssues() ");
  
    var graphData: any;
    let params = 'cloudIds='+this.msCloudAccounts + '&date=' + this.bestPracticesDate;
  
  
  
  
    this.http.get(environment.envUrl + '/bestPracticesData/msdashboard/graph?' + params, { headers }).subscribe(data => {
  
  
      graphData = data;
      graphData = graphData.data;
  
  
      if (graphData.length === 0) {
        this.bestPracticesRulesVal = 'none';
        this.NoBestPracticesRulesVal = 'block';
      } else {
        this.bestPracticesRulesVal = 'block';
        this.NoBestPracticesRulesVal = 'none';
        setTimeout(() => {
  
          const bp = new TimeChart({
  
  
            "series": [
  
              {
                name: "Security",
                data: {
                  index: 1,
                  aggregation: "max"
                },
                style: {
                  lineColor: "#70AD47",
                  lineWidth: 2
                },
                type: "line"
              },
              {
                name: "Cost",
                data: {
                  index: 2,
                  aggregation: "max"
                },
                style: {
                  lineColor: "#f51b6e",
                  lineWidth: 2
                },
                type: "line"
              },
              {
                name: "Operational",
                data: {
                  index: 3,
                  aggregation: "max"
                },
                style: {
                  lineColor: "#FFC000",
                  lineWidth: 2
                },
                type: "line"
              },
              {
                name: "Reliability",
                data: {
                  index: 4,
                  aggregation: "max"
                },
                style: {
                  lineColor: "#ED7D31",
                  lineWidth: 2
                },
                type: "line"
              },
              {
                name: "Performance",
                data: {
                  index: 5,
                  aggregation: "max"
                },
                style: {
                  lineColor: "#5B9BD5",
                  lineWidth: 2
                },
                type: "line"
              }
            ],
            advanced: { themeCSSClass: "" },
            area: { height: 255 },
            "container": "allIssues",
            "data": [
              {
                preloaded: graphData
              }
            ],
            "toolbar": {
              "fullscreen": true,
              "enabled": true
            },
            "interaction": {
              "resizing": {
                "enabled": false
              }
            }
  
  
  
          })
        }, 0.4)
  
      }
  
    }, (err: HttpErrorResponse) => {
      console.log(err);
      //this.costAllocationIDVal = 'none';
      //this.costAllocationIDValNoData = 'block';
      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }

  getLatestDate() {

    console.log('Get Latest Date From Database');
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());
    console.log('After header in getLatestDate()');
  
    var cloudAccountVal = sessionStorage.getItem('cloudAccountId');
    //var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }
  
    let params = 'cloudId=' + cloudAccountVal;
    //this.loaderDisplay = 'block';
    this.http.get(environment.envUrl + '/bestPracticesData/getDateList?' + params, { headers }).subscribe(data => {
      this.bestPracticesRuleDateList = data;
      this.bestPracticesRuleDateList = this.bestPracticesRuleDateList.data;
      this.bestPracticesDate = this.bestPracticesRuleDateList[0];
      //this.bootstrapSelectBestPractices.refresh();
      this.allIssues();
      this.msAccountDataTable();
  
      //this.loaderDisplay = 'none';
  
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        //this.loaderDisplay = 'none';
        this.errorCode = err;
        if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
          this.router.navigate(['access/login']);
        }
        this.statusText = this.errorCode.error.metaData.message;
        //this.toasterService.pop('error', 'Error!', this.statusText);
      }
    );
  
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
    //this.spinner.show();
    //this.loaderDisplay='show';
    this.http.get(environment.envUrl + params, {headers}).subscribe(data => {
            this.response = data;
            //this.spinner.hide();
            //this.loaderDisplay='none';
            this.accountDropDownResult = this.response.data;
            this.comapnyName = this.accountDropDownResult.accountBo.companyName;
            if(this.accountDropDownResult.cloudBo !== null){
                if(sessionStorage.getItem('cloudAccountName') == null){
                    sessionStorage.setItem('cloudAccountId', this.accountDropDownResult.cloudBo.cloudAccountId);
                    sessionStorage.setItem('masterAccount',this.accountDropDownResult.cloudBo.masterAccount);
                    this.accountName = this.accountDropDownResult.cloudBo.accountName;
                  }else{
                    this.accountName = sessionStorage.getItem('cloudAccountName');
                  }
                  //this.bootstrapSelectMsDashboard.refresh();
            this.cloudAccountList = this.accountDropDownResult.cloudBoList;
            //console.log('projectsList::' + this.cloudAccountList);
            for (let i = 0; i < this.cloudAccountList.length; i++) {
              //console.log(this.cloudAccountList[i].cloudAccountId);
              //this.cloudIdList = this.cloudIdList +','+ this.cloudAccountList[i].cloudAccountId

              if(this.msCloudAccounts === ''){
                this.msCloudAccounts = this.cloudAccountList[i].cloudAccountId
              }
              else{
                this.msCloudAccounts = this.msCloudAccounts +','+ this.cloudAccountList[i].cloudAccountId
              }
              
            }
            this.allIssues();
            this.msAccountDataTable();
            }
            

        },
        (err: HttpErrorResponse) => {
            console.log(err);
            //this.spinner.hide();
            //this.loaderDisplay='none';
            this.errorCode = err;
            if(this.errorCode.error.metaData.errCode ==='USER_1003' || this.errorCode.error.metaData.errCode  ==='USER_1004'){
                this.sessionMessage = "Your session has expired. Press reauthenticate again.";
              this.router.navigate(['access/login']);
          }
        }
    );
  }

  loadGraph(){
    this.allIssues();
  }

  msAccountDataTable(){

    console.log('Get Managed services data for all the customers');
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());
    console.log('After header in msAccountDataTable()');

    let params = 'cloudIds='+this.msCloudAccounts + '&date=' + this.bestPracticesDate;
    //this.loaderDisplay = 'block';
    this.http.get(environment.envUrl + '/bestPracticesData/msdashboard/dataTable?' + params, { headers }).subscribe(data => {
      this.msCustomerDetails = data;
      this.msCustomerDetails = this.msCustomerDetails.data;
  
      //this.loaderDisplay = 'none';
      this.dtTrigger.next();
  
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        //this.loaderDisplay = 'none';
        this.errorCode = err;
        if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
          this.router.navigate(['access/login']);
        }
        this.statusText = this.errorCode.error.metaData.message;
        //this.toasterService.pop('error', 'Error!', this.statusText);
      }
    );

  }

}
