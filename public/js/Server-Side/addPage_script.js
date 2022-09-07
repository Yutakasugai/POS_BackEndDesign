function showHideRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11) {
    $("#" + row1).toggle();
    $("#" + row2).toggle();
    $("#" + row3).toggle();
    $("#" + row4).toggle();
    $("#" + row5).toggle();
    $("#" + row6).toggle();
    $("#" + row7).toggle();
    $("#" + row8).toggle();
    $("#" + row9).toggle();
    $("#" + row10).toggle();
    $("#" + row11).toggle();
}
function hideRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11) {
    $("#" + row1).hide();
    $("#" + row2).hide();
    $("#" + row3).hide();
    $("#" + row4).hide();
    $("#" + row5).hide();
    $("#" + row6).hide();
    $("#" + row7).hide();
    $("#" + row8).hide();
    $("#" + row9).hide();
    $("#" + row10).hide();
    $("#" + row11).hide();
}

function showRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11) {
    $("#" + row1).show();
    $("#" + row2).show();
    $("#" + row3).show();
    $("#" + row4).show();
    $("#" + row5).show();
    $("#" + row6).show();
    $("#" + row7).show();
    $("#" + row8).show();
    $("#" + row9).show();
    $("#" + row10).show();
    $("#" + row11).show();
}


// test function for ramen row 
const ramen_row = document.getElementById('ramen_row');
const top_row = document.getElementById('top_row'); 
const set_row = document.getElementById('set_row'); 
const set_A_row = document.getElementById('set_A_row'); 
const set_B_row = document.getElementById('set_B_row'); 
const side_dish_row = document.getElementById('side_dish_row'); 
const dri_des_row = document.getElementById('dri_des_row'); 
const vege_ramen_row = document.getElementById('row_vege'); 
const vege_ramen_btn = document.getElementById('vegeModal'); 

// Response top menu button
top_row.onclick = () => {

    ramen_row.setAttribute('checkID_ramen', 'close'); 
    set_row.setAttribute('checkID_set', 'close');
    set_A_row.setAttribute('checkID_setA', 'close'); 
    set_B_row.setAttribute('checkID_setB', 'close'); 
    side_dish_row.setAttribute('checkID_side', 'close'); 
    dri_des_row.setAttribute('checkID_drink', 'close'); 
    vege_ramen_row.setAttribute('checkID_vege', 'close'); 
    vege_ramen_btn.style.background = '#ebebeb'; 


    // Back to default row list
    showRow('ramen_row', 'set_row', 'side_dish_row', 'topping_row', 'dri_des_row');
    hideRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
    hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
    hideRow('set_A_row', 'set_B_row');
    hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA', 'row_shrimpSA', 'row_hotMisoSA', 'row_currySA', 'row_vegeSA', 'row_tomatoSA');
    hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB', 'row_shrimpSB', 'row_hotMisoSB', 'row_currySB', 'row_vegeSB', 'row_tomatoSB');
    hideRow('row_side1', 'row_side2', 'row_side3', 'row_side4', 'row_side5', 'row_side6', 'row_side7', 'row_side8', 'row_side9', 'row_side10');
    hideRow('row_top1', 'row_top2', 'row_top3', 'row_top4', 'row_top5', 'row_top6', 'row_top7', 'row_top8', 'row_top9', 'row_top10');
    hideRow('dessert_row', 'soft_drink_row', 'beer_row'); 
    hideRow('macha_ice');
    hideRow('cola', 'sprite', 'ice_tea');
    hideRow('asahi', 'sapporo', 'kokanee');
}

