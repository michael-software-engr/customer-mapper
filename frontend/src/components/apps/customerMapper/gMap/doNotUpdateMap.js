
// This whole thing: so that the map won't keep on updating every time
//   a response is received from polling.
const doNotUpdateMap = ({
  errorMessage,
  routing,
  prevRouting,
  nextDataList,
  currentDataList,
  isHandlingInputChange
}) => {
  if (errorMessage) return true;

  // DEBUG: ??? is this the right logic?
  if (!nextDataList) return true;

  const nextPropsLocation = routing && routing.location;
  const nextPropsPrevLocation = prevRouting && prevRouting.location;

  const nextLen = nextDataList.length;

  const sameData = (
    currentDataList &&
    nextLen === currentDataList.length &&
    nextDataList.every((data, ix) => (data.id === currentDataList[ix].id)) &&
    nextDataList.every((data, ix) => (
      (!data.vehicles && !currentDataList[ix].vehicles) || (
        data.vehicles &&
        data.vehicles.every((vehicle, vix) => (
          // Because vehicle (next data, next props) is new and next vehicles array will
          //   be longer than current vehicles array.
          currentDataList[ix].vehicles &&
          currentDataList[ix].vehicles[vix] &&
          vehicle.id === currentDataList[ix].vehicles[vix].id
        ))
      )
    ))
  );

  // Not sure about this. If actual 0 events, prob. just center map on target location.
  if (nextLen === 0) return true;

  if (!sameData) return false;

  if (isHandlingInputChange) return true;

  if (nextPropsLocation !== nextPropsPrevLocation) return false;

  // ... else, must be opposite of last if
  return true;
  // return false;
};

export default doNotUpdateMap;
