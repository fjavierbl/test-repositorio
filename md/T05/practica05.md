---
# Informació general del document
title: Práctica T05 - Videojuegos con HTML5 (Canvas)
author: Javier Beteta
date: 2022-01
subject: HTML5 CSS3 Videojuegos con HTML5 (Canvas)
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
header-right: Práctica 05
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
En el tema anterior vimos cómo crear interfaces de usuario utilizando los nuevos elementos para formularios introducidos con HTML5. También vimos cómo controlar la validación de estos formularios mediante la nueva API Forms. En este quinto tema, veremos un elemento no menos importante, el nuevo elemento **\<canvas\>** de HTML5, creado para cubrir las carencias que teníamos anteriormente para el dibujo de objetos gráficos y el desarrollo de videojuegos sin necesidad de utilizar plug-ins externos.

Nos centraremos, sobre todo, en la creación de videojuegos sencillos (dejando un poco de lado el manejo de gráficos), para lo cual, no tendremos más remedio que utilizar JavaScript, pero trabajaremos sobre un ejemplo sencillo y no nos meteremos en detalles demasiado complejos.
Asimismo, en temas anteriores vimos cómo crear transiciones (pequeñas animaciones) sobre elementos de nuestra página. Veremos en este tema, cómo encadenar estas transiciones utilizando para ello las animaciones CSS3.
Además, veremos cómo podemos controlar la reproducción de estas animaciones y encadenar una tras otra, utilizando para ello los nuevos eventos para animaciones incorporados al lenguaje JavaScript.

# Videojuegos con HTML5

Al comienzo del curso hablamos sobre cómo HTML5 está reemplazando complementos o plug-ins anteriores, como Flash o Java applets, por ejemplo. Había dos cosas importantes a considerar para independizar a la web de tecnologías desarrolladas por terceros: procesamiento de video y aplicaciones gráficas. El elemento **\<video\>** y la API para medios cubren el primer aspecto muy bien, pero nos faltaría cubrir el tema de los gráficos y los videojuegos. La API Canvas se hace cargo del aspecto gráfico y lo hace de una forma extremadamente efectiva. Canvas nos permite dibujar, presentar gráficos en pantalla, animar y procesar imágenes y texto, y trabaja junto con el resto de la especificación para crear aplicaciones completas e incluso videojuegos en 2 y 3 dimensiones para la web.
Esta API ofrece una de las más poderosas características de HTML5. Permite a desarrolladores trabajar con un medio visual e interactivo para proveer capacidades de aplicaciones de escritorio para la web.
## El elemento **\<canvas\>**

Este elemento genera un espacio rectangular vacío en la página web (lienzo), en el cual serán mostrados los resultados de ejecutar los m´wtodos provistos por la API. Al crearlo, obtendremos únicamente un espacio en blanco, como un elemento **\<div\>** vacío, pero con un propósito totalmente diferente.

```html
     <canvas id="lienzo" width="500" height="300">
          Su navegador no soporta el elemento canvas
     </canvas>
```
Como se puede observar en el ejemplo, sólo es necesario especificar unos pocos atributos para este elemento. Los atributos width (ancho) y height (alto) declaran el tamaño del lienzo en píxeles. Estos atributos son necesarios debido a que todo lo que sea dibujado sobre el elemento tendrá esos valores como referencia. Siempre indicaremos un atributo id, para poder acceder fácilmente al elemento desde el código JavaScript.
Básicamente, lo que hace el elemento **\<canvas\>** es crear una caja vacía en la pantalla. Después, a través de JavaScript, utilizaremos los nuevos métodos y propiedades introducidos por la API para sacarle el máximo partido a esta superficie.
Por razones de compatibilidad, en caso de que el navegador no soporte este elemento, el contenido entre las etiquetas **\<canvas\>** será mostrado por pantalla.

## Acceder al elemento **\<canvas\>** desde JavaScript

Para acceder al elemento **\<canvas\>** desde JavaScript, en primer lugar, accederemos al objeto DOM del elemento, normalmente, a través del método getElementById, y posteriormente, utilizaremos el método getContext para obtener el contexto de dibujo, sobre el cual, podremos dibujar.

```javascript
     var lienzo=null, canvas=null;
     function iniciar() {
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
     }
     window.addEventListener("load", iniciar, false);
```

