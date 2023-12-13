## ADMIN FUNCTIONS

# Check Stock
def adm_check_stock():
    
    # This function is called from the Admin HTTP API
    # Function should return to the admin:
    # Each soda and its description, current price, quantity, and maxQuantity.
     
    raise NotImplementedError

def adm_restock(sodaName, restockQuantity):
    
    # This Function is called from the Admin HTTP API
    # Function takes from the API:
    # The Soda name and amount of stock to add to the machine
    # Its important here to check the stock of the machine already
    # to ensure that there is enough room for the desired restock quanitity.
    
    raise NotImplementedError

def check_stock(SodaName, restockQuanitity):
    
    # Function to be used in adm_Restock
    # Func. will check if desired soda has enough room for restock amount
    # Return True / False
    
    raise NotImplementedError