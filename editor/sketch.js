// RECEIPT!
// This is the file to edit. p5.js reference: https://p5js.org/reference/
import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080, // 240–2000 px. Width is fixed by the printer.
  seed: 67,
};

// everything here is editable. play around or rm -rf and see what you come up with!
export function drawReceipt(p) {
  const { width: w, height: h } = p;
  const margin = 24;

  // Header
  p.noStroke();
  p.fill(0);   
    p.textFont("monospace"); 
    p.textAlign(p.CENTER, p.TOP);
    p.textStyle(p.ITALIC);
    p.textSize(28);
    p.text("an unending journey", w / 2, 30);

  dashedLine(p, margin, 94, w - margin, 94, 6, 5);

// sky with stars 
const skyTop = 118;
const skyBottom = 340;
for (let i = 0; i < 120; i += 1) {
  const x = p.random(margin, w - margin);
  const y = p.random(skyTop, skyBottom);
  const size = p.random(0.5,5);
  if (p.random() > 0.85) {
    p.rect(x - 3, y, 7, 1);
    p.rect(x, y - 3, 1, 7);
  } else {
    p.ellipse(x, y, size, size);
  }
}

// crescent moon
const moonX = w - margin - 90;
const moonY = skyTop + 70;
const moonR = 46;
p.noStroke();
p.fill(0);
p.circle(moonX, moonY, moonR * 2);
p.fill(255);
p.circle(moonX + moonR * 0.55, moonY - moonR * 0.25, moonR * 1.85);
  
// ocean waves using sin+cos functions
  const oceanTop = 420;
  const oceanBottom = 900;
  const layerCount = 6;
  const layerGap = (oceanBottom - oceanTop) / layerCount;

  const layerParams = [];
  for (let layer = 0; layer < layerCount; layer += 1) {
    layerParams.push({
      amp1: p.random(10, 22),
      freq1: p.random(0.015, 0.03),
      phase1: p.random(p.TWO_PI),
      amp2: p.random(5, 14),
      freq2: p.random(0.03, 0.06),
      phase2: p.random(p.TWO_PI),
    });
  }

  function waveY(x, baseY, params) {
    const { amp1, freq1, phase1, amp2, freq2, phase2 } = params;
    return (
      baseY +
      Math.sin(x * freq1 + phase1) * amp1 +
      Math.cos(x * freq2 + phase2) * amp2
    );
  }

  let frontWaveRoute = []; // boat goes here
  let backWaveRoute = []; // second boat goes here
  let furtherWaveRoute = []; // third boat goes here

  for (let layer = 0; layer < layerCount; layer += 1) {
    const baseY = oceanTop + layer * layerGap;
    const params = layerParams[layer];

    p.fill(layer % 2 === 0 ? 0 : 255);
    p.stroke(0);
    p.strokeWeight(2);
    p.beginShape(); 
    p.vertex(margin, oceanBottom + 40);
    const route = [];
    for (let x = margin; x <= w - margin; x += 4) {
      const y = waveY(x, baseY, params);
      p.vertex(x, y);
      route.push({ x, y });
    }
    p.vertex(w - margin, oceanBottom + 40);
    p.endShape(p.CLOSE);

    if (layer === layerCount - 2) {
      frontWaveRoute = route; 
    }
  
    if (layer === layerCount - 4) {
      backWaveRoute = route; 
    }
    
    if (layer === layerCount - 6) {
      furtherWaveRoute = route; 
    }
  }


  // boat on wave line 
  if (frontWaveRoute.length > 0) {
    const boatX = w / 2 + p.random(-60, 60);
    let closest = frontWaveRoute[0];
    for (const point of frontWaveRoute) {
      if (Math.abs(point.x - boatX) < Math.abs(closest.x - boatX)) {
        closest = point;
      }
    }
    const hullY = closest.y;

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255);
    // body
    p.beginShape();
    p.vertex(boatX - 52, hullY);
    p.vertex(boatX + 52, hullY);
    p.vertex(boatX + 32, hullY + 20);
    p.vertex(boatX - 32, hullY + 20);
    p.endShape(p.CLOSE);
    // pole
    p.rect(boatX - 1, hullY - 92, 4, 92);
    // sail
    p.beginShape();
    p.vertex(boatX, hullY - 88);
    p.vertex(boatX, hullY - 8);
    p.vertex(boatX + 48, hullY - 12);
    p.endShape(p.CLOSE);
  // niche reference on sail
    p.noStroke();
    p.fill(0);
    p.textFont("monospace");
    p.textAlign(p.LEFT, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(9);
    p.text("tan(90)", boatX + 2, hullY - 22);
  }

    // second boat
  if (backWaveRoute.length > 0) {
    const boat2X = w / 2 + 110;
    let closest2 = backWaveRoute[0];
    for (const point of backWaveRoute) {
      if (Math.abs(point.x - boat2X) < Math.abs(closest2.x - boat2X)) {
        closest2 = point;
      }
    }
    const hull2Y = closest2.y;

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255);
    // hull 
    p.beginShape();
    p.vertex(boat2X - 40, hull2Y);
    p.vertex(boat2X + 40, hull2Y);
    p.vertex(boat2X + 27, hull2Y + 18);
    p.vertex(boat2X - 27, hull2Y + 18);
    p.endShape(p.CLOSE);
    // mast
    p.line(boat2X, hull2Y - 54, boat2X, hull2Y);
    // sail 
    p.beginShape();
    p.vertex(boat2X, hull2Y - 50);
    p.vertex(boat2X, hull2Y - 4);
    p.vertex(boat2X - 26, hull2Y - 6);
    p.endShape(p.CLOSE);
    // reference to niche reference heheheha
    p.noStroke();
    p.fill(0);
    p.textFont("monospace"); 
    p.textAlign(p.RIGHT, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(24);
    p.text("∞", boat2X - 2, hull2Y - 15);
  }
 // boat 3
   if (furtherWaveRoute.length > 0) {
    const boat3X = w / 2 - 110;
    let closest3 = furtherWaveRoute[0];
    for (const point of furtherWaveRoute) {
      if (Math.abs(point.x - boat3X) < Math.abs(closest3.x - boat3X)) {
        closest3 = point;
      }
    }

    const hull3Y = closest3.y;

    p.stroke(0);
    p.strokeWeight(2);
    p.fill(255);
    
    p.beginShape();
    p.vertex(boat3X - 40, hull3Y);
    p.vertex(boat3X + 40, hull3Y);
    p.vertex(boat3X + 27, hull3Y + 18);
    p.vertex(boat3X - 27, hull3Y + 18);
    p.endShape(p.CLOSE);
    
    p.line(boat3X, hull3Y - 51, boat3X, hull3Y);
    
    p.beginShape();
    p.vertex(boat3X, hull3Y - 50);
    p.vertex(boat3X, hull3Y -4);
    p.vertex(boat3X - 55, hull3Y - 6);
    p.endShape(p.CLOSE)

    p.beginShape();
    p.vertex(boat3X, hull3Y - 50);
    p.vertex(boat3X, hull3Y - 4);
    p.vertex(boat3X + 48, hull3Y - 6);
    p.endShape(p.CLOSE);
    
    p.noStroke();
    p.fill(0);
    p.textFont("monospace");
    p.textAlign(p.RIGHT, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(12);
    p.text("undef", boat3X - 2, hull3Y - 15);
    
    p.noStroke();
    p.fill(0);
    p.textFont("monospace");
    p.textAlign(p.LEFT, p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(12);
    p.text("ined", boat3X + 2, hull3Y - 15);
  
  }




  dashedLine(p, margin, 930, w - margin, 930, 6, 5);

  const barcodeValue = "receipt.hackclub.com";
  drawBarcode(p, barcodeValue, w / 2, 960);

  p.noStroke();
  p.fill(0);
  p.textFont("monospace");
  p.textAlign(p.CENTER, p.TOP);
  p.textStyle(p.NORMAL);
  p.textSize(10);
  p.text(barcodeValue, w / 2, 1024);
}

function drawBarcode(p, value, centerX, y) {
  const barcodeCanvas = document.createElement("canvas");
  JsBarcode(barcodeCanvas, value, {
    format: "CODE128",
    width: 1,
    height: 52,
    displayValue: false,
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000",
  });
  // Draw directly on p5's canvas: p.image expects a p5 image wrapper, while
  // JsBarcode returns a regular browser canvas.
  p.drawingContext.drawImage(barcodeCanvas, Math.floor(centerX - barcodeCanvas.width / 2), y);
}

function dashedLine(p, x1, y1, x2, y2, dash, gap) {
  p.stroke(0);
  p.strokeWeight(2);
  for (let x = x1; x < x2; x += dash + gap) {
    p.line(x, y1, Math.min(x + dash, x2), y2);
  }
}
