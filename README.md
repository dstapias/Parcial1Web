Para esta app se hace
npx create-react-app preparcial
cd preparcial
npm install 
npm install react-router-dom
npm install react-intl --save
npm start

1. react-router-dom se utiliza para las rutas del parcial, ya que se tomo la decisión de hacer todo en dos componentes diferentes, dependiendo la ruta en app.js se renderiza el componente de la ruta.

2. react-intl --save se utiliza para la internacionalización, se hicieron dos arhivos en src/translations que tienen los labels en español y en ingles. Se hizo además un boton que dice si es ingles o español. Para poder probar sin necesidad de cambiarle el idioma al navegador.

3. Para los demás componentes en el archivo package.json se agrego bootstrap que se instala al hacer npm install, todos los botones, cards, estilos, modal y demás se realizó con bootstrap.
