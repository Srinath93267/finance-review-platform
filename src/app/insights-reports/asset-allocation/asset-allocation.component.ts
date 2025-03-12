import { Component, OnInit } from '@angular/core';
import { AppService, AssetAllocation } from '../../app.service';
import { ChartType, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-asset-allocation',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './asset-allocation.component.html',
  styleUrl: './asset-allocation.component.css'
})
export class AssetAllocationComponent implements OnInit {

  ngOnInit() {
    this.appService.getAssetAllocationData(89012345).subscribe(
      (data) => {
        this.assetAllocationData = data;
        console.log(this.assetAllocationData);
        this.setAssetAllocationData();
      }
    );
  }
  setAssetAllocationData() {
    console.log(this.assetAllocationData.allocationPercentage);
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
        align: "left" as "left",
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

  constructor(private appService: AppService) { }

  assetAllocationData: AssetAllocation = {} as AssetAllocation;
  allocationPercentagePieChart:any={};
}
