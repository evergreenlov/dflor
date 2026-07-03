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

    // 2. CONTENIDO DINÁMICO: SALUDO SEGÚN LA HORA Y AÑO AUTOMÁTICO
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hora = new Date().getHours();
        let saludo;
        if (hora >= 5 && hora < 12) {
            saludo = '🌅 ¡Buenos días! Flores frescas para empezar tu día';
        } else if (hora >= 12 && hora < 19) {
            saludo = '🌸 ¡Buenas tardes! Estamos listos para tu pedido';
        } else {
            saludo = '🌙 ¡Buenas noches! Ordena hoy y recibe mañana';
        }
        greetingEl.textContent = saludo;
    }

    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 3. SEGUIMIENTO DE CLICS (Métricas Locales)
    // Guardamos qué enlaces se visitan más para que puedas consultar las estadísticas desde la consola
    const links = document.querySelectorAll('.link-card, .social-btn');

    links.forEach(link => {
        link.addEventListener('click', () => {
            const id = link.id || link.getAttribute('href');
            const targetUrl = link.getAttribute('href');

            // Incrementar contador local (localStorage puede fallar en modo privado)
            try {
                const clickStats = JSON.parse(localStorage.getItem('dflor_qr_stats') || '{}');
                clickStats[id] = (clickStats[id] || 0) + 1;
                localStorage.setItem('dflor_qr_stats', JSON.stringify(clickStats));
                console.log(`[D'Flor Stats] Clic en: ${id} (${clickStats[id]} visitas en este dispositivo). Destino: ${targetUrl}`);
            } catch (err) {
                console.warn("[D'Flor Stats] No se pudo guardar la estadística:", err);
            }
        });
    });

    // Función para ver estadísticas en la consola
    window.verEstadisticas = () => {
        try {
            const stats = JSON.parse(localStorage.getItem('dflor_qr_stats') || '{}');
            console.log("=== ESTADÍSTICAS DE ESCANEO / CLICS ===");
            console.table(stats);
        } catch (err) {
            console.warn("[D'Flor Stats] No se pudieron leer las estadísticas:", err);
        }
    };

    console.log("D'Flor Interactive QR loaded. Escribe 'verEstadisticas()' en la consola para ver los clics de este dispositivo.");
});
