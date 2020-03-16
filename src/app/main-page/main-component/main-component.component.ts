import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WindowRef } from '../../window-ref';
import * as zc from '@dvsl/zoomcharts';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {

  sessionMessage: string;
  errorCode: any;
  dashboardRegionDropDown: string;
  private zc: any = zc;
  bestPracticesRuleDateList :any;
  bestPracticesDate :any;

  constructor(private router: Router,private winRef: WindowRef, private http: HttpClient) { 
    winRef.nativeWindow.ZoomChartsLicense = 'ZCP-m99ri154u: ZoomCharts Development licence for Rapyder';
    winRef.nativeWindow.ZoomChartsLicenseKey = '0604503cd4bfd50552d85a73e171da182626b9310f6477ec7630e71ee06a29442552002849bf387316c093cd431e73f9c7815208e9ee256cdfa4453a1d0d26ab06aeaad3f5d513aa6417e61ecc636c94ec022e8d6a30b6a0ee0176efdab28d9c9bffc3829d66cfc151f4e7acea2e9c2d410c28da0fccde7da0644331675d2116ffe3bada1d0b70ee76e1701070f892083f0ab285077208c5182ec246b9418271e50ea18b2937cf0c6542889c1af89efe312305109386edae7b3975942d44510600bb396fc3677165d8615814bc0cff5d79a684778cec49c4b0a5e64215ff6aeef3a6b379199739ba3e7a56ccff73ede8aefea5e56aa9882954bf9bf2e0bd903c';
  }

  ngOnInit() {
    this.dashboardRegionDropDown = 'all';
    this.loadCostAllocationChart();
    this.loadhibernateChart();
    this.loadSnapshotChart();
    this.loadAmiChart();
    this.issuesByCategory();
    this.getLatestDate();
    this.costSavingsIdleResources();
    this.costSavingsUnusedResources();
    this.costSavingsReservedInstances();
    this.inventoryGeoMap();
  }

  date: Date = new Date();

  visitSaleChartData = [{
    label: 'CHN',
    data: [20, 40, 15, 35, 25, 50, 30, 20],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'USA',
    data: [40, 30, 20, 10, 50, 15, 35, 40],
    borderWidth: 1,
    fill: false,
  },
  {
    label: 'UK',
    data: [70, 10, 30, 40, 25, 50, 15, 30],
    borderWidth: 1,
    fill: false,
  }];

  visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  visitSaleChartOptions = {
    responsive: true,
    legend: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                min: 0,
                stepSize: 20,
                max: 80
            },
            gridLines: {
              drawBorder: false,
              color: 'rgba(235,237,242,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            }
        }],
        xAxes: [{
            gridLines: {
              display:false,
              drawBorder: false,
              color: 'rgba(0,0,0,1)',
              zeroLineColor: 'rgba(235,237,242,1)'
            },
            ticks: {
                padding: 20,
                fontColor: "#9c9fa6",
                autoSkip: true,
            },
            categoryPercentage: 0.4,
            barPercentage: 0.4
        }]
      }
  };

  visitSaleChartColors = [
    {
      backgroundColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ],
      borderColor: [
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
        'rgba(154, 85, 255, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ],
      borderColor: [
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(254, 112, 150, 1)',
      ]
    },
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ],
      borderColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
        'rgba(177, 148, 250, 1)',
      ]
    },
  ];

  trafficChartData = [
    {
      data: [30, 30, 40],
    }
  ];

  trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  trafficChartOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: false,
  };

  trafficChartColors = [
    {
      backgroundColor: [
        'rgba(177, 148, 250, 1)',
        'rgba(254, 112, 150, 1)',
        'rgba(132, 217, 210, 1)'
      ],
      borderColor: [
        'rgba(177, 148, 250, .2)',
        'rgba(254, 112, 150, .2)',
        'rgba(132, 217, 210, .2)'
      ]
    }
  ];

  loadCostAllocationChart() {
    const PieChart = this.zc.PieChart;
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
    var graphData: any;
    let params = 'cloudAccountId=' + cloudAccountVal + '&accountId=' + accountIdVal + '&region=' +this.dashboardRegionDropDown;

    this.http.get(environment.envUrl + '/home/tagging/data?' + params, { headers }).subscribe(data => {

      graphData = data;
      graphData = graphData.data;

      console.log(graphData);
      console.log("Alert");
      if(graphData.length === 0){
      }else{
      const costAllocation = new PieChart({

        container: document.getElementById('costAllocationID'),
        "pie": {
          style: {
            sliceColors: ["#9a55ff", "#fe7096","#4cebde"]
          }
        },
        "interaction": {
          "resizing": {
            "enabled": false
          }
        },
        labels: {
          enabled: false
      },
     /* legend: {
        enabled: true,
        width:100,
        panel:{
            side:"bottom",
            align:"center"
        }
    }, */
        theme: PieChart.themes.bevel,
        /*slice: {
          styleFunction: function(slice, data) {
            slice.label.text = data.name+"   "+data.value;
          }
      }, */
        area: { height: 145 },
        data: {
          preloaded: graphData
        },
      });

    }

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


  loadhibernateChart() {
    const PieChart = this.zc.PieChart;
    /*
    Function to get the pie chat for cost allocation
    */
  
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
    var graphData: any;
    let params = '&accountId=151'  + '&type=hibernate';
  
    this.http.get(environment.envUrl + '/pieChart/snapshot/ami/hibernate?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);

      const costAllocation = new PieChart({
  
        container: document.getElementById('costHibernateID'),
        "pie": {
          style: {
            sliceColors: ["#9a55ff", "#fe7096","#4cebde"]
          }
        },
        "interaction": {
          "resizing": {
            "enabled": false
          }
        },
        //theme: PieChart.themes.raised,
        labels: {
          enabled: false
      },
        slice: {
          styleFunction: function(slice, data) {
            slice.label.text = data.name+"   "+data.value;
          }
      },
        area: { height: 145 },
        data: {
          preloaded: graphData
        },
      });
  
    
  
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

  loadSnapshotChart() {
    const PieChart = this.zc.PieChart;
    /*
    Function to get the pie chat for cost allocation
    */
   //this.costAllocationIDVal = 'bolck';
   //this.costAllocationIDValNoData = 'none';
   
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
    var graphData: any;
    let params =  '&accountId=151' + '&type=snapshot';
  
    this.http.get(environment.envUrl + '/pieChart/snapshot/ami/hibernate?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
      if(graphData.length === 0){
      }else{
      const costAllocation = new PieChart({
  
        container: document.getElementById('costSnapshotID'),
        "pie": {
          style: {
            sliceColors: ["#9a55ff", "#fe7096","#4cebde"]
          }
        },
        "interaction": {
          "resizing": {
            "enabled": false
          }
        },
        theme: PieChart.themes.raised,
        labels: {
          enabled: false
      },
        slice: {
          styleFunction: function(slice, data) {
            slice.label.text = data.name+"   "+data.value;
          }
      },
        area: { height: 145 },
        data: {
          preloaded: graphData
        },
      });
  
    }
  
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


  loadAmiChart() {
    const PieChart = this.zc.PieChart;
    /*
    Function to get the pie chat for cost allocation
    */
   //this.costAllocationIDVal = 'bolck';
   //this.costAllocationIDValNoData = 'none';
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
    var graphData: any;
    let params = '&accountId=151' + '&type=ami';
  
    this.http.get(environment.envUrl + '/pieChart/snapshot/ami/hibernate?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
      if(graphData.length === 0){
      }else{
      const costAllocation = new PieChart({
  
        container: document.getElementById('costAmiID'),
        "pie": {
          style: {
            sliceColors: ["#9a55ff", "#fe7096","#4cebde"]
          }
        },
        "interaction": {
          "resizing": {
            "enabled": false
          }
        },
        theme: PieChart.themes.gradient,
        labels: {
          enabled: false
        },
        slice: {
          styleFunction: function(slice, data) {
            slice.label.text = data.name+"   "+data.value;
          }
      },
        area: { height: 145 },
        data: {
          preloaded: graphData
        },
      });
  
    }
  
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
  

  issuesByCategory(){



    const PieChart = this.zc.PieChart;

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
    if (cloudAccountVal === null) {
      cloudAccountVal = "1";//TODO 
    }

    var graphData: any;
    let params = 'cloudId=151' 

    this.http.get(environment.envUrl + '/bestPracticesData/getPrioritiesForBestPractice?' + params, { headers }).subscribe(data => {

      graphData = data;
      graphData = graphData.data;

      console.log(graphData);
      if(graphData.length === 0){
      }else{

        setTimeout  (() => {
        const ic = new PieChart({

          pie:{
            style:{
            sliceColors:["#9a55ff", "#fe7096","#4cebde"]
            }
            },
            //theme: PieChart.themes.raised,
          slice: {
            styleFunction: function(slice, data) {
              slice.label.text = data.name+"   "+data.value;
            }
        },
      
      
      area: { height:250 },
      "container": "issues-graph",
      "data": [{
        preloaded: graphData
      }],
    
      "toolbar": {
        "fullscreen": false,
        "enabled": false
      },
      "interaction": {
        "resizing": {
          "enabled": false
        }
      }
    
    
    
        })
      }, 600)

    }

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
  
    let params = 'cloudId=151';
    this.http.get(environment.envUrl + '/bestPracticesData/getDateList?' + params, { headers }).subscribe(data => {
      this.bestPracticesRuleDateList = data;
      this.bestPracticesRuleDateList = this.bestPracticesRuleDateList.data;
      this.bestPracticesDate = this.bestPracticesRuleDateList[0];
      //this.bootstrapSelectBestPractices.refresh();
      this.allIssues();
  
      console.log("Best Practices Rules Date : " + this.bestPracticesRuleDateList[0]);
  
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorCode = err;
        if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
          this.router.navigate(['access/login']);
        }
        this.sessionMessage = this.errorCode.error.metaData.message;
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
    console.log("After Headers: allIssues() ");
  
    var graphData: any;
    let params = 'cloudId=151'  + '&date=' + this.bestPracticesDate;
  
  
  
  
    this.http.get(environment.envUrl + '/bestPracticesData/getBarGraphForBestPractice?' + params, { headers }).subscribe(data => {
  
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
  
  
      if (graphData.length === 0) {
      } else {
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
      this.errorCode = err;
      if (this.errorCode.error.metaData.errCode === 'USER_1003' || this.errorCode.error.metaData.errCode === 'USER_1004') {
        this.sessionMessage = "Your session has expired. Press reauthenticate again.";
        this.router.navigate(['access/login']);
      }
    }
    );
  }

  costSavingsIdleResources(){

    const PieChart = this.zc.PieChart;
  
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
  
    var graphData: any;
    let params = 'cloudId=151' + '&savingType=IDLE'
  
    this.http.get(environment.envUrl + '/costSavings/costSavingsPieChart?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
      if(graphData.length === 0){
      }else{
  
        setTimeout  (() => {
          const ic = new PieChart({
            pie:{
              style:{
                sliceColors:["#9a55ff", "#fe7096","#4cebde"]
              }
              },
            "container": "idle-resources",
            "data": [
                {
                    "preloaded": graphData
                }
            ],
            slice: {
              styleFunction: function(slice, data) {
                slice.label.text = data.name+"   "+data.value;
              }
          },
            //theme: PieChart.themes.raised,
            "toolbar": {
                "fullscreen": false,
                "enabled": true,
                "export" : false,
                "back" : false
            },
            "interaction": {
                "resizing": {
                    "enabled": false
                }
            }
        });
      }, 600)
  
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

  costSavingsUnusedResources(){

    const PieChart = this.zc.PieChart;
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
  
    var graphData: any;
    let params = 'cloudId=151' +'&savingType=UNUSED'
  
    this.http.get(environment.envUrl + '/costSavings/costSavingsPieChart?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
      if(graphData.length === 0){
      }else{
  
        setTimeout  (() => {
          const ic = new PieChart({
            pie:{
              style:{
                sliceColors:["#9a55ff", "#fe7096","#4cebde"]
              }
              },
            "container": "unused-resources",
            "data": [
                {
                    "preloaded": graphData
                }
            ],
            slice: {
              styleFunction: function(slice, data) {
                slice.label.text = data.name+"   "+data.value;
              }
          },
            //theme: PieChart.themes.raised,
            "toolbar": {
                "fullscreen": false,
                "enabled": true,
                "export" : false,
                "back" : false
            },
            "interaction": {
                "resizing": {
                    "enabled": false
                }
            }
        });
      }, 600)
  
    }
  
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

  costSavingsReservedInstances(){

    const PieChart = this.zc.PieChart;
  
    //this.costAllocationIDVal = 'bolck';
    //this.costAllocationIDValNoData = 'none';
  
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
  
    var graphData: any;
    let params = 'cloudId=151' +'&savingType=RI'
  
    this.http.get(environment.envUrl + '/costSavings/costSavingsPieChart?' + params, { headers }).subscribe(data => {
  
      graphData = data;
      graphData = graphData.data;
  
      console.log(graphData);
      if(graphData.length === 0){
      }else{
  
        setTimeout  (() => {
          const ic = new PieChart({
            pie:{
              style:{
                sliceColors:["#9a55ff", "#fe7096","#4cebde"]
              }
              },
            "container": "reserved-resources",
            "data": [
                {
                    "preloaded": graphData
                }
            ],
            slice: {
              styleFunction: function(slice, data) {
                slice.label.text = data.name+"   "+data.value;
              }
          },
            //theme: PieChart.themes.raised,
            "toolbar": {
                "fullscreen": false,
                "enabled": true,
                "export" : false,
                "back" : false
            },
            "interaction": {
                "resizing": {
                    "enabled": false
                }
            }
        });
      }, 600)
  
    }
  
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

  inventoryGeoMap(){
    let headers = new HttpHeaders().set('loginToken', sessionStorage.getItem('token').toString());
    headers = headers.append('userid', sessionStorage.getItem('userId').toString());
    headers = headers.append('accountid', sessionStorage.getItem('accountId').toString());
    
    var inventoryTab : any;
    var cloudAccountVal = sessionStorage.getItem('cloudAccountId');
    //var cloudAccountVal = "100";
    if (cloudAccountVal === null) {
      cloudAccountVal = "92";
    }
   
    let params = '&cloudId=151' ;

   this.http.get(environment.envUrl + '/infra/getInventoryGraph?' + params,{ headers }).subscribe(data => {
    inventoryTab = data;
    inventoryTab = inventoryTab.data;
    console.log(inventoryTab);
    var hasProp = {}.hasOwnProperty;

                //var sliceColors = ["#F0F3BD", "#02C39A", "#00A896", "#028090"];
                //var sliceColors = ["#263238", "#455b64", "#607d8b", "#01838f"];
                //var sliceColors = ["#ed1964","#263238", "#455b64", "#607d8b", "#01838f"];
                var sliceColors:["#9a55ff", "#fe7096","#4cebde"]
                var enableAggregation = false;
                 const GeoChart = this.zc.GeoChart;
                const i = new GeoChart({

                    "layers": [
                      {
                          "id": "piePositions",
                          "type": "items",
                          "data": {
                              "id": "sourceData"
                          },
                          "aggregation": {
                              "enabled": true,
                              "distance": 70,
                              "weightFunction": function (node) {
                                      var sum = 0;
                                      for (var key in node.sourceData) {
                                          if ({}.hasOwnProperty.call(node.sourceData, key)) {
                                              sum += node.sourceData[key];
                                          }
                                      }
                                      return sum;
                                  }
                              },
                              "style": {
                                  "nodeAutoScaling": "linear " ,
                                  "nodeStyleFunction": function (node) {
                                      var r;
                                      
              
                                      r = node.data.aggregatedWeight;
                          
                                      // in order to fit nodes on the chart, display the radius in a logarithmic scale
                                      node.radius = Math.log(Math.max(9, r * 1e-1)) * 15;
              
                                      // Show the country names, if an aggregation contains only 1 node
                                       var aggr = node.data.aggregatedNodes;
                   
                                      if (aggr.length === 1) {
                                          node.label = aggr[0].id;
                                      } else {
                                          node.display = "image";
                                          node.label = "" + aggr.length + " countries";
                                      }
                                  },
                                  node: {
                                    radius: void 0,
                                    fillColor: "rgba(0, 153, 204, 0)",
                                    lineColor: null,
                                    label: "",
                                    display: "droplet"
                                },
                                nodeHovered: {
                                    shadowColor: "#1c7cd5"
                                },
                                nodeLabel: {
                                    backgroundStyle: {
                                        fillColor: "#231f20",
                                        lineColor: "rgba(0, 0, 0, 0.0)"
                                    },
                                    textStyle: {
                                        fillColor: "#ccc"
                                    }
                                },
                                removedColor: null
                          }
                      },
                      {
                          "id": "pie",
                          "type": "charts",
                          "shapesLayer": "piePositions",
                          "chartType": "piechart",
                          "settingsFunction": function (node, data) {
                                  
                                  var aggr = data.aggregatedNodes;
              
                                  if (aggr.settingsApplied) return {
                                      pie: { radius: node.removed ? 1e-30 : node.radius -3, innerRadius: 0.5 }
                                  };
                                  aggr.settingsApplied = true;
              
                                  var pieData = {subvalues: []};

                                  // When displaying aggregated GDP of a region, summarize the GDP sectors
                                  var sourceData = {};
                                  for (var i = 0; i < aggr.length; i++) {
                                      var c = aggr[i];
                                      for (var j in c.sourceData) {
                                        if (hasProp.call(sourceData, j)) {
                                            sourceData[j] += c.sourceData[j];
                                        } else {
                                            sourceData[j] = c.sourceData[j];
                                        }
                                    }
                                  }
                                  var radius = 15;
                                  for (var key in sourceData) {
                                      if ({}.hasOwnProperty.call(sourceData, key)) {
                                          pieData.subvalues.push({
                                              value: sourceData[key],
                                              name: key
                                          });
                                      }
                                  }
                                  return {
                                      pie: {
                                          radius: node.radius - 3,
                                          innerRadius: 0.5,
                                          style: {
                                              colorDistribution: "list"
                                          }
                                      },
                                      data: {
                                          preloaded: pieData
                                      },
                                      labels: {enabled: false},
                                      info: {
                                          contentsFunction: function (data) {
                                              return "" + data.name + " "+"(Count): " + data.value.toLocaleString() ;
                                          }
                                      }
                                  };
                              }
                      }
                  ],
                  "navigation": {
                      "initialLat": 30,
                      "initialLng": 10,
                      "initialZoom": 2
                  },
                  "container": "inventory-map-chart",
                  "data": [
                      {
                          "id": "sourceData",
                          "preloaded": inventoryTab,
                          "perBoundsData": false
                      }
                  ],
                  "interaction": {
                      "resizing": {
                          "enabled": true
                      }
                  }
              
                  })

  }
   )
}

}
