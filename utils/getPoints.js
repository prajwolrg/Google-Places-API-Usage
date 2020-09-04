function getPoints(lat, long, dy, dx, area) {
    let centerPoints = [];
    centerPoints.push(`${lat},${long}`);
    for (let i = 0; i < area; i++) {
        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lat = lat - (dy / r_earth) * (180 / Math.PI); //left
            } else {
                lat = lat + (dy / r_earth) * (180 / Math.PI);
            }
            centerPoints.push(`${lat},${long}`);
        }

        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                long =
                    long +
                    ((dx / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //up
            } else {
                long =
                    long -
                    ((dx / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180);
            }
            centerPoints.push(`${lat},${long}`);
            // centerPoints.push({ lat, long });
        }
    }
    console.log(centerPoints);
    return centerPoints;
}
