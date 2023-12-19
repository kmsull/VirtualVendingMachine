function XXX () {
    ///
}

// Function to toggle admin  panel from on to off
function admin_mode () {
    document.getElementById('adminAccess').style.display = 'block';
    document.getElementById('overlay').style.display = "block";
    document.getElementById('adminButton').style.display = "none"
}

// Function to toggle admin  panel from off to on
function close_admin () {
    document.getElementById('adminAccess').style.display = 'none';
    document.getElementById('overlay').style.display = "none";
    document.getElementById('adminButton').style.display = "block"
}

// Function to add credit to the customers balance when money is 'inserted'
function add_balance (payment) {
    customerBalance += payment
    document.getElementById("customerBalance").innerText = customerBalance
    purchaseCode = "OO"
    document.getElementById("purchaseCode").innerText = purchaseCode
}

// If the clear button is clicked, the machines purchase code is reset
function clear_code () {
    purchaseCode = "OO"
    document.getElementById("purchaseCode").innerText = purchaseCode
}

// When a selection button is puched, the correct code is added to the purchase code and evaulated
function code_change (code) {
    allowed_codes = ["A1", "A2", "B1", "B2"]
    
    if (purchaseCode.length < 2 || purchaseCode == "OO" || purchaseCode == "Invalid | Try Again") {
        if (purchaseCode == "OO" || purchaseCode == "Invalid | Try Again") {
            purchaseCode = code
            document.getElementById("purchaseCode").innerText = purchaseCode
        } else {
            purchaseCode  = purchaseCode.concat(code)
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
    }
    
}

// When the admin uses the restock button, this function is called to add the desired amount
// to the machine stock, as long as there is space in the slot for the restock quantity
function restock(sodaName) {
    // determine the input feild being used
    if (sodaName == "Cola") {
        restockInput = document.getElementById("restockInputCola")
        restockQty = restockInput.value
        restockQty = parseInt(restockQty)
    }
    if (sodaName == "Pop") {
        restockInput = document.getElementById("restockInputPop")
        restockQty = restockInput.value
        restockQty = parseInt(restockQty)
    }
    if (sodaName == "Fizz") {
        restockInput = document.getElementById("restockInputFizz")
        restockQty = restockInput.value
        restockQty = parseInt(restockQty)
    }
    if (sodaName == "MegaPop") {
        restockInput = document.getElementById("restockInputMegaPop")
        restockQty = restockInput.value
        restockQty = parseInt(restockQty)
    }
    if (sodaName == "Cola" && restockQty <= (colaMax-colaAvail)) {
        // Create the POST API call body
        const cola_data = {
            'sodaName':'Cola',
            'restockQuantity': restockQty
        }
        // POST API call executed
        fetch('http://127.0.0.1:5000/api/admin/restock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
            }).catch(error => {console.error('Error:', error);
        });
        // update the page variables to match the database variables
        colaAvail += restockQty
        document.getElementById("colaAvail").innerText = colaAvail
        document.getElementById("adminColaAvail").innerText = colaAvail
        numRestock += 1
        document.getElementById("numRestock").innerText = numRestock
        // repeat for other sodas
    } if (sodaName == "Pop" && restockQty <= (popMax-popAvail)) {
        const cola_data = {
            'sodaName':'Pop',
            'restockQuantity': restockQty
        }
        fetch('http://127.0.0.1:5000/api/admin/restock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
    
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
                // checking for a response
            }).catch(error => {console.error('Error:', error);
        });
        popAvail += restockQty
        document.getElementById("popAvail").innerText = popAvail
        document.getElementById("adminPopAvail").innerText = popAvail
        numRestock += 1
        document.getElementById("numRestock").innerText = numRestock
    }  if (sodaName == "Fizz" && restockQty <= (fizzMax-fizzAvail)) {
        const cola_data = {
            'sodaName':'Fizz',
            'restockQuantity': restockQty
        }
    
        fetch('http://127.0.0.1:5000/api/admin/restock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
    
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
                // checking for a response
            }).catch(error => {console.error('Error:', error);
        });
        fizzAvail += restockQty
        document.getElementById("fizzAvail").innerText = fizzAvail
        document.getElementById("adminFizzAvail").innerText = fizzAvail
        numRestock += 1
        document.getElementById("numRestock").innerText = numRestock
    }  if (sodaName == "MegaPop" && restockQty <= (megaMax-megaAvail)) {
        const cola_data = {
            'sodaName':'MegaPop',
            'restockQuantity': restockQty
        }
        fetch('http://127.0.0.1:5000/api/admin/restock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
    
            },
            body: JSON.stringify(cola_data)
            }).then(response => {

            }).catch(error => {console.error('Error:', error);
        });
        megaAvail += restockQty
        document.getElementById("megaAvail").innerText = megaAvail
        document.getElementById("adminMegaAvail").innerText = megaAvail
        numRestock += 1
        document.getElementById("numRestock").innerText = numRestock
    }
    restockInput.value = ''
}

