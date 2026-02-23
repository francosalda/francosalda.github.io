const tabConfig = document.getElementById('tabConfig');
const tabImpresora = document.getElementById('tabImpresora');
const panelImpresora = document.getElementById('panelImpresora');
const panelConfiguracion = document.getElementById('panelConfiguracion'); // Referencia al nuevo panel
const btnConectar = document.getElementById('btnConectar');




// Al hacer clic en IMPRESORA
tabImpresora.addEventListener('click', () => {
    // 1. Mostrar impresora y ocultar configuración
    panelImpresora.classList.remove('hidden');
    panelConfiguracion.classList.add('hidden');
    
    // 2. Gestionar estado visual de los botones
    tabImpresora.classList.add('active');
    tabConfig.classList.remove('active');
});

// Al hacer clic en CONFIGURACIÓN
tabConfig.addEventListener('click', () => {
    // 1. Mostrar configuración y ocultar impresora
    panelConfiguracion.classList.remove('hidden');
    panelImpresora.classList.add('hidden');
    
    // 2. Gestionar estado visual de los botones
    tabConfig.classList.add('active');
    tabImpresora.classList.remove('active');
});




function actualizarReloj() {
    const now = new Date();
    
    // Obtener componentes de la fecha
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const anio = now.getFullYear();
    
    // Obtener componentes de la hora
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    const segundos = String(now.getSeconds()).padStart(2, '0');

    // Armar el string final: DD/MM/YYYY HH:MM:SS
    const stringFechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    
    // Insertar en el HTML
    document.getElementById('dateDisplay').innerText = stringFechaHora;
}

// Ejecutar la función inmediatamente al cargar
actualizarReloj();

// Configurar para que se ejecute cada 1000 milisegundos (1 segundo)
setInterval(actualizarReloj, 1000);