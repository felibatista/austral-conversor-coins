export type Foreing = {
  id: number;
  code: string;
  name: string;
  value: number;
  imageUrl: string;
};

export type User = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionId: number;
};

export type Conversion = {
  id: number;
  fromForeingId: number;
  toForeingId: number;
  date: Date;
  amount: number;
};

export interface Plan {
  id: number
  name: string
  limit: number
  price: number
}
