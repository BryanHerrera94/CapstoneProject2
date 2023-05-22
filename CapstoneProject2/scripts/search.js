document.addEventListener("DOMContentLoaded", function() {
    // Fill the dropdown menu with location data initially
    fillDropdown(locationsArray);

    // Change the dropdown menu data when a radio button is selected
    document.querySelectorAll('input[name="searchOption"]').forEach((elem) => {
        elem.addEventListener("change", function(event) {
            let searchOption = document.querySelector('input[name="searchOption"]:checked').value;
            if (searchOption === "location") {
                fillDropdown(locationsArray);
            } else if (searchOption === "parkType") {
                fillDropdown(parkTypesArray);
            }
        });
    });

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let searchOption = document.querySelector('input[name="searchOption"]:checked').value;
        let searchInput = document.getElementById("searchDropdown").value;
        searchParks(searchOption, searchInput);
    });

   
    
});

function fillDropdown(dataArray) {
    let dropdown = document.getElementById("searchDropdown");
    dropdown.innerHTML = "";

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select One";
    dropdown.add(defaultOption);


    dataArray.forEach(data => {
        let option = document.createElement("option");
        option.value = data;
        option.text = data;
        dropdown.add(option);
    });
}

function searchParks(searchOption, searchInput) {
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    if (searchOption === "location") {
        nationalParksArray.filter(park => park.State === searchInput).forEach(park => displayPark(park));
    } else if (searchOption === "parkType") {
        nationalParksArray.filter(park => park.LocationName.toLowerCase().includes(searchInput.toLowerCase())).forEach(park => displayPark(park));
    }
}

function displayPark(park) {
    let resultsDiv = document.getElementById("results");
    let container = document.createElement("div");
    container.classList.add("col-md-4", "mb-3");
    let card = document.createElement("div");
    card.classList.add("card", "flex-fill");


    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = park.LocationName;
    cardBody.appendChild(cardTitle);

    let address = document.createElement("p");
    address.classList.add("card-text");
    address.innerHTML = `<strong>Address:</strong> ${park.Address}`;
    cardBody.appendChild(address);

    let city = document.createElement("p");
    city.classList.add("card-text");
    city.innerHTML = `<strong>City:</strong> ${park.City}`;
    cardBody.appendChild(city);

    let state = document.createElement("p");
    state.classList.add("card-text");
    state.innerHTML = `<strong>State:</strong> ${park.State}`;
    cardBody.appendChild(state);

    let zip = document.createElement("p");
    zip.classList.add("card-text");
    zip.innerHTML = `<strong>Zip Code:</strong> ${park.ZipCode}`;
    cardBody.appendChild(zip);

    let phone = document.createElement("p");
    phone.classList.add("card-text");
    phone.innerHTML = `<strong>Phone:</strong> ${park.Phone}`;
    cardBody.appendChild(phone);

    let fax = document.createElement("p");
    fax.classList.add("card-text");
    fax.innerHTML = `<strong>Fax:</strong> ${park.Fax}`;
    cardBody.appendChild(fax);

    let lat = document.createElement("p");
    lat.classList.add("card-text");
    lat.innerHTML = `<strong>Latitude:</strong> ${park.Latitude}`;
    cardBody.appendChild(lat);

    let lng = document.createElement("p");
    lng.classList.add("card-text");
    lng.innerHTML = `<strong>Longitude:</strong> ${park.Longitude}`;
    cardBody.appendChild(lng);

    if (park.Visit) {
        let visitButton = document.createElement("a");
        visitButton.href = park.Visit;
        visitButton.target = "_blank";
        visitButton.classList.add("btn", "btn-primary");
        visitButton.textContent = "Visit Park";
        cardBody.appendChild(visitButton);
    }

    card.appendChild(cardBody);
    container.appendChild(card);
    resultsDiv.appendChild(container);
}