
window.onload = function () {
    type="text/javascript"; src="test_rooms.js"


	const map = L.map('map').setView([37.8, -96], 4);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// control that shows state info on hover
	const info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		const contents = props ? `<b>${props.room_numbe}</b><br />${room}/ count` : 'Hover over a state';
		this._div.innerHTML = `<h4>Artifact Density</h4>${count}`;
	
    }; 
	info.addTo(map);


	// get color depending on population density value
	function getColor(count) {
		return count > 1000 ? '#54278f' :
			count > 1000  ? '#756bb1' :
			count > 500  ? '#9e9ac8' :
			count > 100  ? '#bcbddc' :
			count > 20   ? '#dadaeb' : '#f2f0f7';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.count)
		};
	}

	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();

		info.update(layer.feature.properties);
	}

	/* global statesData */
	const geojson = L.geoJson(roomData, {
		style,
		onEachFeature
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
			click: zoomToFeature
		});
	}

	map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	const legend = L.control({position: 'bottomleft'});

	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [0, 20, 100, 500, 1000];
		const labels = [];
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);

};
