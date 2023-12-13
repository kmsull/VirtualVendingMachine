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
Webpage that acts as UI for customers to buy 'virtual soda' with look and feel of real vending machine.
On purchase, the browser will download a JSON soda file. I.E. if a 'Cola' is purchased, the machine will download the "Cola" File.
Some representation of Money
HTTP API for admin to check stock levels, and restock invetory
Inventory is not always restocked all at once
Also need access to price updates
Fully stocked machine needs to have all sodas, prices, and quantities available

## Restrictions
Must use NodeJS, Python, or Go for Backend.
HTML, CSS, and any other Javascript framework allowed for frontend


## Soda Lineup
- Product Name: Fizz
- Description: An effervescent fruity experience with hints of grape and coriander.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 100

- Product Name: Pop
- Description: An explosion of flavor that will knock your socks off!
- Cost: 1 dollar US
- Maximum Quantity available to Vend: 100

- Product Name: Cola
- Description: A basic no nonsense cola that is the perfect pick me up for any occasion.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 200

- Product Name: Mega Pop
- Description: Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.
- Cost: 1 dollar US
- Maximum Quantity available to vend: 50

