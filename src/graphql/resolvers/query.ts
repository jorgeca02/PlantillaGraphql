import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

import { BrandCollection, EmployeeCollection, ProductCollection, StoreCollection } from "../../mongo/db.ts";
import { ProductSchema } from "../../mongo/schemas.ts";
import { Brand, Employee, Product, Store } from "../../types.ts";

export const Query = {
    getProduct: async (_: unknown, args: { id: string }): Promise<Product|undefined> => {
        try {
          const productSchema = await ProductCollection.findOne({_id: new ObjectId(args.id)});
          if (!productSchema) return undefined
          const product:Product = {
            id: String(productSchema._id),
            name: productSchema.name,
            price: productSchema.price,
          }
          return product
        } catch (e) {
          throw new Error(e);
        }
    },
    getBrand: async (_: unknown, args: { id: string }): Promise<Brand|undefined> => {
        try {
            const brandSchema = await BrandCollection.findOne({_id: new ObjectId(args.id)});
            if (!brandSchema) return undefined
            const brand:Brand = {
            id: String(brandSchema._id),
            name: brandSchema.name,
          }
          return brand
        } catch (e) {
          throw new Error(e);
        }
    },
    getStore: async (_: unknown, args: { id: string }): Promise<Store|undefined> => {
        try {
            const storeSchema = await StoreCollection.findOne({_id: new ObjectId(args.id)});
            if (!storeSchema) return undefined
            const store:Store = {
            id: String(storeSchema._id),
            name: storeSchema.name,
            address:storeSchema.address
          }
          return store
        } catch (e) {
          throw new Error(e);
        }
    },
    getEmployee: async (_: unknown, args: { id: string }): Promise<Employee|undefined> => {
      try {
          const employeeSchema = await EmployeeCollection.findOne({_id: new ObjectId(args.id)});
          if (!employeeSchema) return undefined
          const employee:Employee = {
          id: String(employeeSchema._id),
          name: employeeSchema.name,
          surname:employeeSchema.surname,
          email:employeeSchema.email
        }
        return employee
      } catch (e) {
        throw new Error(e);
      }
  },
}
