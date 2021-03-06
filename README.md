# Bamazon--CLI-app
`Bamazon` is an Amazon-like storefront app that will take in orders from customers and deplete stock from the store's inventory. The User interacts with the app through the command line. 

Below is the intial state of the MySQL database table `bamazon`. After item_id there are four columns; product_name, department_name, price, and stock_quantity. The Video below is highlighting the intial `stock_quantities` of the items in the table. After the customer makes a purchase in the Bamazon-CLI-app, the databse will reflect the quantity purchased when refreshed. 

<img src="https://media.giphy.com/media/2UHfbd4EvILHHbRty1/giphy.gif" height="400" width="600">

When the application starts, it prompts the user for two things: 1)`The id of the item the user would like to purchase.` 2)`The quantity of the item that the user would like to purchase`. The user must manually enter the values and then press ENTER to view the results of their order.

<img src="https://media.giphy.com/media/mnqU3Rvv01RkY1eCvZ/giphy.gif" height="400" width="600">

When the `products` table is refreshed in the database manager (Dbeaver), the updated stock quantities reflect the user's purchase order. In this case the customer purchased 250 units of item 5 and 375 units of item 10. The stock_quantity of item 5 dropped from 945 to 695, and the stock_quantity of item 10 droped from 1,000 to 625.

<img src="https://media.giphy.com/media/oz5lXRmArozi1j323q/giphy.gif" height="400" width="600">

If the user orders a quantity of an item that is higher than the stock_quantity, the application will alert the user that their order is too large.

<img src="https://media.giphy.com/media/dtslwnPRjAss9L0QCl/giphy.gif" height="400" width="600">
