// Capture all status from t-1 to t-8
const ts_1 = document.getElementById('t-1').value; 
const ts_2 = document.getElementById('t-2').value; 
const ts_3 = document.getElementById('t-3').value; 
const ts_4 = document.getElementById('t-4').value; 
const ts_5 = document.getElementById('t-5').value; 
const ts_6 = document.getElementById('t-6').value; 
const ts_7 = document.getElementById('t-7').value; 
const ts_8 = document.getElementById('t-8').value; 

if (ts_1 === 'filled') {
    $('button#stBtn_1').prop('disabled', true); 
} else {
    $('button#stBtn_1').prop('disabled', false);
}

if (ts_2 === 'filled') {
    $('button#stBtn_2').prop('disabled', true); 
} else {
    $('button#stBtn_2').prop('disabled', false);
}

if (ts_3 === 'filled') {
    $('button#stBtn_3').prop('disabled', true); 
} else {
    $('button#stBtn_3').prop('disabled', false);
}

if (ts_4 === 'filled') {
    $('button#stBtn_4').prop('disabled', true); 
} else {
    $('button#stBtn_4').prop('disabled', false);
}

if (ts_5 === 'filled') {
    $('button#stBtn_5').prop('disabled', true); 
} else {
    $('button#stBtn_5').prop('disabled', false);
}

if (ts_6 === 'filled') {
    $('button#stBtn_6').prop('disabled', true); 
} else {
    $('button#stBtn_6').prop('disabled', false);
}

if (ts_7 === 'filled') {
    $('button#stBtn_7').prop('disabled', true); 
} else {
    $('button#stBtn_7').prop('disabled', false);
}

if (ts_8 === 'filled') {
    $('button#stBtn_8').prop('disabled', true); 
} else {
    $('button#stBtn_8').prop('disabled', false);
}


// console.log(ts_1, ts_2, ts_3, ts_4, ts_5, ts_6, ts_7, ts_8); 