DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT(10) NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(100)NULL,
 department_name VARCHAR(100)NULL,
 price DECIMAL(10,2) NULL,
 stock_quantity INT(10)NULL,
 PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("MCP73837 PCM","Electronics",1.19,500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("4.7uF Capacitor","Electronics",0.14,1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("10nF Capacitor","Electronics",0.08,1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("250 ohm Resistor","Electronics",0.10,1000);



