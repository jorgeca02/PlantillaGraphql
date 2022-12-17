import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

import { BrandCollection, ProductCollection, StoreCollection } from "../../mongo/db.ts";
import { BrandSchema, ProductSchema, StoreSchema } from "../../mongo/schemas.ts";
import { Brand, Product, Store } from "../../types.ts";

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
            BrandCollection.deleteOne({_id: new ObjectId(args.id)});
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
}