En el ejemplo, guardamos una referencia al elemento **\<canvas\>** en la variable elemento y el contexto de dibujo lo creamos utilizando getContext('2d'). Con esto obtenemos un contexto para dibujar en 2 dimensiones. Las últimas versiones de los navegadores, ya soportan el contexto en 3 dimensiones, pero por motivos obvios de tiempo, no lo veremos en este curso.
El contexto de dibujo del lienzo será una tabla de píxeles listados en filas y columnas de arriba a abajo y de izquierda a derecha, con su origen (el píxel 0,0) ubicado en la esquina superior izquierda del lienzo.

## Dibujando en el lienzo

Una vez que tenemos acceso al contexto del **\<canvas\>** podemos comenzar a crear y manipular gráficos. La API Canvas dispone de una extensa lista de herramientas para este propósito, desde la creación de simples formas y métodos de dibujo, hasta texto, sombras o transformaciones complejas. No vamos a estudiar con detenimiento las posibilidades gráficas que nos ofrece este API, pero sí que veremos las nociones básicas necesarias para poder desarrollar un pequeño videojuego.

### Dibujando rectángulos
Normalmente, el desarrollador deberá preparar la figura a ser dibujada en el contexto, pero existen algunos métodos que nos permiten dibujar directamente en el lienzo, sin preparación previa. Estos métodos son específicos para formas rectangulares y son los únicos que generan una forma primitiva (para obtener otras formas tendremos que combinar otras técnicas de dibujo y trazados complejos). Para el propósito que nos ocupa, nos bastará con ver el método *fillRect(x, y, ancho, alto)* que dibuja un rectángulo relleno. La esquina superior izquierda estará ubicada en la posición especificada por los parámetros x e y. Los parámetros ancho y alto declaran el tamaño.

```javascript
     var lienzo=null, canvas=null;
     function iniciar() {
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          lienzo.fillRect(110,110,100,100);
     }
     window.addEventListener("load", iniciar, false);
```
En el ejemplo, el contexto fue asignado a la variable global lienzo, y ahora usamos esta variable para referenciar el contexto en cada método de dibujo.
El método *fillRect(110,110, 100,100)* del ejemplo, dibuja un rectángulo relleno, comenzando desde la posición 110,110 del lienzo y con un ancho y un alto de 100 píxeles, es decir, se tratará de un cuadrado.

### Colores
Hasta el momento, hemos usado el color por defecto (negro), pero podemos especificar el color que queremos aplicar utilizando la propiedad fillStyle. Esta propiedad declara el color para el interior de la figura (el relleno).
Podemos modificar el ejemplo anterior de la siguiente forma para cambiar el color del cuadrado:
```javascript
     var lienzo=null, canvas=null;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          lienzo.fillStyle="#000099";
          lienzo.fillRect(110,110,100,100);
     }
     window.addEventListener("load", iniciar, false);
```
En el ejemplo, los colores fueron declarados usando números hexadecimales. También podemos usar funciones como *rgb()*, o incluso, especificar transparencia para la figura aprovechando la función *rgba()*. Estos métodos deben ser escritos entre comillas (por ejemplo, *fillStyle="rgba(255,165,0,1)")*.
Cuando especificamos un nuevo color este se convertirá en el color por defecto para el resto de los dibujos, a menos que volvamos a cambiarlo más adelante.

### Gradientes
Al igual que en CSS3, los gradientes en la API Canvas pueden ser lineales o radiales, y pueden incluir puntos de terminación para combinar colores:
- *createLinearGradient(x1, y1, x2, y2)*: este método crea un objeto que luego será usado para aplicar un gradiente lineal al lienzo.
- *createRadialGradient(x1, y1, r1, x2, y2, r2)*: este método crea un objeto que luego será usado para aplicar un gradiente circular o radial al lienzo usando dos círculos. Los valores representan la posición del centro de cada círculo y sus radios.
- addColorStop(posición, color): este método especifica los colores que usará el gradiente. El atributo posición es un valor entre 0.0 y 1.0 que determina dónde la degradación comenzará para ese color en particular.

```javascript
     var lienzo=null, canvas=null;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          var gradiente=lienzo.createLinearGradient(0,0,10,100);
          gradiente.addColorStop(0.5, '#0000FF');
          gradiente.addColorStop(1, '#000000');
          lienzo.fillStyle=gradiente;
          lienzo.fillRect(10,10,100,100);
     }
     window.addEventListener("load", iniciar, false);
```
![Gradiente Azul](img/gradiente-azul.png)

