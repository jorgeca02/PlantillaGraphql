export type Employee = {
    id: string
    email: string
    password?: string
    name: string
    surname: string
    token?: string
    employer?:Brand|Shop
  };
  export type Brand = {
    id: string
    name: string
  };
  export type Store = {
    id: string
    name: string
    address: string
  };
  export type Product = {
    id: string
    name: string
    price: number
  };
  