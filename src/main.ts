import { ApolloServer } from "npm:@apollo/server@^4.1";
import { startStandaloneServer } from "npm:@apollo/server@^4.1/standalone";
import "https://deno.land/x/dotenv/load.ts";

import {Mutation} from "./graphql/resolvers/mutation.ts";
import {typeDefs} from "./graphql/types.ts";
import { Query } from "./graphql/resolvers/query.ts";
import { Brand } from "./graphql/resolvers/brand.ts";
import { Product } from "./graphql/resolvers/product.ts";
import { Store } from "./graphql/resolvers/store.ts";

const resolvers = {
    Mutation,
    Query,
    Brand,
    Product,
    Store
} 
const server = new ApolloServer({
   typeDefs,
   resolvers,
});
const _port = Deno.env.get("PORT")

const { url } = await startStandaloneServer(server, {
    listen: { port:_port },
});

console.log(`server running on: ${url}`);