Como vemos, creamos el objeto gradiente desde la posición (0,0) a la (10,100), otorgando una leve inclinación hacia la izquierda. Los colores los declaramos con el método *addColorStop()* y el gradiente logrado se aplica a la propiedad *fillStyle*, como si se tratara de un color regular.
Es importante tener en cuenta que las posiciones del gradiente corresponden al lienzo, no a las figuras que queremos afectar. Por lo tanto, si movemos el rectángulo dibujado a una nueva posición, el gradiente cambiará.

### Dibujar textos
Escribir texto en el lienzo es tan simple como definir unas pocas propiedades y llamar al m´wtodo apropiado. Para configurar como se insertará el texto disponemos de tres propiedades:
- *Font*: Esta propiedad tiene una sintaxis similar a la propiedad font de CSS, y acepta los mismos valores.
- *textAlign*: Esta propiedad alinea el texto. Existen varios valores posibles: start (comienzo), end (final), left (izquierda), right (derecha) y center (centro).
- *textBaseline*: Esta propiedad es para alineamiento vertical. Establece diferentes posiciones para el texto. Los posibles valores son: top, hanging, middle, alphabetic, ideographic y bottom.
Para dibujar un texto con las letras rellenas utilizaremos el método *fillText(texto, x, y)*. Del mismo modo que el método fillRect para el trazado, este método dibujará el texto especificado en la posición x, y como una figura rellena. Puede también incluir un cuarto valor para declarar el tamaño máximo. Si el texto es más extenso que este último valor, será encogido para caber dentro del espacio establecido.

```javascript
     var lienzo=null, canvas=null;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          lienzo.font="bold 24px verdana, sans-serif";
          lienzo.textAlign="start";
          lienzo.fillText("Mi mensaje", 100,100);
     }
     window.addEventListener("load", iniciar, false);
```

Como podemos ver en el ejemplo, la propiedad font puede tomar varios valores a la vez, usando exactamente la misma sintaxis que *CSS*. En este caso la propiedad textAling hace que el texto sea dibujado desde la posición 100,100 (si el valor de esta propiedad fuera *end*, por ejemplo, el texto terminaría en la posición 100,100). Finalmente, el método *fillText* dibuja un texto sólido en el lienzo.
Existen otros métodos para trabajar con textos en el API Canvas, pero con este tendremos suficiente para nuestro propósito.

### Mostrar imágenes
En el API Canvas disponemos del método drawImage para trabajar con imágenes. Este método nos permitirá dibujar una imagen en el lienzo. Sin embargo, puede recibir un número de valores que producen diferentes resultados. Estudiemos estas posibilidades:
- *drawImage(imagen, x, y)*: Esta sintaxis es para dibujar una imagen en el lienzo en la posición declarada por x e y. El primer valor es una referencia a la imagen que será dibujada.
- *drawImage(imagen, x, y, ancho, alto)*: Esta sintaxis nos permite escalar la imagen antes de dibujarla en el lienzo, cambiando su tamaño con los valores de los parámetros ancho y alto.
- drawImage(imagen, x1, y1, ancho1, alto1, x2, y2, ancho2, alto2)*: Esta es la sintaxis más compleja. Hay dos valores para cada parámetro. El propósito es cortar partes de la imagen y luego dibujarlas en el lienzo con un tamaño y una posición específica. Los valores x1 e y1 declaran la esquina superior izquierda de la parte de la imagen que será cortada. Los valores ancho1 y alto1 indican el tamaño de esta pieza. El resto de los valores (x2, y2, ancho2 y alto2) declaran el lugar donde la pieza será dibujada en el lienzo y su nuevo tamaño, el cual puede ser igual o diferente al original. Este método viene muy bien cuando tenemos sprites de imágenes, pero nosotros no los vamos a utilizar.
  
En todos los casos, el primer atributo puede ser una referencia a una imagen en el mismo documento generada por métodos como *getElementById*, o creando un nuevo objeto imagen usando métodos regulares de JavaScript. No es posible usar una URL o cargar un archivo desde una fuente externa directamente con este método.

