import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/api/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Vehicle from '../../models/vehicle';
import { MatSelectChange } from '@angular/material/select';
import Customer from '../../models/customer';
import { VehicleService } from '../../services/api/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  public vehicleForm: FormGroup;
  public vehicles: Vehicle[] = [];
  public customers: Customer[] = [];
  public selectedCustomer?: Customer;
  public displayedColumns: string[] = ['vehicleId', 'vehiclePlate', 'actions'];
  private newVehicleId: number = -1;

  constructor(
    private customerService: CustomerService,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.vehicleForm = formBuilder.group({
      customerSelect: ['', Validators.required],
      plate: ['', [Validators.pattern(/^[A-Z]{3}\d{3}$/), Validators.required]],
    });
  }

  ngOnInit() {
    this.getCustomers();
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

  selectCustomer(event: MatSelectChange) {
    const selectedValue = event.value;
    this.selectedCustomer = this.customers.find(
      (customer) => customer.customerId === selectedValue
    );
    if (this.selectedCustomer) this.vehicles = this.selectedCustomer?.vehicles;
  }

  deleteVehicle(vehicleId: number) {
    const data = {
      customerId: this.selectedCustomer?.customerId,
      vehicleId: vehicleId,
    };

    this.customerService.deleteVehicleToCustomer(data).subscribe(
      (data) => {
        this.vehicles = this.vehicles.filter(
          (aVehicle) => aVehicle.vehicleId != vehicleId
        );
        this.snackBar.open('Turno eliminado exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.vehicles = [...this.vehicles];
        this.snackBar.open('Vehículo eliminado exitosamente', 'Ok', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Hubo un error al eliminar el vehículo', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  checkForm() {
    const customerSelect = this.vehicleForm.get('customerSelect')?.value;
    const plate = this.vehicleForm.get('plate')?.value;

    if (customerSelect && plate) {
      const data = {
        vehiclePlate: plate,
      };

      this.vehicleService.saveVehicle(data).subscribe(
        (data: Vehicle) => {
          this.newVehicleId = data.vehicleId;
          let vehicle = data;

          if (this.newVehicleId != -1) {
            const dataCustomerVehicle = {
              customerId: customerSelect,
              vehicleId: this.newVehicleId,
            };

            this.customerService
              .linkVehicleToCustomer(dataCustomerVehicle)
              .subscribe(
                () => {
                  this.snackBar.open(
                    'Vehículo enlazado correctamente',
                    'Cerrar',
                    { duration: 3000 }
                  );
                  this.vehicles.push(vehicle);
                  this.vehicles = [...this.vehicles];
                },
                () => {
                  this.snackBar.open(
                    'Hubo un error al enlaza el vehículo al cliente',
                    'Cerrar',
                    { duration: 3000 }
                  );
                }
              );
          }
        },
        (error) => {
          this.snackBar.open('Hubo un error al guardar el vehículo', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
