function XXX () {
    ///
}

function queryStock() {
    fetch("http://127.0.0.1:5000/api/display_stock", {
        method: 'GET'
    }).then(response => response.json()).then(data => {
            // data is the json structure
            console.log(data)
            const popAvail = data.Pop.available
            const colaAvail = data.Cola.available
            const megaAvail = data.MegaPop.available
            const fizzAvail = data.Fizz.available
            const popPrice = data.Pop.price
            const colaPrice = data.Cola.price
            const fizzPrice = data.Fizz.price
            const megaPrice = data.MegaPop.price
            document.getElementById("popAvail").innerText = popAvail
            document.getElementById("colaAvail").innerText = colaAvail
            document.getElementById("megaAvail").innerText = megaAvail
            document.getElementById("fizzAvail").innerText = fizzAvail
            document.getElementById("popPrice").innerText = popPrice
            document.getElementById("colaPrice").innerText = colaPrice
            document.getElementById("fizzPrice").innerText = fizzPrice
            document.getElementById("megaPrice").innerText = megaPrice
    });
}

function purchase_cola () {
    /// Function to send API call to purchase a cola
    /// Need to download sodafile.json
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
    queryStock();
    location.reload;
}

function purchase_pop () {
    /// Function to send API call to purchase a pop
    /// Need to download sodafile.json
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
    queryStock();
    location.reload;
}

function purchase_fizz () {
    /// Function to send API call to purchase a fizz
    /// Need to download sodafile.json
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
    queryStock();
    location.reload;
}

function purchase_megapop () {
    /// Function to send API call to purchase a megapop
    /// Need to download sodafile.json
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
    queryStock();
    location.reload;
}