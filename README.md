# VirtualVendingMachine
An Itential Job Interview Project. A Virtual Vending Machine for ColaCo with purchasing and restocking functionality and more.

## Background
You’ve been contracted by ColaCo to build a virtual vending machine for their new line of
virtual sodas. Virtual sodas, for “reasons”, are hard to create so currently there are limited
quantities and varieties available. At the time of launch, there will be 4 different varieties of
virtual soda that your machine needs to vend, but the engineering team is working hard to
launch additional flavors later this year. Each soda has a unique cost and available quantity.
ColaCo’s sales team has tentatively set these prices but might need to adjust them based on
how well the product sells. Marketing has also requested the ability to change the prices during
set promotional windows.

## Project Requirements
- Webpage that acts as UI for customers to buy 'virtual soda' with look and feel of real vending machine.
- On purchase, the browser will download a JSON soda file. I.E. if a 'Cola' is purchased, the machine will download the "Cola" File.
- Some representation of Money
- HTTP API for admin to check stock levels, and restock invetory
- Inventory is not always restocked all at once
- Also need access to price updates
- Fully stocked machine needs to have all sodas, prices, and quantities available

## Restrictions
- Must use NodeJS, Python, or Go for Backend.
- HTML, CSS, and any other Javascript framework allowed for frontend


## Soda Lineup
Product Name: Fizz
- Description: An effervescent fruity experience with hints of grape and coriander.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 100

Product Name: Pop
- Description: An explosion of flavor that will knock your socks off!
- Cost: 1 dollar US
- Maximum Quantity available to Vend: 100

Product Name: Cola
- Description: A basic no nonsense cola that is the perfect pick me up for any occasion.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 200

Product Name: Mega Pop
- Description: Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 50

# How it works:

## Launch

For the backend of my vending machine project, I decided to use Python. To get started, I downloaded the following packages:
- Flask
- Requests

To run the vending machine, first clone the repo and install the require packages, and then CD into the virtualVendingMachine directory and run: 'python main.py'

This should start the dev server flask web framework.
That should be all that is required to run the vending machine!

To make a purchase:
- First insert your current balance
- Next, use the selection buttons to make your selection
- All done! Your Soda file will be downloaded and your change is included in the file!

# Backend

Flask is the web framework I used in order to be able to connect the frontend and backend using API calls. Requests is a package also used for the front to back communications, which helped me with API formatting, and handling the return responses.



I followed two different self created standards for the API calls. The calls that an Admin would use to restock, reprice, or check the stock of the vending machine is prefaced with the '/admin' keyword. Here are the calls, and their body structures.

## Admin Restock
- /api/admin/restock
{
    'sodaName': 'exampleSoda', //string
    'restockQuantity': 00 //int
}
This call is used by an admin to restock the machine. It takes in the name of the soda and the quantity that is desired to restock. The function takes in both values, ensures that the amount totals under the maximum allowed, and then completes the restock in the stock.json file.

## Admin Reprice
- api/admin/price_change
{
    'sodaName': 'exampleSoda', //string
    'newPrice': 00 //int
}
This call is used to change the price of a soda in the machine. It simply takes the new price and changes it inside the stock.json.

## Customer Display Stock
- api/display_stock
This is a GET method and has no body to the API call. The function simply takes in the most recent version of the stock.json file and breaks it into its major components to be sent to the HTML page.

## Customer Purchase
-api/customer_purchase
{
    'sodaName': 'exampleSoda',
}
This is a POST method that sends the name of the desired soda to the function, which checks to make sure that the customer has enough balance to pay for the drink, and then it checks to make sure the vending machine has enough sodas to dispense to the customer.

# Frontend

The file titled "machine.html" is the frontfacing UI of the vending machine. The HTML page itself is very simple, being broken up mostly into <div> that are styled specifically to look like the classic vending machine we are all used to. There are a few function calls on some onclick button events. They are connected to the main.js file.

The main.js file is the functionality of the HTML page. Here we have a few functions that I will describe. 

## admin_mode
A function to toggle the state of the admin access panel from off to on.

## close_admin
A function to toggle the state of the admin access panel from on to off.

## add_balance
Takes in the credit amount from the money panel and adds the amount to the customers balance.

## clear_code
A function used to clear the selection screen code and set it back to the default 'OO'

## code_change
A function used to add and compare code letters to the selection code. When a full code is entered (2 digits) it is checked to make sure it is valid, and then the correct soda is purchased.

## restock
This function first detecks which input field we are getting input from of the 4 soda restock slots in the admin access panel. It then places the correct API call with the restock quantity information into the server to be handled by the backend.

## change_price
A very similar function to the restock function. Placing an API call after detecting the correct input slot. 

## enter_purchase
This is where the valid entered code is handled. It is first read and then the desired soda is dispense and the Enjoy code is read.

## query_stock
A function that is used to set the variables and elementID of all the used information on the front page of the vending machine. For instance the current stock values and prices of each kind of soda involved in the currect stock.

## Purchase Soda
A function again very similar to the restock and change_price functions. I detects the correct soda that is desired, subtracts the price from the customers balance. and then sends the API call to the server to be handled by the backend.