// When the purchase button is pushed, the code that is entered is evaluated to 
// provide the customer with the right soda information
function enter_purchase () {
    var defaultCode = "OO"
    if (purchaseCode.localeCompare("A1") == 0) {
        // if the code is a match,
        // set the soda name
        sodaName = "Cola"
        // set the purchase code to a fun message!
        purchaseCode = "Cola! Enjoy!"
        // execute the API calls and update the variables
        // and download the soda file!
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
        // Same for other soda
    } else if (purchaseCode.localeCompare("A2") == 0) {
        sodaName = "Pop"
        purchaseCode = "Pop! Enjoy!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else if (purchaseCode.localeCompare("B1") == 0) {
        sodaName = "Fizz"
        purchaseCode = "Fizz! Enjoy!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else if (purchaseCode.localeCompare("B2") == 0) {
        sodaName = "MegaPop"
        purchaseCode = "MegaPop! Enjoy!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else {
        // If the code is not a valid code, then retry
        purchaseCode = "Invalid | Try Again"
        document.getElementById("purchaseCode").innerText = purchaseCode
    }
}

// When the admin used the reprice button, the price entered in the field is posted to the database
// and the price on the machine is changed as well
function change_price (sodaName) {
    if (sodaName == "Cola") {
        // if the sodaFeild being used is this soda
        priceChangeInput = document.getElementById('priceChangeInputCola')
        newPrice =  priceChangeInput.value
        newPrice = parseInt(newPrice)
        // update the new price,
        // and format the API body to make the POST call to the server
        const cola_data = {
            'sodaName':'Cola',
            'newPrice': newPrice
        }
        fetch('http://127.0.0.1:5000/api/admin/price_change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
            }).catch(error => {console.error('Error:', error);
        });
        // update the page variables
        colaPrice = newPrice
        document.getElementById("colaPrice").innerText = colaPrice
    }  if (sodaName == "Pop") {
        priceChangeInput = document.getElementById('priceChangeInputPop')
        newPrice =  priceChangeInput.value
        newPrice = parseInt(newPrice)
        const cola_data = {
            'sodaName':'Pop',
            'newPrice': newPrice
        }
        fetch('http://127.0.0.1:5000/api/admin/price_change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
            }).catch(error => {console.error('Error:', error);
        });
        popPrice = newPrice
        document.getElementById("popPrice").innerText = popPrice
    }  if (sodaName == "Fizz") {
        priceChangeInput = document.getElementById('priceChangeInputFizz')
        newPrice =  priceChangeInput.value
        newPrice = parseInt(newPrice)
        const cola_data = {
            'sodaName':'Fizz',
            'newPrice': newPrice
        }
        fetch('http://127.0.0.1:5000/api/admin/price_change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
            }).catch(error => {console.error('Error:', error);
        });
        fizzPrice = newPrice
        document.getElementById("fizzPrice").innerText = fizzPrice
    }  if (sodaName == 'MegaPop') {
        priceChangeInput = document.getElementById('priceChangeInputMegaPop')
        newPrice =  priceChangeInput.value
        newPrice = parseInt(newPrice)
        const cola_data = {
            'sodaName':'MegaPop',
            'newPrice': newPrice
        }
        fetch('http://127.0.0.1:5000/api/admin/price_change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(cola_data)
            }).then(response => {
            }).catch(error => {console.error('Error:', error);
        });
        megaPrice = newPrice
        document.getElementById("megaPrice").innerText = megaPrice
    }
    priceChangeInput.value = ''
}

// when the "change button is requested, the customer balance is reset
function clear_balance () {
    customerBalance = 0
    document.getElementById("customerBalance").innerText = customerBalance
}

