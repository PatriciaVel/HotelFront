function validaVacio(valor) {
  // valor = valor.replace('&nbsp;', '');
  if (valor=="" || valor === undefined) {
    return true;
  }
  else {
    return false;
  }
}

function ValidaCategory() {
  var nombre = document.getElementById("nameCat").value;
  var descripcion = document.getElementById("descriptionCat").value;
 
  if (validaVacio(nombre) || validaVacio(descripcion)) { 
    alert("Los campos no pueden quedar vacíos");
    return false;
  }
  return true;
}
  

function createCategory() {
  if(ValidaCategory()){ 
    let dataCategory = {
      name: $("#nameCat").val(),
      description: $("#descriptionCat").val()
    };
  
    $.ajax({
      url: "http://129.151.122.196:8080/api/Category/save",
      type: 'POST',
      data: JSON.stringify(dataCategory),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("Categoría registrada con éxito")
        window.location.reload()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se guardo correctamente");
        window.location.reload();
        
      }
    });
  }
  
}

function verRegistrosCategory() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Category/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {

      $("#verDatosCategory").append("<tr>");
      $("#verDatosCategory").append("<th>Nombre</th>");
      $("#verDatosCategory").append("<th>Descripción</th>");
      $("#verDatosCategory").append("</tr>");
      for (i = 0; i < response.length; i++) {
        var itemId =  response[i].id+',';
        var itemNom = '\''+response[i].name+'\',';
        var itemDes =  '\''+response[i].description+'\'';

        $("#verDatosCategory").append("<tr>");
        $("#verDatosCategory").append("<td>" + response[i].name + "</td>");
        $("#verDatosCategory").append("<td>" + response[i].description + "</td>");
        $("#verDatosCategory").append('<td><button onclick="detalleCategory('+itemId+ itemNom +itemDes+')">Detalle</button></td>');
        $("#verDatosCategory").append('<td><button onclick="borrarCategory(' + response[i].id + ')">Borrar</button></td>');
        $("#verDatosCategory").append("</tr>");
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
    }
  });
}

function detalleCategory(itemId, itemNom, itemDes) {
  document.getElementById("IdCat").value = itemId
  document.getElementById("nameCat").value = itemNom;
  document.getElementById("descriptionCat").value = itemDes;
  document.getElementById("btnActuCat").disabled= false;
}

function actualizarCategory(){
  if(ValidaCategory()){ 
    let dataCategory = {
      id: $("#IdCat").val(),
      name: $("#nameCat").val(),
      description: $("#descriptionCat").val()
    };
    
    $.ajax({
      url: "http://129.151.122.196:8080/api/Category/update" ,
      type: 'PUT',
      data: JSON.stringify(dataCategory),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("Registro actualizado correctamente");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload();
        alert("No se actualizo correctamente");
      }
    });
  }

}

function borrarCategory(idElemento) {
  let dataCategory = {
    id: idElemento
  };
  
  $.ajax({
    url: "http://129.151.122.196:8080/api/Category/" + idElemento ,
    type: 'DELETE',
    data: JSON.stringify(dataCategory),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      alert("El registro se ha eliminado");
      window.location.reload();
      
    },

    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}

function ConsultarFKCategoryRoom() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Category/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);

      let mySelect = "";
      mySelect += "<option value=0>Seleccionar</option>";
      for (i = 0; i < response.length; i++) {

        mySelect += "<option value=" + response[i].id + ">" + response[i].name + "</option>";
      }
      $("#selectCategories").html(mySelect);
    }
  });
}

function ValidaRoom() {
  var nombre = document.getElementById("nameRoom").value;
  var hotel = document.getElementById("hotelRoom").value;
  var estrellas = document.getElementById("starsRoom").value;
  var descripcion = document.getElementById("descriptionRoom").value;
 
  if (validaVacio(nombre) ||validaVacio(hotel)||validaVacio(estrellas)|| validaVacio(descripcion)) { 
    alert("Los campos no pueden quedar vacíos");
    return false;
  }
  return true;
}

function createRoom() {
  if(ValidaRoom()){ 
    let mylistCategory = document.getElementById("selectCategories");

    let fkCatRoom = {
      id: mylistCategory.options[mylistCategory.selectedIndex].value
    }
    let dataHabitacion = {
      name: $("#nameRoom").val(),
      hotel: $("#hotelRoom").val(),
      stars: $("#starsRoom").val(),
      description: $("#descriptionRoom").val(),
      category: fkCatRoom

    };
    $.ajax({
      url: "http://129.151.122.196:8080/api/Room/save",
      type: 'POST',
      data: JSON.stringify(dataHabitacion),
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      success: function (response) {
        console.log(response);
        alert("Habitación registrada con éxito")
        window.location.reload()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se guardo correctamente");
        window.location.reload()
        
      }
    });
  }  
}

