import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Customer from '../../models/customer';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  linkVehicleToCustomer(data: {
    customerId: number;
    vehicleId: number;
  }): Observable<Customer> {
    this.configUrl = `${environment.baseUrl}/customers/${data.customerId}/vehicles/${data.vehicleId}`;
    return this.http.post<Customer>(this.configUrl, {});
  }

  deleteCustomer(customerId: number): Observable<boolean> {
    this.configUrl = `${environment.baseUrl}/customers/${customerId}`;
    return this.http.delete<boolean>(this.configUrl, {});
  }

  deleteVehicleToCustomer(data: {
    customerId: number | undefined;
    vehicleId: number;
  }): Observable<Customer> {
    this.configUrl = `${environment.baseUrl}/customers/${data.customerId}/vehicles/${data.vehicleId}`;
    return this.http.delete<Customer>(this.configUrl, {});
  }

  saveCustomer(data: { firstName: string; lastName: string }) {
    this.configUrl = `${environment.baseUrl}/customers/`;
    return this.http.post<Customer>(this.configUrl, data);
  }
  private configUrl?: string;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    this.configUrl = `${environment.baseUrl}/customers/all`;
    return this.http.get<Customer[]>(this.configUrl);
  }
}
