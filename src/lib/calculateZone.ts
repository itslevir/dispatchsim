import computedStationTimes from './assets/seattle-station-times.json';
import type { seattleCityData, seattleZoneData } from './types/cityData';

const zoneData = computedStationTimes as seattleZoneData;

const cellKey = (lat: number, lon: number) => {
	// find cell for lat/lon
	const row = Math.floor((lat - zoneData.minLat) / zoneData.cellSizeLat);
	const col = Math.floor((lon - zoneData.minLon) / zoneData.cellSizeLon);
	return `${row},${col}`;
};

const rankedFor = (lat: number, lon: number) => {
	const key = cellKey(lat, lon);
	if (!key) return null;
	if (zoneData.cells[key]) return zoneData.cells[key];
	return null;
};

const station = (incident: seattleCityData) => {
	const rankedStations = rankedFor(
		incident.report_location.coordinates[1],
		incident.report_location.coordinates[0]
	);
	const fastestStation = rankedStations![0];
	return fastestStation;
};

export { cellKey, rankedFor, station };
