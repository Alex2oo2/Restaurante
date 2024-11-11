import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { PlatilloComponent } from './platillo/platillo.component';
import { MiPerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PedidoComponent } from './pedido/pedido.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'welcome', component: BienvenidaComponent },
    { path: 'news', component: NoticiaComponent },
    { path: 'result', component: CalificacionComponent },
    { path: 'ing', component: IngredienteComponent },
    { path: 'plat', component: PlatilloComponent },
    {path:'me',component:MiPerfilComponent},
    {path: 'user', component: UsuarioComponent },
    {path: 'pedir', component: PedidoComponent },
];
