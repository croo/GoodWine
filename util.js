function scaleToRange(o) {
  var x = o.x;
  var A = o.min;
  var B = o.max;
  var C = o.range_min;
  var D = o.range_max;

 return C*(1 - ((x - A) /(B - A))) + D*((x - A)/(B - A));
}
