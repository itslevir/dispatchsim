<script lang="ts">
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let count = $derived(data.count);
	let loading = $state(true);
	let res = $state<Awaited<typeof data.res> | null>(null);
	let error = $state<Error | null>(null);

	let markers = $state<Record<string, Marker | undefined>>({});

	$effect(() => {
		let cancelled = false;

		loading = true;
		error = null;

		data.res
			.then((loadedData) => {
				if (!cancelled) {
					res = loadedData;
					loading = false;
				}
			})
			.catch((reason: unknown) => {
				if (!cancelled) {
					error = reason instanceof Error ? reason : new Error('Unable to load Seattle data');
					loading = false;
				}
			});

		return () => {
			cancelled = true;
		};
	});
</script>

{#if loading}
	<div class="flex h-screen w-screen items-center justify-center">
		<div class="h-16 w-16 animate-spin rounded-full border-b-2 border-cyan-500"></div>
		<p class="ml-2">Loading incident data from seattle.gov</p>
	</div>
{:else if error}
	<p role="alert">Unable to load Seattle incident data: {error.message}</p>
{:else if res}
	<div style="width:100%;height:500px;">
		<Map
			options={{
				center: [47.59233, -122.32367],
				zoom: 13
			}}
		>
			<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
			{#each res.cityData.slice(0, count) as incident (incident.incident_number)}
				<Marker
					latLng={[
						incident.report_location.coordinates[1],
						incident.report_location.coordinates[0]
					]}
					bind:instance={markers[incident.incident_number]}
				>
					<Popup
						><h3 class="text-xl font-semibold">{incident.type}</h3>
						<p>{new Date(incident.datetime).toLocaleString()}</p>
						<p>
							Estimated travel time: {Math.floor((incident.stationResponse?.[1] ?? 0) / 60)} minutes {(incident
								.stationResponse?.[1] ?? 0) % 60} seconds
						</p>
						<p>
							Station: {incident.stationResponse?.[0] ?? 'Unknown'}
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
		{#each res.cityData.slice(0, count) as incident (incident.incident_number)}
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
{/if}
