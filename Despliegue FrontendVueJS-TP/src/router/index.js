import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Contenido_Post from '../components/contenidos/Contenido_Post.vue'
import Contenidos_Genericos from '../components/contenidos/Contenidos_Genericos.vue'
import Contenido_Personalizado_Nuevo from '../components/contenidos/Contenido_Personalizado_Nuevo.vue'
import Contenidos_Personalizados from '../components/contenidos/Contenidos_Personalizados.vue'

import Dispositivo from '../components/Dispositivo.vue'
import Dispositivo_Post from '../components/Dispositivo_Post.vue'
import Dispositivo_Edit from '../components/Dispositivo_Edit.vue'

import Grupo_Contenido_Nuevo from '../components/Grupo_Contenido/Grupo_Contenido_Post.vue'
import Grupo_Contenido from '../components/Grupo_Contenido/Grupo_Contenido.vue'
import Contenido from '../components/Grupo_Contenido/Contenido.vue'
import Contenido_Nuevo from '../components/Grupo_Contenido/Contenido_Nuevo.vue'

import Asignacion from '../components/Asignacion.vue'
import Asignacion_Post from '../components/Asignacion_Post.vue'

import TiposServicios from '../components/servicios/TiposServicios.vue';
import TipoServicio_Post from '../components/servicios/TipoServicio_Post.vue';
import Servicio from '../components/servicios/Servicio.vue';
import Servicio_Post from '../components/servicios/Servicio_Post.vue';
import DetalleServicio from '../components/servicios/DetalleServicio.vue';
import DetalleServicio_Post from '../components/servicios/DetalleServicio_Post.vue';

import Reserva_Post from '../components/reservas/Reserva_Post.vue';
import Reservas from '../components/reservas/Reservas.vue';

import Login from '../components/usuario/Login.vue'

import Contenido_View from '../components/Contenido_View.vue';
import Nav from '../testComponents/Nav.vue';

import Tipos_Amenitie from '../components/Amenities/Tipos_Amenitie.vue';
import Amenitie from '../components/Amenities/Amenitie.vue'
import TipoAmenitie_Post from '../components/Amenities/TipoAmenitie_Post.vue'
import Amenitie_Post from '../components/Amenities/Amenitie_Post.vue'

import Tipos_Configuracion from '../components/Configuraciones/Tipo_Configuracion.vue';
import Configuracion from '../components/Configuraciones/Configuracion.vue'
import TipoConfiguracion_Nuevo  from '../components/Configuraciones/Tipo_Configuracion_Nuevo.vue'
import Configuracion_Nuevo from '../components/Configuraciones/Configuracion_Nuevo.vue'


import TipoAnuncios from '../components/anuncios/TipoAnuncios.vue';
import TipoAnuncio_Post from '../components/anuncios/TipoAnuncio_Post.vue';
import Anuncios from '../components/anuncios/Anuncios.vue';
import Anuncio_Post from '../components/anuncios/Anuncio_Post.vue';


import TipoTransacciones from '../components/transacciones/TipoTransacciones.vue';
import TipoTransaccion_Post from '../components/transacciones/TipoTransaccion_Post.vue';
import Transacciones from '../components/transacciones/Transacciones.vue';
import Transaccion_Post from '../components/transacciones/Transaccion_Post.vue';
import Ventas from '../components/ventas/Ventas.vue';
import DetalleTransaccion from '../components/ventas/DetalleTransaccion.vue';
import Productos from '../components/ventas/Productos.vue';
import Producto_Post from '../components/ventas/Producto_Post.vue';

import CheckIn from '../components/check-in/CheckIn.vue';
import CheckIn_Post from '../components/check-in/CheckIn_Post.vue';

