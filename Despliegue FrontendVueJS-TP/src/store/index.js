import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    //Datos que pueden usarse en cualquier vista o componente
    //a través de una función computed
    tipoServicio:{
      tipo_servicio_id: "",
      nombre_tipo_servicio: "",
    },
    servicio:{
      servicio_id: "",
      nombre_servicio: "",
    },
    tipoAnuncio:{
      tipo_anuncio_id: "",
      nombre_tipo_anuncio: "",
    },
    tipoTransaccion:{
      tipo_transaccion_id: "",
      nombre_tipo_transaccion: "",
    },
    transaccion: {
      transaccion_id: "",
      nombre_transaccion: ""
    },
    venta:{
      venta_id: "",
      descripcion_venta: "",
    },
    grupo_id: "",
    tipo_amenitie_id: "",
    tipo_configuracion_id:"",
  },
  mutations: {
    //Para cambiar las variables del state
    changeValueOfServiceType: (state, tipoServicio) => {
        state.tipoServicio = tipoServicio;
    },
    changeValueOfAnnouncementType(state, tipoAnuncio){
      state.tipoAnuncio = tipoAnuncio;
    },
    changeValueOfService: (state, servicio) => {
      state.servicio = servicio;
    },
    changeValueOfTransactionType: (state, tipoTransaccion) => {
      state.tipoTransaccion = tipoTransaccion;
    },
    changeValueOfTransaction: (state, transaccion) => {
      state.transaccion = transaccion;
    },
    changeValueOfVenta: (state, venta) => {
      state.venta = venta;
    },
    changeValueOfId_Grupo: (state,id) => {
      state.grupo_id = id;
    },
    changeValueOfID_Tipo_Amenitie: (state,id) => {
      state.tipo_amenitie_id = id;
    },
    changeValueOfID_Tipo_Configuracion:(state,id) => {
      state.tipo_configuracion_id = id;
    }
  },
  actions: {
    // Para métodos asíncronos
  },
  modules: {
  }
})
