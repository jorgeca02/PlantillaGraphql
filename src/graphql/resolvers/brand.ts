import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { BrandCollection, ProductCollection } from "../../mongo/db.ts";
import { BrandSchema } from "../../mongo/schemas.ts";
import { Product, Store} from "../../types.ts";
import { Query } from "./query.ts";

export const Brand = {
    products: async (parent: BrandSchema): Promise<Product[]|undefined> => {
        const schemas:any = await ProductCollection.find({ brand: new ObjectId(parent.id)}).toArray()
        return schemas.map(async (s:any) => await Query.getProduct(undefined,{id:String(s._id)}));
    },
    stores: async (parent: BrandSchema): Promise<Promise<Store|undefined>[]> => {
        const parentSchema = await BrandCollection.findOne({_id:new ObjectId(parent.id)})
        return parentSchema.stores.map(async (s:any) =>  await Query.getStore(undefined,{id:String(s)}))
    },
}