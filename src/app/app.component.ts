import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/api/customer.service';
import Customer from './models/customer';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}
}
