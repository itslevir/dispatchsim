<script lang="ts">
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let count = 3;

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
		{#each data.cityData.slice(0, count) as incident (incident.incident_number) }
			<Marker
				latLng={[incident.report_location.coordinates[1], incident.report_location.coordinates[0]]}
				bind:instance={markers[incident.incident_number]}
			>
				<Popup
					><h3>{incident.type}</h3>
					<p>{new Date(incident.datetime).toLocaleString()}</p>
					<div class="button">Dispatch</div>
				</Popup>
			</Marker>
		{/each}
	</Map>
</div>
