/******w**************
    
    Assignment 4 Javascript
    Name: Juan Alejandro londono
    Date: Feb 12 2023
    Description: AJAX Using Open Data

*********************/

//This function gets a path number from the assigned input, performs a database lookup, and prints it to the table in sorted form from a promise response.
function busquedaRouteNumber() {
  const route_number = document.getElementById('inputRouteNumber').value;
  let tabla = document.querySelector('#route-list tbody');
  tabla.innerHTML = "";

  let resultCount = 0;

  fetch('https://data.winnipeg.ca/resource/gp3k-am4u.json')
    .then(response => response.json())
    .then(routes => {
      let found = false;
      routes.sort((a, b) => (a.stop_number > b.stop_number) ? -1 : 1);
      routes.forEach(route => {
        //Count the first 100 results
        if (route.route_number == route_number && resultCount < 100) {
          resultCount++;
          found = true;
          const row = document.createElement('tr');
          row.innerHTML += `
            <td>${route.route_number}</td>
            <td>${route.route_name}</td>
            <td>${route.route_destination}</td>
            <td>${route.scheduled_time}</td>
            <td>${route.stop_number}</td>               
          `;
          tabla.appendChild(row);
        }
      });
      //Print a message if the route number was not found
      if (!found) {
        document.getElementById("errorMessage").innerHTML = "Route Number no found";
      } else {
        document.getElementById("errorMessage").innerHTML = "";
      }
    })
}