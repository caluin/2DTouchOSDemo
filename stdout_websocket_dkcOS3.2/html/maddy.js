var self = {};

function run_gesture_detection(x, y, valid){
  let gesture = null;
  
  var theta = Math.atan2(y, x);  // get angle we are at

  // Max number of samples to allow gestures to take
  const MAX_TAP_TIME = 20   ;
  const MIN_TAP_TIME = 6;
  
  const MAX_SWIPE_TIME = 150;

  // Minimum diff to consider something a swipe
  const SWIPE_MIN_DIFF = 150;

  // Ratios of start/end position to total diff, for straigtness of swipe
  //const MAX_RATIO_CIRCLE = 0.5;
  const MIN_RATIO_SWIPE = 0.9;

  // What percent of a circle you have to go through to get a circle swipe
  const MIN_PCT_CIRCLE = 0.75;

  if (self._init == undefined){  // need some sort of persistant variables between the function calls
    self._data_buffer = [];
    self._last_valid = valid;
    self._init = true; 
  }

  function get_gesture(data_buffer){
    var len = data_buffer.length;
    var last = len - 1;

    var xs = data_buffer.map((i) => i.x);
    var ys = data_buffer.map((i) => i.y);
    var x_diff = xs[last] - xs[0];
    var y_diff = ys[last] - ys[0];

    var x_maxmin = Math.max(...xs) - Math.min(...xs);
    var y_maxmin = Math.max(...ys) - Math.min(...ys);

    var x_pct = Math.abs(x_diff / x_maxmin);
    var y_pct = Math.abs(y_diff / y_maxmin);

    var theta_sum = data_buffer[last].theta_sum;

    //console.log(x_maxmin, y_maxmin, x_diff, y_diff, len, x_pct, y_pct);

    if ((x_maxmin < SWIPE_MIN_DIFF) && (y_maxmin < SWIPE_MIN_DIFF)){
          console.log(len + " / "+ MAX_TAP_TIME  + " / "+  MIN_TAP_TIME);

      if ( len > MAX_TAP_TIME){
       return null; 
      }
      else if (len < MIN_TAP_TIME){
      return null;
      }
      //return "tap";
      return "t";
    
    } 
    //else if ((x_pct <= MAX_RATIO_CIRCLE) && (y_pct <= MAX_RATIO_CIRCLE)){  // circle
    else if (Math.abs(theta_sum) > (2 * Math.PI * MIN_PCT_CIRCLE)){ // circles
      var dir = (theta_sum > 0) ? 'cw' : 'ccw';
      var num = Math.floor(Math.abs(theta_sum) / (2 * Math.PI));
      //return `circle ${dir} ${num}`; 
    }
    else if ((x_pct >= MIN_RATIO_SWIPE) || (y_pct >= MIN_RATIO_SWIPE)) {
    //else {
      if (len > MAX_SWIPE_TIME){
       return null; 
      }

      //var dir = (Math.abs(x_diff) > Math.abs(y_diff)) ? ((x_diff > 0) ? "left" : "right") : ((y_diff > 0) ? "up" : "down");
      var dir = (Math.abs(x_diff) > Math.abs(y_diff)) ? ((x_diff > 0) ? "d" : "u") : ((y_diff > 0) ? "r" : "l");
      var dist = Math.abs(x_diff) > Math.abs(y_diff) ? Math.abs(x_diff) : Math.abs(y_diff);
      //return `${dir} ${dist} ${len}`;
      return `${dir}`;
    } 
    return null;
  }

  if (self._last_valid && !valid) {  // falling edge
    gesture = get_gesture(self._data_buffer);
    self._invalid_cnt = 0;
  } else if (!self._last_valid && valid){  // starting
    self._data_buffer = [];
  }  

  let theta_sum = 0;
  if (valid){
    // Calculate cumulative angle
    var last = self._data_buffer.length - 1;
    if (last >= 0){
      var theta_diff = theta - self._data_buffer[last].theta;
      if (theta_diff > Math.PI) {
        theta_diff -= Math.PI * 2;  
      } else if (theta_diff < -Math.PI) {
        theta_diff += Math.PI * 2; 
      }
      theta_sum = self._data_buffer[last].theta_sum + theta_diff;
    }

    // Add position, angle and cumulative angle to the buffer of data
    self._data_buffer.push({x: x, y: y, theta: theta, theta_sum: theta_sum});
   //  console.log(theta_sum); // returns angle of the circle
  } 

  self._last_valid = valid;
  return gesture;
}

//var gesture = run_gesture_detection(data['x'], data['y'], data['valid']);
//var gesture = run_gesture_detection(x, y, valid);
//console.log(gesture);
//if (gesture != null){
// console.log(gesture); 
//}