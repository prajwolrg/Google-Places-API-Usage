const axios = require("axios");
const fs = require("fs");

// filename = "restaurants.json";
filename = "party_palaces.json";
let allRestaurants = JSON.parse(fs.readFileSync(filename));
const r_earth = 6378000;

const data_radius = 3000;

function getPoints(lat, lng, dy, dx, area) {
    let centerPoints = [];
    centerPoints.push(`${lat},${lng}`);
    for (let i = 0; i < area; i++) {
        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lat = lat - (dy / r_earth) * (180 / Math.PI); //left
            } else {
                lat = lat + (dy / r_earth) * (180 / Math.PI);
            }
            centerPoints.push(`${lat},${lng}`);
        }

        for (let j = 0; j <= i; j++) {
            if (i % 2 == 0) {
                lng =
                    lng +
                    ((dx / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180); //up
            } else {
                lng =
                    lng -
                    ((dx / r_earth) * (180 / Math.PI)) /
                        Math.cos((lat * Math.PI) / 180);
            }
            centerPoints.push(`${lat},${lng}`);
            // centerPoints.push({ lat, lng });
        }
    }
    console.log(centerPoints);
    return centerPoints;
}

async function getData(currLocation, data_type) {
    console.log("getting data for ", currLocation);
    let response = await axios.get(
        "https://maps.googleaPIs.com/maps/api/place/nearbysearch/json",
        {
            params: {
                location: currLocation, // run every time by changing index. run using 'node index.js'
                radius: data_radius,
                type: data_type,
                keyword: "party",
                key: process.env.PLACES_API_KEY,
            },
        }
    );
    console.log(response.data.status, response.data.results.length);
    allRestaurants.push(
        ...response.data.results.map((el) => {
            return { name: el.name, location: el.geometry.location };
        })
    );

    if (response.data.next_page_token) {
        pagetoken = response.data.next_page_token;
    } else {
        fs.writeFileSync(
            filename,
            JSON.stringify(
                allRestaurants.filter(
                    (restaurant, index, self) =>
                        index ===
                        self.findIndex((t) => t.name === restaurant.name)
                )
            )
        );
        return;
    }

    let interval = setInterval(async () => {
        response = await axios.get(
            "https://maps.googleaPIs.com/maps/api/place/nearbysearch/json",
            {
                params: {
                    pagetoken,
                    key: PLACES_API_KEY,
                },
            }
        );
        allRestaurants.push(
            ...response.data.results.map((el) => {
                return { name: el.name, location: el.geometry.location };
            })
        );
        if (response.data.next_page_token) {
            pagetoken = response.data.next_page_token;
        } else {
            fs.writeFileSync(
                "party_palaces.json",
                JSON.stringify(
                    allRestaurants.filter(
                        (restaurant, index, self) =>
                            index ===
                            self.findIndex((t) => t.name === restaurant.name)
                    )
                )
            );
            clearInterval(interval);
        }
    }, 7000);
}

async function getMultipleData() {
    getPoints(27.7172, 85.324, data_radius, data_radius, 5);
    console.log(centerPoints.length);

    let i = 0;
    const outsideInterval = setInterval(async () => {
        await getData(centerPoints[i], "restaurant");
        i++;
        if (i == centerPoints.length) {
            clearInterval(outsideInterval);
        }
    }, 5000);
}

getMultipleData();
