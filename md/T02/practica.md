---
# Informació general del document
title: Práctica T02 - Nuevos Elementos
author: Javier Beteta
date: 2022-01
subject: HTML5 CSS3 Nuevos Elementos
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
header-right: HTML5 CSS3
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
# Ejercicio

## Elementos semánticos
En primer lugar, vamos a utilizar los nuevos elementos semánticos de HTML5 en nuestra página web del curso, para ello sustituiremos los elementos **<div>** sin contenido semántico, por los elementos adecuados de HTML5.
Debes usar los siguientes elementos en los lugares adecuados de la página index.html del tema anterior: **<header>, <nav>, <article>, <footer>, <main>, <small>** y **<address>**.
Evidentemente, al cambiar los elementos utilizados los estilos dejarán de funcionar correctamente, por lo tanto, debes cambiar la hoja de estilos para que la página se muestre tal y como se mostraba antes de usar los nuevos elementos.

## Selectores
Debes eliminar todos los atributos class e id de la página html y hacer que la hoja de estilos siga funcionando correctamente. El único id que permanecerá será el del elemento page (necesitarás utilizar algunos de los selectores vistos en este tema y algún otro de los que vimos en el tema anterior).
En el siguiente ejercicio, le aplicaremos un degradado de fondo a la imagen que aparece en el **<article>** de javascript. Debes utilizar un selector de atributo para seleccionar esta imagen. Para ello puedes utilizar el atributo src.

## Degradados
En primer lugar, eliminaremos todas las texturas utilizadas en los fondos de los elementos: *old_map.png*, *red015.jpg* y *lgrey008.jpg.*
- Para sustituir estas texturas, utilizaremos lo siguiente:
Como fondo del **<body>** pondremos un degradado de arriba abajo que se iniciará con el color rgb(227, 76, 38) y acabará con el color rgb(240, 101, 41). El degradado irá desde la posición 0% a la 90% y el color de finalización tendrá una opacidad del 0%. Para evitar un problema que surge en algunos navegadores cuando tenemos altas resoluciones de pantalla, pondremos el color de fondo del elemento **<html>** a blanco.
- En la barra de navegación, pondremos un degradado de arriba abajo iniciando en el color rgb(213, 186, 50) y finalizando en el color rgb(255, 218, 62). Ahora el color de la fuente de los enlaces será blanco y cuando se pase el ratón por encima será orange.
- En la sección de contenidos pondremos el color de fondo blanco.
También pondremos degradados en la cabecera y en el pie de la página:
- En la cabecera, pondremos un degradado de arriba abajo iniciando en el color *#0170B9* y finalizando en el color *#27AADE*.
- En el pie, utilizaremos el mismo degradado, pero en este caso irá de abajo arriba.
Finalmente, pondremos un degradado como fondo de la imagen del **<article>** de javascript (hemos obtenido el selector de la imagen en el ejercicio anterior). El degradado tendrá las siguientes características:
- Será un degradado radial.
- Se iniciará en el centro de la imagen.
- Tendrá la forma de un círculo.
- Comenzará con el color #ffffff y la posición 0%.
- Acabará con el color #cecece y la posición 200%.

## Bordes
- Para el efecto de bordes redondeado que tiene la página utilizaremos un radio de 20px (en este caso, deberemos indicarlo en varias partes de más de un elemento para que tome el aspecto que podñeis ver en la imagen resultado.jpg del fichero recursos.zip).
- En los elementos <article> debes conseguir el efecto que se muestra en la imagen resultado.jpg utilizando la imagen móvil.png para los bordes (ambas imágenes están en el fichero recursos.zip). Ten en cuenta que también deberás modificar los márgenes de los elementos.

## Sombras
- Para la sombra de la página utilizaremos 20px para los desplazamientos y la difuminación y gray para el color.
- Para la sombra de los textos de los elementos **<h2>** utilizaremos 2px para los desplazamientos, 2px para la difuminación y gray para el color.

Después de realizar todos los ejercicios, la página debe quedar así:

![Imagen final](img/resultado.jpg)

No olvidéis pasar el validador tanto a los html como a los css !!

