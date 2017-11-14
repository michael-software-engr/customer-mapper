
import infoBoxFormat from './infoBoxFormat';

const groupEventsByVenue = (events) => {
  const eventsByVenue = events.reduce((memo, evt) => {
    const venueMeetupId = evt.venueMeetupId;
    const current = memo[venueMeetupId];

    if (current) {
      return {
        ...memo,
        [venueMeetupId]: {
          ...memo[venueMeetupId],

          events: current.events.concat([evt])
        }
      };
    }

    return {
      ...memo,
      [venueMeetupId]: {
        latitude: evt.venueLat,
        longitude: evt.venueLon,

        venueMeetupId,
        name: evt.venueName || 'Venue name not available',
        address: evt.venueAddress || 'Address not available',
        city: evt.venueCity || 'City not available',
        state: evt.venueState || '',
        country: evt.venueCountry || '',

        events: [evt]
      }
    };
  }, {});

  return eventsByVenue;
};

export {
  infoBoxFormat,
  groupEventsByVenue
};
