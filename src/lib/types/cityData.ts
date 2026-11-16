export type seattleCityData = {
	address: string;
	type: string;
	datetime: string;
	latitude: string;
	longitude: string;
	report_location: {
		type: string;
		coordinates: [number, number];
	};
	incident_number: string;
	stationResponse?: [string, number];
	':@computed_region_ru88_fbhk': string;
	':@computed_region_kuhn_3gp2': string;
	':@computed_region_q256_3sug': string;
};

export type seattleZoneData = {
	minLat: number;
	minLon: number;
	cellSizeLat: number;
	cellSizeLon: number;
	rows: number;
	cols: number;
	stations: {
		[station: number | string]: {
			address: string;
			coords: [number, number];
			units: sfdLocation['units'];
		};
	};
	cells: {
		[cellId: string]: [string, number][];
	};
};

export type sfdLocation = {
	number: number | null;
	address: string;
	coords: [number, number];
	units: {
		medic: number;
		engine: number;
		ladder: number;
	};
};
