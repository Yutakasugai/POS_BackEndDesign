const misoModal = document.getElementById('misoModal');
const shoyuModal = document.getElementById('shoyuModal');
const shioModal = document.getElementById('shioModal');
const shrimpModal = document.getElementById('shrimpModal');
const hotMisoModal = document.getElementById('hotMisoModal');
const curryModal = document.getElementById('curryModal');
const vegeModal = document.getElementById('vegeModal');
const tomatoModal = document.getElementById('tomatoModal');

const misoSA_Modal = document.getElementById('misoSA_Modal');
const shoyuSA_Modal = document.getElementById('shoyuSA_Modal');
const shioSA_Modal = document.getElementById('shioSA_Modal');

const misoSB_Modal = document.getElementById('misoSB_Modal');
const shoyuSB_Modal = document.getElementById('shoyuSB_Modal');
const shioSB_Modal = document.getElementById('shioSB_Modal');

//close ramen  modal from the preference mdal page
document.querySelector('#close_ramen_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'none';
});

document.querySelector('#close_addToppings_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'none';
});

document.querySelector('#close_removeItems_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'none';
});

//miso
misoModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shoyu
shoyuModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shio
shioModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shrimp
shrimpModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//Hot Miso
hotMisoModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//curry
curryModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//Vegetable
vegeModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//tomato
tomatoModal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});


// SET A

//miso A
misoSA_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shoyu A
shoyuSA_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

// SET B

//miso B
misoSB_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shoyu B
shoyuSB_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});

//shio B
shioSB_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg').style.display = 'block';
  document.querySelector('.modal_bg').classList.add('bg-active');
});



// Topping counter button
// for Beans
let beans_decreaseBtn = document.getElementById('beans_decrease');
let beans_increaseBtn = document.getElementById('beans_increase'); 
let beans_counter = document.getElementById('beans_counter');
let beans_count = 0;

// - btn: Increase num of topping 
beans_decreaseBtn.addEventListener('click', () => {
  beans_count --; 
  beans_counter.innerHTML = beans_count; 
  if(beans_count < 0) {
    beans_count = 0;
    beans_counter.innerHTML = beans_count; 
  } else {
    beans_counter.innerHTML = beans_count; 
  }
})
// + btn: Decrease num of topping
beans_increaseBtn.addEventListener('click', () => {
  beans_count ++; 
  beans_counter.innerHTML = beans_count;
  if(beans_count >= 11) {
    beans_count = 0;
    beans_counter.innerHTML = beans_count; 
  } else {
    beans_counter.innerHTML = beans_count; 
  }
})

// Topping counter button
// for Eggs
let eggs_decreaseBtn = document.getElementById('eggs_decrease');
let eggs_increaseBtn = document.getElementById('eggs_increase'); 
let eggs_counter = document.getElementById('eggs_counter');
let eggs_count = 0;

// - btn: Increase num of topping 
eggs_decreaseBtn.addEventListener('click', () => {
  eggs_count --; 
  eggs_counter.innerHTML = eggs_count; 
  if(eggs_count < 0) {
    eggs_count = 0;
    eggs_counter.innerHTML = eggs_count; 
  } else {
    eggs_counter.innerHTML = eggs_count; 
  }
})
// + btn: Decrease num of topping
eggs_increaseBtn.addEventListener('click', () => {
  eggs_count ++; 
  eggs_counter.innerHTML = eggs_count;
  if(eggs_count >= 11) {
    eggs_count = 0;
    eggs_counter.innerHTML = eggs_count; 
  } else {
    eggs_counter.innerHTML = eggs_count; 
  }
})

// Topping counter button
// for Belly
let belly_decreaseBtn = document.getElementById('belly_decrease');
let belly_increaseBtn = document.getElementById('belly_increase'); 
let belly_counter = document.getElementById('belly_counter');
let belly_count = 0;

// - btn: Increase num of topping 
belly_decreaseBtn.addEventListener('click', () => {
  belly_count --; 
  belly_counter.innerHTML = belly_count; 
  if(belly_count < 0) {
    belly_count = 0;
    belly_counter.innerHTML = belly_count; 
  } else {
    belly_counter.innerHTML = belly_count; 
  }
})
// + btn: Decrease num of topping
belly_increaseBtn.addEventListener('click', () => {
  belly_count ++; 
  belly_counter.innerHTML = belly_count;
  if(belly_count >= 11) {
    belly_count = 0;
    belly_counter.innerHTML = belly_count; 
  } else {
    belly_counter.innerHTML = belly_count; 
  }
})


// Topping counter button
// for Shoulder
let shoulder_decreaseBtn = document.getElementById('shoulder_decrease');
let shoulder_increaseBtn = document.getElementById('shoulder_increase'); 
let shoulder_counter = document.getElementById('shoulder_counter');
let shoulder_count = 0;

// - btn: Increase num of topping 
shoulder_decreaseBtn.addEventListener('click', () => {
  shoulder_count --; 
  shoulder_counter.innerHTML = shoulder_count; 
  if(shoulder_count < 0) {
    shoulder_count = 0;
    shoulder_counter.innerHTML = shoulder_count; 
  } else {
    shoulder_counter.innerHTML = shoulder_count; 
  }
})
// + btn: Decrease num of topping
shoulder_increaseBtn.addEventListener('click', () => {
  shoulder_count ++; 
  shoulder_counter.innerHTML = shoulder_count;
  if(shoulder_count >= 11) {
    shoulder_count = 0;
    shoulder_counter.innerHTML = shoulder_count; 
  } else {
    shoulder_counter.innerHTML = shoulder_count; 
  }
})

// Topping counter button
// for S.Cake
let sCake_decreaseBtn = document.getElementById('sCake_decrease');
let sCake_increaseBtn = document.getElementById('sCake_increase'); 
let sCake_counter = document.getElementById('sCake_counter');
let sCake_count = 0;

// - btn: Increase num of topping 
sCake_decreaseBtn.addEventListener('click', () => {
  sCake_count --; 
  sCake_counter.innerHTML = sCake_count; 
  if(sCake_count < 0) {
    sCake_count = 0;
    sCake_counter.innerHTML = sCake_count; 
  } else {
    sCake_counter.innerHTML = sCake_count; 
  }
})
// + btn: Decrease num of topping
sCake_increaseBtn.addEventListener('click', () => {
  sCake_count ++; 
  sCake_counter.innerHTML = sCake_count;
  if(sCake_count >= 11) {
    sCake_count = 0;
    sCake_counter.innerHTML = sCake_count; 
  } else {
    sCake_counter.innerHTML = sCake_count; 
  }
})

