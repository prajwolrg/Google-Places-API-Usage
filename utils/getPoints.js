/**
 * Creates a series of equally-spaced points around the center latitude and lngitude
 * @param  {Number} lat The center latitude
 * @param  {Number} lng The center lngitude
 * @param  {Number} dlat (in meters) The distance you would like to move in each iteration away from lat
 * @param  {Number} dlng (in meters) The distance you would like to move in each iteration away from lng
 * @param  {Number} concentricIteration The total iteration you would like to do outside the center {lat} and {lng}.
 * @return {Array} The points around the center {lat} and {lng}
 */

function getPoints(lat, lng, dlat, dlng, concentricIteration) {
    let centerPoints = [];
    centerPoints.push(`${lat},${lng}`);
    for (let i = 0; i < concentricIteration; i++) {
        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lat = lat - (dlat / r_earth) * (180 / Math.PI); //dlat towards west
            } else {
                lat = lat + (dlat / r_earth) * (180 / Math.PI); //dlat towards right
            }
            centerPoints.push(`${lat},${lng}`);
        }

        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lng =
                    lng +
                    ((dlng / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //dlng towards north
            } else {
                lng =
                    lng -
                    ((dlng / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //dlng towards south
            }
            centerPoints.push(`${lat},${lng}`);
        }
    }
    console.log(centerPoints);
    return centerPoints;
}
