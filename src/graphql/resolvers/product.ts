import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { BrandCollection, ProductCollection } from "../../mongo/db.ts";
import { BrandSchema, ProductSchema } from "../../mongo/schemas.ts";
import { Brand } from "../../types.ts";
import { Query } from "./query.ts";

export const Product = {
    brand: async (parent: ProductSchema): Promise<Brand> => {
        try{
            const schema:ProductSchema|undefined = await ProductCollection.findOne({_id:new ObjectId( parent.id)})
            const brand:Brand= await Query.getBrand(undefined,{id:String(schema.brand)})
            return brand
        }catch(e){
            console.error(e)
            throw new Error(e);
        }
    }
}