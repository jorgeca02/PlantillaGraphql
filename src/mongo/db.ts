import "https://deno.land/x/dotenv/load.ts";
import { MongoClient, Database, Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { BrandSchema, EmployeeSchema, ProductSchema, StoreSchema } from "./schemas.ts";

//import { CocheSchema, ConcesionarioSchema, VendedorSchema } from "./schemas.ts";

const connectMongoDB = async (): Promise<Database> => {
  const mongo_url = Deno.env.get("URL_MONGO")
  const client = new MongoClient();
  if(mongo_url){
  console.log("conectando...");
  await client.connect(mongo_url);
  console.log("conectado");
  }
  const db = client.database("plantillaGql");
  return db;
};

const db = await connectMongoDB();
console.info(`MongoDB plantillaGql connected`);

export const ProductCollection:Collection <ProductSchema> = db.collection<ProductSchema>("Products")
export const BrandCollection:Collection <BrandSchema> = db.collection<BrandSchema>("Brands")
export const StoreCollection:Collection <StoreSchema> = db.collection<StoreSchema>("Store")
export const EmployeeCollection:Collection <EmployeeSchema> = db.collection<EmployeeSchema>("Employees")