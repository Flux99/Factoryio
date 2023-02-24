function buildProperties(n) {
  let time = n;
  let theaterCount = 0;
  let pubCount = 0;
  let commercialParkCount = 0;
  
  while (time >= 10) {
    commercialParkCount++;
    time -= 10;
  }
  
  while (time >= 5 && pubCount <= commercialParkCount*6) {
    theaterCount++;
    time -= 5;
    console.log("entered theaterCount",time);
  }
  
  while (time >= 4 && pubCount <= commercialParkCount*6) {
    pubCount++;
    time -= 4;
    console.log("entered pubCount",time);
  }

  
  
  
  let earnings = theaterCount * 1500 + pubCount * 1000 + commercialParkCount * 3000;
  
  let result = `T:${theaterCount} P:${pubCount} C:${commercialParkCount} Earnings: $${earnings}`;
  console.log(`Earnings: $${earnings}`);
  return result;
}

console.log(buildProperties(7)); // T:1 P:0 C:0 Earnings: 1500
console.log(buildProperties(8)); // T:1 P:0 C:0 Earnings: 1500
console.log(buildProperties(13)); // T:0 P:0 C:1 Earnings: 3000