// Topping counter button
// for Wakame
let wakame_decreaseBtn = document.getElementById('wakame_decrease');
let wakame_increaseBtn = document.getElementById('wakame_increase'); 
let wakame_counter = document.getElementById('wakame_counter');
let wakame_count = 0;

// - btn: Increase num of topping 
wakame_decreaseBtn.addEventListener('click', () => {
  wakame_count --; 
  wakame_counter.innerHTML = wakame_count; 
  if(wakame_count < 0) {
    wakame_count = 0;
    wakame_counter.innerHTML = wakame_count; 
  } else {
    wakame_counter.innerHTML = wakame_count; 
  }
})
// + btn: Decrease num of topping
wakame_increaseBtn.addEventListener('click', () => {
  wakame_count ++; 
  wakame_counter.innerHTML =wakame_count;
  if(wakame_count >= 11) {
    wakame_count = 0;
    wakame_counter.innerHTML = wakame_count; 
  } else {
    wakame_counter.innerHTML = wakame_count; 
  }
})

// Topping counter button
// for Nori
let nori_decreaseBtn = document.getElementById('nori_decrease');
let nori_increaseBtn = document.getElementById('nori_increase'); 
let nori_counter = document.getElementById('nori_counter');
let nori_count = 0;

// - btn: Increase num of topping 
nori_decreaseBtn.addEventListener('click', () => {
  nori_count --; 
  nori_counter.innerHTML = nori_count; 
  if(nori_count < 0) {
    nori_count = 0;
    nori_counter.innerHTML = nori_count; 
  } else {
    nori_counter.innerHTML = nori_count; 
  }
})
// + btn: Decrease num of topping
nori_increaseBtn.addEventListener('click', () => {
  nori_count ++; 
  nori_counter.innerHTML =nori_count;
  if(nori_count >= 11) {
    nori_count = 0;
    nori_counter.innerHTML = nori_count; 
  } else {
    nori_counter.innerHTML = nori_count; 
  }
})

// Topping counter button
// for G. Onion
let gOni_decreaseBtn = document.getElementById('gOni_decrease');
let gOni_increaseBtn = document.getElementById('gOni_increase'); 
let gOni_counter = document.getElementById('gOni_counter');
let gOni_count = 0;

// - btn: Increase num of topping 
gOni_decreaseBtn.addEventListener('click', () => {
  gOni_count --; 
  gOni_counter.innerHTML = gOni_count; 
  if(gOni_count < 0) {
    gOni_count = 0;
    gOni_counter.innerHTML = gOni_count; 
  } else {
    gOni_counter.innerHTML = gOni_count; 
  }
})
// + btn: Decrease num of topping
gOni_increaseBtn.addEventListener('click', () => {
  gOni_count ++; 
  gOni_counter.innerHTML = gOni_count;
  if(gOni_count >= 11) {
    gOni_count = 0;
    gOni_counter.innerHTML = gOni_count; 
  } else {
    gOni_counter.innerHTML = gOni_count; 
  }
})

// Topping counter button
// for Cheese
let cheese_decreaseBtn = document.getElementById('cheese_decrease');
let cheese_increaseBtn = document.getElementById('cheese_increase'); 
let cheese_counter = document.getElementById('cheese_counter');
let cheese_count = 0;

// - btn: Increase num of topping 
cheese_decreaseBtn.addEventListener('click', () => {
  cheese_count --; 
  cheese_counter.innerHTML = cheese_count; 
  if(cheese_count < 0) {
    cheese_count = 0;
    cheese_counter.innerHTML = cheese_count; 
  } else {
    cheese_counter.innerHTML = cheese_count; 
  }
})
// + btn: Decrease num of topping
cheese_increaseBtn.addEventListener('click', () => {
  cheese_count ++; 
  cheese_counter.innerHTML =cheese_count;
  if(cheese_count >= 11) {
    cheese_count = 0;
    cheese_counter.innerHTML = cheese_count; 
  } else {
    cheese_counter.innerHTML = cheese_count; 
  }
})

// Topping counter button
// for Cheese
let butter_decreaseBtn = document.getElementById('butter_decrease');
let butter_increaseBtn = document.getElementById('butter_increase'); 
let butter_counter = document.getElementById('butter_counter');
let butter_count = 0;

// - btn: Increase num of topping 
butter_decreaseBtn.addEventListener('click', () => {
  butter_count --; 
  butter_counter.innerHTML = butter_count; 
  if(butter_count < 0) {
    butter_count = 0;
    butter_counter.innerHTML = butter_count; 
  } else {
    butter_counter.innerHTML = butter_count; 
  }
})
// + btn: Decrease num of topping
butter_increaseBtn.addEventListener('click', () => {
  butter_count ++; 
  butter_counter.innerHTML = butter_count;
  if(butter_count >= 11) {
    butter_count = 0;
    butter_counter.innerHTML = butter_count; 
  } else {
    butter_counter.innerHTML = butter_count; 
  }
})

// Topping counter button
// for Corn
let corn_decreaseBtn = document.getElementById('corn_decrease');
let corn_increaseBtn = document.getElementById('corn_increase'); 
let corn_counter = document.getElementById('corn_counter');
let corn_count = 0;

// - btn: Increase num of topping 
corn_decreaseBtn.addEventListener('click', () => {
  corn_count --; 
  corn_counter.innerHTML = corn_count; 
  if(corn_count < 0) {
    corn_count = 0;
    corn_counter.innerHTML = corn_count; 
  } else {
    corn_counter.innerHTML = corn_count; 
  }
})
// + btn: Decrease num of topping
 corn_increaseBtn.addEventListener('click', () => {
  corn_count ++; 
  corn_counter.innerHTML = corn_count;
  if(corn_count >= 11) {
    corn_count = 0;
    corn_counter.innerHTML = corn_count; 
  } else {
    corn_counter.innerHTML = corn_count; 
  }
})

// Topping counter button
// for Fish.C
let fCake_decreaseBtn = document.getElementById('fCake_decrease');
let fCake_increaseBtn = document.getElementById('fCake_increase'); 
let fCake_counter = document.getElementById('fCake_counter');
let fCake_count = 0;

