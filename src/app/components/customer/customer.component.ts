import { Component } from '@angular/core';
import Customer from '../../models/customer';
import { CustomerService } from '../../services/api/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  public customers: Customer[] = [];
  customersForm: FormGroup;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'isPremium',
    'bookingQuantity',
    'actions',
  ];

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.customersForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCustomers();
    this.customers = this.customers.map((customer) => {
      return { ...customer, vehicles: [] };
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
      }
    );
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      () => {
        this.customers = this.customers.filter(
          (aCustomer) => aCustomer.customerId != id
        );
        this.customers = [...this.customers];
        this.snackBar.open('Cliente eliminado exitosamente', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Hubo un error al eliminar el Cliente', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  checkForm() {
    const firstNameValue = this.customersForm.get('firstName')?.value;
    const lastNameValue = this.customersForm.get('lastName')?.value;

    if (firstNameValue && lastNameValue) {
      const data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
      };

      this.customerService.saveCustomer(data).subscribe(
        (data: Customer) => {
          this.customers.push(data);
          this.snackBar.open('Cliente creado exitosamente', 'Ok', {
            duration: 3000,
          });
          this.customers = [...this.customers];
        },
        (error) => {
          this.snackBar.open('Hubo un error al crear el cliente', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
