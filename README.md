# jmnhello

Demo web de una lista de tareas en HTML, CSS y JavaScript puro, sin dependencias ni backend.

## Funcionalidades

- Añadir tareas desde el formulario.
- Marcar una tarea como hecha o pendiente con su casilla.
- Borrar tareas individualmente.
- Las tareas se guardan en `localStorage` del navegador, así que persisten al recargar la página.

## Estructura

```
jmnhello/
├── index.html   # Marcado de la página
├── style.css    # Estilos
├── app.js       # Lógica: carga, guardado, render y eventos
└── README.md
```

## Uso

No necesita instalación. Abre `index.html` en el navegador:

```bash
open jmnhello/index.html        # macOS
```

También puedes servirlo en local:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory jmnhello
```

y visitar `http://127.0.0.1:8000/`.

## Notas

- Los datos son locales al navegador y dispositivo. No hay sincronización entre equipos.
- La clave de almacenamiento es `jmnhello-tasks`. Borrarla desde las herramientas del desarrollador reinicia la lista.