```javascript
     var lienzo=null, canvas=null;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          var imagen=new Image();
          imagen.src="imgs/fruit.png";
          imagen.addEventListener("load", function(){
               lienzo.drawImage(imagen,20,20)}, false);
          }
     window.addEventListener("load", iniciar, false);
```
El ejemplo anterior lo único que hace es cargar la imagen y dibujarla en el lienzo. Debido a que el lienzo sólo puede dibujar imágenes que ya están completamente cargadas, necesitamos controlar esta situación escuchando al evento load de la imagen. Agregamos una escucha para este evento y declaramos una función anónima para responder al mismo. El método drawImage dentro de esta función dibujará la imagen cuando esté completamente cargada.

## Organizando el código del videojuego

Para comenzar con nuestros videojuegos, vamos a organizar un poco nuestro código, de forma que la operación de dibujo la sacaremos a una función que llamaremos paint y que recibirá el lienzo como parámetro.

```javascript
     var lienzo=null, canvas=null;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          paint(lienzo);
     }
     function paint(lienzo){
          lienzo.fillStyle='#0f0';
          lienzo.fillRect(50,50,100,60);
     }
     window.addEventListener("load", iniciar, false);
```

### Animar el canvas
En la primera parte del tema, hemos visto cómo dibujar en nuestro lienzo. Eso está bien, pero cuando desarrollamos un juego, se trata de interactuar con los objetos, no solo de dibujarlos. Por tanto, necesitamos darle movimiento a nuestros objetos gráficos.
Para mostrar la técnica haremos que nuestro rectángulo se vaya desplazando horizontalmente a lo largo del canvas. Primero, declararemos dos nuevas variables globales (x e y) y las inicializaremos.

```javascript
     var x=50,y=50;
```

A continuación, modificaremos nuestra función paint para que limpie la pantalla antes de volver a dibujar en ella (esto lo haremos dibujando un rectángulo del tamaño completo del lienzo). Posteriormente, dibujaremos de nuevo nuestro rectángulo, pero con las coordenadas actualizadas (haremos el rectángulo más pequeño para que el efecto sea más claro). Para mejorar un poco el aspecto de nuestro videojuego, dibujaremos el rectángulo relleno con un gradiente.

```javascript
     function paint(lienzo){
          var gradiente=lienzo.createLinearGradient(0,0,0,canvas.height);
          gradiente.addColorStop(0.5, '#0000FF');
          gradiente.addColorStop(1, '#000000');
          lienzo.fillStyle=gradiente;
          lienzo.fillRect(0,0,canvas.width,canvas.height);
          lienzo.fillStyle='#0f0';
          lienzo.fillRect(x,y,10,10);   
          }
```

Como se puede ver, estamos dibujando el rectángulo de fondo de color negro.
En este momento, nuestra función iniciar llama sólo una vez a la función paint, por lo tanto, se ejecutará una sola vez, es decir, todo se quedará estático. Si queremos que se comporte como una animación, tenemos que hacer que se llame a la función una y otra vez cada determinado tiempo. Para esto, crearemos una funcián *run()*, y sustituiremos la llamada a la función *paint* que hacemos en *iniciar* por una llamada a la función *run*.

```javascript
     function run(){
          setTimeout(run, 17);
          act();
          paint(lienzo);
     }

     function act(){
          if(x>canvas.width)
               x=0;
          else
               x+=2;
          }
```

En la primera línea, llamamos al método *setTimeout*. Este método, que recibe una función por parámetro, le pedirá al navegador que ejecute dicha función cuando transcurra el número de milisegundos que le indicamos como segundo parámetro.
Posteriormente, llamamos a una nueva función *act()*. Hemos visto antes que *paint* es la función que se encarga de dibujar todo el escenario en nuestro lienzo. La función *act* la usaremos para realizar todas las acciones que se producen en nuestro juego; en este caso, moveremos nuestro rectángulo sumándole 2 píxeles a nuestra variable *x* hasta que llegue al borde derecho del canvas momento en el que volverá a valer 0.

