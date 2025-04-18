import { ICustomer } from 'customers';
import { IDish } from 'dishes';

export interface IOrder {
  id: number;
  customer: ICustomer;
  dishes: IDish[];
  total: number;
}
