const form = document.getElementById("card-form");
const title = document.getElementById("card-title");
const message = document.getElementById("card-message");
const occasion = document.getElementById("occasion");
const signedBy = document.getElementById("signed-by");
const wishList = document.getElementById("wish-list");
const card = document.getElementById("birthday-card");

async function loadCard(name = "", from = "") {
    const params = new URLSearchParams();
    if (name) {
        params.set("name", name);
    }
    if (from) {
        params.set("from", from);
    }

    const response = await fetch(`/api/card?${params.toString()}`);
    const data = await response.json();

    title.textContent = data.title;
    message.textContent = data.message;
    occasion.textContent = data.occasion;
    signedBy.textContent = data.signedBy;
    wishList.innerHTML = "";

    data.wishes.forEach((wish) => {
        const item = document.createElement("li");
        item.textContent = wish;
        wishList.appendChild(item);
    });

    card.animate(
        [
            { transform: "scale(0.98)", opacity: 0.85 },
            { transform: "scale(1)", opacity: 1 }
        ],
        { duration: 450, easing: "ease-out" }
    );
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const from = document.getElementById("from").value.trim();
    await loadCard(name, from);
});

loadCard();
