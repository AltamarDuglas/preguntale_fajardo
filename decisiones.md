# Decisiones Técnicas

A continuación, se detalla el proceso mediante el cual se transformó visualmente la aplicación a la estética "Bienvenidos" (Amarillo/Azul).

## 1. De Web App a Landing Page de Campaña
Se adoptó un formato de landing page de alta intensidad visual, moviendo la navegación a una barra flotante fija y priorizando el contenido vertical:
- **Estructura:** Simplificamos el DOM eliminando secciones heredadas del prototipo inicial (como el antiguo HERO). Ahora el `app-container` es el eje central de la página, asegurando un renderizado limpio y directo.
- **Identidad:** Se incorporó una imagen de héroe inspiracional (`background.png`) generada para representar el "Sueño de sacar a Colombia adelante" con gente unida.

## 2. Renovación Estética (Estilo "Bienvenidos")
Bajo la nueva dirección del usuario se aplicó una paleta de altísimo contraste:
- **`--bg-main` (#F9A01B):** Amarillo corporativo para la superficie de la página.
- **`--text-primary` (#00377E):** Azul Marino para textos pesados (Extra Bold), bordes de componentes y botones.
- **`--text-accent` (#B82510):** Rojo para subtítulos de agradecimiento y datos numéricos.
- **Tipografía:** Se forzó el uso de pesos altos (`font-weight: 800` y `900`) para simular la fuerza comunicativa del diseño oficial.

## 3. Principios SOLID Aplicados en JavaScript
La lógica se implementó bajo un estándar de ingeniería de alto nivel:
- **Single Responsibility Principle (SRP):**
  - **`UIManager`**: Control total sobre la navegación y transformaciones de la vista.
  - **`ValidationManager`**: Módulo hermético para asegurar la integridad de los datos (códigos y preguntas).
  - **`QuestionManager`**: Gestor de flujo de preguntas y orquestación de estados de respuesta.
- **Open/Closed Principle (OCP):** La arquitectura permite integrar fácilmente motores de inteligencia artificial (como GPT-4 o Gemini) mediante servicios externos sin alterar la interfaz de usuario existente.

## 4. Migración a React + Vite (Lista para Vercel)
Para garantizar un despliegue óptimo en plataformas modernas (como Vercel) y mejorar la escalabilidad, la aplicación se migró a un stack basado en React y Vite:
- **Estructura de Componentes:** Se dividió el código HTML estático en componentes reutilizables (`Header`, `Navigation`, `HomeScreen`, `AskScreen`, `HistoryScreen`), cumpliendo estrictamente con el **Principio de Responsabilidad Única (SRP)**.
- **Custom Hooks:** La lógica imperativa que existía en `script.js` fue extraída a Custom Hooks de React (`useNavigation`, `useQuestions`), separando por completo el estado global de la presentación UI.
- **Validaciones Puras:** Se mantuvo el `ValidationManager` exportándolo como un módulo de funciones puras en `src/utils/validation.js`, lo cual facilita el Testing en el futuro.
- **Vite como Bundler:** Sustituye el uso básico de archivos sueltos para proveer empaquetado optimizado (minificación, tree-shaking) y Hot Module Replacement en desarrollo, acelerando la iteración.

## 5. Ajuste de Experiencia Inmersiva (Background)
A petición de la dirección de diseño, se retiró la imagen HERO fotográfica (`background.png`) de la cabecera del contenedor central. En su lugar, se movió la imagen como el fondo (`background-image`) general de la página utilizando la propiedad CSS `fixed`. Para mantener una alta legibilidad del texto en el contenedor central, se aplicó una superposición amarilla translúcida (`rgba(249, 160, 27, 0.85)`) en ese el contenedor principal con el filtro moderno CSS `backdrop-filter: blur(8px)`.

## 6. Mejoras de "UX Premium" (Micro-interacciones)
Se decidió mejorar la experiencia sensitiva de la interfaz invirtiendo en **Dynamic Design**:
- **Menú Glassmorphism:** La barra flotante perdió su rudeza sólida y adoptó bordes curvos tipo iOS (`20px`) y un fondo cristalino difuminado para conectar al usuario con el contexto visual que hace "scroll" detrás.
- **Micro-Animaciones:** Se sustituyó el tradicional fadeIn por un `fadeSlideUp`, que le da peso y elegancia de movimiento a la aparición del contenido de las cartas. Al tiempo, todos los botones, campos de texto interactivos (`focus`) y chips de categoría responden al arrastre levantándose o iluminándose visualmente, demostrando su capacidad interactiva.

## 7. Narrativa de Persuasión (Copywriting)
De acuerdo a las directrices del PDF *"Estrategias de Voto para Sergio Fajardo"*, se reestructuró el contenido (copy) de la `HomeScreen`:
- **Mensaje Central:** Se eliminó la bienvenida genérica por un enunciado de autoridad: *"Cambio Serio y Seguro"*, atacando el problema de percepción de tibieza y presentándolo como un líder de *"carácter para poner la casa en orden"*.
- **Pacificación:** Se incluyó el extracto sociopolítico *"El enemigo no somos los colombianos..."* para conectar con la 'Mayoría Silenciosa' agotada por la polarización.
- **Categorías:** Se reemplazaron las temáticas sueltas por los verdaderos estandartes de su macro-frame: *"Seguridad (Plan Guardián)", "Revolución Educativa", y "Economía y Transparencia".* Esto le da rigurosidad programática a la interacción del usuario.

## 8. Regionalización Estratégica (Córdoba)
Para aterrizar la propuesta nacional a las realidades locales (basado en el análisis de persuasión política):
- **Nueva Pantalla Regional:** Se implementó `CordobaScreen` con datos específicos sobre seguridad alimentaria, infraestructura costera y educación rural, extrayendo las "pruebas de verdad" del historial de Sergio Fajardo (Urbanismo Social).
- **Acceso Directo:** Se añadió un flujo de acceso desde la `HomeScreen` mediante una tarjeta de alto impacto visual para captar al votante indeciso del Caribe desde el primer contacto.

## 9. Simbolismo y Humanización (Sombrero Vueltiao)
Siguiendo las estrategias de persuasión política para el Caribe:
- **Iconografía Regional:** Se incorporó la imagen de Sergio Fajardo con el sombrero vueltiao (`fajardo_sombrero.jpg`) en la sección de Córdoba. 
- **Objetivo:** Generar una conexión emocional inmediata con el electorado cordobés, utilizando heurísticos visuales que refuercen el sentido de pertenencia y compromiso con la cultura caribeña, mitigando la percepción de frialdad académica o centralismo.
- **Gestión de Activos:** Todas las imágenes se centralizaron en la carpeta `public/` para asegurar un empaquetado consistente en Vite conforme a las mejores prácticas de despliegue.

## 10. Experiencia de Usuario Convergente (Foco Colombia)
Para corregir la desorganización percibida y centrar la atención del electorado en la acción y el mensaje:
- **Unificación de Pantallas:** Se eliminaron las capas de navegación profunda (`AskScreen`, `CordobaScreen`). La página se transformó en una *Single Landing App* donde el mensaje persuasivo y el formulario de participación conviven en el `HomeScreen`.
- **Pivot Nacional:** Se re-encuadraron los compromisos regionales de Córdoba hacia un plano nacional (**Colombia**), articulando el macro-frame del PDF (*"Seguridad, Educación y Economía"*) como la base del contrato social propuesto.
- **Reducción de Fricción:** El formulario de "Pregúntale a Sergio" ahora es el núcleo interactivo visible desde el primer scroll, eliminando pasos innecesarios y focalizando la UX en la resolución de dudas ciudadanas.

## 12. Navegación Jerarquizada (Interactúa, Informa, Sigue)
Para equilibrar la simplicidad con la profundidad del mensaje político:
- **Estructura de 3 Puntos:** Se evolucionó hacia una navegación de 3 pestañas (**Inicio, Propuestas, Historial**).
- **HomeScreen (Interactúa):** 100% focalizado en la acción de preguntar. Se eliminaron bloques de texto largos para garantizar el "Cero Scroll" en la interacción principal.
- **ProposalsScreen (Informa):** Pantalla dedicada al contenido detallado del PDF. Se implementó una narrativa visual con Sergio Fajardo (Sombrero Vueltiao) como Header, seguida de un desglose técnico de los pilares de Seguridad, Educación y Economía.
- **VentajaUX:** El usuario puede elegir entre la participación rápida (Inicio) o el estudio profundo del programa (Propuestas) sin que un contenido entorpezca al otro.

## 13. Optimización de Scroll Selectivo
Para garantizar una experiencia visual ágil y "limpia" (sin barras de scroll innecesarias):
- **Layout Híbrido:** Se configuró el contenedor `.content` para que use `overflow-y: hidden` exclusivamente en el **Inicio** mediante selectores relacionales CSS (`:has`). 
- **Compactación Dinámica:** Se redujeron los rellenos (`padding`) del cabezote y márgenes internos del `HomeScreen` para asegurar que todo el eje interactivo quepa "Above the fold" en dispositivos móviles estándar.
- **Scroll de Contenido:** Se preservó la capacidad de desplazamiento vertical en las pantallas de **Propuestas** e **Historial**, donde la extensión del texto sí justifica la barra de scroll.

## 14. Micro-interacciones de Atención (Floating CTA a Nivel Local)
Para incentivar el descubrimiento de contenido profundo sin sacrificar la interactividad del Inicio ni generar ruido visual innecesario:
- **Reducción de Botones Secundarios:** Se eliminó el botón flotante masivo "Explora el Plan de Gobierno" al final del `HomeScreen`. Liberando espacio valioso.
- **Micro-Animación Crítica:** Se aplicó una nueva animación CSS `navAttentionGlow` directamente sobre el botón `Propuestas` de la barra de navegación principal inferior (`Navigation.jsx`). Esta animación resalta sutilmente la opción con un rebote de color, induciendo al usuario a hacer clic de forma orgánica e intuitiva sin romper la limpieza del Inicio.

## 15. Optimización de Activos (WebP Remastering)
Para cumplir con los estándares de rendimiento (Core Web Vitals) y garantizar una carga instantánea en redes móviles:
- **Conversión a WebP:** Todas las imágenes pesadas (`.png`, `.jpg`) fueron convertidas a `.webp` mediante un script con la librería `sharp`, logrando una reducción de peso superior al 60% sin pérdida perceptible de calidad.
- **Modernización de Estilos:** Se actualizaron `index.css` y `ProposalsScreen.jsx` para servir estos activos optimizados.

## 16. Cumplimiento Legal y Confianza Ciudadana (Habeas Data)
Para profesionalizar la recolección de datos y cumplir con la normativa colombiana (Ley 1581 de 2012):
- **Autorización Explícita:** Se integró un checkbox de aceptación de política de tratamiento de datos en el `HomeScreen`.
- **Modal de Transparencia:** Se añadió un modal informativo que detalla el uso responsable de los datos (Nombre y WhatsApp) por parte del equipo estratégico de Sergio Fajardo.

## 17. Viralidad Orgánica vía Historial de Respuestas
Para transformar las respuestas en activos de comunicación compartibles:
- **Rediseño Institucional:** El historial ahora presenta las respuestas como un hilo de conversación oficial, firmado digitalmente.
- **Captura con `html2canvas`:** Se implementó una función para que el usuario capture su tarjeta de respuesta como imagen, facilitando el compartido en redes sociales y WhatsApp.

## 18. Estrategia SEO y Previsualización Social
Para maximizar el alcance del portal fuera de la pauta pagada:
- **Metadatos Estratégicos:** Se inyectaron etiquetas Meta, Open Graph y Twitter Cards para asegurar que al compartir el link en redes, se vea una previsualización atractiva con la imagen del candidato.
- **Estructura de Datos (Schema.org):** Se añadió JSON-LD para que los buscadores identifiquen a Sergio Fajardo como Person/Candidate vinculado al portal.

## 19. Sincronización de Identidad Multinivel (Cross-Domain Persistence)
Para resolver la pérdida de historial asociada a las Preview URLs de Vercel y el cambio de dispositivos:
- **Recuperación por Teléfono:** El flujo de navegación ahora valida el número de teléfono contra Supabase *antes* de iniciar una nueva pregunta. Si el teléfono ya existe, el sistema restaura automáticamente el `localStorage` y redirige al ciudadano a su historial.
- **Branding en Respuestas:** Se humanizó la respuesta oficial reemplazando el avatar genérico por la imagen remasterizada del sombrero (`fajardo_sombrero.webp`), alineando la experiencia con la identidad visual de la campaña.


## 15. Solución al Mobile Viewport Bug (100dvh)
Para resolver el scroll inesperado en navegadores móviles (donde la barra de direcciones consume espacio no contabilizado por `100vh`):
- **Dynamic Viewport Units (`dvh`):** Se implementó `height: 100dvh` en el contenedor principal, asegurando que el layout se adapte dinámicamente al área visible real.
- **Overscroll Lock:** Se aplicó `overscroll-behavior: none` y `position: fixed` en `html/body` para bloquear el efecto de rebote elástico.
- **Compactación Adaptativa:** Se establecieron media queries agresivas para reducir el `line-height` y `paddings` en dispositivos con altura reducida, garantizando que el Inicio nunca exceda el alto de la pantalla.

## 11. Diseño Segmentado (Cero Scroll)
Para resolver la fatiga de scroll y la desorganización visual:
- **Segmented Control:** Se implementó un selector de pestañas interno en el `HomeScreen` para alternar entre *Propuesta* y *Preguntar*.
- **Ventaja UX:** Esta técnica permite mantener todo el contenido crítico "Above the fold" (visible sin scroll), garantizando que el usuario pueda actuar (preguntar) o informarse (mensaje) instantáneamente según su interés, sin perder el contexto del cabezote institucional.

## 16. Simplificación del Flujo de Interacción (Cero Pasos)
Para reducir la fricción y aumentar la participación ciudadana según las nuevas directrices:
- **Navegación Directa:** Se eliminó el bloqueo de identidad en el `HomeScreen`. El botón "Preguntar" ahora redirige inmediatamente a `QuestionScreen`.
- **Captura In-Place:** Se implementó una lógica de detección de identidad en `QuestionScreen`. Si el usuario no tiene datos guardados, se muestran campos de Nombre/Teléfono integrados en el formulario de la pregunta.
- **Persistencia Silenciosa:** Los datos de identidad se guardan en el momento del envío exitoso, permitiendo que las siguientes interacciones sean instantáneas sin repetir el proceso de registro.
- **Eliminación de Modales:** Se evitó el uso de pantallas de confirmación intermedias ("Identidad Confirmada") para mantener al usuario enfocado en su mensaje al candidato.
