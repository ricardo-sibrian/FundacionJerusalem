# Formulario de Donación (Tarjeta 2D sin CVC)

Este proyecto implementa un formulario de donación en un sitio web utilizando la plataforma de pagos Stripe. El formulario está diseñado para aceptar pagos sin requerir el código de seguridad (CVC), lo que puede ser útil en ciertos contextos donde el CVC no es necesario. A continuación se ofrece una descripción detallada de la estructura, funcionalidad, y consideraciones de seguridad del proyecto.

## Índice

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Código](#estructura-del-código)
   - [HTML](#html)
   - [CSS](#css)
   - [JavaScript y Stripe](#javascript-y-stripe)
4. [Configuración del Backend](#configuración-del-backend)
5. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
6. [Cómo Contribuir](#cómo-contribuir)
7. [Licencia](#licencia)

## Descripción General

El objetivo de este proyecto es facilitar la implementación de un formulario de donación en sitios web mediante la integración con Stripe. El formulario está diseñado para ser sencillo y seguro, ofreciendo una interfaz amigable para el usuario y garantizando la protección de la información financiera.

## Tecnologías Utilizadas

- **HTML5:** Estructura básica del sitio web.
- **CSS3:** Estilos para el diseño y la presentación del formulario.
- **JavaScript (ES6):** Manejo de eventos y lógica de validación del formulario.
- **Stripe API:** Proceso de pagos seguro y confiable.

## Estructura del Código

### HTML

El documento HTML está estructurado para ser limpio y fácil de mantener. Incluye las siguientes secciones:

- **Metaetiquetas y DOCTYPE:** Definen la codificación del documento como UTF-8 y aseguran la responsividad para diferentes dispositivos.
  
- **Encabezado:** Incluye el título del documento y la carga de la fuente de Google Fonts y el script de Stripe. La inclusión de `https://js.stripe.com/v3/` es esencial para poder interactuar con la API de Stripe.

- **Cuerpo del Documento:**
  - **Contenedor Principal (`.container`):** Contiene todas las secciones del formulario.
  - **Encabezado del Formulario:** Presenta el logo de la organización y el título del formulario.
  - **Formulario de Donación:** Incluye campos para ingresar la cantidad a donar, el número de tarjeta, y la fecha de vencimiento.
  - **Mensaje de Seguridad:** Proporciona tranquilidad a los usuarios sobre la seguridad de sus datos.

### CSS

El estilo del formulario está diseñado para ser limpio y profesional, utilizando una paleta de colores neutros y un diseño centrado. Las propiedades de CSS aseguran que el formulario sea:

- **Responsivo:** Utilizando `flexbox` para centrar el contenido vertical y horizontalmente.
- **Intuitivo:** Estilos de botones y entradas aseguran que la experiencia del usuario sea fluida.
- **Atractivo:** Una caja con sombra y bordes redondeados añade una apariencia moderna al formulario.

### JavaScript y Stripe

La integración con Stripe se realiza en el script incluido al final del documento HTML:

1. **Inicialización de Stripe:**
   - Se inicializa Stripe con una clave pública, la cual es necesaria para interactuar con los elementos de la tarjeta y otros servicios de Stripe.
   
2. **Creación y Montaje de Elementos:**
   - Los elementos de la tarjeta (`cardNumber` y `cardExpiry`) se crean utilizando `stripe.elements()` y se montan en el DOM. Estos elementos son interactivos y manejan automáticamente el formato y la validación.

3. **Manejo del Formulario:**
   - Se captura el evento `submit` para evitar que el formulario se envíe de manera tradicional. En su lugar, se realiza una solicitud `POST` al servidor para crear un `PaymentIntent`.
   - Utilizando el `clientSecret` recibido del backend, se confirma el pago con la tarjeta ingresada por el usuario.

4. **Manejo de Errores y Resultados:**
   - Si se detecta un error durante el proceso de pago, se informa al usuario con un mensaje claro en rojo. Si la transacción es exitosa, se muestra un mensaje en verde.

## Configuración del Backend

Para completar la integración con Stripe, es necesario configurar un backend que maneje la creación de `PaymentIntents`. El backend debe:

1. **Recibir la Solicitud POST:** 
   - Desde el frontend, se envía la cantidad a donar al endpoint `/create-payment-intent`.
   
2. **Crear un `PaymentIntent`:**
   - Usando la clave secreta de Stripe, se crea un `PaymentIntent` con el monto especificado.

3. **Devolver el `clientSecret`:**
   - El `clientSecret` se envía de vuelta al frontend para confirmar el pago.

Ejemplo en Node.js (Express):

```javascript
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Reemplaza con tu clave secreta

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));


Consideraciones de Seguridad
Clave Pública vs. Clave Secreta: Asegúrate de que la clave secreta de Stripe nunca se exponga en el frontend. Esta clave debe manejarse exclusivamente en el servidor.

HTTPS: Siempre utiliza HTTPS para proteger la información de los usuarios durante la transmisión.

Validación en el Backend: Aunque Stripe maneja la mayoría de las validaciones, es crucial asegurarse de que el backend también valide los datos recibidos.

Cómo Contribuir
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el formulario o encuentras algún error, sigue estos pasos para contribuir:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').
Haz push a la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.
Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.


---

### **Explicación de las Secciones Adicionales:**

- **Descripción General:** Proporciona un resumen del propósito del proyecto, en este caso, la implementación de un formulario de donación utilizando Stripe.
  
- **Tecnologías Utilizadas:** Especifica las tecnologías clave utilizadas en el proyecto para que los desarrolladores sepan qué esperar.

- **Configuración del Backend:** Añade claridad sobre cómo configurar el servidor backend necesario para completar las transacciones con Stripe.

- **Consideraciones de Seguridad:** Asegura que los usuarios del código comprendan las mejores prácticas de seguridad.

- **Cómo Contribuir:** Esta sección es esencial para proyectos de código abierto, ya que invita a otros desarrolladores a participar y mejorar el proyecto.

- **Licencia:** Asegura que los términos bajo los cuales se distribuye el código sean claros.
