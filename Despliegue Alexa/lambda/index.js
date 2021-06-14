// SERVICIOS SIGNAGE - ALEXA & LG 
const Alexa = require('ask-sdk-core');
const WebSocket = require('ws');
const fetch = require('node-fetch');
const baseUrl = 'wss://socket-app-lg.herokuapp.com'; 
const baseUrlAPI = 'http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api';
var constants = require("./constants/constants.js");
var utils = require("./utils/util.js");

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `<speak>Bienvenido al sistema de entretenimiento. Ponemos a tu disposición los siguientes servicios: <break time="0.02s"/>
                            - Reservar restaurantes, gimnasios y spas. <break time="0.02s"/>
                            - Visualizar el historial de reservas. <break time="0.02s"/>
                            - Cambiar el idioma de la interfaz del sistema a español, inglés o portugués. <break time="0.02s"/>
                            - Cambiar el tipo de moneda a soles, dólares o euros. <break time="0.02s"/>
                            Entonces, ¿en qué puedo ayudarte?
                            </speak>`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// LISTAR SERVICIOS
const ServiciosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ServiciosIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Los servicios disponibles son los siguientes: restaurantes, gimnasios y spas. ¿Qué servicio deseas visualizar?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// LISTAR RESTAURANTES
const ListarRestaurantesIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListarRestaurantesIntent';
    },
    async handle(handlerInput) {
                console.log("Entró a Listar Restaurantes API");
                const attributesManager = handlerInput.attributesManager;
                const attributes = await attributesManager.getSessionAttributes() || {};
                const currentIntent = attributes.currentIntent;

                const nombre = attributes.nombre;
                let speakOutput = "";
                let response = {};
                let ws;
                let body = {};
                let postResult;
                
                const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/servicio/idtiposervicio/servicio/idtiposervicio/e7887cbf-289d-4fe1-ae19-9a318efe9033`);
                const restaurantes = JSONResult.data.length > 0 ? JSONResult.data : [];
                
                const nameListText = restaurantes.map(item => item.name);
                let nameListSpeech = nameListText.join(`, `);
                nameListSpeech = nameListSpeech.replace(/,([^,]+)$/, ' y$1'); 
                
                response = {
                  screen: `services`,
                  intent: `ListarRestaurantesIntent`,
                  parameters: []
                };
                
                ws = new WebSocket(baseUrl);

                ws.on('open', function open(){
                    ws.send(JSON.stringify(response));
                    ws.close();
                });
        
                speakOutput = `Los restaurantes disponibles en el hotel son los siguientes: ${nameListSpeech}`
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
};

// LISTAR GYMS
const ListarGymsIntentHandler = {
        canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListarGymsIntent';
    },
async handle(handlerInput) {
        let speakOutput = "";
             try{
                const attributesManager = handlerInput.attributesManager;
                const attributes = await attributesManager.getSessionAttributes() || {};
                const currentIntent = attributes.currentIntent;
                
                const nombre = attributes.nombre;
                let x = {};
                let ws;
                let body = {};
                let postResult;
                
                const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/servicio/idtiposervicio/03f76acf-baca-43a8-ae22-d0f2a1860f71`);
                const gyms = JSONResult.data.length > 0 ? JSONResult.data : [];
                
                const nameListText = gyms.map(item => item.name);
                let nameListSpeech = nameListText.join(`, `);
                nameListSpeech = nameListSpeech.replace(/,([^,]+)$/, ' y$1'); 
                
                x = {
                  screen: `services`,
                  intent: `ListarGymsIntent`,
                  parameters: []
                };
                
                ws = new WebSocket(baseUrl);

                ws.on('open', function open(){
                    ws.send(JSON.stringify(x));
                    ws.close();
                });
        
                speakOutput = `Los gimnasios disponibles en el hotel son los siguientes: ${nameListSpeech}`
            }catch(ex){
                speakOutput = ex;
                console.log(ex);
             }
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
};

// LISTAR SPAS
const ListarSpasIntentHandler = {
            canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListarSpasIntent';
    },