Qué tenemos por ahora:
```javascript
     var lienzo=null, canvas=null;
     var x=50,y=50;
     function iniciar(){
          canvas=document.getElementById('lienzo');
          lienzo=canvas.getContext('2d');
          run();
     }

     function run(){
          setTimeout(run, 17);
          act();
          paint(lienzo);
     }

     function act(){if(x>canvas.width) x=0; else x+=2;}

     function paint(lienzo){
          var gradiente=lienzo.createLinearGradient(0,0,0,canvas.height);
          gradiente.addColorStop(0.5, '#0000FF');
          gradiente.addColorStop(1, '#000000');
          lienzo.fillStyle=gradiente;
          lienzo.fillRect(0,0,canvas.width,canvas.height);
          lienzo.fillStyle='#0f0';
          lienzo.fillRect(x,y,10,10);
     }

     window.addEventListener("load", iniciar, false);
```

### Mejorar el rendimiento de la animación

En el pasado, para crear temporizadores en general, se utilizaba la función *setTimeout*. Pero esta función no estaba pensada para ser múltiples llamadas por segundo y consumen muchos recursos.
Para evitar este problema de rendimiento las compañías desarrolladoras de navegadores web han ideado una mejor solución para esta tarea: la función **requestAnimationFrame**. Esta función, que recibe otra función como parámetro, le pedirña al navegador que ejecute dicha función la próxima vez que pueda realizar un cuadro de animación (la frecuencia en que se repetirá la ejecución de la función dependerá del rendimiento del equipo, en máquinas actuales la frecuencia de actualización del navegador rondará los 60 cuadros por segundo). Así, mejoraremos la capacidad de manejar animaciones, consumiendo menos recursos, e incluso mandando a dormir el ciclo cuando la aplicación deja de tener el foco.
Para usar **resquestAnimationFrame**, la llamaremos en la primera línea de una función, enviando como primer parámetro esa misma función, de forma que la vuelva a llamar después del tiempo de intervalo. Con esto, nuestra función run quedará de la siguiente forma:

```javascript
     function run() {
          requestAnimationFrame(run);
          act();
          paint(lienzo);
     }
```

**requestAnimationFrame(run)** equivaldría a llamar a *setTimeout(run,17)*, pero de forma optimizada.

### Regular tiempo entre dispositivos
Para regular el tiempo entre dispositivos se pueden utilizar diversos métodos, cada uno de los cuáles con una serie de ventajas y una serie de inconvenientes.
Una posibilidad es hacer de forma asíncrona las funciones paint y act. Esto quiere decir, que cada uno se actualice a su propio ritmo, optimizando así los tiempos para ambas acciones. La desventaja, es que, en algunas ocasiones, necesitaremos que algunos valores interactúen entre las funciones act y paint, lo que podría volverse una tarea un poco más compleja con este método, pero para el videojuego que vamos a crear esto no será un problema.
La forma más sencilla de realizar un método asíncrono es usar un requestAnimationFrame para la función paint y un setTimeout para la función act. Para eso, se crean dos funciones distintas que se llaman a sí mismas continuamente:
```javascript
     function run(){
          setTimeout(run,50);
          act();    
     }
     function repaint(){
          requestAnimationFrame(repaint)
          paint(lienzo);
     }
```
Lo único que nos quedará por hacer será llamar a ambas funciones (run y repaint) al final de la función iniciar, y el juego funcionará como de costumbre.

### Usando el teclado
Nuestro rectángulo ya se mueve por el lienzo, pero para verdaderamente interactuar con él, necesitamos indicarle a dónde queremos que vaya. Para eso, necesitamos primero una variable dónde guardar la tecla presionada:

```javascript
var lastPress=null;
```

También necesitaremos crear un manejador de evento para el teclado que se encargue de almacenar la tecla presionada. El evento que nos interesa en este caso es keydown:
```javascript
     document.addEventListener('keydown', 
          function(evt){lastPress=evt.keyCode;}, false);
```
El manejador lo pondremos al final de nuestro código.

A partir de ahora, podremos tomar decisiones en el juego sabiendo la última tecla presionada. Cada tecla tiene un valor numérico, el cual tendremos que comparar para realizar la acción deseada dependiendo la tecla presionada. Como ejemplo, vamos a mostrar por pantalla cuál ha sido la última tecla presionada. Esto lo haremos en nuestra función *paint*:
```javascript
lienzo.fillText('Last Press: '+lastPress,10,30);
```
En nuestro juego, usaremos las teclas izquierda, arriba, derecha y abajo, cuyos valores numéricos son 37, 38, 39 y 40 respectivamente. Para acceder a ellas más fácilmente, crearemos las siguientes constantes:
```javascript
     const KEY_LEFT=37;
     const KEY_UP=38;
     const KEY_RIGHT=39;
     const KEY_DOWN=40;
```
Vayamos ahora al movimiento del rectángulo. Primero necesitaremos definir cuatro constantes para especificar la dirección del rectángulo:
```javascript
     const ARRIBA=0;
     const DERECHA=1;
     const ABAJO=2;
     const IZQUIERDA=3;
```
Después, necesitaremos una nueva variable que almacene la dirección de nuestro rectángulo: 
```javascript
     var dir=DERECHA;
```

