export enum TYPE {
  J1772 = 'J1772',
  Type2 = 'Type 2',
  CCS2 = 'CCS 2',
  Type3 = 'Type 3',
}

export enum STATUS {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

type Type = `${TYPE}`;

type Status = `${STATUS}`;

type Connector = {
  type: Type;
  status: Status;
};

type GetPinsResponse = {
  _id: string;
  title: string;
  latitude: number;
  longitude: number;
  connectors: Connector[];
}[];

type MarkerData = {
  id: string;
  title: string;
  connectors: Connector[];
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

export type { Connector, MarkerData, GetPinsResponse };
