import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

import { BrandCollection, ProductCollection, StoreCollection } from "../../mongo/db.ts";
import { ProductSchema } from "../../mongo/schemas.ts";
import { Brand, Product, Store } from "../../types.ts";

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
    
}
