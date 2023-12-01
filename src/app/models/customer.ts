import Booking from './booking';
import Vehicle from './vehicle';

export default interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
  premium: boolean;
  vehicles: Vehicle[];
  bookings?: Booking[];
  bookingQuantity: number;
}
