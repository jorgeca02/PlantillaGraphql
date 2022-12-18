import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { BrandCollection, StoreCollection } from "../../mongo/db.ts";
import { BrandSchema, EmployeeSchema, } from "../../mongo/schemas.ts";
import { Brand, Store } from "../../types.ts";
import { Query } from "./query.ts";

export const Employee = {
    brandEmployer: async (parent: EmployeeSchema): Promise<Brand> => {
        try{
            console.log(parent.employer)
            return await Query.getBrand(undefined,{id:String(parent.employer)})
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    storeEmployer: async (parent: EmployeeSchema): Promise<Store> => {
        try{
            return await Query.getStore(undefined,{id:String(parent.employer)})
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    }
}