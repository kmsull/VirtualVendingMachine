# To build the python backened and allow for HTTP API calls, we will use the Flask web framework
from flask import Flask, jsonify, request
import json

app = Flask(__name__)

with open('stock.json') as f:
    current_soda_stock = json.load(f)

print(current_soda_stock)

## ADMIN FUNCTIONS

# Check Stock
# API Definition to check stock
@app.route('/api/admin/check_stock', methods=['GET'])
def adm_check_stock():
    
    # This function is called from the Admin HTTP API
    # Function should return to the admin:
    # Each soda and its description, current price, quantity, and maxQuantity.
     
    with open('stock.json') as f:
        current_soda_stock = json.load(f)    
    return jsonify(current_soda_stock)

# API Definition to restock machine
@app.route('/api/admin/restock', methods=['POST'])
def adm_restock():
    
    # This Function is called from the Admin HTTP API
    # Function takes from the API:
    # The Soda name and amount of stock to add to the machine
    # Its important here to check the stock of the machine already
    # to ensure that there is enough room for the desired restock quanitity.
    
    with open('stock.json') as f:
        current_soda_stock = json.load(f)
    
    incoming = request.json
    sodaName = incoming["sodaName"]
    restockQuantity = incoming["restockQuantity"]
    maxRestock = current_soda_stock[sodaName]["maxQuantity"]
    available = current_soda_stock[sodaName]["available"]
    
    if available + restockQuantity <= maxRestock:
        current_soda_stock[sodaName]["available"] += restockQuantity
    
    with open('stock.json', 'w') as f:
        json.dump(current_soda_stock, f)
    
    return jsonify(current_soda_stock)

## Customer Functions

@app.route('/api/display_stock', methods=['GET'])
def cst_display_stock():
    with open('stock.json') as f:
        current_soda_stock = json.load(f)    
    return jsonify(current_soda_stock)




@app.route('/api/customer_purchase', methods=['POST'])
def cst_purchase():
    
    # 
        
    with open('stock.json') as f:
        current_soda_stock = json.load(f)
    
    incoming = request.json
    sodaName = incoming["sodaName"]
    if current_soda_stock[sodaName]["available"] != 0:
        current_soda_stock[sodaName]["available"] -= 1
    with open('stock.json', 'w') as f:
        json.dump(current_soda_stock, f)
    
    return jsonify(current_soda_stock)
    



## Need some dictionary / Key-Value data structure to represent Virtual Sodas.
### Ideally, design is fluent within HTML design as well


MACHINE_CASH = 100



if __name__ == '__main__':
    with app.app_context():
        app.run(debug=True)
        

    # Function to display current stock { Soda/Desc/Price/Quant }
    
    
    # Get User Input
        # Customer or admin function
        
        # If Customer
            # Ask Current Balance
                # Machine accepts 1, 2, 5, 10
            # Make Selection
            
            # Machine checks stock
            
            # Provide Soda JSON
            
            # Provide the customer with their new balance
            
        # If Admin
            # Ask for selection
                # Restock or Check Stock
            # If restock:
                # ask for Soda Name and restock quantity
                # adm_restock
            # If Checkstock:
                # adm_checkstock
        