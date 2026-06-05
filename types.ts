
export interface RSVP {
  name: string;
  count: number;
  note?: string;
}

export enum AppState {
  LOADING,
  READY,
  ERROR
}