// - btn: Increase num of topping 
fCake_decreaseBtn.addEventListener('click', () => {
  fCake_count --; 
  fCake_counter.innerHTML = fCake_count; 
  if(fCake_count < 0) {
    fCake_count = 0;
    fCake_counter.innerHTML = fCale_count; 
  } else {
    fCake_counter.innerHTML = fCake_count; 
  }
})
// + btn: Decrease num of topping
fCake_increaseBtn.addEventListener('click', () => {
  fCake_count ++; 
  fCake_counter.innerHTML = fCake_count;
  if(fCake_count >= 11) {
    fCake_count = 0;
    fCake_counter.innerHTML = fCake_count; 
  } else {
    fCake_counter.innerHTML = fCake_count; 
  }
})

// Topping counter button
// for Bloccoli
let bloccoli_decreaseBtn = document.getElementById('bloccoli_decrease');
let bloccoli_increaseBtn = document.getElementById('bloccoli_increase'); 
let bloccoli_counter = document.getElementById('bloccoli_counter');
let bloccoli_count = 0;

// - btn: Increase num of topping 
bloccoli_decreaseBtn.addEventListener('click', () => {
  bloccoli_count --; 
  bloccoli_counter.innerHTML = bloccoli_count; 
  if(bloccoli_count < 0) {
    bloccoli_count = 0;
    bloccoli_counter.innerHTML = bloccoli_count; 
  } else {
    bloccoli_counter.innerHTML = bloccoli_count; 
  }
})
// + btn: Decrease num of topping
bloccoli_increaseBtn.addEventListener('click', () => {
  bloccoli_count ++; 
  bloccoli_counter.innerHTML = bloccoli_count;
  if(bloccoli_count >= 11) {
    bloccoli_count = 0;
    bloccoli_counter.innerHTML = bloccoli_count; 
  } else {
    bloccoli_counter.innerHTML = bloccoli_count; 
  }
})

// Topping counter button
// for Ex.Noodles
let exNoodles_decreaseBtn = document.getElementById('exNoodles_decrease');
let exNoodles_increaseBtn = document.getElementById('exNoodles_increase'); 
let exNoodles_counter = document.getElementById('exNoodles_counter');
let exNoodles_count = 0;

// - btn: Increase num of topping 
exNoodles_decreaseBtn.addEventListener('click', () => {
  exNoodles_count --; 
  exNoodles_counter.innerHTML = exNoodles_count; 
  if(exNoodles_count < 0) {
    exNoodles_count = 0;
    exNoodles_counter.innerHTML = exNoodles_count; 
  } else {
    exNoodles_counter.innerHTML = exNoodles_count; 
  }
})
// + btn: Decrease num of topping
exNoodles_increaseBtn.addEventListener('click', () => {
  exNoodles_count ++; 
  exNoodles_counter.innerHTML = exNoodles_count;
  if(exNoodles_count >= 11) {
    exNoodles_count = 0;
    exNoodles_counter.innerHTML = exNoodles_count; 
  } else {
    exNoodles_counter.innerHTML = exNoodles_count; 
  }
})


// Chashu Preferences Modal
const chashuP_Modal = document.getElementById('chashu_p_modal');
const chashuB_Modal = document.getElementById('chashu_b_modal');
const chashuD_Modal = document.getElementById('chashu_d_modal');
const gOnion_Modal = document.getElementById('gOnion_modal');

document.querySelector('#close_chashu_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg_chashu').style.display = 'none';
});

chashuP_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_chashu').style.display = 'block';
  document.querySelector('.modal_bg_chashu').classList.add('bg-active-chashu');
});

chashuB_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_chashu').style.display = 'block';
  document.querySelector('.modal_bg_chashu').classList.add('bg-active-chashu');
});

chashuD_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_chashu').style.display = 'block';
  document.querySelector('.modal_bg_chashu').classList.add('bg-active-chashu');
});

gOnion_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_chashu').style.display = 'block';
  document.querySelector('.modal_bg_chashu').classList.add('bg-active-chashu');
});

// Button to add/reduce a number of Chashu related item (plate, burger, don)
let chashu_decreaseBtn = document.getElementById('chashu_decrease');
let chashu_increaseBtn = document.getElementById('chashu_increase'); 
let chashu_counter = document.getElementById('chashu_counter');
let chashu_count = 0;

// - btn: Increase num of topping 
chashu_decreaseBtn.addEventListener('click', () => {
  chashu_count --; 
  chashu_counter.innerHTML = chashu_count; 
  if(chashu_count < 0) {
    chashu_count = 0;
    chashu_counter.innerHTML = chashu_count; 
  } else {
    chashu_counter.innerHTML = chashu_count; 
  }
})
// + btn: Decrease num of topping
chashu_increaseBtn.addEventListener('click', () => {
  chashu_count ++; 
  chashu_counter.innerHTML = chashu_count;
  if(chashu_count >= 11) {
    chashu_count = 0;
    chashu_counter.innerHTML = chashu_count; 
  } else {
    chashu_counter.innerHTML = chashu_count; 
  }
})


// Side Dishes Modal
const side_Modal = document.getElementById('side_dishes_modal');

document.querySelector('#close_side_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg_dishes').style.display = 'none';
});

side_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_dishes').style.display = 'block';
  document.querySelector('.modal_bg_dishes').classList.add('bg-active-dishes');
});

// other side dishes counter button
// for gyoza
let gyoza_decreaseBtn = document.getElementById('gyoza_decrease');
let gyoza_increaseBtn = document.getElementById('gyoza_increase'); 
let gyoza_counter = document.getElementById('gyoza_counter');
let gyoza_count = 0;

// - btn: Increase num of topping 
gyoza_decreaseBtn.addEventListener('click', () => {
  gyoza_count --; 
  gyoza_counter.innerHTML = gyoza_count; 
  if(gyoza_count < 0) {
    gyoza_count = 0;
    gyoza_counter.innerHTML = gyoza_count; 
  } else {
    gyoza_counter.innerHTML = gyoza_count; 
  }
})
// + btn: Decrease num of topping
gyoza_increaseBtn.addEventListener('click', () => {
  gyoza_count ++; 
  gyoza_counter.innerHTML = gyoza_count;
  if(gyoza_count >= 11) {
    gyoza_count = 0;
    gyoza_counter.innerHTML = gyoza_count; 
  } else {
    gyoza_counter.innerHTML = gyoza_count; 
  }
})

