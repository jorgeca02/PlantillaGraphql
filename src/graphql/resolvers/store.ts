import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { BrandCollection } from "../../mongo/db.ts";
import { StoreSchema } from "../../mongo/schemas.ts";
import { Brand } from "../../types.ts";
import { Query } from "./query.ts";

export const Store = {
    brands: async (parent: StoreSchema): Promise<Brand[]|undefined> => {
        const schemas:any = await BrandCollection.find(
            {stores:{$elemMatch:{$eq:new ObjectId(parent.id)}}})
        if(schemas) return schemas.map((s:any) =>  Query.getBrand(undefined,{id:String(s._id)}));
        return[]
    }
}