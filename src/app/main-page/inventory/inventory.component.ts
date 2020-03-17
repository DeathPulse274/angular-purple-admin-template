import { Component, OnInit,ViewChildren,QueryList } from '@angular/core';
import { WindowRef } from '../../window-ref';
import * as zc from '@dvsl/zoomcharts';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  private zc: any = zc;
  statusText:any;
  regionResponse:any;
  regionResponseValue:any;
  errorCode:any;
  regionFilterList: string;
  gridViewData:any;
  mapView:any;
  gridView:any;
  summaryView:any;
  detailedView:any;
  tableView:any;
  view:any;
  regionList: any;
  resourseId:any;
  arnInformation:any;
  sessionMessage:any;
  arnResponseInformation: any;
  arnResponseDescription: any;
  arnResponseDescriptionJson: any;
  descriptionArray: any;
  arnResponseResourceDetailsJson: any;
  arnResponseResourceDetails: any;
  resourceDetailArray: any;
  arnResponseOtherDetailsJson: any;
  arnResponseOtherDetails: any;
  resourseOtherDetails: any;
  taggingDataBoList = [];
  resourceType:any;
  popupTile: any;
  isFirstTime = true;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // ng-multiselect-dropdown

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  


  constructor(private winRef: WindowRef, private http: HttpClient,private router: Router) { 
    winRef.nativeWindow.ZoomChartsLicense = 'ZCP-m99ri154u: ZoomCharts Development licence for Rapyder';
    winRef.nativeWindow.ZoomChartsLicenseKey = '0604503cd4bfd50552d85a73e171da182626b9310f6477ec7630e71ee06a29442552002849bf387316c093cd431e73f9c7815208e9ee256cdfa4453a1d0d26ab06aeaad3f5d513aa6417e61ecc636c94ec022e8d6a30b6a0ee0176efdab28d9c9bffc3829d66cfc151f4e7acea2e9c2d410c28da0fccde7da0644331675d2116ffe3bada1d0b70ee76e1701070f892083f0ab285077208c5182ec246b9418271e50ea18b2937cf0c6542889c1af89efe312305109386edae7b3975942d44510600bb396fc3677165d8615814bc0cff5d79a684778cec49c4b0a5e64215ff6aeef3a6b379199739ba3e7a56ccff73ede8aefea5e56aa9882954bf9bf2e0bd903c';
  }

  ngOnInit() {
    this.mapView = "block";
    this.gridView = "none";
    this.summaryView = "block";
    this.detailedView = "none";
    this.tableView = "none";
    this.view = "Map View";
    this.loadRegionDropDown();
    this.inventoryGeoMap();
    this.InventoryGridView(this.regionFilterList);
  }

  rerender(): void {
    this.dtElements.forEach((dtElement: DataTableDirective) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.dtTrigger.next();
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  

  inventoryGeoMap() {
    let headers = new HttpHeaders().set("loginToken",sessionStorage.getItem("token").toString());
    headers = headers.append("userid",sessionStorage.getItem("userId").toString());
    headers = headers.append("accountid",sessionStorage.getItem("accountId").toString());

    var inventoryTab: any;
    var cloudAccountVal = sessionStorage.getItem("cloudAccountId");
    //var cloudAccountVal = "100";
    if (cloudAccountVal === null) {
      cloudAccountVal = "92";
    }

    let params = "&cloudId=" + cloudAccountVal;

    this.http.get(environment.envUrl + "/infra/getInventoryGraph?" + params, {headers}).subscribe(data => {

        inventoryTab = data;
        inventoryTab = inventoryTab.data;
        console.log(inventoryTab);
        var hasProp = {}.hasOwnProperty;

        //var sliceColors = ["#F0F3BD", "#02C39A", "#00A896", "#028090"];
        //var sliceColors = ["#263238", "#455b64", "#607d8b", "#01838f"];
        //var sliceColors = ["#ed1964","#263238", "#455b64", "#607d8b", "#01838f"];
        var sliceColors = [
          "#05668d",
          "#f0f3bd",
          "#00a896",
          "#5f449b",
          "#028090",
          "#57a0d7"
        ];
        var enableAggregation = false;
        const GeoChart = this.zc.GeoChart;
        const i = new GeoChart({
          layers: [
            {
              id: "piePositions",
              type: "items",
              data: {
                id: "sourceData"
              },
              aggregation: {
                enabled: true,
                distance: 70,
                weightFunction: function(node) {
                  var sum = 0;
                  for (var key in node.sourceData) {
                    if ({}.hasOwnProperty.call(node.sourceData, key)) {
                      sum += node.sourceData[key];
                    }
                  }
                  return sum;
                }
              },
              style: {
                nodeAutoScaling: "linear ",
                nodeStyleFunction: function(node) {
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
              id: "pie",
              type: "charts",
              shapesLayer: "piePositions",
              chartType: "piechart",
              settingsFunction: function(node, data) {
                var aggr = data.aggregatedNodes;

                if (aggr.settingsApplied)
                  return {
                    pie: {
                      radius: node.removed ? 1e-30 : node.radius - 3,
                      innerRadius: 0.5
                    }
                  };
                aggr.settingsApplied = true;

                var pieData = { subvalues: [] };

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
                  labels: { enabled: false },
                  info: {
                    contentsFunction: function(data) {
                      return (
                        "" +
                        data.name +
                        " " +
                        "(Count): " +
                        data.value.toLocaleString()
                      );
                    }
                  }
                };
              }
            }
          ],
          navigation: {
            initialLat: 30,
            initialLng: 10,
            initialZoom: 2
          },
          container: "geoChart",
          data: [
            {
              id: "sourceData",
              preloaded: inventoryTab,
              perBoundsData: false
            }
          ],
          interaction: {
            resizing: {
              enabled: true
            }
          }
        });
      });
  }

  loadRegionDropDown() {
    console.log("fetch all Region details");
    let headers = new HttpHeaders().set("loginToken",sessionStorage.getItem("token").toString());
    headers = headers.append("userid",sessionStorage.getItem("userId").toString());
    headers = headers.append("accountid",sessionStorage.getItem("accountId").toString());
    console.log("After header in loadRegionDropDown()");

    var accountIdVal = sessionStorage.getItem("switchAccountId");
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem("accountId");
    }

    var switchUserIdVal = sessionStorage.getItem("switchUserId");
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getIteme("userId");
    }
    var cloudAccountVal = sessionStorage.getItem("cloudAccountId");
    //var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1"; //TODO
    }

    let params = "aggId=1";
    //let params =  '&cloudId='+cloudAccountVal+"&pageNumber=0";
    //this.spinner.show();
    this.http.get(environment.envUrl + "/get/regions?" + params, { headers }).subscribe(data => {
          this.regionResponse = data;
          this.regionResponseValue = this.regionResponse.data;
          console.log("REGION RESPONSE" + this.regionResponseValue);

          //this.spinner.hide();
          //this.bootstrapSelectTaggingByRegion.refresh()
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          //this.spinner.hide();
          this.errorCode = err;
          if (
            this.errorCode.error.metaData.errCode === "USER_1003" ||
            this.errorCode.error.metaData.errCode === "USER_1004"
          ) {
            this.router.navigate(["access/login"]);
          }
          this.statusText = this.errorCode.error.metaData.message;
          //this.toasterService.pop("error", "Error!", this.statusText);
        }
      );
  }

  InventoryGridView(regionList) {
    console.log("Fetch All The Inventory Grid View Data");
    let headers = new HttpHeaders().set("loginToken",sessionStorage.getItem("token").toString());
    headers = headers.append("userid",sessionStorage.getItem("userId").toString());
    headers = headers.append("accountid",sessionStorage.getItem("accountId").toString());
    console.log("After Header in InventoryGridView");

    var accountIdVal = sessionStorage.getItem("switchAccountId");
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem("accountId");
    }

    var switchUserIdVal = sessionStorage.getItem("switchUserId");
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem("userId");
    }
    var cloudAccountVal = sessionStorage.getItem("cloudAccountId");
    if (cloudAccountVal === null) {
      cloudAccountVal = "1"; //TODO
    }
    let params = "";
    if (regionList === null) {
      params = "cloudId=" + cloudAccountVal;
    } else {
      params = "cloudId=" + cloudAccountVal + "&region=" + regionList;
    }

    this.http
      .get(environment.envUrl + "infra/getInventoryGridViewPage?" + params, {
        headers
      })
      .subscribe(
        data => {
          this.gridViewData = data;
          this.gridViewData = this.gridViewData.data;

          /*console.log("Grid");
        console.log(this.gridViewData);
        var sortNameData = this.gridViewData.sort(function(a,b){
          return b.value - a.value;
        })
        console.log("data");
        console.log(data);
        console.log("Name sort");
        console.log(sortNameData);*/
          //this.spinner.hide();
          //this.loaderDisplay='none';
        },
        (err: HttpErrorResponse) => {
          //this.spinner.hide();
          //this.loaderDisplay='none';
          console.log(err);
        }
      );
  }

  applyFilter() {
    this.regionFilterList = null;

    for (let region of this.regionList) {
      //regionFilterList.push(region.regionName);
      if (this.regionFilterList === null) {
        this.regionFilterList = region.regionName;
      } else {
        this.regionFilterList = this.regionFilterList + "," + region.regionName;
      }
    }

    this.InventoryGridView(this.regionFilterList);
  }

  getInformation(resourceInformation) {
    this.resourseId = resourceInformation;

    console.log("fetch ARN Information");
    let headers = new HttpHeaders().set("loginToken",sessionStorage.getItem("token").toString());
    headers = headers.append("userid",sessionStorage.getItem("userId").toString());
    headers = headers.append("accountid",sessionStorage.getItem("accountId").toString());
    console.log("After header in getInformation");

    var accountIdVal = sessionStorage.getItem("switchAccountId");
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem("accountId");
    }

    var switchUserIdVal = sessionStorage.getItem("switchUserId");
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem("userId");
    }
    var cloudAccountVal = sessionStorage.getItem("cloudAccountId");
    // var cloudAccountVal = "76";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1"; //TODO
    }

    let params ="resourceType=" +this.resourceType +"&rapyderCloudId=" +cloudAccountVal +"&resourceId=" +resourceInformation;
    //let params = 'resourceType=NAT+Gateway'+'&rapyderCloudId=1'+'&resourceId=nat-0209f693c04c5947d';

    this.http
      .get(environment.envUrl + "infra/getInventoryResourceInfo?" + params, { headers}).subscribe(data => {
          this.arnInformation = data;
          this.arnInformation = this.arnInformation.data;

          console.log(this.arnInformation);

          console.log(this.arnInformation.description);

          /*if(this.arnInformation.description === null ){
              
              this.arnResponseDescriptionJson = null;
              this.descriptionArray = null;
            }
            if(this.arnInformation.resourceDetails === null){

              this.arnResponseResourceDetailsJson = null;
              this.resourceDetailArray = null;

            }
            if(this.arnInformation.otherDetails === null){

              this.arnResponseOtherDetailsJson = null;
              this.resourseOtherDetails = null;

            } 
            else{
              */

          this.arnResponseDescriptionJson = null;
          this.descriptionArray = null;

          this.arnResponseResourceDetailsJson = null;
          this.resourceDetailArray = null;

          this.arnResponseOtherDetailsJson = null;
          this.resourseOtherDetails = null;

          this.arnResponseDescription = this.arnInformation.description;
          this.arnResponseDescriptionJson = JSON.parse(
            this.arnResponseDescription
          );
          this.descriptionArray = Object.keys(this.arnResponseDescriptionJson);

          this.arnResponseResourceDetails = this.arnInformation.resourceDetails;
          this.arnResponseResourceDetailsJson = JSON.parse(
            this.arnResponseResourceDetails
          );
          this.resourceDetailArray = Object.keys(
            this.arnResponseResourceDetailsJson
          );

          this.arnResponseOtherDetails = this.arnInformation.otherDetails;
          this.arnResponseOtherDetailsJson = JSON.parse(
            this.arnResponseOtherDetails
          );
          this.resourseOtherDetails = Object.keys(
            this.arnResponseOtherDetailsJson
          );

          //}
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.errorCode = err;
          if (
            this.errorCode.error.metaData.errCode === "USER_1003" ||
            this.errorCode.error.metaData.errCode === "USER_1004"
          ) {
            this.sessionMessage =
              "Your session has expired. Press reauthenticate again.";
            this.router.navigate(["access/login"]);
          }
        }
      );
  }

  getMapView() {
    this.gridView = "none";
    this.mapView = "block";
    this.tableView = "none";
    this.view = "Map View";
    this.summaryView = "block";
    this.detailedView = "none";
  }

  getGridView() {
    this.gridView = "block";
    this.mapView = "none";
    this.view = "Grid View";
    this.summaryView = "block";
    this.tableView = "none";
    this.detailedView = "none";
  }
  getTableView(resourceVal) {
    this.resourceType = resourceVal;
    //alert(this.resourceType);
    this.tableData();
    this.tableView = "block";
    this.detailedView = "block";
    this.gridView = "none";
    this.mapView = "none";
    this.summaryView = "none";
    this.view = "";
  }

  graphData(gridData) {
    const PieChart = this.zc.PieChart;
    this.popupTile = gridData.name;
    const t = new PieChart({
      container: document.getElementById("chartPieChart"),
      //theme: PieChart.themes.raised,
      slice: {
        styleFunction: function(slice, data) {
          slice.label.text = data.name + " - " + data.value;
        }
      },
      area: { height: 250, width: 250 },
      data: {
        preloaded: {
          subvalues: gridData.subvalues
        }
      }
    });
  }

  tableData() {
    let headers = new HttpHeaders().set("loginToken",sessionStorage.getItem("token").toString());
    headers = headers.append("userid",sessionStorage.getItem("userId").toString());
    headers = headers.append("accountid",sessionStorage.getItem("accountId").toString());

    var accountIdVal = sessionStorage.getItem("switchAccountId");
    if (accountIdVal === null) {
      accountIdVal = sessionStorage.getItem("accountId");
    }
    var switchUserIdVal = sessionStorage.getItem("switchUserId");
    if (switchUserIdVal === null) {
      switchUserIdVal = sessionStorage.getItem("userId");
    }
    var cloudAccountVal = sessionStorage.getItem("cloudAccountId");

    //var cloudAccountVal = "26";//hardcode value
    if (cloudAccountVal === null) {
      cloudAccountVal = "1"; //TODO
    }
    var barChartEventChart: any;
    //this.loaderDisplay = "block";
    let params ="rapyderCloudId=" +cloudAccountVal +"&resourceType=" +this.resourceType;
    //let params = 'rapyderCloudId=92&resourceType=EC2%20Instances';
    this.http.get(environment.envUrl + "infra/getInventoryInfo?" + params, { headers }).subscribe(data => {

          //this.loaderDisplay = "none";
          barChartEventChart = data;
          this.taggingDataBoList = barChartEventChart.data.infraList;
          if (this.isFirstTime) {
            this.dtTrigger.next();
          } else {
            this.rerender();
          }
          this.isFirstTime = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          //this.loaderDisplay = "none";
          //this.spinner.hide();
          this.errorCode = err;
          if (
            this.errorCode.error.metaData.errCode === "USER_1003" ||
            this.errorCode.error.metaData.errCode === "USER_1004"
          ) {
            this.router.navigate(["access/login"]);
          }
          this.statusText = this.errorCode.error.metaData.message;
          //this.toasterService.pop("error", "Error!", this.statusText);
        }
      );
  }

}