// other side dishes counter button
// for steamed bann
let steamedBan_decreaseBtn = document.getElementById('steamedBan_decrease');
let steamedBan_increaseBtn = document.getElementById('steamedBan_increase'); 
let steamedBan_counter = document.getElementById('steamedBan_counter');
let steamedBan_count = 0;

// - btn: Increase num of topping 
steamedBan_decreaseBtn.addEventListener('click', () => {
  steamedBan_count --; 
  steamedBan_counter.innerHTML = steamedBan_count; 
  if(steamedBan_count < 0) {
    steamedBan_count = 0;
    steamedBan_counter.innerHTML = steamedBan_count; 
  } else {
    steamedBan_counter.innerHTML = steamedBan_count; 
  }
})
// + btn: Decrease num of topping
steamedBan_increaseBtn.addEventListener('click', () => {
  steamedBan_count ++; 
  steamedBan_counter.innerHTML = steamedBan_count;
  if(steamedBan_count >= 11) {
    steamedBan_count = 0;
    steamedBan_counter.innerHTML = steamedBan_count; 
  } else {
    steamedBan_counter.innerHTML = steamedBan_count; 
  }
})

// other side dishes counter button
// for Kimchi Small
let kimchiS_decreaseBtn = document.getElementById('kimchiS_decrease');
let kimchiS_increaseBtn = document.getElementById('kimchiS_increase'); 
let kimchiS_counter = document.getElementById('kimchiS_counter');
let kimchiS_count = 0;

// - btn: Increase num of topping 
kimchiS_decreaseBtn.addEventListener('click', () => {
  kimchiS_count --; 
  kimchiS_counter.innerHTML = kimchiS_count; 
  if(kimchiS_count < 0) {
    kimchiS_count = 0;
    kimchiS_counter.innerHTML = kimchiS_count; 
  } else {
    kimchiS_counter.innerHTML = kimchiS_count; 
  }
})
// + btn: Decrease num of topping
kimchiS_increaseBtn.addEventListener('click', () => {
  kimchiS_count ++; 
  kimchiS_counter.innerHTML = kimchiS_count;
  if(kimchiS_count >= 11) {
    kimchiS_count = 0;
    kimchiS_counter.innerHTML = kimchiS_count; 
  } else {
    kimchiS_counter.innerHTML = kimchiS_count; 
  }
})

// other side dishes counter button
// for Kimchi Large
let kimchiL_decreaseBtn = document.getElementById('kimchiL_decrease');
let kimchiL_increaseBtn = document.getElementById('kimchiL_increase'); 
let kimchiL_counter = document.getElementById('kimchiL_counter');
let kimchiL_count = 0;

// - btn: Increase num of topping 
kimchiL_decreaseBtn.addEventListener('click', () => {
  kimchiL_count --; 
  kimchiL_counter.innerHTML = kimchiL_count; 
  if(kimchiL_count < 0) {
    kimchiL_count = 0;
    kimchiL_counter.innerHTML = kimchiL_count; 
  } else {
    kimchiL_counter.innerHTML = kimchiL_count; 
  }
})
// + btn: Decrease num of topping
kimchiL_increaseBtn.addEventListener('click', () => {
  kimchiL_count ++; 
  kimchiL_counter.innerHTML = kimchiL_count;
  if(kimchiL_count >= 11) {
    kimchiL_count = 0;
    kimchiL_counter.innerHTML = kimchiL_count; 
  } else {
    kimchiL_counter.innerHTML = kimchiL_count; 
  }
})

// other side dishes counter button
// for white rice
let rice_decreaseBtn = document.getElementById('rice_decrease');
let rice_increaseBtn = document.getElementById('rice_increase'); 
let rice_counter = document.getElementById('rice_counter');
let rice_count = 0;

// - btn: Increase num of topping 
rice_decreaseBtn.addEventListener('click', () => {
  rice_count --; 
  rice_counter.innerHTML = rice_count; 
  if(rice_count < 0) {
    rice_count = 0;
    rice_counter.innerHTML = rice_count; 
  } else {
    rice_counter.innerHTML = rice_count; 
  }
})
// + btn: Decrease num of topping
rice_increaseBtn.addEventListener('click', () => {
  rice_count ++; 
  rice_counter.innerHTML = rice_count;
  if(rice_count >= 11) {
    rice_count = 0;
    rice_counter.innerHTML = rice_count; 
  } else {
    rice_counter.innerHTML = rice_count; 
  }
})

// other side dishes counter button
// for matcha ice cream
let matcha_decreaseBtn = document.getElementById('matcha_decrease');
let matcha_increaseBtn = document.getElementById('matcha_increase'); 
let matcha_counter = document.getElementById('matcha_counter');
let matcha_count = 0;

// - btn: Increase num of topping 
matcha_decreaseBtn.addEventListener('click', () => {
  matcha_count --; 
  matcha_counter.innerHTML = matcha_count; 
  if(matcha_count < 0) {
    matcha_count = 0;
    matcha_counter.innerHTML = matcha_count; 
  } else {
    matcha_counter.innerHTML = matcha_count; 
  }
})
// + btn: Decrease num of topping
matcha_increaseBtn.addEventListener('click', () => {
  matcha_count ++; 
  matcha_counter.innerHTML = matcha_count;
  if(matcha_count >= 11) {
    matcha_count = 0;
    matcha_counter.innerHTML = matcha_count; 
  } else {
    matcha_counter.innerHTML = matcha_count; 
  }
})

// button to add/reduce a num of other side dish
let otherSide_decreaseBtn = document.getElementById('otherSide_decrease');
let otherSide_increaseBtn = document.getElementById('otherSide_increase'); 
let otherSide_counter = document.getElementById('otherSide_counter');
let otherSide_count = 0;

