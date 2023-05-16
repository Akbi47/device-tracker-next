import { RawResult } from "leaflet-geosearch/dist/providers/openStreetMapProvider";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import { createContext } from "react";

import { Device, EventData } from "../types/models";

export type OSMSearchResult = Partial<SearchResult<RawResult>> & {
  autoFly?: boolean;
};

export type State = {
  drawerOpen: boolean;
  setDrawerOpen: (_value: boolean) => void;

  originDevices: Device[];
  setOriginDevices: (_value: Device[]) => void;

  devices: Device[];
  setDevices: (_value: Device[]) => void;

  focusedDevice?: Device;
  setFocusedDevice: (_value?: Device) => void;
  clearFocusedDevice: () => void;

  eventDatas: EventData[];
  setEventDatas: (_value: EventData[]) => void;

  focusedEventData?: EventData;
  setFocusedEventData: (_value?: EventData) => void;
  clearFocusedEventData: () => void;
};

const defaultState = {} as State;

const AppContext = createContext(defaultState);

export default AppContext;
