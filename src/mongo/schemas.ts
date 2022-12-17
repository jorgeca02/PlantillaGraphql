import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { Brand, Product, Store } from "../types.ts";

export type ProductSchema = Omit<Product, "id"> & { _id: ObjectId,brand:ObjectId}
export type BrandSchema = Omit<Brand, "id"> & { _id: ObjectId,stores:ObjectId[]};
export type StoreSchema = Omit<Store, "id"> & { _id: ObjectId };
//export type EmployeeSchema = Omit<Coche, "vendedor"> & { _id: ObjectId,vendedor?:string};