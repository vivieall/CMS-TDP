function fillCarousel(data) {
  const addsCarousel = $("#addsCarouselInner");

  if (Array.isArray(data) && data.length > 0) {
    for (let i = 0; i < data.length; ++i) {
      if (data[i].contenido !== null) {
        console.log("Hay contenido asignado");
        // Obtiene los contenidos de estas asignaciones ID
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
  } else if (data instanceof Object) {
    console.log("Hay contenido asignado");
    // Obtiene los contenidos de estas asignaciones ID
    //if(iniciotiempo.isBefore(tiempoprueba) && fintiempo.isAfter(tiempoprueba) ){
    let element = document.createElement("DIV");

    element.classList.add("carousel-item");
    element.innerHTML = `<img src='${data.url_imagen}'/>`;
    //element.style.backgroundImage = `url('${data[i].url_imagen}')`;
    element.classList.add("active");

    addsCarousel.append(element);
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

async function getData() {
  try {
    const dataAsigned = await fetch(
      "http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion/dispositivo/5a5901c8-1855-4ff9-beb9-5979755c8e53",
      {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          SecureCode: "SGCDSB",
        }),
      }
    ).then((data) => data.json());

    const addsCarousel = $("#addsCarouselInner");
    addsCarousel.empty();

    const currentTime = moment(moment().format("HH:mm:ss"), "HH:mm:ss");
    const startTime = moment(dataAsigned[0].iniciotiempo, "HH:mm:ss");
    const endTime = moment(dataAsigned[0].fintiempo, "HH:mm:ss");
    const idAsigned = dataAsigned[0].asignacioncontenido[0].id;

    if (startTime.isBefore(currentTime) && endTime.isAfter(currentTime)) {
      const contentAsigned = await fetch(
        `http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion-contenido/${idAsigned}`,
        {
          method: "get",
          headers: new Headers({
            "Content-Type": "application/json",
            SecureCode: "SGCDSB",
          }),
        }
      ).then((data) => data.json());

      if (contentAsigned.contenido !== null) {
        fillCarousel(contentAsigned.contenido);
      } else {
        const contentGroupId = contentAsigned.grupocontenido.id;
        const content = await fetch(
          `http://backendtesis-env-3.eba-5sa2fpip.us-east-1.elasticbeanstalk.com/api/asignacion-contenido/idgrupo/${contentGroupId}`,
          {
            method: "get",
            headers: new Headers({
              "Content-Type": "application/json",
              SecureCode: "SGCDSB",
            }),
          }
        ).then((data) => data.json());
        fillCarousel(content);
      }
    } else {
      fillCarousel(null);
    }
  } catch (error) {
    console.log(error);
  }
}

$(document).ready(() => getData());