// - btn: Increase num of topping 
otherSide_decreaseBtn.addEventListener('click', () => {
  otherSide_count --; 
  otherSide_counter.innerHTML = otherSide_count; 
  if(otherSide_count < 0) {
    otherSide_count = 0;
    otherSide_counter.innerHTML = otherSide_count; 
  } else {
    otherSide_counter.innerHTML = otherSide_count; 
  }
})
// + btn: Decrease num of topping
otherSide_increaseBtn.addEventListener('click', () => {
  otherSide_count ++; 
  otherSide_counter.innerHTML = otherSide_count;
  if(otherSide_count >= 11) {
    otherSide_count = 0;
    otherSide_counter.innerHTML = otherSide_count; 
  } else {
    otherSide_counter.innerHTML = otherSide_count; 
  }
})


// Toppings Modal (directly from top menu)
const toppings_Modal = document.getElementById('topping_yellow');

document.querySelector('#close_toppings_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg_toppings').style.display = 'none';
});

toppings_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_toppings').style.display = 'block';
  document.querySelector('.modal_bg_toppings').classList.add('bg-active-toppings');
});


// Topping Mdal
// Topping counter button 
// for Beans
let beansTop_decreaseBtn = document.getElementById('beansTop_decrease');
let beansTop_increaseBtn = document.getElementById('beansTop_increase'); 
let beansTop_counter = document.getElementById('beansTop_counter');
let beansTop_count = 0;

// - btn: Increase num of topping 
beansTop_decreaseBtn.addEventListener('click', () => {
  beansTop_count --; 
  beansTop_counter.innerHTML = beanTop_count; 
  if(beansTop_count < 0) {
    beansTop_count = 0;
    beansTop_counter.innerHTML = beansTop_count; 
  } else {
    beansTop_counter.innerHTML = beansTop_count; 
  }
})
// + btn: Decrease num of topping
beansTop_increaseBtn.addEventListener('click', () => {
  beansTop_count ++; 
  beansTop_counter.innerHTML = beansTop_count;
  if(beansTop_count >= 11) {
    beansTop_count = 0;
    beansTop_counter.innerHTML = beansTop_count; 
  } else {
    beansTop_counter.innerHTML = beansTop_count; 
  }
})

// Topping counter button
// for Eggs
let eggsTop_decreaseBtn = document.getElementById('eggsTop_decrease');
let eggsTop_increaseBtn = document.getElementById('eggsTop_increase'); 
let eggsTop_counter = document.getElementById('eggsTop_counter');
let eggsTop_count = 0;

// - btn: Increase num of topping 
eggsTop_decreaseBtn.addEventListener('click', () => {
  eggsTop_count --; 
  eggsTop_counter.innerHTML = eggsTop_count; 
  if(eggsTop_count < 0) {
    eggsTop_count = 0;
    eggsTop_counter.innerHTML = eggsTop_count; 
  } else {
    eggsTop_counter.innerHTML = eggsTop_count; 
  }
})
// + btn: Decrease num of topping
eggsTop_increaseBtn.addEventListener('click', () => {
  eggsTop_count ++; 
  eggsTop_counter.innerHTML = eggsTop_count;
  if(eggsTop_count >= 11) {
    eggsTop_count = 0;
    eggsTop_counter.innerHTML = eggsTop_count; 
  } else {
    eggsTop_counter.innerHTML = eggsTop_count; 
  }
})

// Topping counter button
// for Belly
let bellyTop_decreaseBtn = document.getElementById('bellyTop_decrease');
let bellyTop_increaseBtn = document.getElementById('bellyTop_increase'); 
let bellyTop_counter = document.getElementById('bellyTop_counter');
let bellyTop_count = 0;

// - btn: Increase num of topping 
bellyTop_decreaseBtn.addEventListener('click', () => {
  bellyTop_count --; 
  bellyTop_counter.innerHTML = bellyTop_count; 
  if(bellyTop_count < 0) {
    bellyTop_count = 0;
    bellyTop_counter.innerHTML = bellyTop_count; 
  } else {
    bellyTop_counter.innerHTML = bellyTop_count; 
  }
})
// + btn: Decrease num of topping
bellyTop_increaseBtn.addEventListener('click', () => {
  bellyTop_count ++; 
  bellyTop_counter.innerHTML = bellyTop_count;
  if(bellyTop_count >= 11) {
    bellyTop_count = 0;
    bellyTop_counter.innerHTML = bellyTop_count; 
  } else {
    bellyTop_counter.innerHTML = bellyTop_count; 
  }
})


// Topping counter button
// for Shoulder
let shoulderTop_decreaseBtn = document.getElementById('shoulderTop_decrease');
let shoulderTop_increaseBtn = document.getElementById('shoulderTop_increase'); 
let shoulderTop_counter = document.getElementById('shoulderTop_counter');
let shoulderTop_count = 0;

// - btn: Increase num of topping 
shoulderTop_decreaseBtn.addEventListener('click', () => {
  shoulderTop_count --; 
  shoulderTop_counter.innerHTML = shoulderTop_count; 
  if(shoulderTop_count < 0) {
    shoulderTop_count = 0;
    shoulderTop_counter.innerHTML = shoulderTop_count; 
  } else {
    shoulderTop_counter.innerHTML = shoulderTop_count; 
  }
})
// + btn: Decrease num of topping
shoulderTop_increaseBtn.addEventListener('click', () => {
  shoulderTop_count ++; 
  shoulderTop_counter.innerHTML = shoulderTop_count;
  if(shoulderTop_count >= 11) {
    shoulderTop_count = 0;
    shoulderTop_counter.innerHTML = shoulderTop_count; 
  } else {
    shoulderTop_counter.innerHTML = shoulderTop_count; 
  }
})

// Topping counter button
// for S.Cake
let sCakeTop_decreaseBtn = document.getElementById('sCakeTop_decrease');
let sCakeTop_increaseBtn = document.getElementById('sCakeTop_increase'); 
let sCakeTop_counter = document.getElementById('sCakeTop_counter');
let sCakeTop_count = 0;

// - btn: Increase num of topping 
sCakeTop_decreaseBtn.addEventListener('click', () => {
  sCakeTop_count --; 
  sCakeTop_counter.innerHTML = sCakeTop_count; 
  if(sCakeTop_count < 0) {
    sCakeTop_count = 0;
    sCakeTop_counter.innerHTML = sCakeTop_count; 
  } else {
    sCakeTop_counter.innerHTML = sCakeTop_count; 
  }
})
// + btn: Decrease num of topping
sCakeTop_increaseBtn.addEventListener('click', () => {
  sCakeTop_count ++; 
  sCakeTop_counter.innerHTML = sCakeTop_count;
  if(sCakeTop_count >= 11) {
    sCakeTop_count = 0;
    sCakeTop_counter.innerHTML = sCakeTop_count; 
  } else {
    sCakeTop_counter.innerHTML = sCakeTop_count; 
  }
})

