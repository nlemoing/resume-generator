import 'ol/ol.css';
import { Map, View } from 'ol';
import GPX from 'ol/format/GPX';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Stroke, Style } from 'ol/style';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

const colours = [
    'red',
    'green',
    'blue',
    'purple',
];

function createMap(target, lat, lon, routes, zoom) {

    zoom = zoom || 13;

    const baseLayer = new TileLayer({
        source: new OSM({
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
        })
    });
    const routeLayers = routes.map((routeName, i) => {
        return new VectorLayer({
            source: new VectorSource({
              url: `/files/bike-rides/${routeName}.gpx`,
              format: new GPX(),
            }),
            style: new Style({
                stroke: new Stroke({
                    color: colours[i % colours.length],
                    width: 5
                })
            })
        });
    });
    const layers = [baseLayer].concat(routeLayers);

    const map = new Map({
        target,
        layers,
        view: new View({
            center: fromLonLat([lon, lat]),
            zoom
        })
    });

    return map;
}

// To Work
createMap('bike-route-to-work', 40.746740, -73.970511, [
    'to-work'
]);

// From Work
createMap('bike-route-from-work', 40.746740, -73.970511, [
    'from-work'
]);

// McCarren
createMap('bike-route-mccarren', 40.717387, -73.974279, [
    'mccarren'
]);

// FiDi/DUMBO
createMap('bike-route-manhattan-bridge', 40.712120, -73.994976, [
    'battery-park',
    'brooklyn-bridge-park'
]);

// Columbia
createMap('bike-route-columbia', 40.774511, -73.976006, [
    'columbia'
], 12);

// Randall's island
createMap('bike-route-randalls', 40.745606, -73.926020, [
    'to-randalls',
    'from-randalls-2nd',
    'from-randalls-corona',
    'from-randalls-east-river'
], 12);