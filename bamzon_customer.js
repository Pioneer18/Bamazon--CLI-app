//inquirer creates client interface to the database
//mysql package for querying the sql database
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk");
var log = console.log;

//create the mysql connection
var connection = mysql.createConnection({
  host:"localhost",
  port:8889,
  user:"root",
  password:"root",
  database:"bamazon"
});

//connect to the db then start the inquirer to prompt client about how they
//would like to interact with the database
connection.connect(function(err){
  //note there is no data to pull here, just an err incase the connection fails
  if(err) throw err;
  //otherwise start questioning
  start(); //defined below
});

function start(){
  //1)what is the ID of the product that the client would like to buy
  //2)How many units of product would the client like to purchase
  //===========================================================
  //*3)Once the client has placed order, check if the store has enough of the product. If not enough log, insufficient quantity
  //4)However if there is enough, fulfill the client's order (udpate stock to reflect remaining amount)
  //5)once it goes through,  show the total cost of the purchase to the client
  console.log("===================================================================================================================================" + 
  "\nnew session: Welcome to Bamazon")
  console.log("enter EXIT to exit the application");
  inquirer
  .prompt([
      {
          name:"item_id",
          type:"input",
          message:"What is the ID of the product you would like to buy?",
          validate:function(value){
              if(value === "EXIT"){
                  //this will terminate the node.js process
                  process.exit();
              }
              if(isNaN(value) === false){
                  return true;
              }
              //console.log("please enter a valid number");
              return false;
          }
      },
      {
          name:"quantity",
          type:"input",
          message:"How many units of the prdouct would you like to purchase?",
          validate:function(value){
              if(isNaN(value) === false){
              return true;
              }
              //console.log("please enter a valid number");
              return false;
          }
      }
  ]).then(function(answer){
      //call the function to query the table
      var query = "SELECT product_name,stock_quantity,price FROM products WHERE ?";
      connection.query(query, {item_id: answer.item_id}, function(err, results){
          //if the query fails throw an error
          if(err) throw err;
          //grab the stock quantity from the table and check if it is less than the client's requested amount,
          //if it is alert the client and instruct them to make a new order of the available stock quantity
          if(results[0].stock_quantity < answer.quantity){
              log(chalk.bold.rgb(255,0,0)("There are only " + results[0].stock_quantity + " available units of " + results[0].product_name + " in stock."));
              log(chalk.bold.rgb(255,0,0)("Please make a new purchase not exceeding available inventory."));
          }
          else{
          //if there is enough, sell it! UPDATE the database to reflect the purchase
          //Bind the remaining stock_quantity to variable `remainder` to update the products table
          //Bind the variable `cost` to the total cost of the client's purchase, display this value to the client
          var remainder = results[0].stock_quantity - answer.quantity;
          var cost = answer.quantity * results[0].price;
          var query = "UPDATE products SET ? WHERE ?";
          //set the stock quantity to the remainder where (on the row) client selected id matches the item_id
          connection.query(query, [{stock_quantity:remainder},{item_id:answer.item_id}]);
          console.log("you purchased " + answer.quantity + " units of " + results[0].product_name + " for $" + cost);
          start();
         }
      });
      
    });
}

//=================================================================================
//Function to query the SELECT needed info from databse table then UPDATE the table