// Topping counter button
// for Wakame
let wakameTop_decreaseBtn = document.getElementById('wakameTop_decrease');
let wakameTop_increaseBtn = document.getElementById('wakameTop_increase'); 
let wakameTop_counter = document.getElementById('wakameTop_counter');
let wakameTop_count = 0;

// - btn: Increase num of topping 
wakameTop_decreaseBtn.addEventListener('click', () => {
  wakameTop_count --; 
  wakameTop_counter.innerHTML = wakameTop_count; 
  if(wakameTop_count < 0) {
    wakameTop_count = 0;
    wakameTop_counter.innerHTML = wakameTop_count; 
  } else {
    wakameTop_counter.innerHTML = wakameTop_count; 
  }
})
// + btn: Decrease num of topping
wakameTop_increaseBtn.addEventListener('click', () => {
  wakameTop_count ++; 
  wakameTop_counter.innerHTML =wakameTop_count;
  if(wakameTop_count >= 11) {
    wakameTop_count = 0;
    wakameTop_counter.innerHTML = wakameTop_count; 
  } else {
    wakameTop_counter.innerHTML = wakameTop_count; 
  }
})

// Topping counter button
// for Nori
let noriTop_decreaseBtn = document.getElementById('noriTop_decrease');
let noriTop_increaseBtn = document.getElementById('noriTop_increase'); 
let noriTop_counter = document.getElementById('noriTop_counter');
let noriTop_count = 0;

// - btn: Increase num of topping 
noriTop_decreaseBtn.addEventListener('click', () => {
  noriTop_count --; 
  noriTop_counter.innerHTML = noriTop_count; 
  if(noriTop_count < 0) {
    noriTop_count = 0;
    noriTop_counter.innerHTML = noriTop_count; 
  } else {
    noriTop_counter.innerHTML = noriTop_count; 
  }
})
// + btn: Decrease num of topping
noriTop_increaseBtn.addEventListener('click', () => {
  noriTop_count ++; 
  noriTop_counter.innerHTML =noriTop_count;
  if(noriTop_count >= 11) {
    noriTop_count = 0;
    noriTop_counter.innerHTML = noriTop_count; 
  } else {
    noriTop_counter.innerHTML = noriTop_count; 
  }
})

// Topping counter button
// for G. Onion
let gOniTop_decreaseBtn = document.getElementById('gOniTop_decrease');
let gOniTop_increaseBtn = document.getElementById('gOniTop_increase'); 
let gOniTop_counter = document.getElementById('gOniTop_counter');
let gOniTop_count = 0;

// - btn: Increase num of topping 
gOniTop_decreaseBtn.addEventListener('click', () => {
  gOniTop_count --; 
  gOniTop_counter.innerHTML = gOniTop_count; 
  if(gOniTop_count < 0) {
    gOniTop_count = 0;
    gOniTop_counter.innerHTML = gOniTop_count; 
  } else {
    gOniTop_counter.innerHTML = gOniTop_count; 
  }
})
// + btn: Decrease num of topping
gOniTop_increaseBtn.addEventListener('click', () => {
  gOniTop_count ++; 
  gOniTop_counter.innerHTML = gOniTop_count;
  if(gOniTop_count >= 11) {
    gOniTop_count = 0;
    gOniTop_counter.innerHTML = gOniTop_count; 
  } else {
    gOniTop_counter.innerHTML = gOniTop_count; 
  }
})

// Topping counter button
// for Cheese
let cheeseTop_decreaseBtn = document.getElementById('cheeseTop_decrease');
let cheeseTop_increaseBtn = document.getElementById('cheeseTop_increase'); 
let cheeseTop_counter = document.getElementById('cheeseTop_counter');
let cheeseTop_count = 0;

// - btn: Increase num of topping 
cheeseTop_decreaseBtn.addEventListener('click', () => {
  cheeseTop_count --; 
  cheeseTop_counter.innerHTML = cheeseTop_count; 
  if(cheeseTop_count < 0) {
    cheeseTop_count = 0;
    cheeseTop_counter.innerHTML = cheeseTop_count; 
  } else {
    cheeseTop_counter.innerHTML = cheeseTop_count; 
  }
})
// + btn: Decrease num of topping
cheeseTop_increaseBtn.addEventListener('click', () => {
  cheeseTop_count ++; 
  cheeseTop_counter.innerHTML =cheeseTop_count;
  if(cheeseTop_count >= 11) {
    cheeseTop_count = 0;
    cheeseTop_counter.innerHTML = cheeseTop_count; 
  } else {
    cheeseTop_counter.innerHTML = cheeseTop_count; 
  }
})

// Topping counter button
// for Cheese
let butterTop_decreaseBtn = document.getElementById('butterTop_decrease');
let butterTop_increaseBtn = document.getElementById('butterTop_increase'); 
let butterTop_counter = document.getElementById('butterTop_counter');
let butterTop_count = 0;

// - btn: Increase num of topping 
butterTop_decreaseBtn.addEventListener('click', () => {
  butterTop_count --; 
  butterTop_counter.innerHTML = butterTop_count; 
  if(butterTop_count < 0) {
    butterTop_count = 0;
    butterTop_counter.innerHTML = butterTop_count; 
  } else {
    butterTop_counter.innerHTML = butterTop_count; 
  }
})
// + btn: Decrease num of topping
butterTop_increaseBtn.addEventListener('click', () => {
  butterTop_count ++; 
  butterTop_counter.innerHTML = butterTop_count;
  if(butterTop_count >= 11) {
    butter_count = 0;
    butterTop_counter.innerHTML = butterTop_count; 
  } else {
    butterTop_counter.innerHTML = butterTop_count; 
  }
})

// Topping counter button
// for Corn
let cornTop_decreaseBtn = document.getElementById('cornTop_decrease');
let cornTop_increaseBtn = document.getElementById('cornTop_increase'); 
let cornTop_counter = document.getElementById('cornTop_counter');
let cornTop_count = 0;