El siguiente paso será modificar la dirección que tomará nuestro rectángulo dependiendo de la última tecla presionada (dentro de la función *act*):
```javascript
     if(lastPress==KEY_UP) dir=ARRIBA;
     if(lastPress==KEY_RIGHT)dir=DERECHA;
     if(lastPress==KEY_DOWN) dir=ABAJO;
     if(lastPress==KEY_LEFT) dir=IZQUIERDA;
     //A continuación, moveremos nuestro rectángulo dependiendo de la dirección que se haya indicado:
     if(dir==DERECHA) x+=10;
     if(dir==IZQUIERDA) x-=10; 
     if(dir==ARRIBA) y-=10;
     if(dir==ABAJO) y+=10;
    //Finalmente, verificaremos si el rectángulo ha salido del canvas, en cuyo caso, haremos que aparezca por el otro lado:
     if(x>=canvas.width) x=0;
     if(y>=canvas.height)y=0;
     if(x<0) x=canvas.width-10;
     if(y<0) y=canvas.height-10;
     //Como vemos, se comprueban todos los bordes del canvas.
```

### Pausar el juego
Vamos a implementar esta funcionalidad cuando se pulsa la tecla *p*. Comenzamos por crear una variabe que controle si el juego está en pausa.
```javascript
     var pause=true;
```
Ahora, encerraremos todo el contenido de nuestra función *act* en un condicional *if(!pause)*, es decir, si el juego no está en pausa.

```javascript
     if(lastPress==KEY_P) {
          pause=!pause;
          lastPress=null;     
     }
```

tendremos que crear la constante para la tecla p:

```javascript
     const KEY_P=80;
```

Por último, cuando el juego está en pausa, dibujaremos en nuestra función paint el texto "PAUSE" centrado:
```javascript
     if(pause) {
          lienzo.textAlign='center';
          lienzo.fillText('PAUSE',150,75);
          lienzo.textAlign='left';
     }
```

Ahora, cada vez que presionemos la tecla p, el juego entrará o saldrá de la pausa.

### Uso de programación orientada a objetos
En programación se llama "objeto" a un conjunto de propiedades y métodos que definen su comportamiento. Al conjunto de características definidas en base al cual se crea un objeto, se le llama "clase".
Los lenguajes de programación permiten crear clases personalizadas, además de aquellas que vienen predefinidas.
JavaScript, a diferencia de otros lenguajes, no tiene clases como tal. Pero se pueden definir funciones que actúan como clases.
Para comprender mejor lo aquí explicado, crearemos una clase para objetos de tipo rectángulo.

```javascript
     function Rectangle(x,y,width,height,color){
          this.x=x;
          this.y=y;
          this.width=width;
          this.height=height;
          this.color=color;
     }
```

Mediante la función anterior, podemos crear objetos de tipo rectángulo, como se muestra en el ejemplo siguiente:

```javascript
     var rect1=new Rectangle(50,50,100,60,"#f00");
```

Si por error se creara un objeto sin especificar todas sus propiedades, las propiedades faltantes obtendrían un valor nulo o indefinido, lo cual podría causar problemas posteriormente en nuestro código. Para prevenir esto, es recomendable que se asigne un valor predefinido en caso que no se especifique alguno de los parámetros: 
```javascript
     this.x=(x==null)?0:x;
```

Es importante asignar *this.width* y no *width* directamente, pues de esta forma, se obtiene ya su valor después de comprobarse si era nulo o no. De lo contrario, podríamos asignar un valor nulo por error a la altura, en caso que el ancho enviado haya sido nulo también.

Otra propiedad importante de los objetos, es que tienen métodos propios. Por ejemplo, añadiremos un método a la clase Rectángulo que nos permitirá saber cuándo dicho rectángulo está en intersección con otro. El método se llamará intersects y lo definiremos así:

