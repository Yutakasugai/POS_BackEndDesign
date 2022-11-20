const array_total = document.getElementById('array_total').value; 
const array_cash = document.getElementById('array_cash').value; 

// Each Input Values
const total_sales = document.getElementById('total-sale'); 
const total_tips = document.getElementById('total-tips'); 
const total_customers = document.getElementById('total-customers'); 
const total_cash = document.getElementById('total-cash'); 
const total_debit = document.getElementById('total-debit'); 

// array_total
for (let i = 0; i < array_total.split(',').length; i++) {
    // console.log(array_total.split(',')[i]); 
    let each_val = array_total.split(',')[i].split(':'); 

    if (each_val[1] !== 'None') {
        // get value 
        // console.log(each_val[0], each_val[1]); 

        if (each_val[0] === 'cash_total') {
            total_cash.innerHTML = each_val[1]; 

        } else if (each_val[0] === 'sale_total') {
            total_sales.innerHTML = each_val[1]; 

        } else if (each_val[0] === 'debit_total') {            
            total_debit.setAttribute('value', each_val[1]); 

        } else if (each_val[0] === 'tip_total') {
            total_tips.innerHTML = each_val[1]; 

        } else if (each_val[0] === 'customer_total') {
            total_customers.innerHTML = each_val[1]; 

        } 
    }
}

// array_cash
if (array_cash === 'None') {
    console.log('No inputs on cash yet...'); 

} else {
    for (let i = 0; i < array_cash.split(',').length; i++) {
        // console.log(array_cash.split(',')[i]); 
        let each_val_2 = array_cash.split(',')[i].split(':'); 
    
        if (each_val_2[1] !== '0') {
            // get value 
            if (each_val_2[0] === '100') {
                document.getElementById('hundred_cash').setAttribute('value', each_val_2[1]);
                
            } else if (each_val_2[0] === '50') {
                document.getElementById('fifty_cash').setAttribute('value', each_val_2[1]);
                
            } else if (each_val_2[0] === '20') {
                document.getElementById('twenty_cash').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '10') {
                document.getElementById('ten_cash').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '5') {
                document.getElementById('five_cash').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '2') {
                document.getElementById('toonie_coin').setAttribute('value', each_val_2[1]);
                
            } else if (each_val_2[0] === '1') {
                document.getElementById('loonie_coin').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '0.25') {
                document.getElementById('quater_cent').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '0.10') {
                document.getElementById('ten_cent').setAttribute('value', each_val_2[1]); 

            } else if (each_val_2[0] === '0.05') {
                document.getElementById('five_cent').setAttribute('value', each_val_2[1]); 

            }
        }
    }
}

// Result Button on server close 
const result_btn = document.getElementById('copy-btn'); 

result_btn.onclick = () => {

    // console.log(document.getElementById('hundred_cash').value);  
    const number_array = [
        `100:${document.getElementById('hundred_cash').value}`, 
        `50:${document.getElementById('fifty_cash').value}`, 
        `20:${document.getElementById('twenty_cash').value}`, 
        `10:${document.getElementById('ten_cash').value}`, 
        `5:${document.getElementById('five_cash').value}`, 
        `2:${document.getElementById('toonie_coin').value}`, 
        `1:${document.getElementById('loonie_coin').value}`, 
        `0.25:${document.getElementById('quater_cent').value}`, 
        `0.10:${document.getElementById('ten_cent').value}`, 
        `0.05:${document.getElementById('five_cent').value}`, 
    ]

    // Attach values
    document.getElementById('input-values').setAttribute('value', number_array.join(',')); 
    document.getElementById('debit_val').setAttribute('value', document.getElementById('total-debit').value); 
}