// - btn: Increase num of topping 
cornTop_decreaseBtn.addEventListener('click', () => {
  cornTop_count --; 
  cornTop_counter.innerHTML = cornTop_count; 
  if(corTopn_count < 0) {
    cornTop_count = 0;
    cornTop_counter.innerHTML = cornTop_count; 
  } else {
    cornTop_counter.innerHTML = cornTop_count; 
  }
})
// + btn: Decrease num of topping
 cornTop_increaseBtn.addEventListener('click', () => {
  cornTop_count ++; 
  cornTop_counter.innerHTML = cornTop_count;
  if(cornTop_count >= 11) {
    cornTop_count = 0;
    cornTop_counter.innerHTML = cornTop_count; 
  } else {
    cornTop_counter.innerHTML = cornTop_count; 
  }
})

// Topping counter button
// for Fish.C
let fCakeTop_decreaseBtn = document.getElementById('fCakeTop_decrease');
let fCakeTop_increaseBtn = document.getElementById('fCakeTop_increase'); 
let fCakeTop_counter = document.getElementById('fCakeTop_counter');
let fCakeTop_count = 0;

// - btn: Increase num of topping 
fCakeTop_decreaseBtn.addEventListener('click', () => {
  fCakeTopTop_count --; 
  fCake_counter.innerHTML = fCakeTop_count; 
  if(fCakeTop_count < 0) {
    fCakeTop_count = 0;
    fCakeTop_counter.innerHTML = fCakeTop_count; 
  } else {
    fCakeTop_counter.innerHTML = fCakeTop_count; 
  }
})
// + btn: Decrease num of topping
fCakeTop_increaseBtn.addEventListener('click', () => {
  fCakeTop_count ++; 
  fCakeTop_counter.innerHTML = fCakeTop_count;
  if(fCakeTop_count >= 11) {
    fCakeTop_count = 0;
    fCakeTop_counter.innerHTML = fCakeTop_count; 
  } else {
    fCakeTop_counter.innerHTML = fCakeTop_count; 
  }
})

// Topping counter button
// for Bloccoli
let bloccoliTop_decreaseBtn = document.getElementById('bloccoliTop_decrease');
let bloccoliTop_increaseBtn = document.getElementById('bloccoliTop_increase'); 
let bloccoliTop_counter = document.getElementById('bloccoliTop_counter');
let bloccoliTop_count = 0;

// - btn: Increase num of topping 
bloccoliTop_decreaseBtn.addEventListener('click', () => {
  bloccoliTop_count --; 
  bloccoliTop_counter.innerHTML = bloccoli_count; 
  if(bloccoliTop_count < 0) {
    bloccoliTop_count = 0;
    bloccoliTop_counter.innerHTML = bloccoliTop_count; 
  } else {
    bloccoliTop_counter.innerHTML = bloccoliTop_count; 
  }
})
// + btn: Decrease num of topping
bloccoliTop_increaseBtn.addEventListener('click', () => {
  bloccoliTop_count ++; 
  bloccoliTop_counter.innerHTML = bloccoliTop_count;
  if(bloccoliTop_count >= 11) {
    bloccoli_Topcount = 0;
    bloccoliTop_counter.innerHTML = bloccoliTop_count; 
  } else {
    bloccoliTop_counter.innerHTML = bloccoliTop_count; 
  }
})

// Topping counter button
// for Ex.Noodles
let exNoodlesTop_decreaseBtn = document.getElementById('exNoodlesTop_decrease');
let exNoodlesTop_increaseBtn = document.getElementById('exNoodlesTop_increase'); 
let exNoodlesTop_counter = document.getElementById('exNoodlesTop_counter');
let exNoodlesTop_count = 0;

// - btn: Increase num of topping 
exNoodlesTop_decreaseBtn.addEventListener('click', () => {
  exNoodlesTop_count --; 
  exNoodlesTop_counter.innerHTML = exNoodlesTop_count; 
  if(exNoodlesTop_count < 0) {
    exNoodlesTop_count = 0;
    exNoodlesTop_counter.innerHTML = exNoodlesTop_count; 
  } else {
    exNoodlesTop_counter.innerHTML = exNoodlesTop_count; 
  }
})
// + btn: Decrease num of topping
exNoodlesTop_increaseBtn.addEventListener('click', () => {
  exNoodlesTop_count ++; 
  exNoodlesTop_counter.innerHTML = exNoodlesTop_count;
  if(exNoodlesTop_count >= 11) {
    exNoodlesTop_count = 0;
    exNoodlesTop_counter.innerHTML = exNoodlesTop_count; 
  } else {
    exNoodlesTop_counter.innerHTML = exNoodlesTop_count; 
  }
})

// button to add/reduce a num of toppings (from top menu)
let toppingTop_decreaseBtn = document.getElementById('toppingTop_decrease');
let toppingTop_increaseBtn = document.getElementById('toppingTop_increase'); 
let toppingTop_counter = document.getElementById('toppingTop_counter');
let toppingTop_count = 0;

// - btn: Increase num of topping 
toppingTop_decreaseBtn.addEventListener('click', () => {
  toppingTop_count --; 
  toppingTop_counter.innerHTML = toppingTop_count; 
  if(toppingTop_count < 0) {
    toppingTop_count = 0;
    toppingTop_counter.innerHTML = toppingTop_count; 
  } else {
    toppingTop_counter.innerHTML = toppingTop_count; 
  }
})
// + btn: Decrease num of topping
toppingTop_increaseBtn.addEventListener('click', () => {
  toppingTop_count ++; 
  toppingTop_counter.innerHTML = toppingTop_count;
  if(toppingTop_count >= 11) {
    toppingTop_count = 0;
    toppingTop_counter.innerHTML = toppingTop_count; 
  } else {
    toppingTop_counter.innerHTML = toppingTop_count; 
  }
})


// Soft Drinks Modal
const softDrink_Modal = document.getElementById('soft_dri_modal');

document.querySelector('#close_softDrink_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg_softDrink').style.display = 'none';
});

softDrink_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_softDrink').style.display = 'block';
  document.querySelector('.modal_bg_softDrink').classList.add('bg-active-softDrink');
});

// Soft Drink counter button
// for coke
let coke_decreaseBtn = document.getElementById('coke_decrease');
let coke_increaseBtn = document.getElementById('coke_increase'); 
let coke_counter = document.getElementById('coke_counter');
let coke_count = 0;

