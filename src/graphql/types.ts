import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

export const typeDefs =gql`

type Product{
    id: String!
    name: String!
    brand: Brand!
    price: Int!
}

type Employee{
    id: String!
    email: String!
    name: String!
    surname: String!
    token: String
    storeEmployer:Store
    brandEmployer:Brand
}
type Brand{
    id: String!
    name: String!
    products: [Product]!
    stores: [Store]!
    employees:[Employee]!
}

type Store{
    id: String!
    name: String!
    address: String!
    brands: [Brand]!
    employees:[Employee]!
}

type Mutation{
    addProduct(name:String!,brand:String,price:Int!):Product
    deleteProduct(id:String!):Product
    addBrand(name:String!):Brand
    deleteBrand(id:String!):Product
    addStore(name:String!,address:String!):Store
    deleteStore(id:String!):Store
    assignBrand(id_brand:String!,id_store:String!):Brand
    addEmployee(name:String!,surname:String!,email:String!):Employee
    deleteEmployee(id:String!):Employee
    assignEmployee(id_employer:String!,id_employee:String!):Employee
}
type Query {
    getProduct(id:String!):Product
    getBrand(id:String!):Brand
    getStore(id:String!):Store
    getEmployee(id:String!):Employee
    getEmployees(name:String!):[Employee]!
} 
`;
/*
type Employee{
    id: String!
    email: String!
    name: String!
    surname: String!
    token: String
    shopEmployer:Shop
    brandEmployer:Brand
}
type Brand{
    id: String!
    name: String!
    employees: [Employee]!
    products: [Product]!
}
type Shop{
    id: String!
    name: String!
    address: String!
    employees: [Employee]!
    brands: [Brand]!
}
type Query {
    getEmployee(id:String!):Employee
    getEmployees(name:String!):[Employee]!
    getBrands(id:String!):Brand
    getShop(id:String!):Shop
    getProduct(id:String!):Product
} 
*/