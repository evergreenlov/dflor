// --- LÓGICA DE REDIRECCIÓN Y ANALÍTICAS PARA D'FLOR FLOWERS BOUTIQUE ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. CONFIGURACIÓN: REDIRECCIÓN AUTOMÁTICA INTELIGENTE (OPCIONAL)
    // Si prefieres que el código QR redirija directamente en lugar de mostrar la landing page,
    // puedes descomentar el bloque de código abajo para activarlo:
    /*
    (function smartRedirect() {
        const userLang = navigator.language || navigator.userLanguage;
        console.log("Idioma detectado:", userLang);
        
        // Ejemplo: Si el idioma del navegador es inglés, redirige a Puerto Rico Local Florist
        if (userLang.startsWith('en')) {
            window.location.replace("https://puertoricolocalflorist.com");
        } else {
            // De lo contrario, redirige a la boutique principal
            window.location.replace("https://dflorflowersboutique.com");
        }
    })();
    */

    // 2. SEGUIMIENTO DE CLICS (Métricas Locales)
    // Guardamos qué enlaces se visitan más para que puedas consultar las estadísticas desde la consola
    const links = document.querySelectorAll('.link-card, .social-btn');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('id');
            const targetUrl = link.getAttribute('href');
            
            // Incrementar contador local
            let clickStats = JSON.parse(localStorage.getItem('dflor_qr_stats') || '{}');
            clickStats[id] = (clickStats[id] || 0) + 1;
            localStorage.setItem('dflor_qr_stats', JSON.stringify(clickStats));
            
            console.log(`[D'Flor Stats] Clic en: ${id} (${clickStats[id]} visitas en este dispositivo). Destino: ${targetUrl}`);
        });
    });

    // Función para ver estadísticas en la consola
    window.verEstadisticas = () => {
        const stats = JSON.parse(localStorage.getItem('dflor_qr_stats') || '{}');
        console.log("=== ESTADÍSTICAS DE ESCANEO / CLICS ===");
        console.table(stats);
    };
    
    console.log("D'Flor Interactive QR loaded. Escribe 'verEstadisticas()' en la consola para ver los clics de este dispositivo.");
});
