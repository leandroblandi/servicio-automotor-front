import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import Vehicle from '../../models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private configUrl?: string;

  constructor(private http: HttpClient) {}

  saveVehicle(data: { vehiclePlate: string }): Observable<Vehicle> {
    this.configUrl = `${environment.baseUrl}/vehicles/`;
    return this.http.post<Vehicle>(this.configUrl, data);
  }
}
