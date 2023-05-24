document.addEventListener("DOMContentLoaded", function() {
    fillDropdown(mountainsArray);

    document.getElementById("selectMountainForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let selectedMountainName = document.getElementById("mountainSelect").value;
        displayMountain(mountainsArray.find(mountain => mountain.name === selectedMountainName));
    });
});

function fillDropdown(mountains) {
    let dropdown = document.getElementById("mountainSelect");
    mountains.forEach(mountain => {
        let option = document.createElement("option");
        option.value = mountain.name;
        option.text = mountain.name;
        dropdown.add(option);
    });
}

async function displayMountain(mountain) {
    let mountainInfo = document.getElementById("mountainInfo");
    mountainInfo.innerHTML = "";

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("col-md-6");

    let name = document.createElement("p");
    name.innerHTML = `<strong>Name:</strong> ${mountain.name}`;
    infoDiv.appendChild(name);

    let elevation = document.createElement("p");
    elevation.innerHTML = `<strong>Elevation:</strong> ${mountain.elevation}`;
    infoDiv.appendChild(elevation);

    let effort = document.createElement("p");
    effort.innerHTML = `<strong>Effort:</strong> ${mountain.effort}`;
    infoDiv.appendChild(effort);

    let desc = document.createElement("p");
    desc.innerHTML = `<strong>Description:</strong> ${mountain.desc}`;
    infoDiv.appendChild(desc);

    let sunsetSunriseData = await getSunsetForMountain(mountain.coords.lat, mountain.coords.lng);
    let sunrise = document.createElement("p");
    sunrise.innerHTML = `<strong>Sunrise (UTC):</strong> ${sunsetSunriseData.results.sunrise}`;
    infoDiv.appendChild(sunrise);

    let sunset = document.createElement("p");
    sunset.innerHTML = `<strong>Sunset (UTC):</strong> ${sunsetSunriseData.results.sunset}`;
    infoDiv.appendChild(sunset);

    let imgDiv = document.createElement("div");
    imgDiv.classList.add("col-md-6");

    let img = document.createElement("img");
    img.src = `images/${mountain.img}`;
    img.alt = mountain.name;
    img.classList.add("img-fluid", "mountain-img");
    img.dataset.url = mountain.url;
    imgDiv.appendChild(img);

    img.addEventListener("click", function() {
        // Get the URL from the data attribute
        let newPageUrl = this.dataset.url;

        // Navigate to the new page
        window.open(newPageUrl, "_blank")
    });

    mountainInfo.appendChild(infoDiv);
    mountainInfo.appendChild(imgDiv);
}

async function getSunsetForMountain(lat, lng) {
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}