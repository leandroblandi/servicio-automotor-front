import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import Booking from '../../models/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private configUrl?: string;

  saveBooking(data: { time: Date; customerId: number; vehicleId: number }) {
    this.configUrl = `${environment.baseUrl}/bookings/`;
    return this.http.post(this.configUrl, data);
  }

  constructor(private http: HttpClient) {}

  getActiveBookings(): Observable<Booking[]> {
    this.configUrl = `${environment.baseUrl}/bookings/active`;
    return this.http.get<Booking[]>(this.configUrl);
  }

  getNonActiveBookings(): Observable<Booking[]> {
    this.configUrl = `${environment.baseUrl}/bookings/not-active`;
    return this.http.get<Booking[]>(this.configUrl);
  }

  deleteBooking(idBooking: number) {
    this.configUrl = `${environment.baseUrl}/bookings/${idBooking}`;
    return this.http.delete(this.configUrl);
  }

  completeBooking(idBooking: number) {
    this.configUrl = `${environment.baseUrl}/bookings/${idBooking}`;
    return this.http.put(this.configUrl, {});
  }
}