// Response ramen button
ramen_row.onclick = () => {

    if (ramen_row.getAttribute('checkID_ramen') === 'close'){

        // Flip the check_id panel from close to open
        ramen_row.setAttribute('checkID_ramen', 'open'); 

        showRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold')
        hideRow('set_row', 'side_dish_row', 'topping_row', 'dri_des_row')

    } else {
        // Flip the check_id panel from open to close
        ramen_row.setAttribute('checkID_ramen', 'close'); 

        showRow('ramen_row', 'set_row', 'side_dish_row', 'topping_row', 'dri_des_row');
        hideRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
        hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
        hideRow('set_A_row', 'set_B_row')
        hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA', 'row_shrimpSA', 'row_hotMisoSA', 'row_currySA', 'row_vegeSA', 'row_tomatoSA');
        hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB', 'row_shrimpSB', 'row_hotMisoSB', 'row_currySB', 'row_vegeSB', 'row_tomatoSB');
        hideRow('row_side1', 'row_side2', 'row_side3', 'row_side4', 'row_side5', 'row_side6', 'row_side7', 'row_side8', 'row_side9', 'row_side10');
        hideRow('row_top1', 'row_top2', 'row_top3', 'row_top4', 'row_top5', 'row_top6', 'row_top7', 'row_top8', 'row_top9', 'row_top10');
        hideRow('dessert_row', 'soft_drink_row', 'beer_row'); 
        hideRow('macha_ice');
        hideRow('cola', 'sprite', 'ice_tea');
        hideRow('asahi', 'sapporo', 'kokanee');
    }
}

// Response set menu
set_row.onclick = () => {

    if (set_row.getAttribute('checkID_set') === 'close'){

        set_row.setAttribute('checkID_set', 'open'); 

        showRow('set_A_row', 'set_B_row'); 
        hideRow('ramen_row', 'side_dish_row', 'topping_row', 'dri_des_row');
        //hideRow('set_row','ramen_row', 'side_dish_row', 'topping_row', 'dri_des_row')
    
    } else {

        set_row.setAttribute('checkID_set', 'close'); 

        showRow('ramen_row', 'set_row', 'side_dish_row', 'topping_row', 'dri_des_row');
        hideRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
        hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
        hideRow('set_A_row', 'set_B_row')
        hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA', 'row_shrimpSA', 'row_hotMisoSA', 'row_currySA', 'row_vegeSA', 'row_tomatoSA');
        hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB', 'row_shrimpSB', 'row_hotMisoSB', 'row_currySB', 'row_vegeSB', 'row_tomatoSB');
        hideRow('row_side1', 'row_side2', 'row_side3', 'row_side4', 'row_side5', 'row_side6', 'row_side7', 'row_side8', 'row_side9', 'row_side10');
        hideRow('row_top1', 'row_top2', 'row_top3', 'row_top4', 'row_top5', 'row_top6', 'row_top7', 'row_top8', 'row_top9', 'row_top10');
        hideRow('dessert_row', 'soft_drink_row', 'beer_row'); 
        hideRow('macha_ice');
        hideRow('cola', 'sprite', 'ice_tea');
        hideRow('asahi', 'sapporo', 'kokanee');
    }
}

// Response Set A Button 
set_A_row.onclick = () => {

    if (set_A_row.getAttribute('checkID_setA') === 'close'){

        set_A_row.setAttribute('checkID_setA', 'open'); 

        showRow('row_misoSA', 'row_shoyuSA', 'row_shioSA');
        hideRow('set_B_row', 'set_row');

    } else {

        set_A_row.setAttribute('checkID_setA', 'close'); 

        showRow('set_row','set_A_row', 'set_B_row'); 
        hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA');
    }
}

// Response Set A Button 
set_B_row.onclick = () => {

    if (set_B_row.getAttribute('checkID_setB') === 'close'){

        set_B_row.setAttribute('checkID_setB', 'open'); 

        showRow('row_misoSB', 'row_shoyuSB', 'row_shioSB');
        hideRow('set_A_row', 'set_row');

    } else {

        set_B_row.setAttribute('checkID_setB', 'close'); 

        showRow('set_row','set_B_row', 'set_A_row'); 
        hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB');
    }
}