function verRegistrosRoom() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Room/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      $("#verDatosRoom").append("<tr>");
      $("#verDatosRoom").append("<th>Nombre</th>");
      $("#verDatosRoom").append("<th>Hotel</th>");
      $("#verDatosRoom").append("<th>Estrellas</th>");
      $("#verDatosRoom").append("<th>Descripción</th>");
      $("#verDatosRoom").append("<th>Categoría</th>");
      $("#verDatosRoom").append("</tr>");

      for (i = 0; i < response.length; i++) {
        var itemId =  response[i].id+',';
        var itemNom = '\''+response[i].name+'\',';
        var itemHotel = '\''+response[i].hotel+'\',';
        var itemStars = response[i].stars+',';
        var itemDes =  '\''+response[i].description+'\'';

        $("#verDatosRoom").append("<tr>");
        $("#verDatosRoom").append("<td>" + response[i].name + "</td>");
        $("#verDatosRoom").append("<td>" + response[i].hotel + "</td>");
        $("#verDatosRoom").append("<td>" + response[i].stars + "</td>");
        $("#verDatosRoom").append("<td>" + response[i].description + "</td>");
        $("#verDatosRoom").append("<td>" + JSON.stringify(response[i].category.name) + "</td>");
        $("#verDatosRoom").append('<td><button onclick="detalleRoom('+itemId+itemNom+itemHotel+itemStars+itemDes+')">Detalle</button></td>');
        $("#verDatosRoom").append('<td><button onclick="borrarRoom('+response[i].id+')">Borrar</button></td>');        
        $("#verDatosRoom").append("</tr>");
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
    }
  });
}


function detalleRoom(itemId,itemNom,itemHotel,itemStars,itemDes) {
  document.getElementById("IdRoom").value = itemId
  document.getElementById("nameRoom").value = itemNom;
  document.getElementById("hotelRoom").value = itemHotel;
  document.getElementById("starsRoom").value = itemStars;
  document.getElementById("descriptionRoom").value = itemDes;
  document.getElementById("btnActuRoom").disabled= false;
}

function actualizarRoom(){
  if(ValidaRoom()){ 
    let dataRoom = {
      id: $("#IdRoom").val(),
      name: $("#nameRoom").val(),
      hotel: $('#hotelRoom').val(),
      stars: $('#starsRoom').val(),
      description: $("#descriptionRoom").val()
    };
    
    $.ajax({
      url: "http://129.151.122.196:8080/api/Room/update" ,
      type: 'PUT',
      data: JSON.stringify(dataRoom),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        alert("Registro actualizado correctamente");
        console.log(response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se actualizo correctamente");
        window.location.reload();
      }
    });
  }

}

function borrarRoom(idElemento) {
  let elemento = {
    id: idElemento
  };
  
  $.ajax({
    url: "http://129.151.122.196:8080/api/Room/" + idElemento ,
    type: 'DELETE',
    data: JSON.stringify(elemento),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      alert("El registro se ha eliminado");
      window.location.reload();
      
    },

    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}


function ValidaClient() {
  var nombre = document.getElementById("nameCli").value;
  var email = document.getElementById("emailCli").value;
  var age = document.getElementById("ageCli").value;
  var password = document.getElementById("passwordCli").value;
 
  if (validaVacio(nombre) ||validaVacio(email)||validaVacio(age)|| validaVacio(password)) { 
    alert("Los campos no pueden quedar vacíos");
    return false;
  }
  return true;
}


function createClient() {
  if(ValidaClient()){ 
    let dataClient = {
      name: $("#nameCli").val(),
      email: $("#emailCli").val(),
      age: $("#ageCli").val(),
      password: $("#passwordCli").val()
    };

    $.ajax({
      url: "http://129.151.122.196:8080/api/Client/save",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(dataClient),
      dataType: 'json',
      success: function (response) {
        console.log(response);
        alert("Cliente registrado con éxito")
        window.location.reload()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload()
        alert("No se guardo correctamente");
      }
    });
  }
}


function verRegistrosClient() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Client/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {


      $("#verDatosClient").append("<tr>");
      $("#verDatosClient").append("<th>Nombre</th>");
      $("#verDatosClient").append("<th>Correo</th>");
      $("#verDatosClient").append("<th>Edad</th>");
      $("#verDatosClient").append("</tr>");
      for (i = 0; i < response.length; i++) {
        var itemId =  response[i].idClient+',';
        var itemNom = '\''+response[i].name+'\',';
        var itemEmail = '\''+response[i].email+'\',';
        var itemAge = response[i].age+',';
        var itemPassw = '\''+response[i].password+'\'';

        $("#verDatosClient").append("<tr>");
        $("#verDatosClient").append("<td>" + response[i].name + "</td>");
        $("#verDatosClient").append("<td>" + response[i].email + "</td>");
        $("#verDatosClient").append("<td>" + response[i].age + "</td>");
        $("#verDatosClient").append('<td><button onclick="detalleClient('+itemId+itemNom+itemEmail+itemAge+itemPassw+')">Detalle</button></td>');
        $("#verDatosClient").append('<td><button onclick="borrarClient('+response[i].idClient+')">Borrar</button></td>');
        $("#verDatosClient").append("</tr>");

      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
    }
  });
}