```javascript
     this.intersects = 
          function(rect){
               if(rect!=null) {
                    return (this.x<rect.x+rect.width &&
                    this.x+this.width>rect.x &&
                    this.y<rect.y+rect.height &&
                    this.y+this.height>rect.y);
          }
          return false; 
     }
```
Este método se encontrará dentro de la función Rectangle creada anteriormente, y para llamarlo desde fuera de esta, haremos lo siguiente:
```javascript
     var colision = rect1.intersects(rect2);
```

Esta función devulve *true* si los dos rectángulos se tocan, sino, devuelve *false*.

Otro método útil:
```javascript
     this.fill=
          function(lienzo) { 
                    if(lienzo!=null) { 
                         lienzo.fillStyle=this.color; 
                         lienzo.fillRect(this.x,this.y,this.width,this.height); 
                         } 
          }
```

Mediante esta función, sólo debemos indicarle el lienzo donde se dibujará el rectángulo, y este se dibujará de forma automática.

### Uso de prototipo

Como hemos visto, JavaScript, a diferencia de otros lenguajes, no tiene clases como tales, pero se pueden usar funciones que trabajen de forma similar a las clases, agregando en su interior las variables y funciones necesarias para que los objetos creados a partir de estas se comporten de la forma deseada. Sin embargo, el método visto de incluir las funciones en el interior de la clase (que es la forma estándar en que funcionan la mayoría de los lenguajes), no es el más óptimo en JavaScript, pues cada nuevo objeto crea una copia completa de todo su contenido en la memoria RAM, incluyendo las funciones, que en esencia repiten la misma información sin necesidad, y pueden saturar la memoria en caso de trabajar con miles de objetos, como suele ocurrir en los videojuegos.
Para hacer esto correctamente en JavaScript, utilizaremos *prototipos* en lugar de clases, de esta forma, no se creará una copia de la información en la memoria RAM para cada uno de los objetos creados, permitiendo el uso de múltiples objetos con un impacto menor en la misma.

```javascript
     function Rectangle(x,y,width,height,color) {
          this.x=(x==null)?0:x;
          this.y=(y==null)?0:y;
          this.width=(width==null)?0:width;
          this.height=(height==null)?this.width:height;
          this.color = (color==null)?"#000":color;
     }

     Rectangle.prototype.intersects=function(rect) {
          if(rect!=null){
               return (this.x<rect.x+rect.width&&
               this.x+this.width>rect.x&&
               this.y<rect.y+rect.height&&
               this.y+this.height>rect.y);
               }
     }

Rectangle.prototype.fill=function(lienzo) {
     if(lienzo!=null)
          {
          lienzo.fillStyle=this.color;
          lienzo.fillRect(this.x,this.y,this.width,this.height);
          }
     }
```

Usar objetos en los videojuegos facilitará muchas de las tareas que tendremos que llevar a cabo.

### Interactuando con otros objetos
Por ejemplo, dos elementos que colisionan o un personaje que le dispara a otro. Para saber si dos elementos colisionan, es decir, hay una intersección entre ellos, no sólo nos basta con saber su posición XY, tambi´dn necesitamos conocer el alto y ancho de los elementos. Para este propósito, utilizaremos la clase *Rectangle* creada en el punto anterior.

En primer lugar, eliminaremos las variables x e y que declaramos al principio, y en su lugar, crearemos una variable que llamaremos player de tipo *Rectangle*:

```javascript
     var player=new Rectangle(40,40,10,10,”#0f0”);
```

Después, cambiaríamos la forma en que se dibuja el rectángulo:

```javascript
     player.fill(lienzo);
```

Por último, sustituiremos todos los lugares donde usábamos las variables x e y, por el acceso correcto a través del objeto player que hemos creado. Por ejemplo, donde hacíamos *x+=10*; haremos *player.x+=10;*.

Ahora, necesitaremos un nuevo elemento con el cual interactuar. En este caso, vamos a colocar en un punto aleatorio de la pantalla un nuevo rectángulo que hará las veces de comida del rectángulo inicial, de forma que, al pasar con el rectángulo inicial sobre el rectángulo de comida, la puntuación del juego se incremente y la comida se mueva a otro lugar.