// Response Side Dish Button 
side_dish_row.onclick = () => {

    if(side_dish_row.getAttribute('checkID_side') === 'close'){

        side_dish_row.setAttribute('checkID_side', 'open'); 

        showRow('row_side1', 'row_side2', 'row_side3', 'row_side4','row_side5');
        hideRow('ramen_row', 'set_row', 'topping_row', 'dri_des_row');

    } else {

        side_dish_row.setAttribute('checkID_side', 'close');
        
        showRow('ramen_row', 'set_row', 'side_dish_row', 'topping_row', 'dri_des_row');
        hideRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
        hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
        hideRow('set_A_row', 'set_B_row')
        hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA', 'row_shrimpSA', 'row_hotMisoSA', 'row_currySA', 'row_vegeSA', 'row_tomatoSA');
        hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB', 'row_shrimpSB', 'row_hotMisoSB', 'row_currySB', 'row_vegeSB', 'row_tomatoSB');
        hideRow('row_side1', 'row_side2', 'row_side3', 'row_side4', 'row_side5', 'row_side6', 'row_side7', 'row_side8', 'row_side9', 'row_side10');
        hideRow('row_top1', 'row_top2', 'row_top3', 'row_top4', 'row_top5', 'row_top6', 'row_top7', 'row_top8', 'row_top9', 'row_top10');
        hideRow('dessert_row', 'soft_drink_row', 'beer_row'); 
        hideRow('macha_ice');
        hideRow('cola', 'sprite', 'ice_tea');
        hideRow('asahi', 'sapporo', 'kokanee');
    }
}

// Response drink button 
dri_des_row.onclick = () => {

    if(dri_des_row.getAttribute('checkID_drink') === 'close'){
        
        dri_des_row.setAttribute('checkID_drink', 'open'); 

        showRow('soft_drink_row', 'beer_row'); 
        hideRow('ramen_row', 'set_row', 'side_dish_row', 'side_dish_row', 'topping_row')
    
    } else {

        dri_des_row.setAttribute('checkID_drink', 'close');
        
        showRow('ramen_row', 'set_row', 'side_dish_row', 'topping_row', 'dri_des_row');
        hideRow('row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
        hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
        hideRow('set_A_row', 'set_B_row')
        hideRow('row_misoSA', 'row_shoyuSA', 'row_shioSA', 'row_shrimpSA', 'row_hotMisoSA', 'row_currySA', 'row_vegeSA', 'row_tomatoSA');
        hideRow('row_misoSB', 'row_shoyuSB', 'row_shioSB', 'row_shrimpSB', 'row_hotMisoSB', 'row_currySB', 'row_vegeSB', 'row_tomatoSB');
        hideRow('row_side1', 'row_side2', 'row_side3', 'row_side4', 'row_side5', 'row_side6', 'row_side7', 'row_side8', 'row_side9', 'row_side10');
        hideRow('row_top1', 'row_top2', 'row_top3', 'row_top4', 'row_top5', 'row_top6', 'row_top7', 'row_top8', 'row_top9', 'row_top10');
        hideRow('dessert_row', 'soft_drink_row', 'beer_row'); 
        hideRow('macha_ice');
        hideRow('cola', 'sprite', 'ice_tea');
        hideRow('asahi', 'sapporo', 'kokanee');
    } 
}

// Response Vegetable Ramen Button
vege_ramen_row.onclick = () => {

    if (vege_ramen_row.getAttribute('checkID_vege') === 'close'){

        vege_ramen_row.setAttribute('checkID_vege', 'open'); 
        vege_ramen_btn.style.background = 'yellow'; 

        showRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato'); 
        hideRow('ramen_row', 'row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_tomato', 'row_soup', 'row_cold')
    
    } else {

        vege_ramen_row.setAttribute('checkID_vege', 'close'); 
        vege_ramen_btn.style.background = '#ebebeb'; 

        showRow('ramen_row', 'row_miso', 'row_shoyu', 'row_shio', 'row_shrimp', 'row_hotMiso', 'row_curry', 'row_vege', 'row_tomato', 'row_soup', 'row_cold');
        hideRow('vege_shoyu', 'vege_shio', 'vege_miso', 'vege_hot', 'vege_tomato');
    }
}