function detalleClient(itemId,itemNom,itemEmail,itemAge,itemPassw) {
  document.getElementById("idCli").value = itemId
  document.getElementById("nameCli").value = itemNom;
  document.getElementById("emailCli").value = itemEmail;
  document.getElementById("ageCli").value = itemAge;
  document.getElementById("passwordCli").value = itemPassw;
  document.getElementById("btnActuClient").disabled= false;  

}

function actualizarClient() {
  if(ValidaClient()){ 
    let dataClient = {
      idClient: $("#idCli").val(),
      name: $("#nameCli").val(),
      email: $('#emailCli').val(),
      age: $('#ageCli').val(),
      password: $("#passwordCli").val()
    };
    
    $.ajax({
      url: "http://129.151.122.196:8080/api/Client/update" ,
      type: 'PUT',
      data: JSON.stringify(dataClient),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("Registro actualizado correctamente");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se actualizo correctamente");
        window.location.reload();
      }
    });
  }  
}


function borrarClient(idElemento) {
  let elemento = {
    idClient: idElemento
  };
  
  $.ajax({
    url: "http://129.151.122.196:8080/api/Client/" + idElemento ,
    type: 'DELETE',
    data: JSON.stringify(elemento),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      alert("El registro se ha eliminado");
      window.location.reload();
      
    },

    error: function (jqXHR, textStatus, errorThrown) {

    }
  });  
}

function ConsultarFKRoomsMessage() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Room/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);

      let mySelect = "";
      mySelect += "<option value=0>Seleccionar</option>";
      for (i = 0; i < response.length; i++) {

        mySelect += "<option value=" + response[i].id + ">" + response[i].name + "</option>";
      }
      $("#selectRooms").html(mySelect);
      $("#selectRoomsRese").html(mySelect);
    }
  });
}

function ConsultarFKClientMessage() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Client/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      console.log(response);

      let mySelect = "";
      mySelect += "<option value=0>Seleccionar</option>";
      for (i = 0; i < response.length; i++) {

        mySelect += "<option value=" + response[i].idClient + ">" + response[i].name + "</option>";
      }
      $("#selectClients").html(mySelect);
      $("#selectClientsRese").html(mySelect);
    }
  });
}

function ValidaMessage() {
  var mensaje = document.getElementById("messageText").value;
 
  if (validaVacio(mensaje)) { 
    alert("Los campos no pueden quedar vacíos");
    return false;
  }
  return true;
}

function createMessage() {
  if (ValidaMessage()){
    let mylistRoom = document.getElementById("selectRooms");
    let mylistClient = document.getElementById("selectClients");

    let fkRoomMess = {
      id: mylistRoom.options[mylistRoom.selectedIndex].value
    }

    let fkCliMess = {
      idClient: mylistClient.options[mylistClient.selectedIndex].value
    }

    let dataMessage = {
      messageText: $("#messageText").val(),
      room: fkRoomMess,
      client: fkCliMess

    };

    $.ajax({
      url: "http://129.151.122.196:8080/api/Message/save",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(dataMessage),
      dataType: 'json',
      success: function (response) {
        console.log(response);
        alert("Mensaje registrado con éxito")
        window.location.reload()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload()
        alert("No se guardo correctamente");
      }
    });
  }
}


