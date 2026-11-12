import type { PageLoad } from './$types';
import { loadSeattleData } from '$lib/loadData';

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const data = await loadSeattleData(fetch);

	return data;
};
