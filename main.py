from admin import adm_check_stock, adm_restock, check_stock
from customer import cst_display_stock, cst_purchase



## Need some dictionary / Key-Value data structure to represent Virtual Sodas.
### Ideally, design is fluent within HTML design as well
POP_info = {'description': 'An explosion of flavor that will knock your socks off!', 'price': 1, "maxQuantity": 100}
FIZZ_info = {'description':'An effervescent fruity experience with hints of grape and coriander','price': 1, "maxQuantity": 100}
COLA_info = {'description':'A basic no nonsense cola that is the perfect pick me up for any occasion.', 'price': 1, 'maxQuantity': 200}
MEGAPOP_info = {'description':'Not for the faint of heart. So flavorful and so invigorating, it shold probably be illegal.'}

SODAS = [FIZZ_info, POP_info, COLA_info, MEGAPOP_info] 
MACHINE_CASH = 100

# Variable to control the active state of the vending machine
run = True
# Main Loop
while run:
    
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
        
    # If user hits Exit
        # run = False