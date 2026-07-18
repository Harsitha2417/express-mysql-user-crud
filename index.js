const { faker } = require('@faker-js/faker');//requireing faker package
const mysql = require('mysql2');//requireing mysql2
const express = require("express"); //requering express package
const app =express(); // Now express is a function provided by express package
// Here we are calling express function
const path = require("path");
const methodOverride = require("method-override");
const { get } = require('https');
const {v4:uuidv4} = require('uuid');
uuidv4();

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'learn_app',
  password:'Harsitha@_24'
}); //from mysql2 package


let  getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
} // from faker package

//Inserting NEW data
let q = "INSERT INTO user(id,username,email,password) VALUES ?";
//let users = [["123b","123_newUswerb","abc@gmail.comb","abcb"],["123c","123_newUswerc","abc@gmail.comc","abcc"]];
//we can instead write in a variable and pass

// To insert data in bulk
// let data = [];
// for(let i=1;i<=100;i++)
// {
//   data.push(getRandomUser());//100 fake user data is stored 
// }


//To count rows -- Home route
app.get("/",(req,res) =>//res - response, result - db's result
{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q,(err,result) => //connection.query("SHOW TABLES",(err,result) =>
{
    if(err) throw err;
   // console.log(result[0]["count(*)"]); // retriving the 0th element as the result is array and value using key
   let count = result[0]["count(*)"];
   res.render("home.ejs",{count});
});
}
catch(err)
{
    console.log(err);
    res.send("Some error in DB");
}
});

//Show route
app.get("/user",(req,res) =>
{
  let q = 'SELECT * FROM user';
  try{
    connection.query(q,(err,users) =>
    {
      if (err) throw err;
      // console.log(result);
      res.render("showusers.ejs",{ users });//{users} in this result is sent to showusers.ejs in form of an object
    });
  }
  catch(err)
  {
    console.log(err);
  res.send("Some error in db");
}
});

//EDIT Route
app.get("/user/:id/edit",(req,res) =>
{
  let { id } = req.params;
  let q = `SELECT *FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result) =>
    {
      if (err) throw err;
      // console.log(result); // console.log(result[0]);
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  }
  catch(err)
  {
    console.log(err);
  res.send("Some error in db");
}
});

//UPDATE Route
app.patch("/user/:id",(req,res) =>
{
  let { id } = req.params;
  let {password:formPass,username:newUsername}=req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result) =>
    {
      if (err) throw err;
      // console.log(result); // console.log(result[0]);
      let user = result[0];
      //  res.send(user);
       if(formPass != user.password)
       {
         res.send("Wrong password");
       }
       else{
        let q2=`UPDATE user SET username='${newUsername}' where id='${id}'`;
        connection.query(q2,(err,result)=>
        {
          if(err) throw err;
          res.redirect("/user");
        });
       }
    });
  }
  catch(err)
  {
    console.log(err);
  res.send("Some error in db");
}
});
//Add user Form
app.get("/user/new",(req,res)=>{
  res.render("Adduser.ejs");
});

//Add user
app.post("/user",(req,res)=>
{
   let {username:username,email:email,password:password} = req.body;
  let id=uuidv4();
  let q3=`INSERT INTO user VALUES ('${id}','${username}','${email}','${password}')`;
   try{
     connection.query(q3,(err,result) =>
     {
       if (err) throw err;
      res.redirect("/user");
     });
   }
   catch(err)
   {
     console.log(err);
   res.send("Some error in db");
 }
});

app.get("/user/:id/delete",(req,res)=>
{
  let { id } =req.params;
  console.log(id);
  res.render("Deleteuser.ejs",{ id });
});

app.delete("/user/:id",(req,res)=>
{
  let { id }=req.params;
  let { email: email,password:password}=req.body;
  let q4=`SELECT * FROM user where id='${id}'`;
  console.log(req.body);

  try{
     connection.query(q4,(err,result) =>
     {
       if (err) throw err;
       let user =result[0];

       if(email == user.email && password== user.password)
       {
        let q5=`DELETE FROM user where id='${id}'`;
        connection.query(q5,(err,result)=>
        {
          if(err) throw err;
          res.redirect("/user");
        })
       }
       else{
        res.send("Wrong information");
       }
     });
   }
   catch(err)
   {
     console.log(err);
   res.send("Some error in db");
 }
});

app.listen("8080",() =>
{
  console.log("App is listening to port 8080");
});

//connection.end(); //To end the connection
