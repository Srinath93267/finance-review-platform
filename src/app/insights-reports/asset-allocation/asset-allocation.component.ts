import { Component, OnInit } from '@angular/core';
import { AppService, AssetAllocation } from '../../app.service';
import { ChartType, NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ApexXAxis, ApexDataLabels, ApexStroke, ApexYAxis, ApexLegend, ApexPlotOptions, ApexTitleSubtitle } from "ng-apexcharts";
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: any[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-asset-allocation',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './asset-allocation.component.html',
  styleUrl: './asset-allocation.component.css'
})
export class AssetAllocationComponent implements OnInit {

  ngOnInit() {
    this.isDataLoading = true;
    this.appService.getAssetAllocationData(this.appService.AccountSet.accountNumber).subscribe(
      (data) => {
        this.assetAllocationData = data;
        this.isDataLoading = false;
        this.setAssetAllocationData();
      }
    );
    this.appService.account.subscribe(updatedData => {
      this.isDataLoading = true;
      this.appService.getAssetAllocationData(this.appService.AccountSet.accountNumber).subscribe(
        (data) => {
          this.assetAllocationData = data;
          this.isDataLoading = false;
          this.setAssetAllocationData();
        }
      );
    });
  }
  constructor(private appService: AppService) { }

  assetAllocationData: AssetAllocation = {} as AssetAllocation;
  allocationPercentagePieChart: any = {};
  targetAllocationPercentagePieChart: any = {};
  historicalPerformance: ChartOptions = {} as ChartOptions;
  volatilityRiskLevel: ChartOptions = {} as ChartOptions;

  isDataLoading: boolean = true;

  setAssetAllocationData() {
    this.setAllocationPercentage();
    this.setHistoricalPerformance();
    this.setTargetAllocationPercentage();
    this.setVolatilityRiskLevel();
  }

  setAllocationPercentage() {
    this.allocationPercentagePieChart = {
      series: this.assetAllocationData.allocationPercentage, // Example percentage values
      chart: {
        type: "pie" as ChartType,
        height: 350
      },
      labels: this.assetAllocationData.assetClass, // Portfolio categories
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"], // Custom colors
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`, // Format values as percentage
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px"
        }
      },
      title: {
        text: "Allocation Percentage",
        align: "center" as "center",
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "bold"
        }
      },
      legend: {
        position: "bottom" as "bottom",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px"
      }
    };
  }

  setHistoricalPerformance() {
    this.historicalPerformance = {
      series: [
        {
          name: "Historical Performance 3 years",
          data: this.assetAllocationData.historicalPerformance3Y
        },
        {
          name: "Historical Performance 5 years",
          data: this.assetAllocationData.historicalPerformance5Y
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
          tools: {
            download: false,
          }
        }
      },
      
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          borderRadius: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.assetAllocationData.assetClass,
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        }
      },
      yaxis: {
        title: {
          text: "Percentage (%)",
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        },
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        }
      },
      legend: {
        show: false,
      },
      title: {
        text: "Historical Performance Comparison",
        align: "center" as "center",
        style: {
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold"
        }
      }
    };
  }

  setTargetAllocationPercentage() {
    this.targetAllocationPercentagePieChart = {
      series: this.assetAllocationData.targetAllocationPercentage, // Example percentage values
      chart: {
        type: "donut" as ChartType,
        height: 350
      },
      labels: this.assetAllocationData.assetClass, // Portfolio categories
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"], // Custom colors
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`, // Format values as percentage
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px"
        }
      },
      title: {
        text: "Target Allocation Percentage",
        align: "center" as "center",
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "bold"
        }
      },
      legend: {
        position: "bottom" as "bottom",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px"
      }
    };
  }

  setVolatilityRiskLevel() {
    
    this.volatilityRiskLevel = {
      series: [
        {
          name: "Asset Class",
          data: [1, 2, 3, 4],
          label:this.assetAllocationData.assetClass
        }
      ],
      chart: {
        type: "bar" as ChartType,
        height: 400,
        toolbar: {
          show: false,
          tools: {
            download: false,
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          borderRadius: 0
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.assetAllocationData.assetClass,
        title: {
          text: "Risk Levels",
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        },
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        }
      },
      yaxis: {
        title: {
          text: "Asset Class",
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          }
        },
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Inter, sans-serif"
          },
          formatter: (value) => this.assetAllocationData.assetClass[value - 1] || value.toString()
        }
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif"
      },
      title: {
        text: "Volatility Risk Level",
        align: "left" as "left",
        style: {
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold"
        }
      }
    };
  }
}