async handle(handlerInput) {
            let speakOutput = "";
            try{
                const attributesManager = handlerInput.attributesManager;
                attributesManager.setSessionAttributes(attributes); 
                const attributes = await attributesManager.getSessionAttributes() || {};
                const currentIntent = 'ListarSpasIntent';
                const nombre = attributes.nombre;
                let response = {};
                let ws;
                let body = {};
                let postResult;
                
                response = await utils.getReq('http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/servicio/idtiposervicio/e7887cbf-289d-4fe1-ae19-9a318efe9033', { method: 'GET' });
                const restaurantes = response.data;
                
                const nameListText = restaurantes.map(e => e.nombre);
                let nameListSpeech = nameListText.join(`, `);
                nameListSpeech = nameListSpeech.replace(/,([^,]+)$/, ' y$1'); 
                
                response = {
                  screen: `services`,
                  intent: `ListarSpasIntent`,
                  parameters: []
                };
                
                ws = new WebSocket(baseUrl);

                ws.on('open', function open(){
                    ws.send(JSON.stringify(response));
                    ws.close();
                });
        
                speakOutput = `Los spas disponibles en el hotel son los siguientes: ${nameListSpeech}`
            }catch(ex){
                speakOutput = ex;
                console.log(ex);
             }
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
};

// VALIDACIONES
async function getDataAsync(url){
  try{
    let response = await fetch(url);
    let data = await response.json()
    return data;   
  }catch(err){
      console.log("Error ==> ", err);
  }
}

const validateSlots = function(response,text){
    for(let i = 0; i< response.length; i++){
        console.log(response[i].name + ', ' + text)
        if(response[i].name.toLowerCase() === text.toLowerCase()){
            return true
        }
    }
    return false
};

// SOLICITUD DE AYUDA AL ASISTENTE
const HelpYouCommandsHandler = {
    canHandle(handlerInput){
         return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelpYouCommands'    
    },
    handle(handlerInput, error){
        const speakOutput = `Accediste a la lista de funcionalidades disponibles en el sistema: 
                             - Para visualizar los servicios del hotel puedes decir: "Quiero ver los servicios del hotel"
                             - Para buscar un determinado servicio puedes decir: "Quiero buscar un servicio"
                             - Para reservar los servicios del hotel puedes decir: "Quiero hacer una reserva"
                             - Para visualizar el clima de la semana puedes decir: "Quiero ver el clima"`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¿Cómo puedo ayudarte?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// DETENER AL ASISTENTE 
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Gracias por usar nuestro servicio!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// EN RESPUESTA A NEGACIÓN DE SOLICITUD
const NoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
         return handlerInput.responseBuilder
                .speak('Lo entiendo, no dudes en volver a consultar')
                .reprompt('Lo entiendo, no dudes en volver a consultar')
                .getResponse();
    }
}

// SOLICITUD NO SE ENCUENTRA EN LA SKILL 
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Su petición no puede ser procesada en este momento.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// CIERRE DEL USO DEL ASISTENTE
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Sesión finalizada: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse(); 
    }
};

// SOLO PARA DEBUG, INVOCA AL INTENT LLAMADO
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Haz llamado al endpoint ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// MENSAJE DE ERROR
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento. Hay un error en la petición.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// REALIZAR RESERVA 
const StartedInProgressBookingServiceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
      && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
      
    let ws = new WebSocket(baseUrl)
    let event = 'start-booking';
    
    let response = {
                    event: event,
                    param: ''
                }
                
    console.log(response);
    ws.on('open', function open(){
        ws.send(JSON.stringify(response));
        ws.close();
    });  
      
   return handlerInput.responseBuilder
            .addDelegateDirective()
            .getResponse();
  }
}

const RestaurantGivenBookingServiceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
      && handlerInput.requestEnvelope.request.intent.slots.service.value 
      && !handlerInput.requestEnvelope.request.intent.slots.name.value
  },
  handle(handlerInput) {
    
    let ws = new WebSocket(baseUrl)
    let service = handlerInput.requestEnvelope.request.intent.slots.service.value;  
    let event = 'start-booking';
    let response1 = {
                    event: event,
                    param: '' 
                }
    
        ws.on('open', function open(){
        ws.send(JSON.stringify(response1));
        ws.close();
    });
    
    let response2 = {
                    event:'edit-service',
                    param: service 
                }
    
    
    ws.on('open', function open(){
        ws.send(JSON.stringify(response2));
        ws.close();
    });  
    
    return handlerInput.responseBuilder
      .speak(`¿Cuál es el nombre del ${service}?`)
      .reprompt(`¿Cuál es el nombre del ${service}?`)
      .addElicitSlotDirective('name')
      .getResponse();
  }
}

const BookingServiceGetDateIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
      && handlerInput.requestEnvelope.request.intent.slots.service.value 
      && handlerInput.requestEnvelope.request.intent.slots.name.value
      && !handlerInput.requestEnvelope.request.intent.slots.date.value
  },
  async handle(handlerInput) {

    let name = handlerInput.requestEnvelope.request.intent.slots.name.value;   
    let event = 'edit-service-name';
    let serviceType = '';
    let service = handlerInput.requestEnvelope.request.intent.slots.service.value;
    let speakOutput = '';
    
    switch (service) {
        case 'restaurante':
            serviceType = 'd08f1124-2319-4bbe-8732-e3ead7d53beb'
        break;
        case 'spa':
            serviceType = 'e7887cbf-289d-4fe1-ae19-9a318efe9033'
        break;
        case 'gimnasio':
            serviceType = '03f76acf-baca-43a8-ae22-d0f2a1860f71'
        break;
        default:
            serviceType = ''
        break;
    } 
    console.log(serviceType);
    let fetchUrl = `http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/servicio/idtiposervicio/`
    try{
        let json = await getDataAsync(fetchUrl);
        console.log(json);
        let response = json.data;
        console.log('validacion' + validateSlots(response, name));
        console.log(name);
        if(validateSlots(response, name)){
            
            let instruction = {
                event: event,
                param: name
            }
            console.log(instruction);
            let ws = new WebSocket(baseUrl);
            ws.on('open', function open(){
                ws.send(JSON.stringify(instruction));
                ws.close();
            });
            
            return handlerInput.responseBuilder
            .speak('¿Cuál es la fecha de la reserva?')
            .reprompt('¿Cuál es la fecha de la reserva?')
            .addElicitSlotDirective('date')
            .getResponse();     
            
        }else{
          
        speakOutput = `El nombre del ${service} es incorrecto. Actualmente hay ${response.length} ${service}s en el hotel. `
        for (var i=0; i<response.length; i++){
            if(i === 0){
                speakOutput = speakOutput  + 'Sus nombres son: ' + response[i].name + ', '
            }else if(i === response.length - 1){
                speakOutput = speakOutput + 'y ' + response[i].name + `. ¿Cuál es el nombre del ${service} que desea reservar?`
            }else{
                speakOutput = speakOutput + response[i].name + ', '
            }
            
        }
        
        console.log(speakOutput);
         return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addElicitSlotDirective('name')
        .getResponse();   
        }
    }catch(err){
        console.log(err);
        return handlerInput.responseBuilder
        .speak(err)
        .getResponse();
    }
  }
}

const BookingServiceGetHoursIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
      && handlerInput.requestEnvelope.request.intent.slots.service.value 
      && handlerInput.requestEnvelope.request.intent.slots.name.value
      && handlerInput.requestEnvelope.request.intent.slots.date.value
      && !handlerInput.requestEnvelope.request.intent.slots.hours.value
  },
  handle(handlerInput) {

    let date = handlerInput.requestEnvelope.request.intent.slots.date.value;  
    let ws = new WebSocket(baseUrl)
    let event = 'edit-service-date';
    let response = {
                    event: event,
                    param: date 
                }
    
    ws.on('open', function open(){
        ws.send(JSON.stringify(response));
        ws.close();
    });  
    
    return handlerInput.responseBuilder
      .speak('¿Cuál es la hora de la reserva?, recuerda que el horario de atención es de las 7.00 am a las 10.00 pm.')
      .reprompt('¿Cuál es la hora de la reserva?')
      .addElicitSlotDirective('hours')
      .getResponse();
  }
}

const ConfirmBookingServiceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
        && handlerInput.requestEnvelope.request.intent.slots.service.value
        && handlerInput.requestEnvelope.request.intent.slots.name.value
        && handlerInput.requestEnvelope.request.intent.slots.date.value
        && handlerInput.requestEnvelope.request.intent.slots.hours.value
        && !handlerInput.requestEnvelope.request.intent.slots.confirm.value
  },
  handle(handlerInput) {
     
    let service = handlerInput.requestEnvelope.request.intent.slots.service.value;
    let name = handlerInput.requestEnvelope.request.intent.slots.name.value;
    let date = handlerInput.requestEnvelope.request.intent.slots.date.value;
    let hours = handlerInput.requestEnvelope.request.intent.slots.hours.value;
    
    let ws = new WebSocket(baseUrl)
    let event = 'edit-service-hours';
    let response = {
                    event: event,
                    param: hours 
                }
    
    ws.on('open', function open(){
        ws.send(JSON.stringify(response));
        ws.close();
    });  
    
    const speechText = `Tu reserva del ${service} ${name} se programó para el día  ${date}  a las ${hours}. ¿Quieres confirmar la reserva? Puedes decir "Sí" para confirmar o "No" para cancelar la reserva`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addElicitSlotDirective('confirm')
      .getResponse();
    
    
  }
}

const CompletedBookingServiceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === "BookingServiceIntent"
        && handlerInput.requestEnvelope.request.intent.slots.service.value
        && handlerInput.requestEnvelope.request.intent.slots.name.value
        && handlerInput.requestEnvelope.request.intent.slots.date.value
        && handlerInput.requestEnvelope.request.intent.slots.hours.value
        && handlerInput.requestEnvelope.request.intent.slots.confirm.value
        && handlerInput.requestEnvelope.request.dialogState === "COMPLETED";
  },
  handle(handlerInput) {
     
    let speakOutput = '';
    let confirm = handlerInput.requestEnvelope.request.intent.slots.confirm.value;
    if(confirm === 'si'){
        let ws = new WebSocket(baseUrl)
        let event = 'show-booking-modal';
        let response = {
                    event: event,
                    param: '' 
                }
    
    ws.on('open', function open(){
        ws.send(JSON.stringify(response));
        ws.close();
    });  
        speakOutput = 'Tu reserva se ha realizado exitosamente.'
    } 
    else{
        speakOutput = 'Haz cancelado la reserva. Puedes decir "quiero hacer una reserva" para empezar a reservar.'
    }
    return handlerInput.responseBuilder
    .speak(speakOutput)
    .getResponse();
  }
}

