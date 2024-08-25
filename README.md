## Formulario de Donación (Tarjeta 2D sin CVC)

Este proyecto implementa un formulario de donación utilizando la plataforma de pagos Stripe. A continuación se detalla la estructura y funcionalidad del código:

### Estructura HTML:
- **DOCTYPE y Metaetiquetas:**
  - El documento es HTML5 (`<!DOCTYPE html>`).
  - La codificación de caracteres está definida como UTF-8.
  - Se asegura la responsividad de la página con `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

- **Carga de Stripe y Estilos:**
  - Se incluye el script de Stripe para acceder a la API y manejar pagos.
  - Se cargan fuentes de Google Fonts y se definen estilos básicos.

- **Cuerpo del HTML (`<body>`):**
  - Contiene un contenedor principal (`.container`) que incluye:
    - **Encabezado:** Imagen de logo, título, y subtítulo.
    - **Formulario de Donación:** Solicita la cantidad a donar, el número de tarjeta, y la fecha de vencimiento, omitiendo el CVC.
    - **Mensaje Descriptivo:** Garantiza a los usuarios la seguridad de sus datos.

### JavaScript y Stripe:
- **Inicialización de Stripe:**
  - Se inicializa Stripe con una clave pública.
  - Se crea una instancia de `elements` para montar los elementos del formulario de tarjeta.

- **Creación y Montaje de Elementos:**
  - Se crean dos elementos: `cardNumber` y `cardExpiry`, que se montan en el DOM.

- **Manejo del Formulario:**
  - Se captura el evento `submit` del formulario para realizar una transacción segura.
  - Se realiza una petición `POST` al servidor para crear un `PaymentIntent`.
  - Se maneja la transacción mediante `stripe.confirmCardPayment`.

- **Manejo de Errores y Resultados:**
  - Si hay un error durante la transacción, se muestra un mensaje en rojo. Si es exitosa, se muestra en verde.

### Notas Importantes:
- **Clave Pública de Stripe:** La clave pública está visible, pero la clave secreta debe manejarse en el backend.
- **Servidor Backend:** Este código asume la existencia de un endpoint `/create-payment-intent` en el servidor.

Este formulario está diseñado para procesar pagos simples, específicamente donaciones, sin requerir el CVC.
