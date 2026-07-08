const fs = require('fs');

const svg = fs.readFileSync('src/assets/maps/Ethiopia_administrative_boundaries.svg', 'utf8');

const regex = /<path[^>]+>/gi;
let match;
const centers = [];

while ((match = regex.exec(svg)) !== null) {
  const pathData = match[0];
  if (pathData.toLowerCase().includes('#228b22')) {
    const dMatch = pathData.match(/d="([^"]+)"/);
    if (dMatch) {
      const d = dMatch[1];
      
      // Extract all numbers
      const coords = [...d.matchAll(/([0-9.-]+),([0-9.-]+)/g)];
      if (coords.length > 0) {
        // let's compute centroid of all absolute points
        let sumX = 0, sumY = 0, count = 0;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        // The first point is usually absolute.
        let first = coords[0];
        let x = parseFloat(first[1]);
        let y = parseFloat(first[2]);
        if (!isNaN(x) && !isNaN(y)) {
           centers.push({
               x: (x / 800 * 100).toFixed(2),
               y: (y / 611 * 100).toFixed(2)
           });
        }
      }
    }
  }
}
// wait, let's actually just get ALL coordinates that look like an absolute M or L
console.log("Getting all absolute M/L points for better bounding box:");
const betterCenters = [];
let mMatch;
const regex2 = /<path[^>]+>/gi;
while ((mMatch = regex2.exec(svg)) !== null) {
   const pathData = mMatch[0];
   if (pathData.toLowerCase().includes('#228b22')) {
      const dMatch = pathData.match(/d="([^"]+)"/);
      if (dMatch) {
         const d = dMatch[1];
         const points = [...d.matchAll(/[ML]\s*([0-9.-]+),([0-9.-]+)/gi)];
         if (points.length > 0) {
             let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
             for (const pt of points) {
                 const x = parseFloat(pt[1]);
                 const y = parseFloat(pt[2]);
                 if (x < minX) minX = x;
                 if (x > maxX) maxX = x;
                 if (y < minY) minY = y;
                 if (y > maxY) maxY = y;
             }
             const cx = (minX + maxX) / 2;
             const cy = (minY + maxY) / 2;
             betterCenters.push({
                 x: (cx / 800 * 100).toFixed(2),
                 y: (cy / 611 * 100).toFixed(2)
             });
         } else {
             // fallback to first m/M point
             const firstPointMatch = d.match(/[mM]\s*([0-9.-]+),([0-9.-]+)/);
             if (firstPointMatch) {
               const x = parseFloat(firstPointMatch[1]);
               const y = parseFloat(firstPointMatch[2]);
               betterCenters.push({
                 x: (x / 800 * 100).toFixed(2),
                 y: (y / 611 * 100).toFixed(2)
               });
             }
         }
      }
   }
}
console.log(JSON.stringify(betterCenters, null, 2));