// REALIZAR TRANSACCIONES / COMPRAS
const StoreProductIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "StoreProductIntent"
    },
    async handle(handlerInput){
        try{
            const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta`);
            const JSONCategories = JSONResult.data.length > 0 ? JSONResult.data : [];
            const numberOfCategories = JSONCategories.length;
            const categoriesNameList = JSONCategories.map(item => item.name);
            let categoriesListSpeech = categoriesNameList.join(', ');
            categoriesListSpeech = categoriesListSpeech.replace(/,([^,]+)$/, ' y$1');
            
            //setup intent state
            const attributesManager = handlerInput.attributesManager;
            const attributes = await attributesManager.getSessionAttributes() || {};
            attributes.currentIntent = 'StoreProductIntent';
            attributesManager.setSessionAttributes(attributes); 
            
            const speakOutput = `<speak>
                                Bienvenido a la tienda online, existen ${numberOfCategories} categorías de productos disponibles para elegir, estas son: 
                                ${categoriesListSpeech}. 
                                Para cambiar de categoría diga "Cambiar" <break time="0.5s"/> seguido del nombre de la categoría de producto. 
                                Para comprar un producto diga "Comprar" <break time="0.5s"/> seguido del nombre del producto.
                                Entonces, ¿en que puedo ayudarte?
                                </speak>`
            
            const response = {
                screen: "store",
                intent: "changeCategoryIntent",
                parameters: []
            };
                    
            let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                    ws.send(JSON.stringify(response));
                    ws.close();
            });                    
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
        }catch(ex){
            console.log(`error: ${ex}`);
            const speakOutput = `Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud.`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
        }
    }
};

const StartedChangeProductCategoryIntentHandler = {
    async canHandle(handlerInput){
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getSessionAttributes() || {};
        const currentIntent = attributes.currentIntent;
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "ChangeProductCategoryIntent"
            && !handlerInput.requestEnvelope.request.intent.slots.productCategory.value
            && currentIntent === "StoreProductIntent"
    },
    handle(handlerInput){
        try{
            const mockCategories = {
                    status: "ok",
                    categories: [
                        {
                            id: 1,
                            name: "Bebidas",
                            active: true,
                        },
                        {
                            id: 2,
                            name: "Postres",
                            active: true,
                        },
                        {
                            id: 3,
                            name: "Licores",
                            active: true,
                        },
                        {
                            id: 4,
                            name: "Piqueos",
                            active: true,
                        }
                    ]
                };
              
            const categories = mockCategories.categories;  
            const nameListText = categories.map(item => item.name);
            let nameListSpeech = nameListText.join(', ');
            nameListSpeech = nameListSpeech.replace(/,([^,]+)$/, ' y$1');
        
            const speakOutput = `<speak>Actualmente disponemos de ${categories.length} categorías de productos en la tienda online. Estas son: ${nameListSpeech}.
                                ¿Cuál es la categoría que desea visualizar?</speak>`
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addElicitSlotDirective('productCategory')
            .getResponse();
            
        }catch(ex){
            console.log(ex)
            const speakOutput = `<speak>Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud. Por favor, 
                                comuníquese con el administrador al siguiente al número <say-as interpret-as="telephone">945433992</say-as></speak>`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
            
        }
    }
}

const CompletedChangeProductCategoryIntentHandler = {
    async canHandle(handlerInput){
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getSessionAttributes() || {};
        const currentIntent = attributes.currentIntent;
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "ChangeProductCategoryIntent"
            && handlerInput.requestEnvelope.request.intent.slots.productCategory.value
            && currentIntent === "StoreProductIntent"
    },
    async handle(handlerInput){
        try{
            
            const JSONCategories = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta`);
            const categories = JSONCategories.data.length > 0 ? JSONCategories.data : [];
            const categoryName = handlerInput.requestEnvelope.request.intent.slots.productCategory.value;
                
            const nameListText = categories.map(item => item.name);
            let nameListSpeech = nameListText.join(', ');
            nameListSpeech = nameListSpeech.replace(/,([^,]+)$/, ' y$1');
                
            const searchResult = categories.find(e => e.name.toLowerCase() === categoryName.toLowerCase());
            
            if(searchResult){
                const JSONProducts = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta/${searchResult.id}`);
                const products = JSONProducts.data.length > 0 ? JSONProducts.data : [];
                const productQuantity = products.length;
                
                const response = {
                    screen: "store",
                    intent: "changeCategoryIntent",
                    parameters: [
                            {name:"categoryId", value: searchResult.id},
                        ]
                    }
                    
                let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                    ws.send(JSON.stringify(response));
                    ws.close();
                });                    
                    
                const attributesManager = handlerInput.attributesManager;
                const attributes = await attributesManager.getSessionAttributes() || {};
                attributes.productCategoryId = searchResult.id;
                attributesManager.setSessionAttributes(attributes);
                    
                const speakOutput = `<speak> 
                                    Haz seleccionado la categoría de ${categoryName}. En el televisor se muestran un total de ${productQuantity} productos pertenecientes a la categoría seleccionada.
                                    Recuerda que : 
                                    Para  proceder a comprar diga "Comprar" <break time="0.5s"/> seguido del nombre del producto.
                                    Para cambiar de categoría diga "Cambiar" <break time="0.5s"/> seguido del nombre de la categoría de producto.
                                    </speak>`;
                                        
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
                    
                }else{
                    const speakOutput = `<speak> 
                                        Lo lamento, la categoría brindada no se encuentra disponible en nuestra tienda online. 
                                        Recuerda que las categorías disponibles son: 
                                        ${nameListSpeech}. 
                                        Entonces, ¿Cuál es el nombre de la categoría que deseas visualizar?
                                        </speak>`;
                    return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .addElicitSlotDirective('productCategory')
                    .getResponse();
                }
        }catch(ex){
            console.log(ex);
            const speakOutput = `<speak>Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud. Por favor, 
                                comuníquese con el administrador al siguiente al número <say-as interpret-as="telephone">945433992</say-as></speak>`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
        }
    }
};

const InProgressBuyProductIntentHandler = {
    async canHandle(handlerInput){
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getSessionAttributes() || {};
        const currentIntent = attributes.currentIntent;
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "BuyProductIntent"
            && handlerInput.requestEnvelope.request.intent.slots.productName.value
            && !handlerInput.requestEnvelope.request.intent.slots.productQuantity.value
            && currentIntent === "StoreProductIntent"
    },
    async handle(handlerInput){
        try{
            const productName = handlerInput.requestEnvelope.request.intent.slots.productName.value;
            const attributesManager = handlerInput.attributesManager;
            const attributes = await attributesManager.getSessionAttributes() || {};
            const productCategoryId = attributes.productCategoryId;
            console.log(productCategoryId);
            const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta/${productCategoryId}`);
            const JSONProducts = JSONResult.data.length > 0 ? JSONResult.data : [];
            const searchProduct = JSONProducts.find(e => e.name.toLowerCase() === productName.toLowerCase());
            if(searchProduct){
              const response = {
                  screen: `store`,
                  intent: `buyProductIntent`,
                  parameters: [
                        {name: "productId", value: searchProduct.id},
                        {name: "startBuy", value: true},
                      ]
              }  
                let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                ws.send(JSON.stringify(response));
                ws.close();
                });
                const speakOutput = `<speak>
                                    Haz seleccionado el producto ${searchProduct.name}. Este tiene un precio unitario de <say-as interpret-as="number">${searchProduct.price}</say-as> soles.
                                    Para proseguir con la comprar es necesario que indiques las cantidad de unidades que deseas comprar.
                                    ¿Cuántas unidades del productos deseas adquirir?
                                    </speak>`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .addElicitSlotDirective("productQuantity")
                    .getResponse();
            }else{
                const speakOutput = `<speak>
                                    Lo lamento, al parecer el producto solicitado no se encuentra disponible en la categoría seleccionada. 
                                    Puedes utilizar el control remoto del televisor para navegar por los productos disponibles.
                                    Entonces, ¿Cuál es el nombre del producto que desea comprar?
                                    </speak>`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .reprompt(speakOutput)
                    .addElicitSlotDirective('productName')
                    .getResponse();
            }
        }catch(ex){
            console.log(ex);
            const speakOutput = `<speak>Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud. Por favor, 
                                comuníquese con el administrador al siguiente al número <say-as interpret-as="telephone">945433992</say-as></speak>`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
        }
    }
};

