/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.88888888888889, "KoPercent": 0.1111111111111111};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.2861904761904762, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.42333333333333334, 500, 1500, "https://www.alzeena.com.bd/public/subcategory/product/polo"], "isController": false}, {"data": [0.405, 500, 1500, "https://www.alzeena.com.bd/public/category/product/womens-fashion"], "isController": false}, {"data": [0.3433333333333333, 500, 1500, "https://www.alzeena.com.bd/"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.17666666666666667, 500, 1500, "https://www.alzeena.com.bd/public/subcategory/product/t-shirts"], "isController": false}, {"data": [0.30666666666666664, 500, 1500, "https://www.alzeena.com.bd/public/category/product/mens-fashion"], "isController": false}, {"data": [0.34833333333333333, 500, 1500, "https://www.alzeena.com.bd/public/shopping/cart"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1800, 2, 0.1111111111111111, 5961.274999999992, 185, 105072, 1709.5, 17075.800000000003, 26921.449999999946, 56161.78000000001, 12.209680920338615, 788.5966349610646, 13.255618413979406], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://www.alzeena.com.bd/public/subcategory/product/polo", 300, 0, 0.0, 3650.779999999998, 239, 38192, 1268.0, 8535.300000000001, 19970.549999999996, 37241.70000000001, 2.8269616758228815, 112.26704068940172, 3.409525594604273], "isController": false}, {"data": ["https://www.alzeena.com.bd/public/category/product/womens-fashion", 300, 0, 0.0, 5451.420000000002, 203, 80780, 974.5, 10779.000000000004, 35902.649999999994, 70040.77, 2.7581895243961867, 98.78882259497367, 3.3397706651603887], "isController": false}, {"data": ["https://www.alzeena.com.bd/", 300, 0, 0.0, 9803.546666666663, 233, 105072, 7422.5, 22794.7, 28934.89999999999, 59284.31000000004, 2.6619107195144673, 494.227379720455, 3.1293221388896284], "isController": false}, {"data": ["Test", 300, 1, 0.3333333333333333, 35767.64999999999, 7254, 111040, 31169.5, 57731.90000000002, 77952.29999999999, 101439.28000000009, 2.5389732392220585, 983.9204312234466, 16.538840273722474], "isController": true}, {"data": ["https://www.alzeena.com.bd/public/subcategory/product/t-shirts", 300, 1, 0.3333333333333333, 5967.68, 252, 74980, 3042.0, 10556.8, 19573.7, 70324.90000000001, 2.7562636090515698, 109.13630326479424, 3.322867786054225], "isController": false}, {"data": ["https://www.alzeena.com.bd/public/category/product/mens-fashion", 300, 1, 0.3333333333333333, 4482.969999999999, 375, 101250, 1437.0, 10668.400000000003, 11658.5, 75481.67000000048, 2.735204821254365, 102.066874618211, 1.4242742162498518], "isController": false}, {"data": ["https://www.alzeena.com.bd/public/shopping/cart", 300, 0, 0.0, 6411.253333333339, 185, 73887, 1375.0, 23626.40000000004, 37532.45, 58650.640000000036, 2.7806872004968164, 137.41948860555487, 3.3234099972656574], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: www.alzeena.com.bd:443 failed to respond", 2, 100.0, 0.1111111111111111], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1800, 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: www.alzeena.com.bd:443 failed to respond", 2, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://www.alzeena.com.bd/public/subcategory/product/t-shirts", 300, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: www.alzeena.com.bd:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://www.alzeena.com.bd/public/category/product/mens-fashion", 300, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: www.alzeena.com.bd:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
