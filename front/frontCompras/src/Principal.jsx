import { Header } from "./Header";
import {ListaProvedores} from "./ListaProveedores"
import {RegistroRubro} from "./RegistroRubro"
import {Footer} from "./Footer";
import { RegistroProveedor } from "./RegistroProveedor";

export function Principal(){
    return(
        <>
            <Header />
            <ListaProvedores />
            <Footer />
           
        </>
    )
}