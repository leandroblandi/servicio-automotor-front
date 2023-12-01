import Customer from './customer';
import Vehicle from './vehicle';
import WorkService from './workService';

export default interface Booking {
  bookingId: number;
  customer?: Customer;
  time: Date;
  vehicle?: Vehicle;
  workService?: WorkService;
  active: boolean;
}
