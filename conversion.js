const fs = require("node:fs");

var array = fs.readFileSync("./mam-rotated-overcut.hpgl").toString().split(";");

let pdCount = 0;

for (let i = 0; i < array.length; i++) {
  if (array[i].includes("SP1")) {
    array[i] = "SP2";
  } else if (array[i].includes("PD")) {
    pdCount++;
    const [_a, rest] = array[i].split(/PD/, (limit = 2));
    const groups = rest.match(/(\d+,\d+)+/g);

    for (let i = 0; i < groups.length; i++) {
      if (i === 0 || i % 10 === 0) {
        groups[i] = "PA" + groups[i];
      } else {
        groups[i] = null;
      }
    }
    array[i] = groups.filter(Boolean).join(";\n");

    // if (pdCount % 15 === 0) {
    //   const insert = "PU;\nSP0;\nPU;\nSP2;\nPU";
    //   array.splice(i, 0, insert);
    // }
  } else if (array[i].includes("PU")) {
    const [_, x, y] = array[i].split(/[PU,]+/);
    if (x !== undefined && y !== undefined) {
      array[i] = `PU;\nPA${x},${y};\nPD`;
    }
  }
}

fs.writeFileSync("./mam-converted-overcut.hpgl", array.join(";\n"));
