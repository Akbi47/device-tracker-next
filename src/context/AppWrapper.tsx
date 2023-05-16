import { ReactNode, useState } from "react";

import { Device, EventData } from "../types/models";
import AppContext, { State } from "./AppContext";

type AppWrapperProps = {
  children: ReactNode;
};

export default function AppWrapper({ children }: AppWrapperProps) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [originDevices, setOriginDevices] = useState<Device[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [focusedDevice, setFocusedDevice] = useState<Device>();
  const [eventDatas, setEventDatas] = useState<EventData[]>([]);
  const [focusedEventData, setFocusedEventData] = useState<EventData>();

  const sharedState: State = {
    drawerOpen,
    setDrawerOpen,
    originDevices,
    setOriginDevices,
    devices,
    setDevices,
    focusedDevice,
    setFocusedDevice,
    clearFocusedDevice: () => setFocusedDevice(undefined),
    eventDatas,
    setEventDatas,
    focusedEventData,
    setFocusedEventData,
    clearFocusedEventData: () => setFocusedEventData(undefined),
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}
