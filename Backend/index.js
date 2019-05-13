const express=require('express');
const graphqlHTTP=require('express-graphql');
const schema=require('./schema/schema.js');
const mongoose=require('mongoose');
const cors=require('cors')

const app=express()

//allow cross origin request
app.use(cors());

mongoose.connect('mongodb://canvas:canvas12@ds239682.mlab.com:39682/canvas')
mongoose.connection.once('open',()=>{
    console.log("Connected to mLab for graphql")
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql    :   true 
}))


app.listen(4000,()=>{
    console.log("Listening all requests on port 4000");
})
