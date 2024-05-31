import { Header } from "./Header";
import {ListaProvedores} from "./ListaProveedores"
import {RegistroRubro} from "./RegistroRubro"
import {Footer} from "./Footer";

export function Principal(){
    return(
        <>
            <Header />
            <ListaProvedores />
            <Footer />
           
        </>
    )
}