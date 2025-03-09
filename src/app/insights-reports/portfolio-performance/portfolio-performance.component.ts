import { Component, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppService, PortfolioPerformance } from '../../app.service';

@Component({
  selector: 'app-portfolio-performance',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './portfolio-performance.component.html',
  styleUrl: './portfolio-performance.component.css'
})
export class PortfolioPerformanceComponent implements OnInit {

  ngOnInit() {
    this.appService.getPortfolioPerformanceData(123456).subscribe(
      (data) => {
        this.portforlioPerformanceData = data;
        this.setPortfolioPerformanceData();
      }
    );
  }

  constructor(private appService: AppService) { }

  portforlioPerformanceData: PortfolioPerformance = {} as PortfolioPerformance

  InvestmentGrowthChart: any = {};
  RiskLevelChart: any = {};
  AnnualizedReturnChart: any = {};

  RiskLevel: string = "";
  RiskValue: number = 0;
  TotalRiskValue: number = 6;
  RiskLevels: string[] = ["Low", "Moderate-Low", "Moderate", "Moderate-High", "High", "Very High"];
  TotalPortfolioValue: number = 0;
  BenchmarkPeformance: number = 0;

  getRiskColor(riskValue: Number) {
    switch (riskValue) {
      case 1: return "#00C851";
      case 2: return "#A2D729";
      case 3: return "#FFC107";
      case 4: return "#FF8C00";
      case 5: return "#FF4444";
      case 6: return "#CC0000";
      default: return "#000000";
    }
  }

  setPortfolioPerformanceData() {
    this.RiskValue = Number(this.RiskLevels.indexOf(this.portforlioPerformanceData.riskLevel) + 1);
    this.RiskLevel = this.portforlioPerformanceData.riskLevel;
    this.TotalPortfolioValue = this.portforlioPerformanceData.totalPortfolioValue;
    this.BenchmarkPeformance = this.portforlioPerformanceData.benchmarkPerformance;

    // Investment Growth Chart
    this.setInvestmentGrowthChart();

    // Risk Guage Chart
    this.setRiskLevelChart();

    //Annualized Return Chart
    this.setAnnualizedReturnChart();
  }

  setInvestmentGrowthChart() {
    this.InvestmentGrowthChart = {
      series: [
        {
          name: "Investment Growth",
          data: [
            this.portforlioPerformanceData.investmentGrowthYTD,
            this.portforlioPerformanceData.investmentGrowth1Y,
            this.portforlioPerformanceData.investmentGrowth3Y,
            this.portforlioPerformanceData.investmentGrowth5Y,
            this.portforlioPerformanceData.investmentGrowth10Y,
            this.portforlioPerformanceData.investmentGrowthSinceInception
          ]
        }
      ],
      chart: {
        type: "area" as ChartType,
        height: 350,
        toolbar: {
          show: false,
          tools: {
            download: false,
          }
        }
      },
      xaxis: {
        categories: ["YTD", "1 Y", "3 Y", "5 Y", "10 Y", "SI"],
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `₹${value.toLocaleString()}`,
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px"
          }
        }
      },
      stroke: {
        curve: "smooth" as "smooth"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      title: {
        text: "Investment Growth",
        align: "left" as "left",
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "bold"
        }
      }
    };
  }

  setRiskLevelChart() {
    var riskColor = this.getRiskColor(this.RiskValue);
    this.RiskLevelChart = {
      series: [(this.RiskValue / this.TotalRiskValue) * 100],
      chart: {
        type: "radialBar" as ChartType,
        height: 370
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: "60%"
          },
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%"
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              offsetY: 10
            },
            value: {
              formatter: () => `${this.RiskLevel}`,
              fontSize: "22px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              color: "#333"
            }
          }
        }
      },
      colors: [`${riskColor}`],
      labels: [``]
    };
  }

  setAnnualizedReturnChart() {
    this.AnnualizedReturnChart = {
      series: [
        {
          name: "Portfolio Growth",
          data: [
            this.portforlioPerformanceData.annualizedReturnYTD,
            this.portforlioPerformanceData.annualizedReturn1Y,
            this.portforlioPerformanceData.annualizedReturn3Y,
            this.portforlioPerformanceData.annualizedReturn5Y,
            this.portforlioPerformanceData.annualizedReturn10Y,
            this.portforlioPerformanceData.annualizedReturnSinceInception
          ]
        }
      ],
      chart: {
        type: "bar" as ChartType,
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
          horizontal: false, // Set to true for a horizontal bar chart
          columnWidth: "50%"
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["YTD", "1 Y", "3 Y", "5 Y", "10 Y", "SI"], // Years
        labels: {
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px"
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `${value.toLocaleString()}%`, // Format values as currency
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "14px"
          }
        }
      },
      colors: ["#008FFB"], // Blue color for bars
      title: {
        text: "Annualized Returns",
        align: "left" as "left",
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "bold"
        }
      }
    };
  }
}
