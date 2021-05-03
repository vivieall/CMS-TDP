function fillCarousel(data) {
  const addsCarousel = $("#addsCarouselInner");
  console.log(data);
  if (data.length > 0) {
    for (let i = 0; i < data.length; ++i) {
      if (data.contenido !== null) {
        console.log("Hay contenido asignado");
        //if(iniciotiempo.isBefore(tiempoprueba) && fintiempo.isAfter(tiempoprueba) ){
        let element = document.createElement("DIV");

        element.classList.add("carousel-item");
        element.innerHTML = `<img src='${data[i].contenido.url_imagen}'/>`
        //element.style.backgroundImage = url('${data[i].url_imagen}');
        if (i === 0) {
          element.classList.add("active");
        }
        addsCarousel.append(element);
      }
    }
  } else {
    console.log("No hay contenido asignado");
    //let addCarousel = $("#addsCarouselInner");
    //addCarousel.empty();
    const canvas =
      "<div class='item active vertical-center'>" +
      "<img style='position: relative; display: block; padding-top: 20px; margin-left: auto; margin-right: auto; width: 380px; height: 240px;' src='./logo.png' />" +
      "<h1 style='color: white;' class='text-center'>No hay contenidos asignados en este horario.</h1>" +
      "</div>";
    addsCarousel.append(canvas);
  }
}

$(document).ready(() => {
  $.ajax({
    type: "get",
    dataType: "json",
    beforeSend: function (request) {
      request.setRequestHeader("SecureCode", "SGCDSB");
    },
    url:
      "http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion/dispositivo/5a5901c8-1855-4ff9-beb9-5979755c8e53",
    success: (dataAsigned) => {
      $("#addsCarouselInner").empty();
      //console.log("entro a la funcion de llenar");
      const currentTime = moment(moment().format("HH:mm:ss"),"HH:mm:ss");
      const startTime = moment(dataAsigned[0].iniciotiempo, "HH:mm:ss");
      const endTime = moment(dataAsigned[0].fintiempo, "HH:mm:ss");
      const idAsigned = dataAsigned[0].asignacioncontenido[0].id;


      if (startTime.isBefore(currentTime) && endTime.isAfter(currentTime)) {
        $.ajax({
          type: "get",
          dataType: "json",
          beforeSend: function (request) {
            request.setRequestHeader("SecureCode", "SGCDSB");
          },
          url: `http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion-contenido/${idAsigned}`,
          success: (contentAsigned) => {
            if (contentAsigned.contenido !== null) {
              //console.log(contentAsigned.contenido);
              const data = [
              {
                contenido: contentAsigned.contenido,
              },
            ];
            fillCarousel(data);
            
            } else {
              const contentGroupId = contentAsigned.grupocontenido.id;
              $.ajax({
                type: "get",
                dataType: "json",
                beforeSend: function (request) {
                  request.setRequestHeader("SecureCode", "SGCDSB");
                },
                url: `http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion-contenido/idgrupo/${contentGroupId}`,
                success: (content) => {
                  fillCarousel(content);
                },
                error: (xhr, status) => {
                  console.log("ajax.error");
                },
              });
            } 
          },
          error: (xhr, status) => {
            console.log("ajax.error");
          },
        });
      } else {
        fillCarousel([]);
      }
    },
    error: (xhr, status) => {
      console.log("ajax.error");
    },
    statusCode: {
      404: (response) => {
        console.log("ajax.statusCode: 404");
      },
      500: (response) => {
        console.log("ajax.statusCode: 500");
      },
    },
  });
});