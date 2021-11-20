// const express = require("express")
//  const app = express();
//  const users=require("./users.json")

// app.use(express.json());



// app.listen(3434, function() {
//     console.log("listening on port 3434");
// })
/////////////////////////////////////////////////////////////////////////////////////////////////


const express = require("express");
const users = require("./users.json");

const app = express();

const logger = (req, res, next) => {
    req.name = {api_requested_by: "Gajanan Wattamwar"}
    // console.log(req.method);
    next();
}

 app.use(express.json());

//  app.get("/",(req,res)=>{
//     res.send({users});
//  })

app.post("/books",(req,res)=>{
    console.log(req.body)
    const newUsers=[...users ,req.body]
    res.send(newUsers);
})


app.patch("/books/:id", (req, res) => {
    console.log(req.params.id);
    const newUsers = users.map((user) => {
        if(+req.params.id === user.id){
            return req.body;
        }
        return user;
    });
    res.send(newUsers);
})

app.delete("/books/:id", (req, res) => {
    const newUsers = users.filter((user) => user.id !== +req.params.id);

    res.send(newUsers);
});


/////////////////////////////////////////////////////////////////////////////////////////
//with middleware

app.get("/books", logger, (req,res) => {
    let a = req.name;
    let books = users;
    res.send({a, books});
})


app.get("/:books/:id",logger,  (req, res) => {
    //console.log(req.params);
    let a = req.name;
    //console.log(a);
    const newUsers = users.map((user) => {
        if(Number(req.params.id) === Number(user.id)){
            books = user;
        }
        return user;
    });
    res.send({a, books});
})


app.listen(2334, function (){
    console.log("listening on port 2334");
});