function verRegistrosMessage() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Message/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {

      // var misItems = response.items;

      $("#verDatosMessage").append("<tr>");
      $("#verDatosMessage").append("<th>Mensaje</th>");
      $("#verDatosMessage").append("<th>Habitación</th>");
      $("#verDatosMessage").append("<th>Cliente</th>");
      $("#verDatosMessage").append("</tr>");
      for (i = 0; i < response.length; i++) {
        var itemId =  response[i].idMessage+',';
        var itemMensa = '\''+response[i].messageText+'\'';
     
        $("#verDatosMessage").append("<tr>");
        $("#verDatosMessage").append("<td>" + response[i].messageText + "</td>");
        $("#verDatosMessage").append("<td>" + JSON.stringify(response[i].room.name) + "</td>");
        $("#verDatosMessage").append("<td>" + JSON.stringify(response[i].client.name) + "</td>");
        $("#verDatosMessage").append('<td><button onclick="detalleMessage(' + itemId + itemMensa  + ')">Detalle</button></td>');
        $("#verDatosMessage").append('<td><button onclick="borrarMessage(' + response[i].idMessage + ')">Borrar</button></td>');
        $("#verDatosMessage").append("</tr>");
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
    }
  });
}


function detalleMessage(itemId,itemMensa) {
  document.getElementById("messageID").value = itemId
  document.getElementById("messageText").value = itemMensa;
  document.getElementById("btnActuMessage").disabled= false;
}



function actualizarMessage() {
  if(ValidaMessage()){ 
    let dataMessage = {
      idMessage: $("#messageID").val(),
      messageText: $("#messageText").val()
    };
    
    $.ajax({
      url: "http://129.151.122.196:8080/api/Message/update" ,
      type: 'PUT',
      data: JSON.stringify(dataMessage),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("Registro actualizado correctamente");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload();
        alert("No se actualizo correctamente");
      }
    });
  }
}


function borrarMessage(idElemento) {
  let dataMessage = {
    idMessage: idElemento
  };
  
  $.ajax({
    url: "http://129.151.122.196:8080/api/Message/" + idElemento ,
    type: 'DELETE',
    data: JSON.stringify(dataMessage),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      alert("El registro se ha eliminado");
      window.location.reload();
      
    },

    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}



function validaReservation() {
  var fecInicio = document.getElementById("fechaInicio").value;
  var fecDevolucion = document.getElementById("fechaDev").value;
 
  if (validaVacio(fecInicio) || validaVacio(fecDevolucion)) { 
    alert("Los campos no pueden quedar vacíos");
    return false;
  }
  return true;
}

function createReservation() {
  if (validaReservation()){
    let mylistRoom = document.getElementById("selectRoomsRese");
    let mylistClient = document.getElementById("selectClientsRese");

    let fkRoomRes = {
      id: mylistRoom.options[mylistRoom.selectedIndex].value
    }

    let fkCliRes = {
      idClient: mylistClient.options[mylistClient.selectedIndex].value
    }

    let dataReservation = {
      startDate: $("#fechaInicio").val(),
      devolutionDate: $("#fechaDev").val(),
      room: fkRoomRes,
      client: fkCliRes
    };

    $.ajax({
      url: "http://129.151.122.196:8080/api/Reservation/save",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(dataReservation),
      dataType: 'json',
      success: function (response) {
        console.log(response);
        alert("Reservación registrada con éxito")
        window.location.reload()
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload()
        alert("No se guardo correctamente");
      }
    });
  }
  
}



function verRegistrosReservation() {
  $.ajax({
    url: "http://129.151.122.196:8080/api/Reservation/all",
    type: 'GET',
    dataType: 'json',
    success: function (response) {


      $("#verDatosReservation").append("<tr>");
      $("#verDatosReservation").append("<th>Fecha Inicio</th>");
      $("#verDatosReservation").append("<th>Fecha devolución</th>");
      $("#verDatosReservation").append("<th>Cliente</th>");
      $("#verDatosReservation").append("<th>Habitación</th>");
      $("#verDatosReservation").append("<th>Status</th>");
      $("#verDatosReservation").append("</tr>");
      for (i = 0; i < response.length; i++) {
        var itemId =  response[i].idReservation+',';
        var itemFeIni = response[i].startDate+',';
        var itemFeDev =  response[i].devolutionDate;

        $("#verDatosReservation").append("<tr>");
        $("#verDatosReservation").append("<td>" + response[i].startDate + "</td>");
        $("#verDatosReservation").append("<td>" + response[i].devolutionDate + "</td>");
        $("#verDatosReservation").append("<td>" + JSON.stringify(response[i].client.name) + "</td>");
        $("#verDatosReservation").append("<td>" + JSON.stringify(response[i].room.name) + "</td>");
        $("#verDatosReservation").append("<td>" + response[i].status + "</td>");
        // $("#verDatosReservation").append('<td><button onclick="detalleReservation('+itemId,itemFeIni+itemFeDev+')">Detalle</button></td>');
        $("#verDatosReservation").append('<td><button onclick="borrarReservation(' + response[i].idReservation + ')">Borrar</button></td>');
        $("#verDatosReservation").append("</tr>");
      }
    },

  });
}

function detalleReservation(itemId,itemFeIni,itemFeDev) {
  document.getElementById("idReservation").value = itemId
  document.getElementById("fechaInicio").value = itemFeIni;
  document.getElementById("fechaDev").value = itemFeDev;
  document.getElementById("btnActuReservation").disabled= false;
}
function actualizarReservation(){
  if(validaReservation()){ 
    let dataReservation = {
      idReservation: $("#idReservation").val(),
      startDate: $("#fechaInicio").val(),
      devolutionDate: $("#fechaDev").val()
    };
    
    $.ajax({
      url: "http://129.151.122.196:8080/api/Reservation/update" ,
      type: 'PUT',
      data: JSON.stringify(dataReservation),
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        alert("Registro actualizado correctamente");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload();
        alert("No se actualizo correctamente");
      }
    });
  }

}

