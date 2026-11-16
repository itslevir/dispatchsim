import type { PageLoad } from './$types';
import { loadSeattleData } from '$lib/loadData';
import { station } from '$lib/calculateZone';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	let count = 3;

	const res = loadSeattleData(fetch).then((data) => {
		data.cityData = data.cityData.slice(0, count);
		data.cityData.forEach((incident) => {
			const fastestStation = station(incident);
			incident.stationResponse = fastestStation;
		});

		return data;
	});

	return { res, count };
};
