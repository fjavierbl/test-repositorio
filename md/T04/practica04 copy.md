---
# Informació general del document
title: Práctica T04 - Formularios y Fuentes
author: Javier Beteta
date: 2022-01
subject: HTML5 CSS3 Formularios y Fuentes
lang: es

# Portada
titlepage: true
titlepage-rule-height: 2
titlepage-rule-color: 653097
#titlepage-background: ../background/portadaASGBD.png
page-background: ../background/background3.pdf

# Taula de continguts
toc-own-page: true
toc-title: Contenidos

# Capçaleres i peus
header-left: App WEB
header-right: Práctica 03
footer-left: Javier Beteta (Triangle)
footer-right: \thepage/\pageref{LastPage}

# Llistats de codi
listings-no-page-break: true
listings-disable-line-numbers: true

# Fitxer d'eixida


# Propietats de l'eixida (panrun)
output:
   to: pdf
   latex:
#     pdf-engine: xelatex
     from: markdown
#    template: eisvogel.latex
     listings: true
#     data-dir: /usr/share/mdfactory/
     number-sections: true
#   html:
#     highlight-style: haddock
#     number-sections: true
#     standalone: true
#     toc: true

header-includes:
   - \usepackage{lastpage}
---
# Introducción

Vamos a realizar un par de ejercicios. Primero mejoraremos yn formulario realizado con HTML4 con las mehjoras que podemos encontrar en HTML5.
En segundo lugar aplicaremos las mejoras a la web que estamos creando. Creando una nueva página con un formulario de contacto.

## Mejorar formulario.

Vamos a ver a continuación un ejemplo de formulario de registro codificado con los elementos antiguos existentes en HTML4/XHTML. Después, a medida que vayamos avanzando, mejoraremos este formulario aplicando los nuevos elementos que vayamos estudiando.

```html
<form id="registro" method="post">
     <h1>Regístrate!</h1>
     <ul>
          <li>
               <label for="nombre">Mi nombre es:</label>
               <input type="text" id="nombre" name="nombre">
          </li>
          <li>
               <label for="email">Mi email es:</label>
               <input type="text" id="email" name="email">
          </li>
          <li>
               <label for="recuerdame">Recuérdame en este equipo</label>
               <input type="checkbox" value="true" id="recuerdame">
          </li>
          <li>
               <label for="url">Mi dirección web es:</label>
               <input type="text" id="url" name="url">
          </li>
          <li>
               <label for="password">Me gustaría que mi password fuera:</label>
               <span>(al menos 6 caracteres, sin espacios)</span>
               <input type="password" id="password" name="password">
          </li>
          <li>
               <label for="conocimientos">En una escala de 1 a 10, mis conocimientos de HTML5  son:</label>
               <input type="text" id="conocimientos" name="conocimientos">
          </li>
          <li>
               <label for="fechaInicio">Por favor, inicia mi suscripción el día:</label>
               <input type="text" id="fechaInicio" name="fechaInicio">
          </li>
          <li>
               <label for="cantidad">Me gustaría recibir <input type="text" name="cantidad" id="cantidad" value="1"> copias de <cite>El manual de HTML5</cite>.</label>
          </li>
          <li>
               <label for="tambienCSS3">También reístrame para <cite>El manual de CSS3</cite></label>
               <input id="tambienCSS3" name="tambienCSS3" type="checkbox">
          </li>
          <li>
               <input type="submit" id="registro-submit" value="Envíame"/>
          </li>
     </ul>
</form>
```
Este formulario *registro.hml* lo podéis encontrar en el material de la práctica. Como así las imágenes utilizadas y el css aplicado al formulario.

![Formulario](img/formulario.png)

Para ello utilizaremos los nuevos tipos de **\<input\>** ofrecidos por HTML5.
- search
- email
- url
- tel
- number (min, max, step)
- range (min, max, step)
- color
- date, month, week, time, datetime, datetime-local (min, max)

Nuevos atributos para los campos del formulario:
- required
- placeholder
- pattern
- multiple
- form
- autofocus
- readonly

Otros tipos de campos de HTML5:
- progress: Para describir el estado actual de un proceso. Ejemplo una descarga
- meter: Elemento cuyo rango se conoce. Ejemplo espacio libre en un disco
- datalist: se utiliza junto a otros elementos como un *select*
- output: Visualizar el resultado de un cálculo.

### API Forms

Existen diferentes formas de aprovechar el proceso de validación en HTML5: podemos usar los tipos de campo para activar el proceso de validación por defecto (por ejemplo, email) o convertir un campo como text (o cualquier otro) en un campo obligatorio usando el atributo required. También podemos crear campos con validaciones especiales usando el atributo pattern para personalizar requisitos de validación. Sin embargo, cuando se trata de aplicar mecanismos complejos de validación (por ejemplo, combinando campos o comprobando los resultados de un cálculo) deberemos recurrir a nuevos recursos provistos por esta API.

#### Personalizar los mensajes de error.
Podemos crear nuestras propias validaciones con mensajes de validación personalizados usando el método *setCustomValidity(mensaje)*.
El funcionamiento es muy sencillo, si en el momento del envío alguno de los campos tiene un mensaje personalizado no vacío, el navegador entenderá que ha habido un error de validación y mostrará el mensaje en el campo indicado. El error se eliminará cuando llamemos a la función setCustomValidity pasando un mensaje vacío: *setCustomValidity("")*.

```javascript
     function iniciar() {
          registro=document.getElementById("registro");
          registro.addEventListener("invalid", accionInvalid, true);
     }

     function accionInvalid(evento) {
          /* obtenemos el elemento que no ha pasado la validación */
          var elemento = evento.target;
          elemento.style.background="yellow";
     }
     window.addEventListener("load", iniciar, false);
```
