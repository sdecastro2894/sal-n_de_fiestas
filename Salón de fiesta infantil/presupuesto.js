// Evento para el formulario de presupuesto
document.getElementById("consultation-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = {
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        date: document.getElementById("date").value,
        children: document.getElementById("children").value,
        adults: document.getElementById("adults").value
    };

    fetch("https://script.google.com/macros/s/AKfycbwttEymNnxps6TEpSlwbWC8NBHp-Na7-ukyCxr7pd428S_Rr6348JhXFa8R8mK-iE0LCQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(() => {
        alert("¡¡¡Presupuesto calculado a tu medida!!!");
    }).catch(error => console.error("Error:", error));
});