window.onload = function() {
    // type="text/javascript"; src="us-states.js" // commented out by Dr. Yang
    type = "text/javascript";
    src = "s_mData_phase1.js"; // added by Dr. Yang
    src = "s_mData_phase2.js";
    src = "s_mData_phase-3-4.js";
    

   
    const map = L.map("map").setView(
        [36.06052240396411, -107.96167091056132],
        18
    );

    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    

    // control that shows state info on hover
    const info = L.control();

    info.onAdd = function(map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
    };

    info.update = function(props) {
        const contents = props // `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` // commented out by Sarigai
            ?
            `<b>Room: ${props.room_numbe}</b><br />Percent: ${props.count}<br />Building Phase: ${props.phase}` // edited by Sarigai // you need to update your hover over info based on your owen data, I have updated based on the geojson, but you need to check on to make sure is it correct
            : // "Hover over a state"; // commented out by Sarigai
            "Hover Over a Room"; // edited by Sarigai // same correction here
        // this._div.innerHTML = `<h4>US Population Density</h4>${contents}`; // suggestion by Dr. Yang: Madison remmber to added the text bettwen the h4 tag // commented out by Sarigai

        this._div.innerHTML = `<h4>Percent of Ritual Objects - Stone/Mineral Specimens</h4>${contents}`; // edited by Sarigai // same correction here
    };
    info.addTo(map);

    // get color depending on population density value
    function getColor(d) {
        return d > 80 ?
            "#8c2d04" :
            d > 60 ?
            "#d94801" :
            d > 40 ?
            "#f16913" :
            d > 20 ?
            "#fd8d3c" :
            d > 1 ?
            "#fdae6b" :
            d < 1 ?
            "#fdd0a2" :
            d = 0
            "#feedde"; 
            ; //suggestion by Dr. Yang: Madison, remember to adjust the color interval number based on your room object counts range in your own data.
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
            // fillColor: getColor(feature.properties.density) //commneted out by Dr. Yang
            fillColor: getColor(feature.properties.count), //added by Dr. Yang
        };
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.7,
        });

        layer.bringToFront();

        info.update(layer.feature.properties);
    }

    /* global statesData */
    // const geojson = L.geoJson(statesData, { //commented out by Dr. Yang

   {const geojson = L.geoJson(s_mData_phase1, {
        style,
        onEachFeature,
    }).addTo(map);
   

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }}

    {const geojson = L.geoJson(s_mData_phase2, {
        style,
        onEachFeature,
    }).addTo(map);
   

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }}

    {const geojson = L.geoJson(s_mData_phase3_4, {
        style,
        onEachFeature,
    }).addTo(map);
   

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
    }}
    
    


  
    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(map) {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [0, 1, 20, 40, 60, 80];
            const labels = [];
            let from, to;

            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];

                labels.push(
                        `<i style="background:${getColor(from + 1)}"></i> ${from}${
      to ? `&ndash;${to}` : "+"
    }`
  );
}



div.innerHTML = labels.join("<br>");
return div;
};

legend.addTo(map);
};