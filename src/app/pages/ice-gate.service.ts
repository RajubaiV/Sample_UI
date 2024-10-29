import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IceGateService {


  private readonly apiEndpoint: string = 'https://localhost:7014/api/IntegrationRequest';
  private readonly demoApi: string = 'https://localhost:7209/api/IntegrationRequests';
  private readonly integrationResponse: string = 'https://localhost:7014/api/IntegrationResponse';

  constructor(private http: HttpClient) {}

  add(addModel: any): Observable<any> {
    return this.http.post<any>(this.apiEndpoint, addModel);
  }

  list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiEndpoint);
  }

  select(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiEndpoint}/${id}`);
  }

  update(id: number, model: any): Observable<any> {
    return this.http.put<any>(`${this.apiEndpoint}/${id}`, model);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }

  demoSubmit(model: any): Observable<any> {
    return this.http.post<any>(this.demoApi, model);
  }

  demoSelect(id: any): Observable<any> {
    return this.http.get<any>(`${this.demoApi}/byAckId/${id}`);
  }

  addResponse(addModel: any): Observable<any> {
    return this.http.post<any>(this.integrationResponse, addModel);
  }

}
