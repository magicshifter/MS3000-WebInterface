export default function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};




// // adapted ftom from: https://davidwalsh.name/javascript-debounce-function
// // thanks David!
// // Returns a function, that, as long as it continues to be invoked, will not
// // be triggered. The function will be called after it stops being called for
// // N milliseconds. If `immediate` is passed, trigger the function on the
// // leading edge, instead of the trailing.
// // export default function debounce(func, wait, immediate, ) {
// //   var timeout;
// //   return function() {
// //     var context = this, args = arguments;
// //     var later = function() {
// //       timeout = null;
// //       if (!immediate) func.apply(context, args);
// //     };
// //     var callNow = immediate && !timeout;
// //     clearTimeout(timeout);
// //     timeout = setTimeout(later, wait);
// //     if (callNow) func.apply(context, args);
// //   };
// // };
//
// export default function debounce(func, wait) {
//   var lastCall
//   var timeout = null
//
//   return function() {
//     var context = this, args = arguments;
//
//     const time = Date.now();
//
//     if (lastCall) {
//       const passed = time - lastCall
//       console.log("last passed", passed)
//
//       const delta = wait - passed
//       if (delta > 0) {
//         if (timeout)
//           clearTimeout(timeout);
//
//         var later = function() {
//           timeout = null
//           func.apply(context, args);
//         };
//
//         timeout = setTimeout(later, delta)
//         lastCall = time + delta
//       }
//       else {
//         func.apply(context, args);
//         lastCall = time
//       }
//     }
//     else {
//       func.apply(context, args);
//       lastCall = time
//     }
//   };
// }