// When a soda file is purchased, the sodas information is added to a file,
// and the customers balance is added to the file as well as change
function download_soda_file() {
    if (purchaseCode == "Cola! Enjoy!") {
        // The contents of the file
        const jsonData = {
            "sodaName": "Cola",
            "Description": "A basic no nonsense cola that is the perfect pick me up for any occasion.",
            "CustomerChange": "$" + customerBalance

            }
        // file name
        const fileName = 'Cola.json';
        // stringify the data into the file, allowing for 2 indent spaces in the structure
        const jsonString = JSON.stringify(jsonData, null, 2);
        // create a binary large object to store the data
        const blob = new Blob([jsonString], { type: 'application/json' });
        // now we create a <a> element on the page 
        const a = document.createElement('a');
        // put the reference data in the <a> as the blob
        a.href = URL.createObjectURL(blob);
        // tell the element to use the filename when downloading
        a.download = fileName;
        document.body.appendChild(a);
        // click the element to start the download
        a.click();
        // remove the <a> element and reset the customer balance
        document.body.removeChild(a);
        customerBalance = 0
        document.getElementById("customerBalance").innerText = customerBalance
    }
    // repeat for other sodas
    if (purchaseCode == "Pop! Enjoy!") {
        const jsonData = {
            "sodaName": "Pop",
            "Description": "An explosion of flavor that will knock your socks off!",
            "CustomerChange": "$" + customerBalance

            }
        const fileName = 'Pop.json';
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        customerBalance = 0
        document.getElementById("customerBalance").innerText = customerBalance
    }
    if (purchaseCode == "Fizz! Enjoy!") {
        const jsonData = {
            "sodaName": "Fizz",
            "Description": "An effervescent fruity experience with hints of grape and coriander.",
            "CustomerChange": "$" + customerBalance

            }
        const fileName = 'Fizz.json';
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        customerBalance = 0
        document.getElementById("customerBalance").innerText = customerBalance
    }
    if (purchaseCode == "MegaPop! Enjoy!") {
        const jsonData = {
            "sodaName": "MegaPop",
            "Description": "Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.",
            "CustomerChange": "$" + customerBalance

            }
        const fileName = 'MegaPop.json';
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        customerBalance = 0
        document.getElementById("customerBalance").innerText = customerBalance
    }
    
}

// Function that takes all the inital values of the machine stock from stock.json
// and updates the HTML variables
function query_stock() {
    fetch("http://127.0.0.1:5000/api/display_stock", {
        method: 'GET'
    }).then(response => response.json()).then(data => {
            // Data is the JSON structure
            
            // Reset the customer Balance on refresh
            customerBalance = 0.00
            

            // Query the 'server' for the current stock of the machine
            // Pop Soda info
            popAvail = data.Pop.available
            popPrice = data.Pop.price
            popMax = data.Pop.maxQuantity
            // Cola Soda Info
            colaAvail = data.Cola.available
            colaPrice = data.Cola.price
            colaMax = data.Cola.maxQuantity
            // Megapop Soda Info
            megaAvail = data.MegaPop.available
            megaPrice = data.MegaPop.price
            megaMax = data.MegaPop.maxQuantity
            // Fizz Soda Info
            fizzAvail = data.Fizz.available           
            fizzPrice = data.Fizz.price
            fizzMax = data.Fizz.maxQuantity

            // Declare all the element ID's so the HTML knows the values to reference
            document.getElementById("popAvail").innerText = popAvail
            document.getElementById("colaAvail").innerText = colaAvail
            document.getElementById("megaAvail").innerText = megaAvail
            document.getElementById("fizzAvail").innerText = fizzAvail

            // Declare Available ID 2 times to be displayed on the Admin panel
            // Without inheriting the hidden attribute
            document.getElementById("adminPopAvail").innerText = popAvail
            document.getElementById("adminColaAvail").innerText = colaAvail
            document.getElementById("adminFizzAvail").innerText = fizzAvail
            document.getElementById("adminMegaAvail").innerText = megaAvail

            document.getElementById("popPrice").innerText = popPrice
            document.getElementById("colaPrice").innerText = colaPrice
            document.getElementById("fizzPrice").innerText = fizzPrice
            document.getElementById("megaPrice").innerText = megaPrice

            document.getElementById("fizzMax").innerText = fizzMax
            document.getElementById("megaMax").innerText = megaMax
            document.getElementById("colaMax").innerText = colaMax
            document.getElementById("popMax").innerText = popMax
            
            // Gather Info for the Admin access panel as well
            machineBalance = data.AdminInfo.balance
            numPurchases = data.AdminInfo.purchases 
            numRestock = data.AdminInfo.times_restock

            // Declare their element ID's
            document.getElementById("machineBalance").innerText = machineBalance
            document.getElementById("numPurchases").innerText = numPurchases
            document.getElementById("numRestock").innerText = numRestock
            document.getElementById("customerBalance").innerText = customerBalance

            // Set purchase Code to empty string
            purchaseCode = "OO"
            document.getElementById("purchaseCode").innerText = purchaseCode
    }); 
}