Para implementar esta nueva funcionalidad, lo primero que haremos será crear una nueva variable de tipo *Rectangle* llamada *food*:

```javascript
     var food=new Rectangle(80,80,10,10,'#f00');
```

En la función *paint*, dibujaremos la comida:

```javascript
     food.fill(lienzo);
```

food.fill(lienzo);
Ahora, analizaremos si el objeto player y el objeto food colisionan, en cuyo caso, sumaremos un punto a nuestra puntuación, y cambiaremos la posición de la comida a otro lugar al azar. Para ello, primero tendremos que declarar una variable que nos servirá para almacenar nuestra puntuación, también una función random que nos será útil.

```javascript
     var score=0;
     function random(max){
          return Math.floor(Math.random()*max);
     }
```
En la función *act* comprobamos si colisionan nuestro jugador con la comida. SI es así sumaremos un punto y cambiamos de posición la comida.

```javascript
     if(player.intersects(food)) {
          score++;
          food.x=random(canvas.width/10-1)*10;
          food.y=random(canvas.height/10-1)*10;
     }
```

Por último, dibujaremos nuestra puntuación en pantalla: 
```javascript
lienzo.fillText('Score: '+score,10,40);
```
Ahora, cada vez que el rectángulo verde toque al rojo, la puntuación subirá.

### Interactuando con elementos iguales
Ya hemos visto en el punto anterior cómo hacer que un objeto interactúe con otro. El problema sería si quisiéramos, por ejemplo, querer interactuar con 50 elementos. Afortunadamente, hay una forma más sencilla de interactuar con varios elementos de propiedades iguales a través de los arrays.
Evidentemente, si queremos que el juego finalice cuando el jugador colisione con una pared, necesitaremos una variable que nos lo indique. Inicialmente el juego estará en estado Game Over.

```javascript
     var gameover=true;
     var wall=[]; // para contener la pared
     //añadimos al vector las 4 pareder
     wall.push(new Rectangle(100,50,10,10,"#999"));
     wall.push(new Rectangle(100,100,10,10,"#999"));
     wall.push(new Rectangle(200,50,10,10,"#999"));
     wall.push(new Rectangle(200,100,10,10,"#999"));
```

Pâra dibujar los elementos pared:
```javascript
     for(var i=0,l=wall.length;i<l;i++) {
          wall[i].fill(lienzo);
     }
```

Del mismo modo, comprobaremos si cada elemento pared colisiona con la comida o con el jugador.

```javascript
     for(var i=0;i<wall.length;i++) {
          if(food.intersects(wall[i]))
               {
                    food.x=random(canvas.width/10-1)*10;
                    food.y=random(canvas.height/10-1)*10;
               }
          if(player.intersects(wall[i])) {gameover=true;}
     }
```

Primero comprobamos que la comida no coincida con una pared, si es así volvemos a colocar su posución. En el segundo *if* comprobamos que el jugado no toque pared. En caso afirmativo la partida se detiene.

Más modificaciones, en la función *act* donde teníamos *if (!pause)* ahora ponemos: *(if (!pause && !gameover)*.

También queremos que vuando el juego esté en estado *Game Over* este estado se pinte en el lienzo. Para ello en el método *paint*

```javascript
     if(pause || gameover) {
          lienzo.textAlign='center';
     if(gameover)
          lienzo.fillText('GAME OVER',150,75);
     else
          lienzo.fillText('PAUSE',150,75);
          lienzo.textAlign='left';
}
```

Para terminar, tenemos que implementar alguna manera de reiniciar el juego para que se pueda volver a jugar. Lo que haremos será reiniciar el juego cuando, estando en estado Game Over, se pulse la tecla *ENTER*. Por lo tanto, tendremos que definir la constante para la tecla correspondiente:

```javascript
     const KEY_ENTER=13;
     ...
     ...
     // en la función act
     if (gameover && lastPress==KEY_ENTER){reset();}
     ...
     ...
     function reset(){
          score=0;
          dir=DERECHA;
          player.x=40;
          player.y=40;
          food.x=random(canvas.width/10-1)*10;
          food.y=random(canvas.height/10-1)*10;
     lastPress=null;
     gameover=false;
     }
```

Esta función restaurará el juego a su estado inicial, de forma que, al continuar, se vuelva a comenzar desde el principio.

**página 27 del pdf**








