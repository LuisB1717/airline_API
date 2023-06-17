### AIRLINE API

##### Instalación:

Debes tener instalado NODE.js una vez hayas clonado el repositorio, posteriormente ejecute el comando.

*npm install*

Una vez ejecutado el comando se descargaran todas las dependencias requeridas en el package.json.

##### Solución

1. Se creo dos array bidimensionales (uno por avión) para luego mapear los asientos no disponibles relacionados con un boarding pass desde la BD.

2. Se obtuvo todas las compras que al menos uno de sus boarding pass no tenga asiento, para luego por código asociar cada compra con sus boarding pass correspondientes con el fin de ordenarlos dependediendo a la prioridad de los filtros pedidos en el ejercicio.

3. Recorrer todas las compras y sus boarding_pass para ir asignando asientos en la matriz.


## Descripción de la API

La API cuenta con un solo endpoint.

Método: GET
Ruta: /flights/:id/passengers
Respuesta exitosa: 

		"code": 200,
		"data": {
		"flightId": 1,
		"takeoffDateTime": 1688207580,
		"takeoffAirport": "Aeropuerto Internacional Arturo Merino Benitez, Chile",
		"landingDateTime": 1688221980,
		"landingAirport": "Aeropuerto Internacional Jorge Cháve, Perú",
		"airplaneId": 1,
		"passengers": [
		  {
			"seatId": 1,
			"seatTypeId": 1,
			"passengerId": 24,
			"dni": "481457272",
			"name": "Ana",
			"age": 71,
			"country": "México",
			"boardingPassId": 24
		  },
		  {
			"seatId": 29,
			"seatTypeId": 1,
			"passengerId": 482,
			"dni": "912114625",
			"name": "Néstor",
			"age": 23,
			"country": "México",
			"boardingPassId": 482
		  },
		  {
			"seatId": 105,
			"seatTypeId": 1,
			"passengerId": 7,
			"dni": "174853408",
			"name": "Estefanía",
			"age": 80,
			"country": "Perú",
			"boardingPassId": 7
		  }...

Vuelo no encontrado:

		{
		  "code": 404,
		  "data": { }
		}

Error:

		{
		"code": 400,
		"errors": "could not connect to db"
		}