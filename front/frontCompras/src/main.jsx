import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {Footer} from './Footer';
import {App} from './App';
import {Header} from './Header';


const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)


