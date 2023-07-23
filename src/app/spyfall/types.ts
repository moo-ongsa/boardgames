import { ReactNode } from "react";

export enum SPYFALL_TYPES {
  SET_PLAYERS = "spyfall/SET_PLAYERS",
  SET_LOCATIONS = "spyfall/SET_LOCATIONS",
  LOCAL_STORAGE_PLAYERS = "spyfall/LOCAL_STORAGE_PLAYERS",
  LOCAL_STORAGE_LOCATIONS = "spyfall/LOCAL_STORAGE_LOCATIONS",
}

export interface Props {
  children?: ReactNode;
}

export interface Player {
  name: string;
  score: number;
}

export interface Role {
  name: string;
  description: string;
}

export interface Location {
  name: string;
  enable: Boolean;
  roles: Role[];
}

export interface SpyfallState {
  players: Player[];
  locations: Location[];
}

export type Payload = Player[] | Location[];

type SetPlayers = { type: SPYFALL_TYPES.SET_PLAYERS; payload: Player[] };
type SetLocations = { type: SPYFALL_TYPES.SET_LOCATIONS; payload: Location[] };

export type SpyfallAction = SetPlayers | SetLocations;

export type SpyfallContextType = {
  players: Player[];
  updatePlayers: (players: Player[]) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  setPlayersToLocalStorage: (forcePlayers?: Player[]) => void;
  locations: Location[];
  updateLocations: (locations: Location[]) => void;
  addLocation: () => void;
  removeLocation: (index: number) => void;
  setLocationToLocalStorage: (forceLocations?: Location[]) => void;
  toggleEnablelationLocation: (index: number) => void;
};
