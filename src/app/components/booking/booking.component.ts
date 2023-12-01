import { Component } from '@angular/core';
import { CustomerService } from '../../services/api/customer.service';
import Customer from '../../models/customer';
import { MatSelectChange } from '@angular/material/select';
import { BookingService } from '../../services/api/booking.service';
import Booking from '../../models/booking';
import Vehicle from '../../models/vehicle';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceDetailService } from '../../services/api/service-detai.service';
import ServiceDetail from '../../models/serviceDetail';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  public customers: Customer[] = [];
  public bookings: Booking[] = [];
  public services: ServiceDetail[] = [];
  public selectedCustomer?: Customer;
  public selectedVehicle?: Vehicle;
  public selectedService?: ServiceDetail;

  bookingForm!: FormGroup;

  displayedColumns: string[] = [
    'id',
    'workService',
    'time',
    'customer',
    'vehicle',
    'action',
  ];

  ngOnInit() {
    this.getCustomers();
    this.getBookings();
    this.getServices();
  }

  public constructor(
    private customerService: CustomerService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private serviceDetailService: ServiceDetailService,
    private snackBar: MatSnackBar
  ) {
    this.bookingForm = this.formBuilder.group({
      dateTimeSelect: ['', Validators.required],
      customerSelect: ['', Validators.required],
      vehicleSelect: ['', Validators.required],
      serviceDetailSelect: ['', Validators.required],
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      (error) => {
        this.snackBar.open('Hubo un error al obtener los clientes', 'Cerrar', {
          duration: 3000,
        });
        console.error(error);
      }
    );
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBooking(id).subscribe(
      () => {
        let booking = this.bookings.find((booking) => booking.bookingId == id);
        this.bookings = this.bookings.filter((aBooking) => aBooking != booking);
        this.snackBar.open('Turno eliminado exitosamente', 'Cerrar');
        this.bookings = [...this.bookings];
      },
      () => {
        this.snackBar.open('Hubo un error al eliminar el turno', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  getBookings() {
    this.bookingService.getActiveBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
      },
      (error) => {
        this.snackBar.open('Hubo un error al obtener los turnos', 'Ok', {
          duration: 3000,
        });
        console.error(error);
      }
    );
  }

  completeBooking(id: number) {
    this.bookingService.completeBooking(id).subscribe(
      () => {
        let booking = this.bookings.find((booking) => booking.bookingId == id);
        this.bookings = this.bookings.filter((aBooking) => aBooking != booking);
        this.snackBar.open('Turno completado', 'Cerrar');
      },
      () => {
        this.snackBar.open('Hubo un error al completar el turno', 'Ok', {
          duration: 3000,
        });
      }
    );
  }

  getServices() {
    this.serviceDetailService.getServices().subscribe(
      (data: ServiceDetail[]) => {
        this.services = data;
      },
      (error) => {
        this.snackBar.open('Hubo un error al obtener los servicios', 'Ok', {
          duration: 3000,
        });
        console.error(error);
      }
    );
  }

  selectCustomer(event: MatSelectChange) {
    const selectedValue = event.value;
    this.selectedCustomer = this.customers.find(
      (customer) => customer.customerId === selectedValue
    );
  }

  checkForm() {
    const customerSelect = this.bookingForm.get('customerSelect')?.value;
    const vehicleSelect = this.bookingForm.get('vehicleSelect')?.value;
    const dateTimeSelect = this.bookingForm.get('dateTimeSelect')?.value;
    const serviceDetailSelect = this.bookingForm.get(
      'serviceDetailSelect'
    )?.value;

    if (customerSelect && vehicleSelect && dateTimeSelect) {
      const data = {
        customerId: customerSelect,
        vehicleId: vehicleSelect,
        serviceDetailId: serviceDetailSelect,
        time: dateTimeSelect,
      };

      this.bookingService.saveBooking(data).subscribe(
        (response: any) => {
          this.bookings.push(response);
          this.bookings = [...this.bookings];
          console.log(data);
          this.snackBar.open('Se agendó el turno exitosamente', 'Ok', {
            duration: 3000,
          });
        },
        (error) => {
          console.error(error);
          this.snackBar.open('Hubo un error al agendar el turno', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
    this.snackBar.open('Algunos datos están imcompletos', 'Cerrar', {
      duration: 3000,
    });
  }
}
