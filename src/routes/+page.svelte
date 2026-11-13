<script lang="ts">
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let routes = $state<Record<string, any>>({});

	let count = 3;
	for (const incident of data.cityData.slice(0, count)) {
		fetch(
			`https://router.project-osrm.org/route/v1/driving/-122.344959,47.616150;${incident.report_location.coordinates[0]},${incident.report_location.coordinates[1]}?overview=false`
		)
			.then((res) => res.json())
			.then((data) => {
				const route = data.routes[0];
				routes[incident.incident_number] = route;
				console.log(routes);
			});
	}

	let markers = $state<Record<string, Marker | undefined>>({});
</script>

<div style="width:100%;height:500px;">
	<Map
		options={{
			center: [47.59233, -122.32367],
			zoom: 13
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		{#each data.cityData.slice(0, count) as incident (incident.incident_number)}
			<Marker
				latLng={[incident.report_location.coordinates[1], incident.report_location.coordinates[0]]}
				bind:instance={markers[incident.incident_number]}
			>
				<Popup
					><h3 class="text-xl font-semibold">{incident.type}</h3>
					<p>{new Date(incident.datetime).toLocaleString()}</p>
					<p>
						Estimated travel time:
						{Math.floor(routes[incident.incident_number]?.duration / 60)} m {Math.floor(
							routes[incident.incident_number]?.duration % 60
						)} s
					</p>
					<button
						type="submit"
						class="w-fit cursor-pointer rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white"
					>
						Dispatch
					</button>
				</Popup>
			</Marker>
		{/each}
	</Map>
	{#each data.cityData.slice(0, count) as incident (incident.incident_number)}
		<div class="m-2 flex flex-col gap-2 rounded-md border p-4">
			<h3 class="text-xl font-semibold">{incident.type}</h3>
			<a
				class="text-blue-500 hover:underline"
				on:click={() => markers[incident.incident_number]?.openPopup()}>{incident.address}</a
			>
			<p>{new Date(incident.datetime).toLocaleString()}</p>
			<div
				class="w-fit cursor-pointer rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white"
				on:click={() => markers[incident.incident_number]?.openPopup()}
			>
				Dispatch
			</div>
		</div>
	{/each}
</div>
