import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './Resolver/UserResolver';
import { createConnection } from 'typeorm';
import { PostResolver } from './Resolver/Posts';

const main = async () => {

    const schema = await buildSchema({
      resolvers: [UserResolver, PostResolver]
    });
  
    const server = new ApolloServer({ schema });
  
    const app = express();
  
    server.applyMiddleware({ app });
  
    app.listen(4000, () => {
        console.log('Now browse to http://localhost:4000' + server.graphqlPath);
    });
};
createConnection().then(() => {
  console.log('Database Connected')
  main()
}).catch((e) => console.log(e))
//main()
