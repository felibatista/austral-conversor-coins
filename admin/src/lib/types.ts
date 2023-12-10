export type Currency = {
  id: number;
  code: string;
  name: string;
  value: number;
  imageUrl: string;
};

export interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
  email: string
  subscription: Subscription
}

export interface UserForUpdate {
  id: number
  userName: string
  firstName: string
  lastName: string
  subscriptionId: number
}

export interface Subscription {
  id: number
  name: string
  limit: number
  price: number
}

export type Conversion = {
  id: number;
  fromForeingId: number;
  toForeingId: number;
  date: Date;
  amount: number;
};
