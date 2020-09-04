/**
 * Add two numbers together
 * @param  {Number} lat The center latitude
 * @param  {Number} long The center longitude
 * @param  {Number} dlat The second number
 * @param  {Number} dlong The second number
 * @return {Number}      The total of the two numbers
 */

function getPoints(lat, long, dlat, dlong, width) {
    let centerPoints = [];
    centerPoints.push(`${lat},${long}`);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lat = lat - (dlat / r_earth) * (180 / Math.PI); //dlat towards west
            } else {
                lat = lat + (dlat / r_earth) * (180 / Math.PI); //dlat towards right
            }
            centerPoints.push(`${lat},${long}`);
        }

        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                long =
                    long +
                    ((dlong / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //dlong towards north
            } else {
                long =
                    long -
                    ((dlong / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //dlong towards south
            }
            centerPoints.push(`${lat},${long}`);
        }
    }
    console.log(centerPoints);
    return centerPoints;
}
