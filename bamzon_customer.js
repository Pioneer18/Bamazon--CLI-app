//inquirer creates user interface to the database
//mysql package for querying the sql database
var inquirer = require("inquirer");
var mysql = require("mysql");

//create the mysql connection
var connection = mysql.createConnection({
  host:"localhost",
  port:8889,
  user:"root",
  password:"root",
  database:"bamazon"
});

//connect to the db then start the inquirer to prompt user about how they
//would like to interact with the database
connection.connect(function(err){
  //note there is no data to pull here, just an err incase the connection fails
  if(err) throw err;
  //otherwise start questioning
  start(); //defined below
});

function start(){
  //1)what is the ID of the product they user would like to buy
  //2)How many units of product would the user like to purchase
  //===========================================================
  //*3)Once the user has placed order, check if the store has enough of the product
  //   If not enough log, insufficient quantity
  //4)However if there is enough, fulfill the customer's order (udpate stock to reflect remaining amount)
  //5)once it goes through, customer the total cost of their purchase
  inquirer
  .prompt([
      {
          name:"item_id",
          type:"input",
          message:"What is the ID of the product you would like to buy?",
          validate:function(value){
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
          message:"How many of the prdouct would you like to purchase?",
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
      queryProducts(answer);
  });
}

//=================================================================================
//Function to query the SELECT needed info from databse table then UPDATE the table

function queryProducts(answer){
  //query the `bamazon` databse for the product_name, stock_quantity,and price
  var query = "SELECT product_name,stock_quantity,price FROM products WHERE ?";
  connection.query(query, {item_id: answer.item_id}, function(err, results){
      console.log(results);
      console.log(answer.quantity);
      console.log("hey..");
      console.log(results[0].stock_quantity);
      if(err) throw err;
      //if stock quantity is < requested amount, tell customer what is available and ask them to make a new order
      if(results[0].stock_quantity < answer.quantity){
       console.log("There are only " + results[0].stock_quantity + "available units of " + results[0].product_name + "in stock.")
       console.log("Please make a new purchase not exceeding available inventory.");
       start();
      }
      else{
          //if there is enough, sell it! UPDATE the database to reflect the purchase
          //calculate the remaining stock_quantity
          var remainder = results[0].stock_quantity - answer.quantity;
          var cost = answer.quantity * results[0].price;
          var query = "UPDATE products SET ? WHERE ?";
          //set the stock quantity to the remainder where (on the row) customer selected id matches the item_id
          connection.query(query, {stock_quantity:remainder},{item_id:answer.item_id});
          console.log("you purchased " + answer.quantity + "units of " + results[0].product_name + "for $" + cost);
          start();
      }
  });
}