const CompletedBuyProductIntentHandler = {
    async canHandle(handlerInput){
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getSessionAttributes() || {};
        const currentIntent = attributes.currentIntent;
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "BuyProductIntent"
            && handlerInput.requestEnvelope.request.intent.slots.productName.value
            && handlerInput.requestEnvelope.request.intent.slots.productQuantity.value
            && !handlerInput.requestEnvelope.request.intent.slots.confirmTransaction.value
            && currentIntent === "StoreProductIntent"
    },
    async handle(handlerInput){
        try{
            const productName = handlerInput.requestEnvelope.request.intent.slots.productName.value;
            const productQuantity = handlerInput.requestEnvelope.request.intent.slots.productQuantity.value;
            const attributesManager = handlerInput.attributesManager;
            const attributes = await attributesManager.getSessionAttributes() || {};
            const productCategoryId = attributes.productCategoryId;
            const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta/${productCategoryId}`);
            const JSONProducts = JSONResult.data.length > 0 ? JSONResult.data : [];
            const searchProduct = JSONProducts.find(e => e.name.toLowerCase() === productName.toLowerCase());
            const totalAmount = searchProduct.price*parseInt(productQuantity);
            const response = {
                  screen: `store`,
                  intent: `buyProductIntent`,
                  parameters: [
                        {name: "productId", value: searchProduct.id},
                        {name: "startBuy", value: true},
                        {name: "productQuantity", value: parseInt(productQuantity)}
                      ]
            }  
              
            let ws = new WebSocket(baseUrl);
            ws.on('open', function open(){
            ws.send(JSON.stringify(response));
            ws.close();
            });
            
            const speakOutput = `<speak>
                                Este es el detalle de tu compra hasta el momento: <break time="0.05s"/>
                                ${productQuantity} ${productName} por un monto total de <say-as interpret-as="number">${totalAmount}</say-as> soles. 
                                Recuerda que este monto se agregará como cargo a tu historial de transacciones de compra.
                                ¿Estás seguro de confirmar la transacción?
                                </speak>`
                                
            return handlerInput.responseBuilder
            .addElicitSlotDirective(`confirmTransaction`)
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse()
        }catch(ex){
            console.log(ex);
            const speakOutput = `<speak>
                                Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud. 
                                Por favor, comuníquese con el administrador al siguiente al número <say-as interpret-as="telephone">945433992</say-as>
                                </speak>`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
        }
    }
};

const EndingBuyProductIntentHandler = {
    async canHandle(handlerInput){
        const attributesManager = handlerInput.attributesManager;
        const attributes = await attributesManager.getSessionAttributes() || {};
        const currentIntent = attributes.currentIntent;
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "BuyProductIntent"
            && handlerInput.requestEnvelope.request.intent.slots.productName.value
            && handlerInput.requestEnvelope.request.intent.slots.productQuantity.value
            && handlerInput.requestEnvelope.request.intent.slots.confirmTransaction.value
            && currentIntent === "StoreProductIntent"
    },
    async handle(handlerInput){
        try{
            
            const confirmTransaction = handlerInput.requestEnvelope.request.intent.slots.confirmTransaction.value;
            const listYesValues = ["Si","De acuerdo","Confirmo"];
            const listNoValues = ["No", "No gracias", "En desacuerdo"];
            const YesSearch = listYesValues.find(e => e.toLowerCase() === confirmTransaction.toLowerCase());
            const NoSearch = listNoValues.find(e => e.toLowerCase() === confirmTransaction.toLowerCase());
            const productName = handlerInput.requestEnvelope.request.intent.slots.productName.value;
            const productQuantity = handlerInput.requestEnvelope.request.intent.slots.productQuantity.value;
            const attributesManager = handlerInput.attributesManager;
            const attributes = await attributesManager.getSessionAttributes() || {};
            const productCategoryId = attributes.productCategoryId;
            const JSONResult = await getDataAsync(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/venta/${productCategoryId}`);
            const JSONProducts = JSONResult.data.length > 0 ? JSONResult.data : [];
            const searchProduct = JSONProducts.find(e => e.name.toLowerCase() === productName.toLowerCase());
            const totalAmount = searchProduct.price*parseInt(productQuantity);
            
            if(YesSearch){
                
                const response = {
                  screen: `store`,
                  intent: `buyProductIntent`,
                  parameters: [
                        {name: "productId", value: searchProduct.id},
                        {name: "startBuy", value: true},
                        {name: "productQuantity", value: parseInt(productQuantity)},
                        {name: "endingBuy", value: true}
                      ]
                };
                
                
                const postResult = utils.post(`http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/transaccion`)
                const body = {
                        currency_symbol: 'S/.',
                        amount: parseInt(totalAmount),
                        guest_id: 2,
                        transaction_description: `${productQuantity} ${productName}`,
                        transaction_datetime: new Date(),
                        product_id: searchProduct.id
                        
                };
                const transactionResult = utils.post(`${baseUrlAPI}/transactions`, body);
                let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                ws.send(JSON.stringify(response));
                ws.close();
                });
                
                const speakOutput = `<speak>
                                        <amazon:emotion name="excited" intensity="medium">Su compra se ha realizado exitósamente!.</amazon:emotion> 
                                        Recuerda que para ver el historial de compras <break time="0.02s"/> diga: "Ver historial de compras".
                                    </speak>`
                                    
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse()                    
                
            }else if(NoSearch){
                
                const response = {
                  screen: `store`,
                  intent: `buyProductIntent`,
                  parameters: [
                        {name: "productId", value: searchProduct.id},
                        {name: "startBuy", value: true},
                        {name: "productQuantity", value: parseInt(productQuantity)},
                        {name: "endingBuy", value: false}
                      ]
                };
                
                let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                ws.send(JSON.stringify(response));
                ws.close();
                });
                
                const speakOutput = `<speak>
                                      Haz rechazado la solicitud de compra de ${productName}. 
                                      Recuerda que para comprar un producto solo debes decir "Comprar" <break time="0.05s"/> seguido del nombre del producto.   
                                    </speak>`;
                
                return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse()
            }else{
                const speakOutput = `<speak>
                                        Lo lamento, no le he entendido. 
                                        Diga "Sí" para confirmar la compra o "No" para rechazarla.
                                        Entonces, ¿Deseas confirmar la compra?
                                    </speak>`
                                    
                                    
                const response = {
                  screen: `store`,
                  intent: `buyProductIntent`,
                  parameters: [
                        {name: "productId", value: searchProduct.id},
                        {name: "startBuy", value: true},
                        {name: "productQuantity", value: parseInt(productQuantity)},
                        {name: "endingBuy", value: false}
                      ]
                };                    
                
                let ws = new WebSocket(baseUrl);
                ws.on('open', function open(){
                ws.send(JSON.stringify(response));
                ws.close();
                });
                                 
                return handlerInput.responseBuilder
                .addElicitSlotDirective(`confirmTransaction`)
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse() 
            }
        }catch(ex){
            console.log(ex);
            const speakOutput = `<speak>
                                Lo siento, ha ocurrido un error inesperado y no se ha podido procesar su solicitud. 
                                Por favor, comuníquese con el administrador al siguiente al número <say-as interpret-as="telephone">945433992</say-as>
                                </speak>`;
            return handlerInput.responseBuilder
            .speak(ex)
            .reprompt(ex)
            .getResponse();
        }
    }
};



// TODOS LOS INTENTS LLAMADOS EN LA SKILL
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        //...require('./handlers/event/handler'),
        //...require('./handlers/service/handler'),
        //...require('./handlers/restaurant/handler'),
        //...require('./handlers/yes/handler'),
        //...require('./handlers/booking/handler'),
        //...require('./handlers/bookingHistory/handler'),
        ServiciosIntentHandler,
        ListarRestaurantesIntentHandler,
        ListarSpasIntentHandler,
        ListarGymsIntentHandler,
        StartedChangeProductCategoryIntentHandler,
        CompletedChangeProductCategoryIntentHandler,
        InProgressBuyProductIntentHandler,
        CompletedBuyProductIntentHandler,
        EndingBuyProductIntentHandler,
        StartedInProgressBookingServiceIntentHandler,
        RestaurantGivenBookingServiceIntentHandler,
        BookingServiceGetDateIntentHandler,
        BookingServiceGetHoursIntentHandler,
        ConfirmBookingServiceIntentHandler,
        NoIntentHandler,
        HelpYouCommandsHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();