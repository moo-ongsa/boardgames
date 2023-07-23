import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  Reducer,
} from "react";
import {
  Player,
  SpyfallState,
  SpyfallAction,
  SpyfallContextType,
  SPYFALL_TYPES,
  Location,
  Props,
} from "./types";
import locationsData from "./data.json";

const initialPlayer = {
  name: "",
  score: 0,
};

export const initialRole = {
  name: "",
  description: "",
};

const initialLocation = {
  name: "",
  enable: true,
  roles: new Array(10).fill(initialRole),
};

const initialState = {
  players: [initialPlayer],
  locations: locationsData.locations,
};

const initalFunction = {
  updatePlayers: (players: Player[]) => {},
  addPlayer: () => {},
  removePlayer: (index: number) => {},
  setPlayersToLocalStorage: () => {},
  updateLocations: (locations: Location[]) => {},
  addLocation: () => {},
  removeLocation: (index: number) => {},
  setLocationToLocalStorage: (forceLocations?: Location[]) => {},
  toggleEnablelationLocation: (index: number) => {},
};

export const SpyfallContext = createContext<SpyfallContextType>({
  ...initialState,
  ...initalFunction,
});

const spyfallReducer: Reducer<SpyfallState, SpyfallAction> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SPYFALL_TYPES.SET_PLAYERS: {
      return {
        ...state,
        players: payload,
      };
    }
    case SPYFALL_TYPES.SET_LOCATIONS: {
      return {
        ...state,
        locations: payload,
      };
    }

    default: {
      throw new Error(`Unhandled type ${type} in spyfallReducer`);
    }
  }
};

export const SpyfallProvider = ({ children }: Props) => {
  const [{ players, locations }, spyfallDispatch] = useReducer(
    spyfallReducer,
    initialState
  );

  useEffect(() => {
    const localStorageSpyfallPlayers = localStorage.getItem(
      SPYFALL_TYPES.LOCAL_STORAGE_PLAYERS
    );
    updatePlayers(
      localStorageSpyfallPlayers
        ? JSON.parse(localStorageSpyfallPlayers)
        : [initialPlayer]
    );
  }, []);

  useEffect(() => {
    const localStorageSpyfallLocations = localStorage.getItem(
      SPYFALL_TYPES.LOCAL_STORAGE_LOCATIONS
    );
    updateLocations(
      localStorageSpyfallLocations
        ? JSON.parse(localStorageSpyfallLocations)
        : locationsData.locations
    );
  }, []);

  const updatePlayers = (players: Player[]) => {
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_PLAYERS,
      payload: players,
    });
  };

  const addPlayer = () => {
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_PLAYERS,
      payload: [...players, initialPlayer],
    });
  };

  const removePlayer = (index: number) => {
    const temp_players = [...players];
    temp_players.splice(index, 1);
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_PLAYERS,
      payload: temp_players,
    });
    setPlayersToLocalStorage(temp_players);
  };

  const setPlayersToLocalStorage = (forcePlayers?: Player[]) => {
    localStorage.setItem(
      SPYFALL_TYPES.LOCAL_STORAGE_PLAYERS,
      JSON.stringify(forcePlayers || players)
    );
  };

  const updateLocations = (locations: Location[]) => {
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_LOCATIONS,
      payload: locations,
    });
  };

  const addLocation = () => {
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_LOCATIONS,
      payload: [...locations, initialLocation],
    });
  };

  const removeLocation = (index: number) => {
    const temp_locations = [...locations];
    temp_locations.splice(index, 1);
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_LOCATIONS,
      payload: temp_locations,
    });
    setLocationToLocalStorage(temp_locations);
  };

  const setLocationToLocalStorage = (forceLocations?: Location[]) => {
    localStorage.setItem(
      SPYFALL_TYPES.LOCAL_STORAGE_LOCATIONS,
      JSON.stringify(forceLocations || locations)
    );
  };

  const toggleEnablelationLocation = (index: number) => {
    const temp_locations = [...locations];
    temp_locations[index].enable = !temp_locations[index].enable;
    spyfallDispatch({
      type: SPYFALL_TYPES.SET_LOCATIONS,
      payload: temp_locations,
    });
    setLocationToLocalStorage(temp_locations);
  };

  const value = {
    players,
    updatePlayers,
    addPlayer,
    removePlayer,
    setPlayersToLocalStorage,
    locations,
    updateLocations,
    addLocation,
    removeLocation,
    setLocationToLocalStorage,
    toggleEnablelationLocation,
  };
  return (
    <>
      <SpyfallContext.Provider value={value}>
        {children}
      </SpyfallContext.Provider>
    </>
  );
};

export const useSpyfallContext = () => {
  const context = useContext(SpyfallContext);
  if (context === undefined) {
    throw new Error("useSpyfallContext must be used within a SpyfallProvider");
  }
  return context;
};
