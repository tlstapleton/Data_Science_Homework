// from data.js
var tableData = data;

var button = d3.select("#filter-btn");
  
function handleChange() {

    d3.event.preventDefault();
    var tbody = document.getElementById("tbodyid");

    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
    }

    var inputText = d3.select("#datetime");
    var day = inputText.property("value");

    function selectData(tableData) {
        return tableData.datetime === day;
      }
    
    var dataByDay = tableData.filter(selectData);
    
    dataByDay.forEach(function(sighting) {

        var sightingDateCell = document.createElement("td");
        var sightingDateNode = document.createTextNode(sighting.datetime);
        sightingDateCell.appendChild(sightingDateNode);

        var sightingCityCell = document.createElement("td");
        var sightingCityNode = document.createTextNode(sighting.city);
        sightingCityCell.appendChild(sightingCityNode);

        var sightingStateCell = document.createElement("td");
        var sightingStateNode = document.createTextNode(sighting.state);
        sightingStateCell.appendChild(sightingStateNode);

        var sightingCountryCell = document.createElement("td");
        var sightingCountryNode = document.createTextNode(sighting.country);
        sightingCountryCell.appendChild(sightingCountryNode);

        var sightingShapeCell = document.createElement("td");
        var sightingShapeNode = document.createTextNode(sighting.shape);
        sightingShapeCell.appendChild(sightingShapeNode);

        var sightingDurationCell = document.createElement("td");
        var sightingDurationNode = document.createTextNode(sighting.durationMinutes);
        sightingDurationCell.appendChild(sightingDurationNode);

        var sightingNotesCell = document.createElement("td");
        var sightingNotesNode = document.createTextNode(sighting.comments);
        sightingNotesCell.appendChild(sightingNotesNode);

        var row = document.createElement("tr");
        row.setAttribute("id","filteredDateRow");
        row.appendChild(sightingDateCell);
        row.appendChild(sightingCityCell);
        row.appendChild(sightingStateCell);
        row.appendChild(sightingCountryCell);
        row.appendChild(sightingShapeCell);
        row.appendChild(sightingDurationCell);
        row.appendChild(sightingNotesCell);

        var tbody = document.getElementById("tbodyid");
        tbody.appendChild(row);
    
    });

  }
  

// The below is the alternate, D3-centric way to append new columns based on date input to the already-existing columns.
  
//   function handleChange() {
//     d3.event.preventDefault();
//     var inputText = d3.select("#datetime");
//     var day = inputText.property("value");

//     function selectData(tableData) {
//         return tableData.datetime === day;
//       }
    
//     var dataByDay = tableData.filter(selectData);
    
//     var tbody = d3.select("tbody");
    
//     dataByDay.forEach(function(city) {
//         var row = tbody.append("tr");
//         row.append("td").text(city.datetime);
//         row.append("td").text(city.city);
//         row.append("td").text(city.state);
//         row.append("td").text(city.country);
//         row.append("td").text(city.shape);
//         row.append("td").text(city.durationMinutes);
//         row.append("td").text(city.comments);
//       });

//   }
  

  button.on("click", handleChange);