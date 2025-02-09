import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import MapScreen from '../MapScreen';
import { useGetMapMarkers } from '../../services/mapService';
import mockMarkers from '../../services/mockMarkers';
import { Store, UnknownAction } from '@reduxjs/toolkit';

jest.mock('../../services/mapService');
jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);

// TODO: - mock useNetworkStatus and BottomSheetComponent to be able to complete test
// Comment useNetworkStatus and BottomSheetComponent in MapComponent.tsx to pass the test
describe('MapScreen', () => {
  let store:
    | MockStoreEnhanced<unknown, {}>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      map: {
        filters: {
          connectorTypes: [],
          connectorStatuses: [],
        },
      },
      settings: {
        pinColor: 'red',
      },
    });

    (useGetMapMarkers as jest.Mock).mockReturnValue({
      data: mockMarkers,
      isLoading: false,
      isError: false,
    });

    require('../../store/hooks').useAppSelector.mockImplementation(
      (selector: (arg0: unknown) => any) => selector(store.getState())
    );
  });

  it('should render MapComponent with markers', () => {
    render(
      <Provider store={store}>
        <MapScreen />
      </Provider>
    );

    // Check if MapComponent is rendered
    const mapComponent = screen.getByTestId('map-component');
    expect(mapComponent).toBeTruthy();

    // Check if markers are passed to MapComponent
    const markers = screen.getAllByTestId('marker');
    expect(markers.length).toBeGreaterThan(0);
  });
});
