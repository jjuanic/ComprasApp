import { Routes, Route } from 'react-router-dom';
import { Principal } from "./Principal"
import { RegistroProveedor } from './RegistroProveedor';
import { RegistroRubro } from './RegistroRubro';
import { ListaRubros } from './ListaRubros';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/registroRubro" element={<RegistroRubro />} />
      <Route path="/registroProveedor" element={<RegistroProveedor />} />
      <Route path='listaRubros' element={<ListaRubros />} />
    </Routes>
  );
}
