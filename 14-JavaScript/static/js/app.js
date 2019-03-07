// from data.js
var tableData = data;

var button = d3.select("#filter-btn");


// var inputField = d3.select("#datetime");
// var day = '1/1/2010';
// function selectData(tableData) {
//     return tableData.datetime === day;
//   }

// var dataByDay = tableData.filter(selectData);

// var table = d3.select("table");

// var tbody = d3.select("tbody");


// dataByDay.forEach(function(city) {
//     var row = tbody.append("tr");
//     row.append("td").text(city.datetime);
//     row.append("td").text(city.city);
//     row.append("td").text(city.state);
//     row.append("td").text(city.country);
//     row.append("td").text(city.shape);
//     row.append("td").text(city.durationMinutes);
//     row.append("td").text(city.comments);
//   });
  
  function handleChange() {
    d3.event.preventDefault();
    var inputText = d3.select("#datetime");
    var day = inputText.property("value");

    function selectData(tableData) {
        return tableData.datetime === day;
      }
    
    var dataByDay = tableData.filter(selectData);
    
    // var table = d3.select("table");
    
    var tbody = d3.select("tbody");
    
    
    dataByDay.forEach(function(city) {
        var row = tbody.append("tr");
        row.append("td").text(city.datetime);
        row.append("td").text(city.city);
        row.append("td").text(city.state);
        row.append("td").text(city.country);
        row.append("td").text(city.shape);
        row.append("td").text(city.durationMinutes);
        row.append("td").text(city.comments);
      });

  }
  
  button.on("click", handleChange);