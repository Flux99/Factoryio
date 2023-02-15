function buildProperties(n) {
    let time = n;
    let theaterCount = 0;
    let pubCount = 0;
    let commercialParkCount = 0;
    
    while (time >= 10) {
      commercialParkCount++;
      time -= 10;
    }
    
    while (time >= 5 && pubCount < commercialParkCount*6) {
      theaterCount++;
      time -= 5;
    }
    
    while (time >= 4 && pubCount < commercialParkCount*6) {
      pubCount++;
      time -= 4;
    }
    
    let result = `T:${theaterCount} P:${pubCount} C:${commercialParkCount}`;
    return result;
  }
  
  console.log(buildProperties(7)); // T:1 P:0 C:0
  console.log(buildProperties(8)); // T:1 P:0 C:0
  console.log(buildProperties(13)); // T:2 P:0 C:0