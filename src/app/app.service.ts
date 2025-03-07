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

    public reportsList: ReportsList[] = [];
    public selectedReportsList: ReportsList[] = [];
    public selectedTemplate: number = 0;
    public templates: Template[] = [];
    public flow: Reportflow[] = [{ name: "Select Reports", selected: true }, { name: "Title Page", selected: false }, { name: "Review and Submit", selected: false }]

    getAllReportsList(): Observable<ReportsList[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.get<ReportsList[]>(this.GETALLREPORTSLIST, { headers });
    }

    getAllPresetsList(): Observable<Template[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.get<Template[]>(this.GETALLPRESETSLIST, { headers });
    }

    createPreset(newPreset: NewPreset): Observable<Template> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.put<Template>(this.CREATEPRESET, { name: newPreset.Name, reports: newPreset.Reports, CreatedBy: newPreset.CreatedBy }, { headers: headers });
    }

    deletePreset(id: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-API-KEY': this.API_KEY,
        });
        return this.http.delete(this.DELETEPRESET, { headers, body: id });
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

export interface Template {
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

//#region
//private data: any = {}; // Store shared data

// setData(key: string, value: Reportflow) {
//     this.data[key] = value;
// }

// getData(key: string): Reportflow {
//     return this.data[key];
// }
//#endregion