import DispositivoInteraccion from '../components/DispositivoInteraccion.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/DispositivoInteraccion',
    name: 'DispositivoInteraccion',
    component: DispositivoInteraccion
  },
  {
    path: '/grupo_contenido_nuevo',
    name: 'grupo_contenido_nuevo',
    component: Grupo_Contenido_Nuevo
  },

  {
    path: '/grupos_contenido',
    name: 'grupos_contenido',
    component: Grupo_Contenido
  },
  {
    path: '/contenido_home',
    name: 'home_contenido',
    component: Contenido_View
  },

  {
    path: '/grupos_contenido/contenido',
    name: 'contenidos_grupo',
    component: Contenido
  },

  {
    path: '/contenido/:idgrupo_contenido',
    name: 'contenido_nuevo',
    component: Contenido_Nuevo,
    props: true,
  },
  {
    path: '/contenidos/:tipo_contenido/nuevo',
    name: 'contenido_post',
    component: Contenido_Post,
  },
  {
    path: '/contenidos/personalizado/nuevo_contenido',
    name: 'contenido_personalizado_post',
    component: Contenido_Personalizado_Nuevo,
  },
  {
    path: '/contenidos/generico',
    name: 'Contenidos_Genericos',
    component: Contenidos_Genericos
  },
  {
    path: '/contenidos/personalizado',
    name: 'Contenidos_Personalizados',
    component: Contenidos_Personalizados
  },

  {
    path: '/asignaciones',
    name: 'asignaciones',
    component: Asignacion
  },

  {
    path: '/asignacion_nuevo',
    name: 'asignacion_nuevo',
    component: Asignacion_Post,
    props: true,
  },
  {
    path: '/dispositivo_nuevo',
    name: 'dispositivo_nuevo',
    component: Dispositivo_Post,
    props: true,
  },
  {
    path: '/servicios',
    name: 'tipos-servicios',
    component: TiposServicios,
    props: true,
  },
  {
    path: '/servicios/nuevo',
    name: 'tipo-servicio-post',
    component: TipoServicio_Post
  },
  {
    path: '/servicios/:tipoServicio',
    name: 'servicio',
    component: Servicio,
    props: true,
  },
  {
    path: '/servicios/:tipoServicio/nuevo',
    name: 'servicio-post',
    component: Servicio_Post
  },
  {
    path: '/servicios/:tipoServicio/:servicio',
    name: 'detalle-servicio',
    component: DetalleServicio
  },
  {
    path: '/servicios/:tipoServicio/:servicio/nuevo',
    name: 'detalle-post',
    component: DetalleServicio_Post,
  },
  {
    path: '/servicios/:tipoServicio/:servicio/reservas',
    name: 'reservas',
    component: Reservas
  },
  {
    path: '/servicios/:tipoServicio/:servicio/reservas/nuevo',
    name: 'reservas-post',
    component: Reserva_Post,
  },
  {

    path: '/nav',
    name: 'Nav',
    component: Nav
  },
  {
    path: '/amenities',
    name: 'tipos-amenities',
    component: Tipos_Amenitie
  },
  {
    path: '/amenities/nuevo',
    name: 'tipo-amenitie-post',
    component: TipoAmenitie_Post
  },
  {
    path: '/amenities/:tipoAmenitie',
    name: 'amenitie',
    component: Amenitie
  },
  {
    path: '/amenities/:tipoAmenitie/nuevo',
    name: 'amenitie-post',
    component: Amenitie_Post
  },
  {
    path: '/tipo-anuncios',
    name: 'tipo-anuncios',
    component: TipoAnuncios
  },
  {
    path: '/tipo-anuncios/nuevo',
    name: 'tipo-anuncios-post',
    component: TipoAnuncio_Post
  },
  {
    path: '/tipo-anuncios/:tipoAnuncio',
    name: 'anuncios',
    component: Anuncios
  },
  {
    path: '/tipo-anuncios/:tipoAnuncio/nuevo',
    name: 'anuncios-post',
    component: Anuncio_Post
  },
  {
    path: '/tipo-transacciones',
    name: 'tipo-transacciones',
    component: TipoTransacciones
  },
  {
    path: '/tipo-transacciones/nuevo',
    name: 'nuevo-tipo-transaccion',
    component: TipoTransaccion_Post
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion',
    name: 'transacciones',
    component: Transacciones
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion/nuevo',
    name: 'nuevo-transaccion',
    component: Transaccion_Post
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion/:transaccion/ventas',
    name: 'ventas-transaccion',
    component: Ventas
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion/:transaccion/ventas/detalle',
    name: 'detalle-transaccion',
    component: DetalleTransaccion
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion/:transaccion/productos',
    name: 'productos-transaccion',
    component: Productos
  },
  {
    path: '/tipo-transacciones/:tipoTransaccion/:transaccion/productos/nuevo',
    name: 'nuevo-productos-transaccion',
    component: Producto_Post
  },
  {
    path: '/check-in',
    name: 'check-in',
    component: CheckIn,
  },
  {
    path: '/check-in/nuevo',
    name: 'nuevo-check-in',
    component: CheckIn_Post
  },
  {
    path: '/configuraciones',
    name: 'tipos-configuraciones',
    component: Tipos_Configuracion
  },
  {
    path: '/configuraciones/nuevo',
    name: 'tipo-configuraciones-post',
    component: TipoConfiguracion_Nuevo
  },
  {
    path: '/configuraciones/:tipoConfiguracion',
    name: 'configuracion',
    component: Configuracion
  },
  {
    path: '/configuraciones/:tipoConfiguracion/nuevo',
    name: 'configuracion-post',
    component: Configuracion_Nuevo,
  },
  {
    path: '/dispositivos',
    name: 'dispositivos',
    component: Dispositivo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/*router.beforeEach((to, from, next) => {
  let isAuth = localStorage.getItem("loggedIn");
  if(to.name === 'login'){
    console.log("Routes auth: " + isAuth);
    if(isAuth !== null && isAuth === true){
      next({ name: 'home' });
    }
    else if(isAuth === null || isAuth == false){
      next({ path: '/login'});
    }
  }
}
)*/

export default router
