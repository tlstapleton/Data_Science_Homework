var tbody = document.getElementById("tbodyid");
var row = tbody.appendChild(document.createElement("tr"))
// var row = tbody.append("tr");
row.append("td").text(city.datetime);
row.append("td").text(city.city);
row.append("td").text(city.state);
row.append("td").text(city.country);
row.append("td").text(city.shape);
row.append("td").text(city.durationMinutes);
row.append("td").text(city.comments);


var child = document.getElementById("")