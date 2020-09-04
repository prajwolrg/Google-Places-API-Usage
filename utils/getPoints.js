/**
 * Creates a series of equally-spaced points around the center latitude and longitude
 * @param  {Number} lat The center latitude
 * @param  {Number} long The center longitude
 * @param  {Number} dlat (in meters) The distance you would like to move in each iteration away from lat
 * @param  {Number} dlong (in meters) The distance you would like to move in each iteration away from long
 * @param  {Number} concentricIteration The total iteration you would like to do outside the center {lat} and {long}.
 * @return {Array} The points around the center {lat} and {long}
 */

function getPoints(lat, long, dlat, dlong, concentricIteration) {
    let centerPoints = [];
    centerPoints.push(`${lat},${long}`);
    for (let i = 0; i < concentricIteration; i++) {
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
