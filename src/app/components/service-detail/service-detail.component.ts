import { Component } from '@angular/core';
import { BookingService } from '../../services/api/booking.service';
import Booking from '../../models/booking';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css',
})
export class ServiceDetailComponent {
  public bookings: Booking[] = [];
  displayedColumns: string[] = [
    'id',
    'workService',
    'time',
    'customer',
    'vehicle',
  ];

  ngOnInit() {
    this.getCompletedBookings();
  }

  constructor(private bookingService: BookingService) {}

  getCompletedBookings() {
    this.bookingService.getNonActiveBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
