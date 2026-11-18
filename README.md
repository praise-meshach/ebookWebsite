# ebookWebsite
Created a responsive library shop for desktop and mobile. Automated multi-item selection and total-cost calculation in JavaScript, and secured checkout with a payment page using API-based card validation.

Test:
The intention behind the web page is that a user will put in their credit card details. The user will then 
click on “Continue” and the credit card number (in this case, “Mastercard”) will be checked by a 
JavaScript code. Amongst other things this JavaScript code will check (1) the total number of entered 
digits for credit cards is 16, and  (2) the MasterCard number starting with 51, 52, 53, 54, or 55, (3) the 
card is not expired, (4) the total number of digits for security code is 3 or 4.  If the JavaScript check is 
unsatisfied, users are asked to re-fill in the form. On passing validation, use JavaScript to send a POST 
request to the server (https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard). The server expects raw 
JSON to be sent in the following format:          
          {           
                    “master_card”: 5222123456781234,          
                        “exp_year”: 2025,          
                        “exp_month”: 11,         
                    “cvv_code”: “089”          
          }         
