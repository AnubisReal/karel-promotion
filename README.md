# Karel Studio

Web estática de promoción de negocios. HTML, CSS y JavaScript, sin instalación ni compilación.

## Antes de publicar

- En `script.js`, completa `CONTACT.email` o `CONTACT.whatsapp` (número internacional solo con dígitos, por ejemplo prefijo 34 para España). Si completas ambos, se utiliza WhatsApp.
- Karel Studio es una marca provisional. Sustituye el nombre en `index.html`, título, descripción y pie.
- Los precios son 100 €, 500 € y 1.000 € por proyecto. Los nombres y entregables son propuestas de ejemplo: valida cada servicio y las condiciones fiscales antes de publicar.
- No se almacenan ni envían datos desde la web. El visitante envía el mensaje desde su correo o WhatsApp. No hay analítica ni cookies propias; las fuentes se cargan desde Google Fonts.

## Ver en local

Desde esta carpeta:

```sh
python3 preview.py
```

Abre http://localhost:8000.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub y sube `index.html`, `styles.css`, `script.js`, `favicon.svg` `.nojekyll` y la carpeta `assets/` a la raíz de la rama `main`.
2. Ve a **Settings → Pages**.
3. Selecciona **Deploy from a branch**, rama **main**, carpeta **/ (root)**, y guarda.
4. GitHub mostrará la dirección de la web cuando termine la publicación.

Los recursos usan rutas relativas y funcionan tanto bajo `/nombre-del-repositorio/` como bajo un dominio propio.

## Conectar el dominio de Hostinger

1. En **GitHub → Settings → Pages → Custom domain**, añade tu dominio (ejemplo `tudominio.com`) y guarda. GitHub creará el archivo `CNAME`; conserva ese archivo al actualizar la web.
2. En Hostinger, abre la gestión DNS del dominio. Si los servidores DNS pertenecen a otro proveedor, haz estos cambios en ese proveedor.
3. Configura cuatro registros **A** con nombre **@**:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | TU-USUARIO.github.io |

Sustituye `TU-USUARIO` por tu usuario de GitHub, sin nombre del repositorio. Reemplaza registros A/AAAA o CNAME que entren en conflicto en esos mismos nombres; conserva los registros de correo (MX/TXT). No necesitas contratar alojamiento Hostinger para esta web: GitHub Pages la aloja y Hostinger gestiona el dominio.

4. Espera a que se propaguen los DNS y GitHub valide el dominio; puede tardar hasta 24 horas.
5. Activa **Enforce HTTPS** en GitHub Pages cuando esté disponible.

Documentación: [GitHub: dominio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Hostinger: registros A](https://support.hostinger.com/en/articles/4468886-how-to-manage-a-records).

## Dirección visual

Tipografía de gran tamaño, retícula editorial, marfil, negro y naranja. Fuentes: Space Grotesk (titulares) y DM Sans (lectura). Imagen original generada con la herramienta integrada ImageGen, guardada en `assets/studio-sculpture.png`. Prompt: escultura de asterisco naranja lacado junto a una esfera cromada sobre piedra marfil, iluminación direccional de estudio, fotografía editorial, sin texto ni marcas.

Referencias consultadas: [Awwwards — One page](https://www.awwwards.com/websites/single-page-1/) y [Paper Tiger, análisis de tipografía (julio 2026)](https://dokle.design/websites/paper-tiger-studio-website-one-typeface). La composición de esta web es original.


## Seguridad

La política CSP del HTML limita scripts y recursos a los orígenes necesarios, bloquea scripts inline, objetos, iframes, conexiones de datos y envíos HTML. El contacto conserva el flujo de WhatsApp/correo: los valores se codifican como datos en la URL y no se insertan como HTML. Referrer-Policy evita enviar la URL de origen a terceros.

La vista previa utiliza `preview.py`: sirve únicamente los recursos públicos enumerados, rechaza directorios, archivos internos y enlaces simbólicos, y añade cabeceras de seguridad. Para verla en la red local: `python3 preview.py --bind 0.0.0.0`. Es una vista previa HTTP para una red de confianza; no es un servidor de producción ni debe exponerse directamente a Internet.

En GitHub Pages activa Enforce HTTPS y verifica el dominio. Las cabeceras del servidor de vista previa no se trasladan a GitHub Pages; `frame-ancestors`, Permissions-Policy y nosniff requieren cabeceras HTTP del alojamiento y no se pueden resolver con etiquetas meta. La CSP del HTML sí se conserva. No se ha verificado todavía la configuración del dominio ni el HTTPS de producción porque la web no está desplegada.

Fuentes oficiales: [OWASP — DOM XSS](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html), [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [Python — http.server](https://docs.python.org/3/library/http.server.html), [GitHub — HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
