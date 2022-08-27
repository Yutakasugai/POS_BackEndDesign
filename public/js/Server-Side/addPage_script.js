
function showHideRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10) {
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
}
function hideRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10) {
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
}

function showRow(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10) {
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
}

//swiper js
const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
});