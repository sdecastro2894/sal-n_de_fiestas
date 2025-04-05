// Evento para el formulario de contacto
document.getElementById("contacto-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        asunto: document.getElementById("asunto").value,
        mensaje: document.getElementById("mensaje").value
    };

    fetch("https://script.google.com/macros/s/AKfycbxEUi42RLlw9c9UTRGn9VcGoqcoGHyRqDcxyZxQCVOZq7HVdsCGIOZoWSg9NAPjHsFy/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    }).then(() => {
        alert("¡¡¡Mensaje enviado correctamente!!!");
    }).catch(error => console.error("Error:", error));
});