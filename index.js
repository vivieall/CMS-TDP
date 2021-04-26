

$(document).ready(function () {
	var fecha1 = moment("20:10:10","HH:mm:ss");
	var fecha2 = moment("19:10:10","HH:mm:ss");
	//console.log(fecha1.isBefore(fecha2), "Tiempo validado");
	//console.log(moment().format("HH:mm:ss"));

  (function loadData() {
    $.ajax({
      type: "get",
      dataType: "json",
      beforeSend: function (request) {
        request.setRequestHeader("SecureCode", "SGCDSB");
      },
      url:
        "http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion-contenido",
      success: function (data) {
        console.log(data);   
       	//const tiempoactual = moment().format("HH:mm:ss");
       	const tiempoactual = moment(moment().format("HH:mm:ss"),"HH:mm:ss");
       	//const tiempoprueba = moment("20:00:00", "HH:mm:ss");

        let addsCarousel = $("#addsCarouselInner");
        let flag = true;
		addsCarousel.empty();
        for (let i = 0; i < data.length; i++) {
        	const iniciotiempo = moment(data[i].asignacion.iniciotiempo, "HH:mm:ss");
        	const fintiempo = moment(data[i].asignacion.fintiempo, "HH:mm:ss");	

        	console.log(iniciotiempo);
          	console.log(fintiempo);
          	console.log(tiempoactual);

          if(iniciotiempo.isBefore(tiempoactual) && fintiempo.isAfter(tiempoactual) ){
          	flag = false;
          	console.log("Hay contenido asignado");
          	
          //if(iniciotiempo.isBefore(tiempoprueba) && fintiempo.isAfter(tiempoprueba) ){
          let element = document.createElement("DIV");

          element.classList.add("carousel-item");
          element.innerHTML = `<img src='${data[i].contenido.url_imagen}'/>`;
          //element.style.backgroundImage = `url('${data[i].url_imagen}')`;
          if (i === 0) {
            element.classList.add("active");
          }
          addsCarousel.append(element);
          }
        }
        if(flag == true){
        	console.log("No hay contenido asignado");
            //let addCarousel = $("#addsCarouselInner");
            //addCarousel.empty();
            const canvas = "<div class='item active vertical-center'>"+
    	         "<img style='position: relative; display: block; padding-top: 20px; margin-left: auto; margin-right: auto; width: 380px; height: 240px;' src='./logo.png' />"+
       	        "<h1 style='color: white;' class='text-center'>No hay contenidos asignados en este horario.</h1>"+
                "</div>";
                addsCarousel.append(canvas);
        }

      },
      error: function (xhr, status) {
        if (typeof this.statusCode[xhr.status] != 'undefined') {
                    return false;
                }
      },
      statusCode: {
        404: function (response) {
          console.log("ajax.statusCode: 404");
        },
        500: function (response) {
          console.log("ajax.statusCode: 500");
        },
      },
    });
        setTimeout(() => loadData(),5000);
  })();
});
