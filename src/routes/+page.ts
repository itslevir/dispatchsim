import type { PageLoad } from './$types';
import { loadSeattleData } from '$lib/loadData';
import { station } from '$lib/calculateZone';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const res = await loadSeattleData(fetch);
	let count = 3;

	res.cityData = res.cityData.slice(0, count);
	res.cityData.forEach((incident) => {
		const fastestStation = station(incident);
		incident.stationResponse = fastestStation;
	});

	return { res, count };
};
