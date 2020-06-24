let energy = 0; //obligatory declarations
let singularitySize = 10;
let compressors = [0, 0, 0];
let compManual = [0, 0, 0];
let compCosts = [1, 100, 1e6];
let compScaling = [10, 100, 1e5];
let i;

function update() {
  energy += 2*(10/(20*singularitySize) - 1/20)
  increment(compressors[0]/20)
  for (i in compressors) {
    if (i === 0) continue;
    compressors[i-1] += compressors[i]/20
    document.getElementById("compAmount" + i).innerHTML = 
      format(compressors[i - 1],0,3) + " (" + format(compManual[i - 1],0,3) + ")"
  }
  document.getElementById("Singularity").innerHTML =
    "The Sphere is " + format(singularitySize, 4, 3) + " meters wide.";
  document.getElementById("energy").innerHTML =
    "Meanwhile, you have " + format(energy, 3, 3) + " energy.";
}

setInterval(update, 50); //update every 50 seconds

function increment(x) { 
  singularitySize *= (0.999 ** x);
}

function format(num, dec1, dec2) {
  //Credit: Diamboy
  if (num === 0) {return 0}
  if (num < 1e4 && num > 1e-3) return num.toFixed(dec1);
  // if number is less than 1e4 then return number truncated to 2 decimal places
  else {
    let e = Math.floor(Math.log10(num)); // number after the "e" in scientific notation
    let m = num / 10 ** e; // number before the "e" in sci notation
    return m.toFixed(dec2) + "e" + e; // concatenate number
  }
}

function buy(comp) {
  comp--
  if (energy > compCosts[comp]) {
    energy -= compCosts[comp]
    compressors[comp]++;
    compManual[comp]++;
    compCosts[comp] *= compScaling[comp]
  }
  //console.log(compressors)
}
