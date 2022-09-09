const ramen_addBtn = document.getElementById('ramen_addBtn'); 
const item_button = document.querySelectorAll('.modalButton'); 


// I could capture main item name from this function
$('button.modalButton').click(function(e) {
    //console.log(e);
    console.log(e.currentTarget.value);
    // console.log($(e.currentTarget));
});

// I could capture all results of preference lists from this function
var fav = [];
ramen_addBtn.onclick = () => {

    $.each($("input[name='pref_check']:checked"), function(){            
        fav.push($(this).val());
    });

    // console.log(fav); 
    for (let t = 0; t < fav.length; t++) {
        console.log(fav[t]); 
    }
}