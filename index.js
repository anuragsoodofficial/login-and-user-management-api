require('dotenv/config');
const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const isAuth = require('./src/middleware/auth.mw');
const schema = require('./src/graphql/index.gql');
const server = new ApolloServer({ schema });

const app = express();
const PORT = process.env.PORT;
const db = process.env.DB_CONNECTION_STRING;

// Connect to MongoDB with Mongoose.
mongoose
  .connect(
    db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(isAuth);
app.use(
  "/pr/v1",
  expressGraphQL({
    schema,
    graphiql: true
  })
);
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));