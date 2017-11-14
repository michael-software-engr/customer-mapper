import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Icon } from 'semantic-ui-react';

import MapBuilder from './MapBuilder';

// TODO: FIX this
import StatusMessage from '../../../statusMessage/StatusMessage';

import SearchCustomers from '../search/Customers';
import doNotUpdateMap from './doNotUpdateMap';

import '../../../../css/components/apps/customerMapper/gMap/GMapPresenter.css';

const mapId = 'GMapPresenter';

class GMapPresenter extends React.Component {
  static propTypes = {
    mapData: PropTypes.shape().isRequired
  }

  constructor(props) {
    super(props);
    this.map = null;
    this.state = { isMapLoaded: false };
  }

  // Exists because componentWillReceiveProps doesn't show initial map.
  componentDidMount() {
    const { mapData } = this.props;

    if (!window.google) {
      console.warn('window.google not available.');
      return;
    }

    const {
      dataList,
      setCustomerWindow,
      setInputFormVisibility,
      setVehicleFormVisibility
    } = mapData;

    const map = MapBuilder.initMap(mapId);

    if (dataList && dataList.length > 0) {
      console.log({ dataList });
      const info = MapBuilder.loadMarkers(
        map, dataList, {
          setCustomerWindow,
          setInputFormVisibility,
          setVehicleFormVisibility
        }
      );

      MapBuilder.showMap(map, info.markers, info.bounds);
      return;
    }

    // Show map without markers.
    MapBuilder.showMap(map, []);
  }

  componentWillReceiveProps(nextProps) {
    if (!window.google) {
      console.warn('window.google not available.');
      return;
    }

    const nextMapData = nextProps.mapData;
    const {
      dataList,
      setCustomerWindow,
      setInputFormVisibility,
      setVehicleFormVisibility,
      isHandlingInputChange,
      setIsHandlingInputChange
    } = nextMapData;

    if (doNotUpdateMap({
      errorMessage: nextMapData.errorMessage,
      routing: nextMapData.routing,
      prevRouting: nextMapData.prevRouting,
      nextDataList: dataList,
      currentDataList: this.props.mapData.dataList,
      isHandlingInputChange
    })) return;

    const map = MapBuilder.initMap(mapId);
    if (dataList && dataList.length > 0) {
      const info = MapBuilder.loadMarkers(map, dataList, {
        setCustomerWindow,
        setInputFormVisibility,
        setVehicleFormVisibility,
        setIsHandlingInputChange
      });
      MapBuilder.showMap(map, info.markers, info.bounds);
      return;
    }

    // Show map without markers.
    MapBuilder.showMap(map, []);
  }

  // mapHandler(refInput) {
  //   // TODO: check if map is loaded.
  //   console.log(refInput);
  //   // this.setState({ ...this.state, isMapLoaded: true });
  // }

  render() {
    // ??? DEBUG ??? weirdness: component not updating even though prop was updated.
    //   Props were uses in componentDidMount
    //   If this happens, make the changes in the upper level component or
    //   move the code in componentWillReceiveProps.

    const {
      title,
      customersByCityAndState,
      customersByZip,
      setCustomersAfterSearch,
      setCustomerWindow
    } = this.props.mapData;

    if (!window.google) {
      // TODO: long-term, poll until global "google" is available.
      return (
        <div>
          <Helmet><title>{title}</title></Helmet>
          <StatusMessage
            error
            content="Google API failed to load"
          >
            <Icon name="warning circle" color="red" size="huge" />
          </StatusMessage>
        </div>
      );
    }

    return (
      <div className="GMapPresenterWrapper">
        <Helmet><title>{title}</title></Helmet>

        <SearchCustomers {...{
          customersByCityAndState, customersByZip, setCustomersAfterSearch, setCustomerWindow
        }}
        />

        <div
          // ref={(refInput) => { this.mapHandler(refInput); }}
          id={mapId}
          // data={this.props.dataList}
        />
        {
          // Doesn't work. Lift state maybe
          // !this.state.isMapLoaded && <div className="center-md">Loading...</div>
        }
      </div>
    );
  }
}

export default GMapPresenter;
