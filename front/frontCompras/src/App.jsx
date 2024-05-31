import { Routes, Route, Navigate } from 'react-router-dom';
import { Principal } from "./Principal"
import { RegistroProveedor } from './RegistroProveedor';
import { RegistroRubro } from './RegistroRubro';

export function App(){
  return(
    <Routes>
      <Route path="/" element={<Principal />} />
      <Route path="/registroRubro" element={<RegistroRubro />} />
      <Route path="/registroProveedor" element={<RegistroProveedor />} />
    </Routes>
  );
}