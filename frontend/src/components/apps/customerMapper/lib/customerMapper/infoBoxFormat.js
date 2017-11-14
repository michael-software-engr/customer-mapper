
// InfoBox, 2 choices:
// 1. Make only one info box visible at a time (close the open
//      info box when you open another one).
//    This can be done by setting a "global" info box variable.
//    https://stackoverflow.com/questions/1875596/have-just-one-infowindow-open-in-google-maps-api-v3
//    https://stackoverflow.com/questions/24951991/open-only-one-infowindow-at-a-time-google-maps

// 2. Make multiple info boxes visible.
//      Create one info box variable per marker
// Important thing to keep in mind is to "attach" the info box info
//   in a callback instead of setting it inside the main loop.

const infoBoxFormat = (marker) => {
  const infoBoxClass = 'infobox';

  // const cityState = marker.state ? `${marker.city}, ${marker.state}` : marker.city;

  const { vehicles } = marker;

  const vehiclesHTML = vehicles && vehicles.length > 0 ? (
    vehicles.map(({ year, make, model }) => (
      `${year} ${make} ${model}`
    )).join('<br />')
  ) : 'No cars owned';

  return `
    <div class="${infoBoxClass}">
      <span class="name">${marker.name}</span><br />
      ${vehiclesHTML}
    </div>
  `;
};

export default infoBoxFormat;
