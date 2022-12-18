import { isDBRefLike } from "https://deno.land/x/web_bson@v0.2.5/src/db_ref.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

import { BrandCollection, EmployeeCollection, ProductCollection, StoreCollection } from "../../mongo/db.ts";
import { BrandSchema, EmployeeSchema, ProductSchema, StoreSchema } from "../../mongo/schemas.ts";
import { Brand, Employee, Product, Store } from "../../types.ts";

export const Mutation = {
    addProduct: async(_: unknown, args: {name:string,brand:string,price:number}): Promise<(Product | undefined)> => {
        try{
            const brand: BrandSchema | undefined = await BrandCollection.findOne({name: args.brand});
            if (!brand) throw new Error("Brand doesn't exist");
            if(!args.name || !args.brand || !args.price) throw new Error("missing params, name, brand and price needed");
            const product: ProductSchema | undefined = await ProductCollection.findOne({name: args.name,brand:brand._id});
            if (product) throw new Error("Product already exists");
            const mongoId = await ProductCollection.insertOne({
                name:args.name,
                price:args.price,
                brand:brand._id
            }as ProductSchema);
            return{
                id:String(mongoId),
                name:args.name,
                price:args.price
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    addBrand: async(_: unknown, args: {name:string}): Promise<(Brand | undefined)> => {
        try{
            const brand: BrandSchema | undefined = await BrandCollection.findOne({name: args.name});
            if (brand) throw new Error("Brand already exists");
            const mongoId = await BrandCollection.insertOne({
                name:args.name
            }as BrandSchema);
            return{
                id:String(mongoId),
                name:args.name,
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    addStore: async(_: unknown, args: {name:string,address:string}): Promise<(Store | undefined)> => {
        try{
            const store: StoreSchema | undefined = await StoreCollection.findOne({name: args.name});
            if (store) throw new Error("Store already exists");
            const mongoId = await StoreCollection.insertOne({
                name:args.name,
                address:args.address,
            }as StoreSchema);
            return{
                id:String(mongoId),
                name:args.name,
                address:args.address
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    deleteProduct: async(_: unknown, args: {id:string}): Promise<(ProductSchema | undefined)> => {
        try{
            const product: ProductSchema | undefined = await ProductCollection.findOne({_id: new ObjectId(args.id)});
            if (!product) return undefined
            ProductCollection.deleteOne({_id: new ObjectId(args.id)});
            return product
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    deleteBrand: async(_: unknown, args: {id:string}): Promise<(BrandSchema | undefined)> => {
        try{
            const brand: BrandSchema | undefined = await BrandCollection.findOne({_id: new ObjectId(args.id)});
            if (!brand) return undefined
            BrandCollection.deleteOne({_id: new ObjectId(args.id)});
            return brand
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    deleteStore: async(_: unknown, args: {id:string}): Promise<(StoreSchema | undefined)> => {
        try{
            const store: StoreSchema | undefined = await StoreCollection.findOne({_id: new ObjectId(args.id)});
            if (!store) return undefined
            StoreCollection.deleteOne({_id: new ObjectId(args.id)});
            return store
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    assignBrand: async(_: unknown, args: {id_brand:string,id_store:string}): Promise<(Brand | undefined)> => {
        try{
            const store: StoreSchema | undefined = await StoreCollection.findOne({_id:new ObjectId( args.id_store)})
            const brand: BrandSchema | undefined = await BrandCollection.findOne({_id:new ObjectId( args.id_brand)})
            if (!store||!brand) return undefined
            BrandCollection.updateOne( 
                {_id:new ObjectId(args.id_brand)},
                { $push: { stores: new ObjectId(args.id_store) } })
            return{
                name:brand.name,
                id:String(brand._id)
                
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    addEmployee: async(_: unknown, args: {name:string,surname:string,email:string}): Promise<(Employee | undefined)> => {
        try{
            const employee: EmployeeSchema | undefined = await EmployeeCollection.findOne({email: args.email});
            if (employee) throw new Error("Store already exists");
            const mongoId = await EmployeeCollection.insertOne({
                name:args.name,
                surname:args.surname,
                email:args.email
            }as EmployeeSchema);
            return{
                id:String(mongoId),
                name:args.name,
                surname:args.surname,
                email:args.email
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    deleteEmployee: async(_: unknown, args: {id:string}): Promise<(EmployeeSchema | undefined)> => {
        try{
            const employee: EmployeeSchema | undefined = await EmployeeCollection.findOne({_id: new ObjectId(args.id)});
            if (!employee) return undefined
            EmployeeCollection.deleteOne({_id: new ObjectId(args.id)});
            return employee
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
    assignEmployee: async(_: unknown, args: {id_employee:string,id_employer:string}): Promise<(Employee | undefined)> => {
        try{
            const employee: EmployeeSchema | undefined = await EmployeeCollection.findOne({_id:new ObjectId( args.id_employee)})
            let employer: BrandSchema | StoreSchema | undefined = await BrandCollection.findOne({_id:new ObjectId( args.id_employer)})
            if(!employer) employer = await StoreCollection.findOne({_id:new ObjectId( args.id_employer)})
            if (!employer||!employee) return undefined
            EmployeeCollection.updateOne( 
                {_id:new ObjectId(args.id_employee)},
                { $set: { employer:new ObjectId( args.id_employer) } })
            return{
                id:String(employee._id),
                name:employee.name,
                surname:employee.surname,
                email:employee.email,
                employer:employer._id,
            }
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    },
}
