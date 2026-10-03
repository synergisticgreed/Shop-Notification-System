const API_URL = import.meta.env.VITE_API_URL;

async function loadShop() {

    try {

        const response = await fetch(
            `${API_URL}/shop`
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        const shop = data.shop;

        document.getElementById("shopName")
            .textContent = shop.name;

        document.getElementById("shopDescription")
            .textContent = shop.description;

        document.getElementById("address")
            .textContent = shop.address;

        document.getElementById("ownerImage")
            .src = shop.ownerImage ||
            "https://via.placeholder.com/250";


        const callButton =
            document.getElementById("callButton");

        callButton.href = `tel:${shop.phone}`;


        updateStatus(shop.isOpen);

        renderServices(shop.services);

        renderTestimonials(shop.testimonials);

    } catch (error) {

        console.error(error);

        document.getElementById("status")
            .textContent = "Unable to load shop status";
    }
}


function updateStatus(isOpen) {

    const status =
        document.getElementById("status");

    status.classList.remove(
        "open",
        "closed"
    );

    if (isOpen) {

        status.textContent =
            "● OPEN NOW";

        status.classList.add("open");

    } else {

        status.textContent =
            "● CLOSED";

        status.classList.add("closed");
    }
}


function renderServices(services) {

    const container =
        document.getElementById(
            "servicesContainer"
        );

    container.innerHTML = "";

    services.forEach(service => {

        const card =
            document.createElement("div");

        card.className = "service-card";

        card.innerHTML = `
            <h3>${service}</h3>
            <p>Professional repair service available.</p>
        `;

        container.appendChild(card);
    });
}


function renderTestimonials(testimonials) {

    const container =
        document.getElementById(
            "testimonialsContainer"
        );

    container.innerHTML = "";

    testimonials.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "testimonial-card";

        const stars =
            "★".repeat(item.rating);

        card.innerHTML = `
            <div class="stars">${stars}</div>

            <p>
                "${item.comment}"
            </p>

            <strong>
                ${item.name}
            </strong>
        `;

        container.appendChild(card);
    });
}


loadShop();


// Refresh shop status every 30 seconds
setInterval(loadShop, 30000);