// Function that when a soda is purchases, commits the purchase API call to the server
// and updates the stock.json information
function purchase_soda (sodaName) {
    if (sodaName == "Cola") {
        // if the soda requested is cola
        if (customerBalance >= colaPrice) {
            // if the customer has enough money to make the purchase
            customerBalance -= colaPrice
            document.getElementById("customerBalance").innerText = customerBalance
            machineBalance += colaPrice
            document.getElementById("machineBalance").innerText = machineBalance
            numPurchases += 1
            document.getElementById("numPurchases").innerText = numPurchases
            // generate the json api body
            const cola_data = {
                'sodaName':'Cola'
            }
            // make the API fetch call
            fetch('http://127.0.0.1:5000/api/customer_purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
        
                },
                body: JSON.stringify(cola_data)
                }).then(response => {
                }).catch(error => {console.error('Error:', error);
            });
            // subtract one from the available sodas in the machine.
            colaAvail = colaAvail - 1
            document.getElementById("colaAvail").innerText = colaAvail

        } else {
            // if the customer does not have enough money, then ask for credit imn
            purchaseCode = "Insert Credit"
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
        
    } 
    if (sodaName == "Pop") {
        if (customerBalance >= popPrice) {
            customerBalance -= popPrice
            document.getElementById("customerBalance").innerText = customerBalance
            machineBalance += popPrice
            document.getElementById("machineBalance").innerText = machineBalance
            numPurchases += 1
            document.getElementById("numPurchases").innerText = numPurchases
            const cola_data = {
                'sodaName':'Pop'
            }
        
            fetch('http://127.0.0.1:5000/api/customer_purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    
                },
                body: JSON.stringify(cola_data)
                }).then(response => {
                }).catch(error => {console.error('Error:', error);
            });
            popAvail -= 1
            document.getElementById("popAvail").innerText = popAvail
        } else {
            purchaseCode = "Insert Credit"
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
    }
    if (sodaName == "Fizz") {
        if (customerBalance >= fizzPrice) {
            customerBalance -= fizzPrice
            document.getElementById("customerBalance").innerText = customerBalance
            machineBalance += fizzPrice
            document.getElementById("machineBalance").innerText = machineBalance
            numPurchases += 1
            document.getElementById("numPurchases").innerText = numPurchases
            const cola_data = {
                'sodaName':'Fizz'
            }
    
            fetch('http://127.0.0.1:5000/api/customer_purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    
                },
                body: JSON.stringify(cola_data)
                }).then(response => {
                }).catch(error => {console.error('Error:', error);
            });
            fizzAvail -= 1
            document.getElementById("fizzAvail").innerText = fizzAvail
        } else {
            purchaseCode = "Insert Credit"
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
    }   
    if (sodaName == "MegaPop") {
        if (customerBalance >= megaPrice) {
            customerBalance -= megaPrice
            machineBalance += megaPrice
            document.getElementById("machineBalance").innerText = machineBalance
            document.getElementById("customerBalance").innerText = customerBalance
            numPurchases += 1
            document.getElementById("numPurchases").innerText = numPurchases
            const cola_data = {
                'sodaName':'MegaPop'
            }
    
            fetch('http://127.0.0.1:5000/api/customer_purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    
                },
                body: JSON.stringify(cola_data)
                }).then(response => {
                }).catch(error => {console.error('Error:', error);
            });
            megaAvail -= 1
            document.getElementById("megaAvail").innerText = megaAvail
        } else {
            purchaseCode = "Insert Credit"
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
    }
    

}