function borrarReservation(idElemento) {
  let dataReservation = {
    idReservation: idElemento
  };
  
  $.ajax({
    url: "http://129.151.122.196:8080/api/Reservation/" + idElemento ,
    type: 'DELETE',
    data: JSON.stringify(dataReservation),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      alert("El registro se ha eliminado");
      window.location.reload();
      
    },

    error: function (jqXHR, textStatus, errorThrown) {

    }
  });
}


function traerReporteDate(){
  var fechaInicio = document.getElementById("RstarDate").value;
  var fechaCierre = document.getElementById("RdevolutionDate").value;

  $.ajax({
      url:"http://129.151.122.196:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
      type:"GET",
      datatype:"JSON",
      success:function(response){
        console.log(response);
        $("#resultadoDate").append("<tr>");
        $("#resultadoDate").append("<th>Fecha Inicio</th>");
        $("#resultadoDate").append("<th>Fecha devolución</th>");
        $("#resultadoDate").append("<th>Status</th>");
        $("#resultadoDate").append("</tr>");
        for(i=0;i<response.length;i++){
            $("#resultadoDate").append("<tr>");
            $("#resultadoDate").append("<td>" + response[i].startDate + "</td>");
            $("#resultadoDate").append("<td>" + response[i].devolutionDate + "</td>");
            $("#resultadoDate").append("<td>" + response[i].status + "</td>");
            $("#resultadoDate").append("</tr>");
              
          }
      }
  });
}

function traerReporteStatus(){
  $.ajax({
      url:"http://129.151.122.196:8080/api/Reservation/report-status",
      type:"GET",
      datatype:"JSON",
      success:function(response){
          console.log(response);
          $("#resultadoStatus").append("<tr>");
          $("#resultadoStatus").append("<th>completadas</th>");
          $("#resultadoStatus").append("<th>canceladas</th>");
          $("#resultadoStatus").append("</tr>");
          $("#resultadoStatus").append("<tr>");
          $("#resultadoStatus").append("<td>" + response.completed + "</td>");
          $("#resultadoStatus").append("<td>" + response.cancelled + "</td>");
          $("#resultadoStatus").append("</tr>");
      }
  });
}


function traerReporteClientes(){
  $.ajax({
      url:"http://129.151.122.196:8080/api/Reservation/report-clients",
      type:"GET",
      datatype:"JSON",
      success:function(response){
        console.log(response);
        $("#resultadoClientes").append("<tr>");
        $("#resultadoClientes").append("<th>Total</th>");
        $("#resultadoClientes").append("<th>Cliente</th>");
        $("#resultadoClientes").append("<th>Correo</th>");
        $("#resultadoClientes").append("<th>Age</th>");
        $("#resultadoClientes").append("</tr>");
        for(i=0;i<response.length;i++){
          $("#resultadoClientes").append("<tr>");
          $("#resultadoClientes").append("<td>" + response[i].total + "</td>");
          $("#resultadoClientes").append("<td>" + response[i].client.name + "</td>");
          $("#resultadoClientes").append("<td>" + response[i].client.email + "</td>");
          $("#resultadoClientes").append("<td>" + response[i].client.age + "</td>");
          $("#resultadoClientes").append("</tr>");
        }  
      }
  });
}
