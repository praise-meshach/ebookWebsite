window.onload = () => {

    //Hamburger Menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    // Toggle mobile menu
    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            menuBtn.classList.toggle("open")
            mobileMenu.classList.toggle("open")

        });
    }

    //Load Data From sessionStorage 
    const basket =
        JSON.parse(
            sessionStorage.getItem("basket") || "[]"
        );

    const basketTotal =
        sessionStorage.getItem("basketTotal") || '0.00'

    const last4 =
        sessionStorage.getItem("last4") || "****"

    // Display Card Info 
    const cardInfo =
        document.getElementById("cardInfo");

    if (cardInfo) {

        cardInfo.textContent = 
            "Your credit card number ends in " +
            `**** **** **** ${last4}`
    }

    // Display Total Chnaged
    const successTotal =
        document.getElementById("successTotal");

    if (successTotal) {

        successTotal.textContent =
            '£' + basketTotal;
    }

    //Display Purchased Books 
    const orderEl =
        document.getElementById("successOrder");

    if (orderEl && basket.length > 0) {

        basket.forEach(item => {

            const row = document.createElement("div")

            row.className = "summary-row";

            row.innerHTML = `
                <span>${item.title} × ${item.qty}</span>
                <span>£${item.subtotal.toFixed(2)}</span>
            `;

            orderEl.appendChild(row);
        });
    }

    //Clear sessionStorage
    sessionStorage.removeItem("basket");
    sessionStorage.removeItem("basketTotal");
    sessionStorage.removeItem("last4");

};

