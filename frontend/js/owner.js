const API_URL = import.meta.env.VITE_API_URL;

const loginSection =
    document.getElementById("loginSection");

const dashboard =
    document.getElementById("dashboard");

const loginForm =
    document.getElementById("loginForm");


function getToken() {

    return localStorage.getItem(
        "ownerToken"
    );
}


loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const phone =
            document.getElementById(
                "phone"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        try {

            const response =
                await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            phone,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (!data.success) {

                document.getElementById(
                    "loginMessage"
                ).textContent =
                    data.message;

                return;
            }

            localStorage.setItem(
                "ownerToken",
                data.token
            );

            showDashboard();

        } catch (error) {

            console.error(error);

            document.getElementById(
                "loginMessage"
            ).textContent =
                "Server error";
        }
    }
);


async function showDashboard() {

    loginSection.style.display =
        "none";

    dashboard.style.display =
        "block";

    await loadStatus();
}


async function loadStatus() {

    const response =
        await fetch(
            `${API_URL}/shop`
        );

    const data =
        await response.json();

    if (!data.success) return;

    document.getElementById(
        "currentStatus"
    ).textContent =
        data.shop.isOpen
            ? "SHOP IS OPEN"
            : "SHOP IS CLOSED";
}


async function updateStatus(isOpen) {

    const token = getToken();

    if (!token) {

        alert("Please login first");

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/shop/status`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        isOpen
                    })
                }
            );

        const data =
            await response.json();

        if (response.status === 401) {

            localStorage.removeItem(
                "ownerToken"
            );

            location.reload();

            return;
        }

        alert(data.message);

        await loadStatus();

    } catch (error) {

        console.error(error);

        alert("Something went wrong");
    }
}


document
    .getElementById("openButton")
    .addEventListener(
        "click",
        () => updateStatus(true)
    );


document
    .getElementById("closeButton")
    .addEventListener(
        "click",
        () => updateStatus(false)
    );


document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "ownerToken"
            );

            location.reload();
        }
    );


if (getToken()) {
    showDashboard();
}