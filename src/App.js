import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Login from './components/login'; 
import Pagina2 from './components/pagina2'; 
import messages_en from './translations/en.json'; 
import messages_es from './translations/es.json'; 

const messages = {
  'en': messages_en,
  'es': messages_es
};

const App = () => {
  const [locale, setLocale] = useState('en'); 

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Router>
        <div>
          <button onClick={() => setLocale('en')}>English</button>
          <button onClick={() => setLocale('es')}>Español</button>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/pagina2" element={<Pagina2 />} />
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
};

export default App;
