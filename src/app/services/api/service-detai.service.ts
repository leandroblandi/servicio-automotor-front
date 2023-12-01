import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import ServiceDetail from '../../models/serviceDetail';

@Injectable({
  providedIn: 'root',
})
export class ServiceDetailService {
  private configUrl?: string;

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceDetail[]> {
    this.configUrl = `${environment.baseUrl}/service-detail/all`;
    return this.http.get<ServiceDetail[]>(this.configUrl);
  }
}
