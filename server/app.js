const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect("mongodb://127.0.0.1:27017/graphql-playlist",{ useNewUrlParser: true ,useUnifiedTopology:true});
mongoose.connection.once("open",()=>{
    console.log("connected to db");
})
const app = express();

app.use(cors());
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(5000,()=>{
    console.log(`server is running on 5000`);
})