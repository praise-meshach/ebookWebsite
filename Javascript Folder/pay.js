
window.onload = () => {

    //Hamburger Menu
    const menuBtn = document.getElementById("menuBtn")
    const mobileMenu = document.getElementById("mobileMenu")

     // Toggle menu 
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("open")
            mobileMenu.classList.toggle("open")
        });
    }

    //Load Basket
    const basket =
        JSON.parse(sessionStorage.getItem("basket") || "[]")

    const basketTotal =
        sessionStorage.getItem("basketTotal") || "0.00"

    // Redirect if empty basket
    if (basket.length === 0) {
        window.location.href = "index.html"
        return;
    }

    // Display Order Summary
    const summaryItems =
        document.getElementById("summaryItems")

    // add purchased books to summary
    if (summaryItems) {

        basket.forEach(item => {

            const row = document.createElement("div")

            row.className = "summary-row"

            row.innerHTML = `
                <span>${item.title} × ${item.qty}</span>
                <span>£${item.subtotal.toFixed(2)}</span>
            `

            summaryItems.appendChild(row)
        });
    }

    // Display Totals
    const summaryTotal =
        document.getElementById("summaryTotal")

    const payTotal =
        document.getElementById("payTotal")

    if (summaryTotal) {
        summaryTotal.textContent = '£' + basketTotal
    }

    if (payTotal) {
        payTotal.textContent = '£' + basketTotal
    }

    //Payment Submission
    const btn = document.getElementById("btn")

    if (btn) {

        //submit payment
        btn.addEventListener("click", (e) => {
            
            //prevent form reload
            e.preventDefault()

        // get form value
        const cc = document.getElementById("cc").value

        const m = document.getElementById("m").value

        const y = document.getElementById("y").value

        const cvv = document.getElementById("cvv").value


        //Validate card number
        const cc_reg = /^5[1-5][0-9]{14}$/
        if(!cc.match(cc_reg)) {
            alert("Invalid card number")
            location.reload()
            return(1)
        }
         // ── CVV Validation ──
        const cvv_reg = /^[0-9]{3,4}$/

        if (!cvv_reg.test(cvv)) {

            alert("Invalid security code")
            location.reload()
            return;
            }
        
    
        //validate expiry date
        const t = new Date()
        t_m = t.getMonth() + 1 // JavaScript months: 0-11
        t_y = t.getUTCFullYear()


        //checks expired card
        if(y < t_y || ( y == t_y && m - 1 < t_m)) {
            document.getElementById("error").textContent = "Invalid date"
            return;
         }

        //Payment Data
        const data ={
            "master_card": cc,
            "exp_year": y,
            "exp_month": m,
            "cvv_code": cvv
        }
        const url="https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"

        // Send Payment Request
        fetch(url,{
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) =>{
            //successful payment
            if(response.status === 200){
                return response.json();
                //Bad request
            }else if (response.status === 400){
                throw "Bad data was sent to the server"
            }else{
                //other server error
                throw "Something went wrong"
            }
        })
        .then((resJson)=>{
            // Get last 4 digits 
            const last4 = cc.slice(-4)


            //save card digits
            sessionStorage.setItem("last4", last4)

            // redirect to to success page
            window.location.href = "success.html"
        })

        //display error
        .catch((error) => {
            alert(error)
        });
        
    })

}
}
