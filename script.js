const mediaInstituto = {
    agua: 120000,
    servicios: 6000,
    material: 3600,
    fibra: 1200,
    electricidad: 60000
};

const recomendaciones = {
    agua: "💧 Reduce el consumo instalando sistemas de reutilización y evitando fugas.",
    servicios: "🔌 Controla los gastos extraordinarios optimizando los recursos.",
    material: "🛒 Compra solo lo necesario y fomenta el reciclaje de materiales.",
    fibra: "📶 Evalúa planes de internet más económicos y eficientes.",
    electricidad: "💡 Apaga dispositivos cuando no se usen y usa iluminación LED."
};

function calcularConsumoPeriodo(consumoBase, meses) {
    return (consumoBase * meses).toFixed(2);
}

function calcular() {
    let consumoAgua = parseFloat(document.getElementById("agua").value) || 0;
    let consumoServicios = parseFloat(document.getElementById("servicios").value) || 0;
    let consumoMaterial = parseFloat(document.getElementById("material").value) || 0;
    let consumoFibra = parseFloat(document.getElementById("fibra").value) || 0;
    let consumoElectricidad = parseFloat(document.getElementById("electricidad").value) || 0;
    
    let fechaInicio = new Date(document.getElementById("fechaInicio").value);
    let fechaFin = new Date(document.getElementById("fechaFin").value);

    if (isNaN(fechaInicio) || isNaN(fechaFin) || fechaFin <= fechaInicio) {
        alert("Por favor, selecciona fechas válidas.");
        return;
    }

    let diferenciaMeses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 + (fechaFin.getMonth() - fechaInicio.getMonth());
    let factorTiempo = diferenciaMeses / 12;
    
    document.getElementById("agua_periodo").innerText = calcularConsumoPeriodo(consumoAgua, diferenciaMeses);
    document.getElementById("servicios_periodo").innerText = calcularConsumoPeriodo(consumoServicios, diferenciaMeses);
    document.getElementById("material_periodo").innerText = calcularConsumoPeriodo(consumoMaterial, diferenciaMeses);
    document.getElementById("fibra_periodo").innerText = calcularConsumoPeriodo(consumoFibra, diferenciaMeses);
    document.getElementById("electricidad_periodo").innerText = calcularConsumoPeriodo(consumoElectricidad, diferenciaMeses);

    let mensaje = "¡Felicidades! Tu consumo está dentro de la media.";
    let recomendacionesHtml = "<h3>Recomendaciones</h3><ul>";
    let exceso = false;
    
    for (let key in mediaInstituto) {
        if (eval(`consumo${key.charAt(0).toUpperCase() + key.slice(1)}`) > mediaInstituto[key] * factorTiempo) {
            recomendacionesHtml += `<li>${recomendaciones[key]}</li>`;
            exceso = true;
        }
    }
    recomendacionesHtml += "</ul>";
    document.getElementById("mensaje").innerText = mensaje;
    document.getElementById("recomendaciones").innerHTML = recomendacionesHtml;
    document.getElementById("recomendaciones").style.display = exceso ? "block" : "none";
}
