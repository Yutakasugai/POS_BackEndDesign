// if ('serviceWorker' in navigator) {

//     navigator.serviceWorker
//         .register('service-worker.js')
//         .then(reg => console.log("Service Worker Registered"))
//         .catch(err => console.log("Service Worker Failed to Register" + err))

// }


// var get = function(url) {   
    
//     return new Promise(function(resolve, reject) {

//         var xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     var result = xhr.responseText
//                     result = JSON.parse(result);
//                     resolve(result);
//                 } else {
//                     reject(xhr);
//                 }
//             }
//         };

//         xhr.open("GET", url, true);
//         xhr.send();
//     });  
// };