// - btn: Increase num of topping 
coke_decreaseBtn.addEventListener('click', () => {
  coke_count --; 
  coke_counter.innerHTML = coke_count; 
  if(coke_count < 0) {
    coke_count = 0;
    coke_counter.innerHTML = coke_count; 
  } else {
    coke_counter.innerHTML = coke_count; 
  }
})
// + btn: Decrease num of topping
 coke_increaseBtn.addEventListener('click', () => {
  coke_count ++; 
  coke_counter.innerHTML = coke_count;
  if(coke_count >= 11) {
    coke_count = 0;
    coke_counter.innerHTML = coke_count; 
  } else {
    coke_counter.innerHTML = coke_count; 
  }
})

// Soft Drink counter button
// for sprite
let sprite_decreaseBtn = document.getElementById('sprite_decrease');
let sprite_increaseBtn = document.getElementById('sprite_increase'); 
let sprite_counter = document.getElementById('sprite_counter');
let sprite_count = 0;

// - btn: Increase num of topping 
sprite_decreaseBtn.addEventListener('click', () => {
  sprite_count --; 
  sprite_counter.innerHTML = sprite_count; 
  if(sprite_count < 0) {
    sprite_count = 0;
    sprite_counter.innerHTML = sprite_count; 
  } else {
    sprite_counter.innerHTML = sprite_count; 
  }
})
// + btn: Decrease num of topping
sprite_increaseBtn.addEventListener('click', () => {
  sprite_count ++; 
  sprite_counter.innerHTML = sprite_count;
  if(sprite_count >= 11) {
    sprite_count = 0;
    sprite_counter.innerHTML = sprite_count; 
  } else {
    sprite_counter.innerHTML = sprite_count; 
  }
})

// Soft Drink counter button
// for Iced tea
let icedTea_decreaseBtn = document.getElementById('icedTea_decrease');
let icedTea_increaseBtn = document.getElementById('icedTea_increase'); 
let icedTea_counter = document.getElementById('icedTea_counter');
let icedTea_count = 0;

// - btn: Increase num of topping 
icedTea_decreaseBtn.addEventListener('click', () => {
  icedTea_count --; 
  icedTea_counter.innerHTML = icedTea_count; 
  if(icedTea_count < 0) {
    icedTea_count = 0;
    icedTea_counter.innerHTML = icedTea_count; 
  } else {
    icedTea_counter.innerHTML = icedTea_count; 
  }
})
// + btn: Decrease num of topping
icedTea_increaseBtn.addEventListener('click', () => {
  icedTea_count ++; 
  icedTea_counter.innerHTML = icedTea_count;
  if(icedTea_count >= 11) {
    icedTea_count = 0;
    icedTea_counter.innerHTML = icedTea_count; 
  } else {
    icedTea_counter.innerHTML = icedTea_count; 
  }
})


// Beer Modal
const beer_Modal = document.getElementById('beer_modal');

document.querySelector('#close_beer_modal').addEventListener('click', () => {
  document.querySelector('.modal_bg_beer').style.display = 'none';
});

beer_Modal.addEventListener('click', () => {
  document.querySelector('.modal_bg_beer').style.display = 'block';
  document.querySelector('.modal_bg_beer').classList.add('bg-active-beer');
});

// Beer counter button
// for asahi
let asahi_decreaseBtn = document.getElementById('asahi_decrease');
let asahi_increaseBtn = document.getElementById('asahi_increase'); 
let asahi_counter = document.getElementById('asahi_counter');
let asahi_count = 0;

// - btn: Increase num of topping 
asahi_decreaseBtn.addEventListener('click', () => {
  asahi_count --; 
  asahi_counter.innerHTML = asahi_count; 
  if(asahi_count < 0) {
    asahi_count = 0;
    asahi_counter.innerHTML = asahi_count; 
  } else {
    asahi_counter.innerHTML = asahi_count; 
  }
})
// + btn: Decrease num of topping
asahi_increaseBtn.addEventListener('click', () => {
  asahi_count ++; 
  asahi_counter.innerHTML = asahi_count;
  if(asahi_count >= 11) {
    asahi_count = 0;
    asahi_counter.innerHTML = asahi_count; 
  } else {
    asahi_counter.innerHTML = asahi_count; 
  }
})

// Beer counter button
// for sapporo
let sapporo_decreaseBtn = document.getElementById('sapporo_decrease');
let sapporo_increaseBtn = document.getElementById('sapporo_increase'); 
let sapporo_counter = document.getElementById('sapporo_counter');
let sapporo_count = 0;

// - btn: Increase num of topping 
sapporo_decreaseBtn.addEventListener('click', () => {
  sapporo_count --; 
  sapporo_counter.innerHTML = sapporo_count; 
  if(sapporo_count < 0) {
    sapporo_count = 0;
    sapporo_counter.innerHTML = sapporo_count; 
  } else {
    sapporo_counter.innerHTML = sapporo_count; 
  }
})
// + btn: Decrease num of topping
sapporo_increaseBtn.addEventListener('click', () => {
  sapporo_count ++; 
  sapporo_counter.innerHTML = sapporo_count;
  if(sapporo_count >= 11) {
    sapporo_count = 0;
    sapporo_counter.innerHTML = sapporo_count; 
  } else {
    sapporo_counter.innerHTML = sapporo_count; 
  }
})


// Beer counter button
// for kokanee
let kokanee_decreaseBtn = document.getElementById('kokanee_decrease');
let kokanee_increaseBtn = document.getElementById('kokanee_increase'); 
let kokanee_counter = document.getElementById('kokanee_counter');
let kokanee_count = 0;

// - btn: Increase num of topping 
kokanee_decreaseBtn.addEventListener('click', () => {
  kokanee_count --; 
  kokanee_counter.innerHTML = kokanee_count; 
  if(kokanee_count < 0) {
    kokanee_count = 0;
    kokanee_counter.innerHTML = kokanee_count; 
  } else {
    kokanee_counter.innerHTML = kokanee_count; 
  }
})
// + btn: Decrease num of topping
kokanee_increaseBtn.addEventListener('click', () => {
  kokanee_count ++; 
  kokanee_counter.innerHTML = kokanee_count;
  if(kokanee_count >= 11) {
    kokanee_count = 0;
    kokanee_counter.innerHTML = kokanee_count; 
  } else {
    kokanee_counter.innerHTML = kokanee_count; 
  }
})

