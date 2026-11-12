import type { RequestEvent } from '@sveltejs/kit';
import type { seattleCityData } from './types/cityData';

export const loadSeattleData = async (fetch: RequestEvent['fetch'], count: number = 2) => {
	let cityData: seattleCityData[] = [];

	for (let i = 0; i < count; i++) {
		const res = await fetch(`https://data.seattle.gov/resource/kzjm-xkqj.json?$offset=${i * 1000}`);
		const set = await res.json();

		cityData = [...cityData, ...set];
	}

	return { cityData };
};
