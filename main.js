function XXX () {
    ///
}

function admin_mode () {
    document.getElementById('adminAccess').style.display = 'block';
    document.getElementById('overlay').style.display = "block";
    document.getElementById('adminButton').style.display = "none"
}

function close_admin () {
    document.getElementById('adminAccess').style.display = 'none';
    document.getElementById('overlay').style.display = "none";
    document.getElementById('adminButton').style.display = "block"
}

function add_balance (payment) {
    customerBalance += payment
    document.getElementById("customerBalance").innerText = customerBalance
    purchaseCode = "OO"
    document.getElementById("purchaseCode").innerText = purchaseCode
}

function clear_code () {
    purchaseCode = "OO"
    document.getElementById("purchaseCode").innerText = purchaseCode
}

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

function enter_purchase () {
    
    if (purchaseCode.localeCompare("A1") == 0) {
        sodaName = "Cola"
        purchaseCode = "ENJOY! Press clr"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else if (purchaseCode.localeCompare("A2") == 0) {
        sodaName = "Pop"
        purchaseCode = "ENJOY!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else if (purchaseCode.localeCompare("B1") == 0) {
        sodaName = "Fizz"
        purchaseCode = "ENJOY!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else if (purchaseCode.localeCompare("B2") == 0) {
        sodaName = "MegaPop"
        purchaseCode = "ENJOY!"
        purchase_soda(sodaName)
        document.getElementById("purchaseCode").innerText = purchaseCode
    } else {
        purchaseCode = "Invalid | Try Again"
        document.getElementById("purchaseCode").innerText = purchaseCode
    }
}

function download_soda_file(sodaName) {

}

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
            console.log(fizzAvail)

            // Declare all the element ID's so the HTML knows the values to reference
            document.getElementById("popAvail").innerText = popAvail
            document.getElementById("colaAvail").innerText = colaAvail
            document.getElementById("megaAvail").innerText = megaAvail
            document.getElementById("fizzAvail").innerText = fizzAvail

            // Declare Available ID 2 times to be displayed on the Admin panel
            // Without inheriting the hidden attribute
            document.getElementById("adminPopAvail").innerText = popAvail
            document.getElementById("adminColaAvail").innerText = popAvail
            document.getElementById("adminFizzAvail").innerText = popAvail
            document.getElementById("adminMegaAvail").innerText = popAvail

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

function purchase_soda (sodaName) {
    if (sodaName == "Cola") {
        if (customerBalance >= colaPrice) {
            customerBalance -= colaPrice
            document.getElementById("customerBalance").innerText = customerBalance
            const cola_data = {
                'sodaName':'Cola'
            }
        
            fetch('http://127.0.0.1:5000/api/customer_purchase', {
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
            colaAvail = colaAvail - 1
            document.getElementById("colaAvail").innerText = colaAvail
        } else {
            purchaseCode = "Insert Credit"
            document.getElementById("purchaseCode").innerText = purchaseCode
        }
    } 
    if (sodaName == "Pop") {
        if (customerBalance >= popPrice) {
            customerBalance -= popPrice
            document.getElementById("customerBalance").innerText = customerBalance
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
                    // checking for a response
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
                    // checking for a response
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
        if (customerBalance >= fizzPrice) {
            customerBalance -= fizzPrice
            machineBalance += fizzPrice
            document.getElementById("machineBalance").innerText = machineBalance
            document.getElementById("customerBalance").innerText = customerBalance
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
                    // checking for a response
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

function purchase_cola () {
    /// Function to send API call to purchase a cola
    /// Need to download sodafile.json
    
}

function purchase_pop () {
    /// Function to send API call to purchase a pop
    /// Need to download sodafile.json
    
}

function purchase_fizz () {
    /// Function to send API call to purchase a fizz
    /// Need to download sodafile.json
    
}

function purchase_megapop () {
    /// Function to send API call to purchase a megapop
    /// Need to download sodafile.json
    
}