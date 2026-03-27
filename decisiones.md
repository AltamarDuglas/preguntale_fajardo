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
