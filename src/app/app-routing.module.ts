import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { CustomerComponent } from './components/customer/customer.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';

const routes: Routes = [
  { path: '', component: BookingComponent },
  { path: 'turnos', component: BookingComponent },
  { path: 'clientes', component: CustomerComponent },
  { path: 'vehiculos', component: VehicleComponent },
  { path: 'servicios', component: ServiceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
