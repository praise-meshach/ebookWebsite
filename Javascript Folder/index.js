window.onload = () => {

    //  Hamburger Menu

    //Get Hamburger button and mobile menu
    const menuBtn = document.getElementById('menuBtn')
    const mobileMenu = document.getElementById('mobileMenu')

    //Checks elements exist befor using them
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            // Toggle menu open/ close
            menuBtn.classList.toggle('open')
            mobileMenu.classList.toggle('open')
        });
    }

    // Update Cart Total 
    function updateTotal() {

        //get all book checkboxes
        const checkboxes = document.querySelectorAll('.book-select')

        let total = 0;
        let count = 0;


        //loop through all checkboxes
        checkboxes.forEach(cb => {

            //only count check boxes
            if (cb.checked) {

                //get Quantity elements
                const footer = cb.closest('.book-footer')

                const qty = parseInt(
                    footer.querySelector('.qty-value').textContent
                );
                
                //Get book price from data attribute
                const price = parseFloat(cb.dataset.price)

                //add subtotal
                total += price * qty
                //add Quantity count
                count += qty
            }
        });

        //get total display elements
        const totalEl = document.getElementById('orderTotal')
        const countEl = document.getElementById('orderCount')
        const orderBar = document.getElementById('orderBar')

        //display total price
        if (totalEl) {
            totalEl.textContent = '£' + total.toFixed(2)
        }

        // display quantity count
        if (countEl) {
            countEl.textContent =
                count +
                (count === 1
                    ? ' book selected'
                    : ' books selected')
        }
        
        //show/hide order bar
        if (orderBar) {
            orderBar.classList.toggle('visible', count > 0)
        }
    }

    //  Quantity Buttons 

    //make function global so HTML can assess it
    window.changeQty = function(btn, delta) {

        //get quantity span
        const qtyEl =
            btn.parentElement.querySelector(".qty-value")

        let qty = parseInt(qtyEl.textContent)

        //increase/decrease quantity
        qty += delta;

        //prevent quantity below 1
        if (qty < 1) qty = 1

        //prevents quantity obove 100
        if (qty > 10) qty = 10
        
        //update quanty text
        qtyEl.textContent = qty

        //recalculates totals
        updateTotal()
    };

    //Checkbox Listeners

    //recalculates total when checkboxes changes
    document.querySelectorAll(".book-select").forEach(cb => {

        cb.addEventListener("change", updateTotal)
    });

    //  Proceed To Checkout
    window.proceedToCheckout = function() {

        const checkboxes =
            document.querySelectorAll(".book-select")

        const basket = [];

        //build basket array
        checkboxes.forEach(cb => {

            if (cb.checked) {

                //get quantity
                const qty = parseInt(
                    cb.closest(".book-footer")
                      .querySelector(".qty-value")
                      .textContent
                );

                //get price
                const price = parseFloat(cb.dataset.price)

                //add item to basket
                basket.push({
                    title: cb.dataset.title,
                    price: price,
                    qty: qty,
                    subtotal: parseFloat(
                        (price * qty).toFixed(2)
                    )
                });
            }
        });

        // prevent empty checkout
        if (basket.length === 0) {
            alert("Please select at least one book.")
            return;
        }

        // Save basket in sessionStorage
        sessionStorage.setItem(
            "basket",
            JSON.stringify(basket)
        );

        // calculate order total
        const total = basket.reduce(
            (sum, item) => sum + item.subtotal,
            0
        );

        //save total
        sessionStorage.setItem(
            "basketTotal",
            total.toFixed(2)
        );

        // go to payment page
        window.location.href = "pay.html"
    };

};