const properties = [
    { id: 1, title: "Luxury Apartment", location: "New York", price: 1500, bedrooms: 2, image: "image1.jpg" },
    { id: 2, title: "Cozy Studio", location: "Los Angeles", price: 900, bedrooms: 1, image: "image2.jfif" },
    { id: 3, title: "Modern House", location: "Chicago", price: 2500, bedrooms: 3, image: "image3.jpg" },
    { id: 4, title: "Mordern villa", location: "America", price: 2000, bedrooms: 2, image: "image4.jpg"},
    { id: 5, title: "Wooden House", location: "Canada", price: 3000, bedrooms: 3, image: "image5.jpg"},
    { id: 6, title: "Igloo", location: "Antartica", price: 5000, bedrooms: 1, image: "image6.jpg"},
    // Add more properties here...
];

function displayProperties(filteredProperties) {
    const listings = document.getElementById("property-listings");
    listings.innerHTML = ""; // Clear previous listings

    filteredProperties.forEach(property => {
        const propertyCard = `
            <div class="property-card">
                <img src="${property.image}" alt="${property.title}" class="property-image">
                <h3>${property.title}</h3>
                <p>Location: ${property.location}</p>
                <p>Price: $${property.price}</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <button class="book-now-btn" onclick="bookProperty(${property.id})">Book Now</button>
            </div>
        `;
        listings.innerHTML += propertyCard;
    });
}

function applyFilters() {
    const locationFilter = document.getElementById("location-filter").value;
    const priceFilter = document.getElementById("price-filter").value;
    const bedroomFilter = document.getElementById("bedroom-filter").value;

    let filteredProperties = properties;

    if (locationFilter) {
        filteredProperties = filteredProperties.filter(prop => prop.location === locationFilter);
    }

    if (priceFilter) {
        const [min, max] = priceFilter.split("-").map(Number);
        filteredProperties = filteredProperties.filter(prop => prop.price >= min && prop.price <= max);
    }

    if (bedroomFilter) {
        filteredProperties = filteredProperties.filter(prop => prop.bedrooms == bedroomFilter);
    }

    displayProperties(filteredProperties);
}

function bookProperty(propertyId) {
    alert(`Property ID ${propertyId} booked!`);
}

// Initial display of all properties
displayProperties(properties);






let cart = [];

function bookProperty(propertyId) {
    const property = properties.find(prop => prop.id === propertyId);
    cart.push(property);
    updateCart();
}

function updateCart() {
    let cartSection = document.getElementById("cart");
    if (!cartSection) {
        cartSection = document.createElement("div");
        cartSection.id = "cart";
        document.body.appendChild(cartSection);
    }

    let totalCost = 0;
    cartSection.innerHTML = `<h2>Booked Properties:</h2>`;
    cart.forEach((item, index) => {
        totalCost += item.price;
        cartSection.innerHTML += `
            <div>
                ${item.title} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    cartSection.innerHTML += `<h3>Total Cost: $${totalCost}</h3>`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    alert(`Checkout process started. Total Cost: $${cart.reduce((sum, prop) => sum + prop.price, 0)}`);
    // Implement further checkout logic here
}
