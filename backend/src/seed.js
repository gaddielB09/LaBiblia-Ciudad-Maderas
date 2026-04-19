import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./Models/section.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);
await Section.deleteMany({});

await Section.insertMany([
  {
    title: "Presencia de Ciudad Maderas",
    slug: "presencia",
    category: "Onboarding",
    order: 1,
    tags: ["mapa", "plazas", "estados", "usa"],
    content: `# Presencia de Ciudad Maderas

Ciudad Maderas tiene presencia en múltiples estados de México y en Estados Unidos.

## Estados Unidos
- **San Diego**, California
- **Houston**, Texas
- **Miami**, Florida

## México – Querétaro
1. Pedregal de Schoenstatt I y II
2. Ciudad Maderas Residencial Querétaro
3. Montaña, Sur I y II, Corregidora, Norte, Hacienda, San Juan del Río
4. Ciudad Maderas Privada Bosques

## Jalisco / Guanajuato
León, Privada Maderas León, Montaña León, Cañada, Norte León, San Miguel de Allende, Maderas Residencial Celaya, Pedregal de San Ángel

## Yucatán
Península, Privada Península, Hacienda Península

## Quintana Roo
Ciudad Maderas Cancún

## San Luis Potosí
San Luis Potosí, Montaña SLP, Sierra SLP

## Otras plazas
Monterrey, Aguascalientes, Puebla`,
  },

  {
    title: "Oficinas Regionales",
    slug: "oficinas-regionales",
    category: "Onboarding",
    order: 2,
    tags: ["oficinas", "direcciones", "usa", "houston", "miami", "tijuana"],
    content: `# Oficinas Regionales

## Houston
1801 Main Street, Suite 1210, ZC 7700, USA

## San Diego
651 Palomar St #17, Chula Vista, CA 91911, USA

## Miami
2001 NW 107th Ave, Suite 450, Doral, FL 33172, USA

## Tijuana
Boulevard Salinas 10650, Col. Aviación CP 22010

## Monterrey
Calz. del Valle 406, Del Valle, 66220 San Pedro Garza García, N.L.

## Chicago
5129 W Fullerton Ave, Chicago, IL 60639, USA`,
  },

  {
    title: "El Sueño Mexicano",
    slug: "sueno-mexicano",
    category: "Onboarding",
    order: 3,
    tags: ["inversión", "latinos", "mexico", "usa", "bienes raices"],
    content: `# ¡Comparte con todos el Sueño Mexicano!

En **Estados Unidos viven más de 60 millones de latinos** que sueñan con poseer una propiedad de retiro y patrimonio. El mercado potencial es **GIGANTE**.

## ¿Por qué invertir en México?

Diversificar tu portafolio de inversiones es clave; y cuando de bienes raíces se trata, la ubicación lo es todo.

- México es el **principal socio comercial de Estados Unidos**.
- Hoy en día existen más de **1 millón de americanos** que poseen propiedades en México ya sea para vivienda temporal, inversión o retiro.
- 2025 fue el año que más personas cumplieron 65 años en Estados Unidos.
- La economía mexicana ha tenido un **crecimiento estable** los últimos diez años.
- México se ha convertido en el socio manufacturero y tecnológico **número uno de Estados Unidos**.`,
  },

  {
    title: "¿Qué producto vas a vender?",
    slug: "que-producto-vender",
    category: "Onboarding",
    order: 4,
    tags: [
      "lotes",
      "casas",
      "comercial",
      "residencial",
      "productos",
      "plusvalia",
    ],
    content: `# ¿Qué producto vas a vender?

**Nuestra misión** es llevar la oportunidad del crecimiento patrimonial a todos. Creemos que, sin importar el historial crediticio, todas las familias deberían poder cumplir el sueño de ser dueño de una propiedad.

En Ciudad Maderas construimos "ciudades" en regiones estratégicas del país. Permitimos al cliente invertir en etapas muy tempranas donde desde lanzamiento a entrega obtienen **plusvalías promedio del 93% en 36 meses**.

Nuestro grupo inmobiliario lleva **más de 40 años de experiencia** en el sector y ha urbanizado más de **50,000 lotes** en sus **31 desarrollos inmobiliarios**. Contamos con más de **3,000 agentes de ventas y 100,000 clientes**.

## Lotes residenciales premium (90% del inventario)
Todos los lotes se entregan con:
- Servicios a pie de calle
- Vialidades y calles adoquinadas
- Accesos de entrada con seguridad 24/7
- Amenidades estilo "Resort"

## Lotes comerciales y de usos mixtos (5% del inventario)
Potencial de generar rentas por locales comerciales e incluso departamentos (usos mixtos) los siguientes tres pisos. **El cliente promedio invierte $900 USD por mes.**

## Casas de nivel medio residencial
Pre-venta con modelos: **Aura**, **Stella**, **Aqua** y **Domum**. Tiempos de entrega de 3 a 4 años. Financiamiento directo hasta 20 años. **El cliente promedio invierte $950 USD por mes.**

## Family Club
Más de **20 amenidades** para toda la familia: alberca semiolímpica, canchas de tenis, básquetbol y fútbol, gimnasio, salón de fiestas y más.`,
  },

  {
    title: "Ventajas competitivas",
    slug: "ventajas-competitivas",
    category: "Onboarding",
    order: 5,
    tags: ["ventajas", "competencia", "diferenciadores", "dólares", "crédito"],
    content: `# Nuestras ventajas competitivas

1. Somos el **único desarrollador mexicano** con oficinas de atención fijas en USA en la costa oeste, centro y costa este.
2. **Aceptamos pagos con tarjetas de crédito y débito americanas** en nuestro sitio web, ligas de pago y terminales físicas.
3. **Pagamos comisiones en dólares** directo en tu cuenta bancaria americana una vez por mes.
4. Damos crédito a todos tus clientes extranjeros con varios planes de enganches y hasta a **30 años sin avales, garantías, sin revisión ni impacto en historial de crédito (Fico Score)**.
5. Contamos con un "track record" de **40 años** desarrollando y miles de clientes satisfechos con lotes urbanizados.
6. Tus clientes pueden viajar a realizar un **tour a nuestros desarrollos** y ver físicamente su inversión.
7. **Servicio de post-venta** por teléfono y WhatsApp a clientes extranjeros.`,
  },

  {
    title: "¿Qué necesito para comenzar a vender?",
    slug: "comenzar-vender",
    category: "Onboarding",
    order: 6,
    tags: ["inicio", "requisitos", "asesor", "alta", "capacitación"],
    content: `# ¿Qué necesito para comenzar a vender?

- **Visión de crecimiento.** Lo que más buscamos en nuestra fuerza de ventas es compromiso para crecer juntos a largo plazo.
- **No requieres licencia** de bienes raíces en México ni en USA para promover propiedades en MX.
- **Tu primera venta activa tu cuenta de Agente de Ventas.** Para darte de alta requieres: identificación oficial vigente, cuenta bancaria, correo electrónico y teléfono celular.
- **Llevar a cabo la primera capacitación.** Ya sea vía videollamada o bien desde Universidad Maderas puedes tomar los cursos.`,
  },

  {
    title: "Esquema de comisiones",
    slug: "esquema-comisiones",
    category: "Onboarding",
    order: 7,
    tags: [
      "comisiones",
      "porcentaje",
      "agente",
      "team leader",
      "gerente",
      "ingresos",
    ],
    content: `# Esquema de comisiones

En Estados Unidos contratamos a nuestros vendedores bajo el modelo de **"independent contractors"** y obtienen una comisión fija estipulada en el contrato.

- **Agentes de Ventas: 5%**
- Team Leader: 2%
- Gerentes de Ventas: 2%

## Arranque rápido

| | Mes 1 | Mes 2 | Mes 3 en adelante |
|---|---|---|---|
| Prospectos | 50 | 50 | 50 |
| Citas | 10 | 10 | 10 |
| Ventas | 2 | 2 | 3 |
| Producción mensual | $110,000 USD | $190,000 USD | $200,000 USD |
| **Comisión total** | **$5,500 USD** | **$9,500 USD** | **$10,000 USD** |

## Niveles de asesor en México

| Nivel | Objetivo mensual | Comisión promedio |
|---|---|---|
| **Junior** | $1,500,000 MXN | $20,000 – $30,000 MXN |
| **Senior** | $3,000,000 MXN | $42,000 – $60,000 MXN |
| **Master** | $5,000,000 MXN | $70,000 – $100,000 MXN |

## Team Leader

| | Mes 1-4 | Mes 4-8 | Mes 8 en adelante |
|---|---|---|---|
| Agentes de ventas | 5 | 8 | 10 |
| Producción mensual | $500,000 USD | $750,000 USD | $1,000,000 USD |
| **Comisión total** | **$10,000 USD** | **$15,000 USD** | **$20,000 USD** |

## Gerente de ventas

| | Mes 1-4 | Mes 4 en adelante |
|---|---|---|
| Agentes en gerencia | 50 | 80 |
| Producción mensual | $1,000,000 USD | $1,500,000 USD |
| **Comisión total** | **$20,000 USD** | **$30,000 USD** |

*Escenarios basados en experiencias reales; no garantizamos este ingreso ni estamos ofreciendo una oportunidad de empleo. Cada agente tiene un tiempo de madurez diferente.*`,
  },

  {
    title: "Herramientas de Ciudad Maderas",
    slug: "herramientas",
    category: "Onboarding",
    order: 8,
    tags: [
      "herramientas",
      "CRM",
      "ARIA",
      "capacitación",
      "eventos",
      "google drive",
    ],
    content: `# ¿Qué herramientas me ofrece Ciudad Maderas?

- **Oficinas para uso comercial y atención al cliente** en Houston, Miami y San Diego.
- **Materiales impresos publicitarios:** brochures, promocionales y volantes.
- **Materiales digitales:** videos de venta, testimonios, sitio web y redes sociales.
- **Capacitación continua:** área de entrenamiento en ventas y bienes raíces presencial y en línea con Crehana.
- **Sistema de ventas:** inventario disponible de todos los desarrollos, cotizaciones, apartados, armado de expedientes y panel de comisiones.
- **ARIA:** CRM para apoyarte en tus cotizaciones, planes de ventas, procesos de venta y reportes de estadística.
- **Eventos:** activaciones, expos y conferencias para generar nuevos prospectos.
- **Red de apoyo:** cada Gerencia de Ventas se enfoca en apoyarte a desarrollar habilidades y ayudarte a comisionar rápido.`,
  },

  {
    title: "Bootcamp, Viajes y Más",
    slug: "bootcamp-viajes",
    category: "Onboarding",
    order: 9,
    tags: [
      "viajes",
      "premios",
      "bootcamp",
      "fiesta",
      "incentivos",
      "reino unido",
      "canada",
    ],
    content: `# Bootcamp, Viajes y Más

## Viajes – Premios, premios y más premios
Cada año damos premios para viajar por todo el mundo.

- 🥇 **Primer lugar:** Reino Unido
- 🥈 **Segundo lugar:** Sudeste Asiático
- 🥉 **Tercer lugar:** Canadá

## Experiencia Maderas – Viajes a los desarrollos
Cada dos meses vamos a un desarrollo en México para que conozcas y promuevas con mayor confianza nuestro producto. Te compartimos la experiencia completa: gastronomía, cultura y entretenimiento.

## Fiesta de fin de año
En diciembre se realiza la fiesta para la fuerza de ventas en Querétaro, con más de **3 mil personas**. Nuestro fundador el **Lic. Gastón Jury** muestra la visión y realiza un sorteo donde se pueden ganar terrenos, casas, autos y productos de tecnología/electrodomésticos.

## Bootcamp
Evento educativo y de networking **una vez al año** (Septiembre, Ciudad de México). Conferencistas del más alto nivel internacional en temas de ventas, desarrollo personal y marketing. Tiene un costo de recuperación pero la empresa pone la mayor parte de la inversión.`,
  },

  // ══════════════════════════════
  // VENTAS
  // ══════════════════════════════

  {
    title: "Cuentas para depositar",
    slug: "cuentas-depositar",
    category: "Ventas",
    order: 20,
    tags: [
      "cuentas",
      "banco",
      "deposito",
      "bbva",
      "bajio",
      "banregio",
      "clabe",
    ],
    content: `# Cuentas para depositar

> ⚠️ Únicamente se reciben transferencias desde la cuenta del comprador. No se recibe ningún depósito en efectivo.

## Querétaro y Montaña Querétaro
**FRACCIONADORA LA ROMITA S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 503 | 0126 8000 1133 8650 37 | NA |
| BANREGIO | 1659 9437 0021 | 0586 8000 0000 6336 90 | NA |
| BANBAJÍO | 9721 0440 0201 | 0302 2590 0000 9967 13 | 1025 |

## Bosques Querétaro
**INMOBILIARIA PLAZA QUERÉTARO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 8449 473 | 0126 8000 1184 4947 32 | NA |
| BANBAJÍO | 0354 7424 6020 1 | 0306 8090 0030 2118 09 | 2738 |

## Hacienda Norte Querétaro
**INMOBILIARIA PLAZA QUERÉTARO S.A de C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0118 4494 73 | 0126 8000 1184 4947 32 | NA |
| BANBAJÍO | 385467760201 | 0306 8090 0033 9052 06 | NA |

## Hacienda Sur Querétaro
**VALLE DE LOS MEZQUITES S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0113386619 | 0126 8000 1133 8661 91 | NA |
| BANBAJÍO | 3835 7828 0201 | 0306 8090 0033 6465 78 | 2901 |

## Corregidora y Privada Corregidora
**PROMOCIONES HABITACIONALES DEL CENTRO DE MÉXICO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3342 840 | 0126 8000 1133 4284 03 | NA |
| BANBAJÍO | 2317 3941 0201 | 0306 8090 0015 8796 35 | 2080 |
| BANREGIO | 165931780017 | 0586 8000 0007 1603 44 | NA |

## Querétaro Norte
**INMOBILIARIA PLAZA QUERÉTARO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 8449 473 | 0126 8000 1184 4947 32 | NA |
| BANBAJÍO | 3157 7364 0201 | 0306 8090 0025 6790 29 | 2604 |

## Querétaro Sur I
**CENTRO INMOBILIARIO DEL BAJÍO S.A. DE C.V.**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3278 433 | 0126 8000 1132 7843 39 | NA |
| BANREGIO | 1650 0169 0018 | 0586 80 0000 0108 0200 | NA |

## Querétaro Sur II
**VALLE DE LOS MEZQUITES S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 619 | 0126 8000 1133 8661 91 | NA |
| BANREGIO | 1659 6828 0014 | 0586 8000 0001 4901 46 | NA |

## San Juan del Río
**VALLE DE LOS MEZQUITES S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 619 | 0126 8000 1133 8661 91 | NA |
| BANBAJÍO | 4012 2962 0201 | 0306 8090 0035 7236 80 | NA |
| BANREGIO | 1659 6828 0014 | 0586 8000 0001 4901 46 | NA |

## Caribe (Cancún)
**PROMOCIONES HABITACIONALES DEL CENTRO DE MEXICO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3342 840 | 0126 8000 1133 4284 03 | NA |
| BANREGIO | 165931780017 | 0586 8000 0007 1603 44 | NA |
| BANBAJÍO | 33855990 | 0306 8090 0028 3235 76 | 2691 |

## Península
**CENTRO INMOBILIARIO DEL BAJÍO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0113278433 | 0126 8000 1132 7843 39 | NA |
| BANREGIO | 1650 0169 0018 | 0586 8000 0001 8661 52 | NA |
| BANBAJÍO | 255029070201 | 0306 8090 0018 5720 65 | 2166 |

## Privada y Hacienda Península
**CENTRO INMOBILIARIO DEL BAJÍO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0113278433 | 0126 8000 1132 7843 39 | NA |
| BANREGIO | NA | NA | NA |
| BANBAJÍO | 03359 7592 | 0306 8090 0028 0225 89 | 2676 |

## Monterrey
**VALLE DE LOS MEZQUITES SA DE CV**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0113 3866 19 | 0126 8000 1133 8661 91 | NA |
| BAJIO | 401229620201 | 030680900035723680 | 2991 |
| INVEX | 365747210201 | 030680900031664989 | 2808 |

## León
**FRACCIONADORA LA ROMITA S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BANREGIO | 1659 9437 0307 | 0586 8000 0001 8661 52 | NA |
| BBVA | 011 3386 503 | 0126 8000 1133 8650 37 | NA |
| BANBAJÍO | 9241 1590 201 | 0302 2590 0000 4947 07 | 1000 |

## Montaña León
**FRACCIONADORA LA ROMITA S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 503 | 0126 8000 1133 8650 37 | NA |
| BANREGIO | 1659 9437 0021 | 0586 8000 0000 6336 90 | NA |
| BANBAJÍO | 9721 0440 0201 | 0302 2590 0000 9967 13 | 1025 |

## Cañada León
**VALLE DE LOS MEZQUITES S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 619 | 0126 8000 1133 8661 91 | NA |
| BANBAJÍO | 3181 2746 0201 | 0306 8090 00 2594 9652 | 2605 |

## Norte León
**CENTRO INMOBILIARIO DEL BAJÍO S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3278 433 | 0126 8000 1132 7843 39 | NA |
| BANBAJÍO | 3831 1049 0201 | 0306 8090 0033 5856 84 | 2900 |

## Aguascalientes
**VALLE DE LOS MEZQUITES S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 0 113386503 | 0126 8000 1133 8650 37 | NA |
| BANBAJÍO | 365738060201 | 0306 8090 0031 6651 24 | NA |
| BANCO DEL BAJÍO | 42241547 | 0306 8090 0038 1575 12 | NA |

## San Luis Potosí y Montaña SLP
**FRACCIONADORA LA ROMITA S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 503 | 0126 8000 1133 8650 37 | NA |
| BANREGIO | 1659 9437 0102 | 0586 8000 0001 2493 97 | NA |
| BANBAJÍO | 1605 7465 0201 | 0302 2590 0007 8837 64 | 1596 |

## Sierra San Luis Potosí
**FRACCIONADORA LA ROMITA S.A DE C.V**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BBVA | 011 3386 503 | 0126 8000 1133 8650 37 | NA |
| BANBAJÍO | 3683 6666 0201 | 0306 8090 0031 8378 55 | 2804 |

## Casas Mérida
**MPS PAYMENT SYSTEMS S.C.**

| Banco | Cuenta | CLABE | Servicio |
|---|---|---|---|
| BANBAJÍO | 0342551580201 | 030680900028792644 | NA |

### Transferencias internacionales – Para dólares
| Banco intermediario | Plaza | ABA | SWIFT |
|---|---|---|---|
| Standard Chartered Bank | Nueva York, N.Y. | 026002561 | SCBLUS33 |

| Banco Beneficiario | Cuenta | CLABE | Beneficiario final |
|---|---|---|---|
| Banco del Bajío SA | 3544032457001 | 030680900028792644 | MPS PAYMENT SYSTEMS SC |

**SWIFT Banco del Bajío:** BJIOMXMLXXX
**Dirección:** Av. Bernardo Quintana No 138, Los Arcos, Querétaro, Qro, 76050

## Pagos en el extranjero – Bank of America
**Wood City LLC**

| Campo | Dato |
|---|---|
| BANK | Bank of America |
| ACCOUNT NUMBER | 4881 1729 9805 |
| ACH ROUTING NUMBER | 111000025 |
| ADDRESS | 1801 Main St suite 1200, Houston TX, 77002 |
| ZELLE | yolanda.velazquez@ciudadmaderas.com |

## Pagos en el extranjero – PNC Bank
**Wood City LLC**

| Campo | Dato |
|---|---|
| BANK | PNC Bank |
| ACCOUNT NUMBER | 4743732454 |
| ACH ROUTING NUMBER | 071921891 |
| ADDRESS | 1801 Main St Ste 1210, Houston TX, 77002 |
| ZELLE | accounting@woodcity.us |`,
  },

  {
    title: "Links de pago con tarjeta",
    slug: "links-pago",
    category: "Ventas",
    order: 21,
    tags: [
      "pago",
      "tarjeta",
      "link",
      "apartado",
      "enganche",
      "mensualidad",
      "usa",
    ],
    content: `# Links para pago con tarjeta

## Para apartados de $5,000 pesos
[https://pagosciudadmaderas.com/apartado/index.html](https://pagosciudadmaderas.com/apartado/index.html)

1. Llenar el formulario con los datos del cliente
2. Seleccionar el Desarrollo, Condominio y Lote
3. Seleccionar el nombre del asesor
4. Ingresar los datos de pago
5. Mandar comprobante de pago al asesor

*Recuerda habilitar las pantallas emergentes en tu navegador*

## Apartado y/o liquidación de enganche (cualquier cantidad)
[https://pagosciudadmaderas.com/enganche/](https://pagosciudadmaderas.com/enganche/)

1. Seleccionar el proyecto (desarrollo)
2. Poner el número de referencia del lote (buscarlo en inventario disponible dentro del CRM)
3. Seleccionar nombre del asesor
4. Ingresar los datos de pago
5. Mandar comprobante de pago al asesor

## Pago de mensualidad
[https://pagosciudadmaderas.com/pago/index.html](https://pagosciudadmaderas.com/pago/index.html)

> ⚠️ El primer pago de mensualidad se tendrá que hacer solo por transferencia o pago en efectivo en caja. Después de la segunda mensualidad se puede usar el link.

## Ligas de pago para clientes USA
- **Apartado o enganche:** [https://pagosciudadmaderas.com/enganche_usa/index.html](https://pagosciudadmaderas.com/enganche_usa/index.html)
- **Mensualidad:** [https://pagosciudadmaderas.com/pago/index.php?locale=en](https://pagosciudadmaderas.com/pago/index.php?locale=en)

*Recomendado usar estas ligas únicamente para clientes de USA.*`,
  },

  {
    title: "Estatus en el sistema de contratación",
    slug: "estatus-contratacion",
    category: "Ventas",
    order: 22,
    tags: [
      "contratación",
      "proceso",
      "estatus",
      "expediente",
      "contrato",
      "contraloría",
    ],
    content: `# Estatus en el sistema de contratación

1. **Lote Apartado** (Caja)
2. **Integración de Expediente** (Asesor) — 7 días
3. **Revisión** (Postventa) — 1 día
4. Venta de Particulares
5. **Revisión 100%** (Contraloría) — 1 día
6. **Corrida Elaborada** (Contraloría) — 2 días
7. **Contrato Elaborado** (Jurídico) — 3 días
8. **Contrato entregado a Asesor** para firma del Cliente (Asistentes) — 14 días
9. **Contrato recibido** para firma de Cliente (Contraloría) — 1 día
10. **Contrato en Firma de RL**
11. **Validación de Enganche** (Administración) — 1 día
13. **Contrato Listo y Entregado** a Asesores (Contraloría) — 1 día
14. **Firma de Acuse Cliente** (Asistente de Gerente) — 7 días
15. **Acuse Entregado** (Contraloría) — 1 día

## ¡Proceso de Contratación Terminado!`,
  },

  {
    title: "Depósito de seriedad y Tabla de plazo",
    slug: "deposito-seriedad",
    category: "Ventas",
    order: 23,
    tags: ["depósito", "seriedad", "plazo", "crédito", "edad", "meses"],
    content: `# Depósito de seriedad

## Documentación de persona moral (Mexicana o Extranjera)
- Depósito de seriedad
- Identificación oficial vigente del Representante Legal o Apoderados
- Comprobante de domicilio a nombre de la empresa o de alguno de los socios
- Acta constitutiva y/o asamblea con datos de protocolización e inscripción al registro público
- Poder del RL inscrito
- Inscripción al RFC

> Si el Acta Constitutiva y poder se encuentran en inglés, deberá exhibir la traducción y los documentos deberán ser **apostillados o legalizados**.

## Tabla de plazo de crédito

El plazo se considera de acuerdo a la **edad del cliente a la fecha de apartado**.

| Edad | Años | Meses |
|---|---|---|
| 50 años | 30 | 360 |
| 55 años | 25 | 300 |
| 60 años | 20 | 240 |
| 65 años | 15 | 180 |
| 70 años | 10 | 120 |
| 75 años | 5 | 60 |
| 80 años | 0 | 0 |

*(La tabla completa va de 50 a 80 años, restando 1 año de plazo por cada año de edad)*`,
  },

  {
    title: "Firma del contrato",
    slug: "firma-contrato",
    category: "Ventas",
    order: 24,
    tags: ["firma", "contrato", "requisitos", "enganche", "coincidencia"],
    content: `# Firma del contrato – Parámetros requeridos

- Las firmas deben coincidir con la identificación presentada.
- En caso de que no se parezcan en un **80%**, se otorgará la opción de la segunda mensualidad.
- El enganche debe estar cubierto (anexando el recibo de comprobante del complemento en copia).
- Para envíos internacionales, es necesario adjuntar la guía autorizada por el subdirector.

## Tabla de coincidencia de firmas

| Coincidencia | Resultado |
|---|---|
| 100% | Pago en la **primera** mensualidad |
| 79% | Pago en la **segunda** mensualidad |
| 50% | Pago en la **tercera** mensualidad |
| Menos del 50% | **Reimpresión** |

> ⚠️ Para clientes extranjeros es **obligatorio** incluir un video donde el cliente confirme que está contratando el lote, mencionando su nombre completo, el desarrollo, clúster y número de lote.`,
  },

  {
    title: "Inicio de mensualidad",
    slug: "inicio-mensualidad",
    category: "Ventas",
    order: 25,
    tags: ["mensualidad", "enganche", "fechas", "inicio", "apartado"],
    content: `# Inicio de mensualidad

## Regla general

| Enganche | Inicio de mensualidad |
|---|---|
| 1% | 1 mes después del apartado |
| 5% / 10% | 2 meses después del apartado |

## Tabla de fechas

| Fecha de apartado | 1% de enganche | 5% y 10% de enganche |
|---|---|---|
| Enero | Febrero | Marzo |
| Febrero | Marzo | Abril |
| Marzo | Abril | Mayo |
| Abril | Mayo | Junio |
| Mayo | Junio | Julio |
| Junio | Julio | Agosto |
| Julio | Agosto | Septiembre |
| Agosto | Septiembre | Octubre |
| Septiembre | Octubre | Noviembre |
| Octubre | Noviembre | Diciembre |
| Noviembre | Diciembre | Enero |
| Diciembre | Enero | Febrero |

- Se puede recorrer dentro del **mismo mes** con autorización de subdirección.
- Se puede recorrer **más allá del mes** con autorización de Dirección General.`,
  },

  {
    title: "Calendario de comisiones – México",
    slug: "calendario-comisiones-mexico",
    category: "Ventas",
    order: 26,
    tags: [
      "comisiones",
      "calendario",
      "pagos",
      "contraloría",
      "mexico",
      "martes",
    ],
    content: `# Calendario de Comisiones 2025 – México

## Fechas clave semanales
- **Martes 2 pm** — Corte de recepción de comisiones en sistema
- **Martes 2 pm** — Corte de acuses y resguardos
- **Contraloría** — Validación de comisiones en sistema
- **Hasta 6 pm** — Límite de aclaraciones (Ticket)
- **Inicio de dispersión** de pagos (INTERNOMEX)
- **MIÉ o JUE** — Pago del 2do corte (una semana después)

## Notas importantes
- La **COMISIÓN del anticipo** se dispersa hasta que se ingrese el contrato a contraloría **(estatus 9)**.
- Si el día de pago cae en día inhábil, los recursos se pagarán al **primer hábil siguiente**.
- Pago de remanente, factura y monedero son de **1 a 2 días hábiles** después del calendario.
- Los primeros **5 días hábiles del mes**, asesores firman carta de donantes con Capital Humano.
- Las comisiones se trabajan sobre **mes vencido** (pagos hasta el día 20 del mes anterior).`,
  },

  {
    title: "Calendario de comisiones – Extranjeros",
    slug: "calendario-comisiones-usa",
    category: "Ventas",
    order: 27,
    tags: [
      "comisiones",
      "calendario",
      "pagos",
      "usa",
      "extranjeros",
      "wood city",
    ],
    content: `# Calendario de Comisiones 2025 – Extranjeros

## Fechas clave semanales
- **Martes 2:00 pm** — Corte de recepción de comisiones en sistema
- **Martes 2:00 pm** — Corte de acuses y resguardos
- **Contraloría** — Validación de comisiones en sistema
- **Hasta 6 pm** — Límite de aclaraciones (Ticket)
- **Inicio de dispersión** de pagos (INTERNOMEX)
- **Inicio de dispersión** (WOOD CITY) — Asesores extranjeros
- **MIÉ o JUE** — Pago del 2do corte

## Notas importantes
- La **COMISIÓN del anticipo** se dispersa hasta que se ingrese el contrato a contraloría **(estatus 9)**.
- Si el día de pago cae en día inhábil, los recursos se pagarán al **primer hábil siguiente**.
- Pago de remanente, factura y monedero son de **1 a 2 días hábiles** después del calendario.
- Las comisiones se trabajan sobre **mes vencido**.`,
  },

  {
    title: "Reglamento de ventas",
    slug: "reglamento-ventas",
    category: "Ventas",
    order: 28,
    tags: [
      "reglamento",
      "normas",
      "plantilla",
      "cambios",
      "bajas",
      "contratación",
      "territorialidad",
    ],
    content: `# Reglamento de ventas

**Objetivo:** Establecer orden y lineamientos de trabajo de toda la estructura de ventas de Ciudad Maderas a nivel nacional.

## Plantilla Autorizada
La estructura ordinaria autorizada como límite superior a una Gerencia es de: **10 coordinadores con 20 asesores internos** y sin límite de asesores comodín (externos).

## Contratación y Recontratación
1. Los asesores que no integren documentación en **45 días hábiles** se procede a baja directa.
2. Los asesores dados de baja pueden ser recontratados después de **3 meses**.
3. Al dar de baja, se desactiva el CRM aunque tenga comisiones por cobrar.
4. No se pueden recontratar asesores boletinados como malos elementos.

## Cambios de equipo
- Un asesor interno puede cambiar después de **4 meses** con su primer gerente.
- Requiere promedio mínimo de **$800,000 MXN** mensuales (últimos 3 meses).
- Solicitud por correo al subdirector de la plaza.

## Metas mínimas
- **Asesor interno:** $500,000 MXN mensuales
- **Coordinador:** $7.5 MDP mensuales

## Territorialidad
Un asesor que viva en un territorio donde exista estructura de liderazgo activa, deberá pertenecer a la plaza que por domicilio le corresponda.

**Penalización por incumplimiento:** 0.10% del total de comisiones por cada asesor fuera de su plaza (máximo 0.50%).

## Controversias entre asesores
La ponderación del 100% de la venta se asigna así:

| Concepto | Porcentaje |
|---|---|
| Valor del Registro | 30% |
| Valor del Seguimiento | 50% |
| Valor del Cierre | 20% |

**Factor tiempo desde la fecha de apartado:**
- 1 a 7 días → 100% de los porcentajes ganados
- 7 a 14 días → 50%
- 15 a 30 días → 25%
- Más de 30 días → 0%

## Malas prácticas (causan baja o acta administrativa)
1. Invitar activamente a asesores de otros equipos con incentivos.
2. Insubordinación con compañeros o líderes.
3. Faltar al respeto al equipo o líder.
4. Desinterés o ausentismo en juntas.
5. Falsificación de documentación, robo de clientes en eventos o zooms.

*El presente reglamento está sujeto a modificaciones y entró en vigor a partir del 11 de septiembre del 2023.*`,
  },

  {
    title: "Multas y penalizaciones",
    slug: "multas-penalizaciones",
    category: "Ventas",
    order: 29,
    tags: ["multas", "penalizaciones", "guardia", "descuento", "mkt"],
    content: `# Multas y penalizaciones – Por faltar a guardia

| Estructura | Monto |
|---|---|
| Asesor | $4,500.00 |
| Coordinador | $4,500.00 |
| Gerente | $4,500.00 |
| Subdirector | $1,500.00 |
| Dir. Regional | $1,500.00 |
| Dir. Comercial | $1,500.00 |
| **Total cadena** | **$18,000.00** |

La única manera en la que **no se descuente** es si en el CHAT se le avisa a MKT que el asesor fue al baño o a hacer alguna cuestión. Se tendrá un máximo de **20 minutos** a partir del aviso.

Se les recomienda hacer guardias de dos en dos, si es que la plaza lo permite.`,
  },

  {
    title: "Metas para viajes",
    slug: "metas-viajes",
    category: "Ventas",
    order: 30,
    tags: [
      "viajes",
      "metas",
      "premios",
      "producción",
      "gerentes",
      "coordinadores",
      "asesores",
    ],
    content: `# Metas para viajes 2025

*Montos estipulados en millones de pesos*

## Sede Tijuana / San Diego

| Lugar | Gerentes (Mensual) | Coordinadores (Mensual) | Asesores (Mensual) |
|---|---|---|---|
| 🥇 1er lugar | $17.50 M | $3.92 M | $2.00 M |
| 🥈 2do lugar | $15.00 M | $3.50 M | $1.75 M |
| 🥉 3er lugar | $12.50 M | $3.13 M | $1.50 M |

## Sede Ciudad Juárez / Houston

| Lugar | Gerentes (Mensual) | Coordinadores (Mensual) | Asesores (Mensual) |
|---|---|---|---|
| 🥇 1er lugar | $17.00 M | $3.54 M | $2.00 M |
| 🥈 2do lugar | $14.00 M | $3.15 M | $1.75 M |
| 🥉 3er lugar | $11.25 M | $2.81 M | $1.50 M |

## Sede Florida

| Lugar | Gerentes (Mensual) | Coordinadores (Mensual) | Asesores (Mensual) |
|---|---|---|---|
| 🥇 1er lugar | $15.00 M | $3.14 M | $2.00 M |
| 🥈 2do lugar | $12.50 M | $2.80 M | $1.75 M |
| 🥉 3er lugar | $10.00 M | $2.50 M | $1.50 M |`,
  },

  // ══════════════════════════════
  // POSTVENTA
  // ══════════════════════════════

  {
    title: "Manual del cliente",
    slug: "manual-cliente",
    category: "Postventa",
    order: 40,
    tags: ["manual", "cliente", "misión", "visión", "agradecimiento"],
    content: `# Manual del cliente

## Quiénes somos
Somos creadores de ciudades con más de **35 años de experiencia** en el ramo de la construcción y tenemos presencia en las ciudades con mayor crecimiento del país. Somos una empresa socialmente responsable, generadora de empleos y altos niveles de calidad de vida.

## Nuestra Misión
Generar mejores estilos de vida, basados en la innovación, garantía de plusvalía, crédito directo y seguridad de inversión en todos nuestros proyectos.

## Nuestra Visión
Ser innovadores permanentes de desarrollo urbano e inmobiliario.

## Formas de pago
- Antes de realizar pagos en efectivo, consulte el límite permitido en la **Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita**.
- Si realiza su pago mediante depósito bancario, transferencia, cheques o tarjetas, la cuenta debe estar a nombre del **titular del contrato**.
- Deberá conservar los estados de cuenta bancarios de donde salieron los pagos; serán **requisito indispensable al momento de escriturar**.`,
  },

  {
    title: "Escrituración",
    slug: "escrituracion",
    category: "Postventa",
    order: 41,
    tags: ["escrituración", "notario", "registro", "propiedad", "liquidado"],
    content: `# Escrituración

## Descripción
Una vez que termine de pagar su terreno, la transmisión de propiedad se debe realizar en escritura pública ante notario. La inscripción en el **Registro Público de la Propiedad** es tan importante como la firma.

## Procedimiento
- Es requisito indispensable que el lote esté **liquidado en su totalidad**.
- El cliente solicita el presupuesto en Atención a Clientes y en **3 días hábiles** se le envía por correo.
- Una vez presentada la documentación completa, se programa la firma en **8 días hábiles**.

## Requisitos
1. Identificación oficial
2. Comprobante de domicilio
3. RFC
4. Acta de nacimiento
5. CURP
6. Comprobantes de pago
7. Carta de no adeudo de mantenimiento
8. Carta de no adeudo de agua
9. Boleta Predial al corriente

*Si el cliente es casado, presentar documentos del cónyuge: acta de matrimonio, identificación, comprobante de domicilio, RFC, acta de nacimiento y CURP.*

## Costos del presupuesto
1. **Derechos** — costos cobrados por el Estado
2. **Traslado de Dominio** — impuesto municipal (el más significativo)
3. **ISR por Adquisición** — impuesto sobre la ganancia obtenida
4. **Avalúo** — requisito por ley
5. **Honorarios** — pago al notario

*Los requisitos y proceso pueden variar de acuerdo a las reformas y actualizaciones de la Ley.*`,
  },

  {
    title: "Fideicomiso",
    slug: "fideicomiso",
    category: "Postventa",
    order: 42,
    tags: ["fideicomiso", "construcción", "terreno", "jurídico", "fiduciaria"],
    content: `# Fideicomiso

## Descripción
Instrumento jurídico utilizado si usted desea **edificar una casa sobre su terreno sin haber liquidado la totalidad del lote**. Da seguridad de que lo que está construyendo es suyo, ya que las licencias, permisos y planos salen a nombre de la fiduciaria.

## Procedimiento
- El lote debe encontrarse **al corriente en sus pagos**.
- Solicitar presupuesto a: **postventa@ciudadmaderas.com**
- En **3 días hábiles** se envía el presupuesto por correo.
- Una vez presentada la documentación completa, firma en **8 días hábiles**.

## Costos

| Tipo de lote | Concepto | Costo |
|---|---|---|
| Habitacional | Familiares (padres, hijos, hermanos) | $30,000.00 + IVA |
| Habitacional | No familiar | $20,000.00 + IVA |
| Comercial | Familiares (padres, hijos, hermanos) | $75,000.00 + IVA |
| Comercial | No familiar | $45,000.00 + IVA |

*Los costos pueden variar sin previo aviso.*`,
  },

  {
    title: "Cancelación de contrato",
    slug: "cancelacion",
    category: "Postventa",
    order: 43,
    tags: ["cancelación", "rescisión", "devolución", "baja", "contrato"],
    content: `# Cancelación de contrato

## Descripción
Es cuando el cliente solicita terminar la relación comercial por motivos personales, de salud, trabajo, etc.

## Procedimiento
- El cliente debe contactar **antes del vencimiento de su siguiente mensualidad** al área de Atención a Clientes.
- Correo: **postventa@ciudadmaderas.com**
- En **30 días naturales** se firman el convenio de terminación y se entrega el cheque.
- La firma de la rescisión se lleva a cabo de manera **presencial** en las oficinas de Atención a Clientes.
- El cheque solo se entregará al **beneficiario del mismo**.

## Requisitos
1. Carta original con datos generales del lote, motivo de cancelación y monto a devolver
2. Identificación oficial

*Si el titular es casado, deben presentarse ambos con identificación oficial y acta de matrimonio.*

## Costo
Varía de acuerdo al **historial crediticio del cliente**.`,
  },

  {
    title: "Proceso de contratación FV",
    slug: "proceso-contratacion-fv",
    category: "Postventa",
    order: 44,
    tags: [
      "contratación",
      "CRM",
      "documentos",
      "nuevos ingresos",
      "asesor",
      "capital humano",
    ],
    content: `# Proceso de Contratación – Fuerza de ventas

## Creación del CRM sin documentos completos
- Solo **Factor Humano** puede solicitar la creación del CRM.
- Se solicita mediante correo electrónico con el formato **"Solicitud de CRM"**.
- El ejecutivo tiene **24 hrs** para procesarlo.
- El Asesor tendrá acceso al sistema, pero **no podrá cobrar comisiones** hasta concluir con la firma del contrato.
- Solo tiene **60 días** para completar la documentación. Al día 61 se desactiva el CRM.

## Documentos para firma de contrato (México)
- Recibo de primera venta
- Candidatura de ingreso llena y firmada
- Acta de nacimiento
- Identificación oficial (INE ambos lados o Pasaporte vigente)
- CURP
- Comprobante de domicilio (no mayor a 2 meses: agua, luz, predial)
- Constancia de Situación Fiscal (no mayor a 3 meses)
- IAS: Ingresos Asimilables a Salarios
- Carátula Bancaria con CLABE interbancaria (a nombre del asesor)

## Firma de contrato
Se firman las normas internas y los tres anexos:
- Anexo 1
- Formato de contrato
- Autorización de descuento de ISR
- Convenio de confidencialidad
- Hojas de seguridad
- Autorización de uso de imagen

*Se realizan firmas todos los días, haciendo corte a la 1:00 pm.*`,
  },

  {
    title: "Proceso de contratación FV USA",
    slug: "proceso-contratacion-fv-usa",
    category: "Postventa",
    order: 45,
    tags: [
      "contratación",
      "usa",
      "extranjeros",
      "wood city",
      "capital humano",
      "w9",
    ],
    content: `# Proceso de Contratación – Fuerza de ventas USA

## Documentos para firma de contrato
1. **W9** — nombre, dirección, número de seguro social o EIN
2. **VOID CHECK / Estado de cuenta** — número de ruta, número de cuenta y banco
3. **Identificación oficial**

## Proceso de firma
1. **Asistente de gerencia** — Envía documentos a CH de lunes a jueves antes de las **13:00 hrs**

   Directorio Capital Humano:
   - Yazmin Medina (Texas): capitalhumano.cdjuarez@ciudadmaderas.com
   - Sergio Delgado (Florida, San Diego): capitalhumano.tijuana@ciudadmaderas.com
   - *Siempre con copia a:* Viridiana Marín: capitalhumano.mty@ciudadmaderas.com

2. **Capital humano** — Revisa documentación y brinda retroalimentación

3. **Capital humano** — Genera contratos (viernes antes de las **4:00 pm**)

4. **Asesores de venta** — Solo tienen **2 días hábiles** para firma (lunes y martes)

5. **Capital humano** — Revisa firmas el miércoles, manda relación a contraloría el **jueves antes de las 6:00 pm**

## Para la firma de contrato se debe firmar
Tres tantos de: **Contrato de Prestación de Servicios con la empresa Wood City LLC**`,
  },

  {
    title: "Modelos de casas",
    slug: "modelos-casas",
    category: "Postventa",
    order: 46,
    tags: [
      "casas",
      "modelos",
      "aura",
      "stella",
      "aqua",
      "domum",
      "m2",
      "recámaras",
    ],
    content: `# Modelos de casas

## DOMUM – Nuevo modelo
**167.24 m²** | Un solo piso

**Exterior:** 3 preciosas fachadas a elegir

**Interior:**
- Sala comedor
- 2 recámaras, la principal con vestidor y baño
- 2 baños
- Sala TV
- Cocina integral con cubierta de vidrio templado
- Estacionamiento 3 autos
- Jardín
- Patio de servicio
- Habitación para personal de servicio

---

## AURA – Un solo nivel
**84.81 m²**

**Interior:**
- Sala comedor
- 3 recámaras, la principal con vestidor y baño
- 2 baños completos
- Cocina integral con cubierta de vidrio templado
- Estacionamiento
- Jardín
- Patio de servicio

---

## AQUA – Experiencia arquitectónica
**144.17 m²**

**Interior:**
- Sala comedor
- 2 recámaras, la principal con vestidor y baño
- 2 y 1/2 baños
- Sala TV
- Cocina integral con cubierta de vidrio templado
- Estacionamiento techado 2 autos
- Jardín
- Patio de servicio

---

## STELLA – Confort & bienestar
**161.49 m²**

**Interior:**
- Sala comedor
- 3 recámaras, la principal con vestidor y baño
- 2 y 1/2 baños
- Sala TV
- Cocina integral con cubierta de vidrio templado
- Estacionamiento 2 autos
- Jardín
- Patio de servicio`,
  },
  // ── CONTENIDO ──────────────────────────────
  {
    title: "Presentaciones",
    slug: "presentaciones",
    category: "Contenido",
    order: 30,
    tags: ["presentaciones", "contenido", "materiales"],
    content: `# Presentaciones

Aquí encontrarás todas las presentaciones oficiales de Ciudad Maderas disponibles para tu uso como asesor.

## ¿Cómo usarlas?
- Descarga la presentación correspondiente a tu desarrollo.
- Úsala en reuniones con clientes presenciales o por videollamada.
- No modifiques el diseño ni el contenido sin autorización.

> Para solicitar una presentación personalizada o actualizada, usa la sección de **Solicitudes especiales**.`,
  },

  {
    title: "Videos",
    slug: "videos",
    category: "Contenido",
    order: 31,
    tags: ["videos", "contenido", "materiales", "testimonios"],
    content: `# Videos

Biblioteca de videos oficiales de Ciudad Maderas para compartir con tus prospectos y clientes.

## Tipos de videos disponibles
- **Videos de venta** — presentación de desarrollos y productos
- **Testimonios** — clientes satisfechos (Luis, Javier, Miriam, Pedro)
- **Experiencia Maderas** — recorridos a desarrollos
- **Bootcamp** — eventos educativos
- **Fiesta de fin de año** — Noche Mágica Maderas

> Todos los videos están disponibles en el Google Drive oficial. Solicita acceso a tu gerente.`,
  },

  {
    title: "Flyers",
    slug: "flyers",
    category: "Contenido",
    order: 32,
    tags: ["flyers", "diseño", "contenido", "marketing"],
    content: `# Flyers

Material impreso y digital para promocionar los desarrollos de Ciudad Maderas.

## Tipos de flyers
- Flyers de desarrollos específicos (Caribe, Península, León, Querétaro, etc.)
- Flyers de eventos y expos
- Material promocional para redes sociales

## Especificaciones
- Formato: PDF e imagen (JPG/PNG)
- Resolución: 300 DPI para impresión
- Tamaños: Carta, media carta y formatos digitales

> Para solicitar un flyer personalizado dirígete a **¡CREA!: Laboratorio creativo**.`,
  },

  {
    title: "Fotos",
    slug: "fotos",
    category: "Contenido",
    order: 33,
    tags: ["fotos", "imágenes", "contenido", "desarrollos"],
    content: `# Fotos

Banco de imágenes oficiales de los desarrollos y amenidades de Ciudad Maderas.

## Categorías disponibles
- Fotos aéreas de desarrollos
- Amenidades (Family Club, alberca, canchas)
- Renders de casas modelo (Aura, Stella, Aqua, Domum)
- Fotos de eventos y experiencias Maderas
- Material para redes sociales

> Todas las imágenes son de uso exclusivo para asesores de Ciudad Maderas. Prohibido su uso fuera del contexto de venta sin autorización.`,
  },

  {
    title: "Solicitudes especiales",
    slug: "solicitudes-especiales",
    category: "Contenido",
    order: 34,
    tags: ["solicitudes", "especiales", "materiales", "personalizado"],
    content: `# Solicitudes especiales

¿Necesitas un material específico que no encuentras en la biblioteca? Aquí puedes solicitarlo.

## ¿Qué puedes solicitar?
- Presentaciones personalizadas por desarrollo
- Videos específicos para un cliente
- Flyers con información particular
- Materiales en inglés para clientes de USA
- Cualquier material de apoyo para ventas

## ¿Cómo hacer una solicitud?
1. Describe detalladamente lo que necesitas
2. Indica el desarrollo al que aplica
3. Especifica el formato y fecha en que lo necesitas
4. Envíalo a través del formulario de **Solicitudes e ideas**

> Las solicitudes se atienden en un plazo de **3 a 5 días hábiles**.`,
  },

  // ── CREA ──────────────────────────────────
  {
    title: "Flyer – Laboratorio creativo",
    slug: "flyer-crea",
    category: "¡CREA!: Laboratorio creativo",
    order: 40,
    tags: ["flyer", "creativo", "diseño", "laboratorio"],
    content: `# ¡CREA! — Crea tu Flyer

El Laboratorio Creativo de Ciudad Maderas te permite crear materiales personalizados para tus campañas de venta.

## ¿Cómo crear un flyer?
1. Selecciona la plantilla base del desarrollo que quieres promocionar
2. Agrega tu nombre y datos de contacto
3. Personaliza el mensaje principal
4. Descarga en alta resolución

## Lineamientos de diseño
- Mantén los colores corporativos (azul marino y dorado)
- No alteres el logotipo de Ciudad Maderas
- El texto debe ser claro y legible
- Incluye siempre tu nombre como asesor y número de contacto

## Herramientas recomendadas
- Canva (acceso con cuenta empresarial)
- Plantillas en Google Drive oficial

> Para acceder a las plantillas solicita el link a tu coordinador o gerente.`,
  },

  {
    title: "Evento – Laboratorio creativo",
    slug: "evento-crea",
    category: "¡CREA!: Laboratorio creativo",
    order: 41,
    tags: ["evento", "creativo", "activación", "expo"],
    content: `# ¡CREA! — Organiza un Evento

Guía para organizar activaciones y eventos de prospección con el apoyo del equipo de Marketing.

## Tipos de eventos
- **Expos inmobiliarias** — ferias de bienes raíces locales
- **Activaciones en centros comerciales** — stands de prospección
- **Eventos privados** — reuniones con grupos de prospectos
- **Webinars y Zooms** — presentaciones virtuales

## ¿Cómo solicitar apoyo para un evento?
1. Define la fecha, lugar y número de asistentes estimados
2. Solicita con al menos **2 semanas de anticipación**
3. Envía la solicitud a tu Gerente de Ventas
4. El área de MKT te asignará materiales y soporte

## Material disponible para eventos
- Roll ups y banners
- Brochures y flyers impresos
- Tablets para demos del CRM
- Pantallas para presentaciones

> Los eventos generados correctamente son una de las mejores fuentes de prospectos de calidad.`,
  },

  // ── UNIVERSIDAD ──────────────────────────────────
  {
    title: "Ciudad Maderas – Universidad",
    slug: "ciudad-maderas",
    category: "Universidad",
    order: 50,
    tags: ["universidad", "capacitación", "cursos", "formación"],
    content: `# Universidad Maderas

Plataforma de capacitación continua para toda la fuerza de ventas de Ciudad Maderas.

## ¿Qué es Universidad Maderas?
Es el programa de e-learning de primer nivel (Crehana) que te permite capacitarte en ventas y bienes raíces desde cualquier lugar, a tu propio ritmo.

## ¿Para qué sirve?
- Capacitación inicial para nuevos asesores
- Actualización de conocimientos del producto
- Formación en técnicas de venta
- Certificaciones internas

## ¿Cómo acceder?
1. Solicita tu acceso a Capital Humano o tu Gerente
2. Recibirás un correo con tus credenciales
3. Ingresa a la plataforma y completa los módulos asignados

## Cursos disponibles
- Introducción a Bienes Raíces
- Técnicas de venta Ciudad Maderas
- Facebook Ads para asesores inmobiliarios
- CapCut para creación de contenido
- Manejo del CRM (ARIA)

> La capacitación continua es clave para tu éxito como asesor. ¡Aprovecha todos los recursos disponibles!`,
  },

  {
    title: "Facebook Ads",
    slug: "facebook-ads",
    category: "Universidad",
    order: 51,
    tags: ["facebook", "ads", "publicidad", "redes sociales", "prospectos"],
    content: `# Facebook Ads para Asesores

Guía para crear campañas de publicidad en Facebook e Instagram orientadas a generar prospectos para Ciudad Maderas.

## ¿Por qué usar Facebook Ads?
- Alcance masivo a latinos en USA y México
- Segmentación precisa por ubicación, edad e intereses
- Costo por prospecto competitivo
- Resultados medibles en tiempo real

## Configuración básica de una campaña
1. **Objetivo:** Generación de leads o tráfico al sitio web
2. **Audiencia:** Latinos 35-65 años, interesados en inversión o bienes raíces
3. **Presupuesto:** Mínimo recomendado $5-10 USD diarios
4. **Creatividad:** Usa videos o imágenes de los desarrollos
5. **CTA:** "Más información" o "Solicitar información"

## Lineamientos importantes
- No usar el logotipo de Ciudad Maderas sin autorización
- No hacer promesas de rendimiento específicas
- Siempre incluir "Términos y condiciones aplican"
- Dirigir los leads a tu WhatsApp personal

> Toma el curso completo de Facebook Ads en **Universidad Maderas** para dominar esta herramienta.`,
  },

  {
    title: "CapCut",
    slug: "capcut",
    category: "Universidad",
    order: 52,
    tags: ["capcut", "video", "contenido", "redes sociales", "edición"],
    content: `# CapCut para Asesores

Aprende a crear videos atractivos para redes sociales usando CapCut, la herramienta de edición más popular entre los asesores de Ciudad Maderas.

## ¿Por qué CapCut?
- Gratuito y fácil de usar
- Disponible en iOS y Android
- Plantillas profesionales incluidas
- Ideal para Reels, TikTok y Stories

## Tipos de videos que puedes crear
- **Testimonios de clientes** — graba y edita en minutos
- **Tours de desarrollos** — muestra las amenidades
- **Tips de inversión** — posiciónate como experto
- **Presentación personal** — genera confianza con tus prospectos

## Pasos básicos
1. Descarga CapCut en tu celular
2. Importa tu video o fotos
3. Aplica una plantilla o edita manualmente
4. Agrega música, texto y efectos
5. Exporta y publica en tus redes

> Toma el curso completo de CapCut en **Universidad Maderas** para aprender técnicas avanzadas de edición.`,
  },

  // ── LA BIBLIA ──────────────────────────────────
  {
    title: "La Biblia",
    slug: "la-biblia",
    category: "La biblia",
    order: 60,
    tags: ["biblia", "guia", "manual", "ciudad maderas"],
    content: `# La Biblia – Ciudad Maderas

Bienvenido a La Biblia de Ciudad Maderas, **lo mínimo que debes saber** para ser un asesor exitoso.

## ¿Qué encontrarás aquí?

Esta es tu guía de referencia completa como asesor. Está organizada en tres grandes secciones:

### 📋 Onboarding
Todo lo que necesitas saber para comenzar: quiénes somos, qué vendemos, cómo funciona el negocio y cómo ganar dinero.

### 💼 Ventas
Procesos operativos: apartados, cuentas para depositar, contratos, comisiones, reglamento de ventas y más.

### 🏠 Postventa
Manual del cliente, procesos de contratación, modelos de casas y todo lo relacionado con el seguimiento post-venta.

## Recuerda
> "La mejor forma de aprender es comenzar a vender. Comienza con tu Team Leader a generar las primeras citas."

Si no encuentras lo que buscas, usa la sección de **Solicitudes e ideas** al final del menú.`,
  },

  // ── BOTTOM ──────────────────────────────────
  {
    title: "Novedades",
    slug: "novedades",
    category: "bottom",
    order: 70,
    tags: ["novedades", "noticias", "actualizaciones"],
    content: `# Novedades

Aquí encontrarás las últimas actualizaciones, comunicados y noticias importantes de Ciudad Maderas.

## Últimas actualizaciones
- **Ver 1.4** — Actualización del manual de cliente y proceso de contratación USA
- Nuevos modelos de casas disponibles: **DOMUM** y **AQUA**
- Actualización de calendarios de comisiones 2025
- Nuevas ligas de pago para clientes extranjeros

## ¿Cómo me entero de novedades?
- Revisa esta sección regularmente
- Mantente atento a los comunicados de tu Gerente
- Participa en las juntas semanales de equipo
- Sigue los canales oficiales de comunicación interna

> Si tienes información relevante para agregar a esta sección, envíala a través de **Solicitudes e ideas**.`,
  },

  {
    title: "Nombre de usuario",
    slug: "usuario",
    category: "bottom",
    order: 72,
    tags: ["usuario", "perfil", "cuenta", "configuración"],
    content: `# Mi perfil

Gestiona tu información como asesor de Ciudad Maderas.

## Mis datos
- Nombre completo
- Plaza a la que perteneces
- Gerencia y coordinación
- Correo electrónico empresarial
- Teléfono de contacto

## Mis documentos
- Contrato de prestación de servicios
- Carátula bancaria registrada
- Documentación de alta

## Accesos
- **CRM (ARIA):** Solicitar acceso a Capital Humano
- **Universidad Maderas:** Solicitar credenciales a tu Gerente
- **Google Drive oficial:** Solicitar acceso a través del QR en el manual de onboarding

> Para actualizar tus datos o reportar algún problema con tu cuenta, contacta a Capital Humano de tu plaza.`,
  },
]);

console.log(
  "✅ Seed completado con",
  await Section.countDocuments(),
  "secciones",
);
process.exit(0);
