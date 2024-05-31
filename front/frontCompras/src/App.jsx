import { Routes, Route, Navigate } from 'react-router-dom';
import { Principal } from "./Principal"

export function App(){
  return(
    <Routes>
      <Route path="/" element={<Principal />} />
    </Routes>
  );
}