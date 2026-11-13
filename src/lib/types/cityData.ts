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
    ":@computed_region_ru88_fbhk": string;
    ":@computed_region_kuhn_3gp2": string;
    ":@computed_region_q256_3sug": string;
}

export type sfdLocation = {
    number: number | null;
    address: string;
    coords: [number, number];
    units: {
        medic: number;
        engine: number;
        ladder: number;
    }
}