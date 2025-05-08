import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    //#region private variables
    private baseUrl: string = environment.baseUrl;
    private baseUrl2: string = environment.baseUrl2;

    //#region Data API Endpoints
    private API_KEY: string = environment.apiSecretKey;
    private GETACCOUNTS: string = this.baseUrl + "GetAccounts";
    private GETALLREPORTSLIST: string = this.baseUrl + "GetAllReportsList";
    private GETALLPRESETSLIST: string = this.baseUrl + "GetAllPresetsList";
    private CREATEPRESET: string = this.baseUrl + "CreateNewPreset";
    private DELETEPRESET: string = this.baseUrl + "DeletePreset";
    private GETPORTFOLIOPERFORMANCEDATA: string = this.baseUrl + "GetPortfolioPerformanceData";
    private GETASSETALLOCATIONDATA: string = this.baseUrl + "GetAssetAllocationData";
    private GETREADYREPORTSBYACCOUNT: string = this.baseUrl + "GetReadyReportsByAccount";
    private GETQUEUEREPORTSBYACCOUNT: string = this.baseUrl + "GetQueueReportsByAccount";
    private UPDATEPRESETBYPRESETID: string = this.baseUrl + "UpdatePreset";
    private CREATENEWFINALREPORTREQUEST = this.baseUrl + "CreateNewFinalReportRequest";
    private DELETEFINALREPORT = this.baseUrl + "DeleteFinalReport";
    private REGENERATEFINALREPORT = this.baseUrl + "RegenerateFinalReport";
    //#endregion

    //#region Report API Endpoints
    private GETPORTFOLIOPERFORMANCEREPORT: string = this.baseUrl2 + "GetPortfolioPerformanceReport";
    private GETASSETALLOCATIONREPORT: string = this.baseUrl2 + "GetAssetAllocationReport";
    //#endregion
    //#endregion

    public reportsList: ReportsList[] = [];
    public selectedReportsList: ReportsList[] = [];
    public selectedTemplate: number = 0;
    public selectedTemplateName: string = '';
    public templates: Preset[] = [];
    public flow: Reportflow[] = [{ name: "Select Reports", selected: true }, { name: "Review and Submit", selected: false }]
    public AccountSet: Account = { accountNumber: 0, clientName: "" };
    private accountSubject = new BehaviorSubject<number>(this.AccountSet.accountNumber);
    account = this.accountSubject.asObservable();
    public isAppOnLoad: boolean = true;
    private isAppLoadSubject = new BehaviorSubject<boolean>(this.isAppOnLoad);
    isAppLoadObserver = this.isAppLoadSubject.asObservable();


    //#region data services
    getAccounts(): Observable<Account[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.get<Account[]>(this.GETACCOUNTS, { headers });
    }

    updateAccount(changedAccount: number) {
        this.accountSubject.next(changedAccount);
    }

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
        return this.http.delete(this.DELETEPRESET, { headers, body: id, observe: 'response' });
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

    getReadyReportsByAccount(Account: number): Observable<FinalReport[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
            'ACCOUNT': Account
        });
        return this.http.get<FinalReport[]>(this.GETREADYREPORTSBYACCOUNT, { headers });
    }

    getQueueReportsByAccount(Account: number): Observable<FinalReport[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
            'ACCOUNT': Account
        });
        return this.http.get<FinalReport[]>(this.GETQUEUEREPORTSBYACCOUNT, { headers });
    }

    updatePreset(id: number, newSelectReports: PresetInfo[], removedSelectReports: PresetInfo[]) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        const updatePreset = { PresetId: id, NewSelectedReports: newSelectReports, RemovedSelectedReports: removedSelectReports };
        return this.http.patch(this.UPDATEPRESETBYPRESETID, updatePreset, { headers, observe: 'response' });
    }

    createNewFinalReportRequest(finalReportRequest: FinalReportRequest) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.put<any>(this.CREATENEWFINALREPORTREQUEST, finalReportRequest, { headers, observe: 'response'});
    }

    deleteFinalReport(finalReportID: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.request<any>('DELETE', this.DELETEFINALREPORT, {
            headers,
            body: finalReportID , 
            observe: 'response'
        });
    }
    	
    regenerateFinalReport(finalReportID: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.request<any>('PATCH', this.REGENERATEFINALREPORT, {
            headers,
            body: finalReportID,
            observe: 'response'
        });
    }
    //#endregion

    //#region report services
    getReport(Account: number, index: number) {
        if (index == 1) {
            return this.getPortfolioPerformanceReport(Account);
        }
        else if (index == 2) {
            return this.getAssetAllocationReport(Account);
        }
        else {
            return this.getPortfolioPerformanceReport(Account);
        }
    }
    getPortfolioPerformanceReport(Account: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'ACCOUNT': Account,
            'REPORTDATE': this.getFormattedDate() || ''
        });
        return this.http.get(this.GETPORTFOLIOPERFORMANCEREPORT, { headers });
    }

    getAssetAllocationReport(Account: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'ACCOUNT': Account,
            'REPORTDATE': this.getFormattedDate() || ''
        });
        return this.http.get(this.GETASSETALLOCATIONREPORT, { headers });
    }
    //#endregion

    //#region Helper functions
    getFormattedDate(): string {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();

        return `${mm}/${dd}/${yyyy}`;
    }
    //#endregion
}

//#region Interfaces
export interface Account {
    accountNumber: number;
    clientName: string;
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
    dividendYield: number[];
    advisorNotes: string[];
    currencyType: string[];
}

export interface FinalReport {
    finalReportID: number;
    accountNumber: number;
    reportTitle: string;
    reportPdf: string;
    reportDate: string;
    presetID: number
    createdBy: string;
    statusCd: number;
    reportIDs: string;
    createdOn: string;
    lastUpdatedOn: string;
    clientName: string;
    presetName: string;
    pdfUrl?: any;
}

export interface PresetInfo {
    reports: ReportsList;
    selected: boolean;
}

export interface FinalReportRequest {
    accountNumber: number;
    reportTitle: string;
    reportDate: string;
    presetID: number;
    createdBy: string;
    reportIDs: string;
}
//#endregion

//#region
//private data: any = {}; // Store shared data

// setData(key: string, value: Reportflow) {
//     this.data[key] = value;
// }

// getData(key: string): Reportflow {
//     return this.data[key];
// }
//#endregion