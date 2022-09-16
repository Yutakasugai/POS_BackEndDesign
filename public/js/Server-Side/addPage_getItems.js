const ramen_addBtn = document.getElementById('ramen_addBtn'); 
const item_button = document.querySelectorAll('.modalButton'); 

// Array to pack item and preference
var item_container = []

// I could capture main item name from this function
$('button.modalButton').click(function(e) {

    // console.log(e.currentTarget.value);

    item_container.push(e.currentTarget.value)
});

// I could capture all results of preference lists from this function
ramen_addBtn.onclick = () => {

    // check if the required options is chcked or not 
    // if (document.getElementById("rich_soup").checked === false && document.getElementById("regular_soup").checked === false){
        
    //     document.getElementById('soup_container').style.background = '#f56c77'; 
    // } else {

    //     document.getElementById('soup_container').style.background = 'transparent'; 
    // }

    if (item_container[0] === "Cold"){

        console.log("This is cold"); 

    } else if (item_container[0] === "Shrimp") {

        console.log("This is shrimp"); 

    } else {

        // Capture the chashu and soup values and combine them with each other
        var result = ''
        $.each($("input[name='pref_must']:checked"), function(){            
            // item_container.push($(this).val());
            result = result + this.value; 
        });

        item_container.push(result);

        // Capture other pref options 
        $.each($("input[name='pref_others']:checked"), function(){            
            item_container.push($(this).val());
        });

        $.each($("h1[name='addTop_count']"), function(){            

            if ($(this).text() > 0) {

                let addTop_result = ('+' + $(this).text() + '{' + $(this).attr('addTop'));
                item_container.push(addTop_result);
            }
        });

        $.each($("input[name='remove_check']:checked"), function(){

            item_container.push($(this).val());
        })

        console.log(item_container); 

        // Insert this array to the hidden input to keep 
        const item_input = document.getElementById('added_item'); 

        item_input.setAttribute('value', item_container); 

    }
    
}