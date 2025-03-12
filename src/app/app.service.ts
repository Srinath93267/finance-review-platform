import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    private baseUrl: string = environment.baseUrl;
    private API_KEY: string = environment.apiSecretKey;
    private GETALLREPORTSLIST: string = this.baseUrl + "GetAllReportsList";
    private GETALLPRESETSLIST: string = this.baseUrl + "GetAllPresetsList";
    private CREATEPRESET: string = this.baseUrl + "CreateNewPreset";
    private DELETEPRESET: string = this.baseUrl + "DeletePreset";
    private GETPORTFOLIOPERFORMANCEDATA: string = this.baseUrl + "GetPortfolioPerformanceData";
    private GETASSETALLOCATIONDATA: string = this.baseUrl + "GetAssetAllocationData";

    public reportsList: ReportsList[] = [];
    public selectedReportsList: ReportsList[] = [];
    public selectedTemplate: number = 0;
    public templates: Preset[] = [];
    public flow: Reportflow[] = [{ name: "Select Reports", selected: true }, { name: "Title Page", selected: false }, { name: "Review and Submit", selected: false }]

    getAllReportsList(): Observable<ReportsList[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.get<ReportsList[]>(this.GETALLREPORTSLIST, { headers });
    }

    getAllPresetsList(): Observable<Preset[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.get<Preset[]>(this.GETALLPRESETSLIST, { headers });
    }

    createPreset(newPreset: NewPreset): Observable<Preset> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.put<Preset>(this.CREATEPRESET, { name: newPreset.Name, reports: newPreset.Reports, CreatedBy: newPreset.CreatedBy }, { headers: headers });
    }

    deletePreset(id: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.delete(this.DELETEPRESET, { headers, body: id });
    }

    getPortfolioPerformanceData(Account: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
            'ACCOUNT': Account
        });
        return this.http.get<PortfolioPerformance>(this.GETPORTFOLIOPERFORMANCEDATA, { headers });
    }

    getAssetAllocationData(Account: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
            'ACCOUNT': Account
        });
        return this.http.get<AssetAllocation>(this.GETASSETALLOCATIONDATA, { headers });
    }
}

export interface Reportflow {
    name: string;
    selected: boolean;
}

export interface ReportsList {
    id: number;
    name: string;
}

export interface Preset {
    id: number;
    name: string;
    selected: boolean;
    reports: ReportsList[];
}

export interface NewPreset {
    Name: string;
    Reports: ReportsList[];
    CreatedBy: string;
}

export interface PortfolioPerformance {
    portfolioID: number;
    accountNumber: number;
    clientName: string;
    totalPortfolioValue: number;

    // Investment Growth
    investmentGrowthYTD: number;
    investmentGrowth1Y: number;
    investmentGrowth3Y: number;
    investmentGrowth5Y: number;
    investmentGrowth10Y: number;
    investmentGrowthSinceInception: number;

    // Annualized Returns
    annualizedReturnYTD: number;
    annualizedReturn1Y: number;
    annualizedReturn3Y: number;
    annualizedReturn5Y: number;
    annualizedReturn10Y: number;
    annualizedReturnSinceInception: number;

    riskLevel: string;
    benchmarkPerformance: number;
}

export interface AssetAllocation {
    allocationID: number;
    accountNumber: number;
    clientName: string;
    assetClass: string[];
    allocationPercentage: number[];
    marketValue: number[];
    expectedReturnPercentage: number[];
    historicalPerformance3Y: number[];
    historicalPerformance5Y: number[];
    volatilityRiskLevel: string[];
    targetAllocationPercentage: number[];
    deviationFromTarget: number[];
    rebalancingRequired: boolean[];
    liquidityLevel: string[];
    maturityDate: Date[];
    aividendYield: number[];
    advisorNotes: string[];
    currencyType: string[];
}

//#region
//private data: any = {}; // Store shared data

// setData(key: string, value: Reportflow) {
//     this.data[key] = value;
// }

// getData(key: string): Reportflow {
//     return this.data[key];
// }
//#endregion