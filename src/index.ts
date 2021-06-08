import express from 'express';
import * as dotenv from "dotenv";
dotenv.config();
const ormconfig = require("./ormconfig");
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { UserResolver } from './Resolver/UserResolver';
import { createConnection } from 'typeorm';
import { PostResolver } from './Resolver/Posts';
import cors from "cors";

const main = async () => {

    const schema = await buildSchema({
      resolvers: [UserResolver, PostResolver]
    });
  
    const server = new ApolloServer({
      schema,
      context: ({req, res} : any) => ({ req, res})
    });
  
    const app = express();
    app.use(cookieParser());
    app.use(cors({
      credentials: true,
      origin:"http://localhost:3001"
    }));
  
    server.applyMiddleware({ app , cors: false});
    app.listen(4000, () => {
        console.log('Now browse to http://localhost:4000' + server.graphqlPath);
    });
};
createConnection(ormconfig).then(() => {
  console.log('Database Connected')
  main()
}).catch((e) => console.log(e))
