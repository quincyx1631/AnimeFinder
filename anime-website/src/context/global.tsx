import React, {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useState,
} from "react";

interface AnimeImage {
  jpg: {
    large_image_url: string;
  };
}

interface Anime {
  mal_id: number;
  images: AnimeImage;
  title: string;
}

interface State {
  popularAnime: Anime[];
  upcomingAnime: Anime[];
  airingAnime: Anime[];
  pictures: any[];
  isSearch: boolean;
  searchResult: Anime[];
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchAnime: (anime: string) => Promise<void>;
  getPopularAnime: () => Promise<void>;
  getUpcomingAnime: () => Promise<void>;
  getAiringAnime: () => Promise<void>;
  search: string;
}

// Action Types
type ActionType =
  | { type: "LOADING" }
  | { type: "GET_POPULAR_ANIME"; payload: Anime[] }
  | { type: "SEARCH"; payload: Anime[] }
  | { type: "GET_UPCOMING_ANIME"; payload: Anime[] }
  | { type: "GET_AIRING_ANIME"; payload: Anime[] };

// Constants
const baseUrl = "https://api.jikan.moe/v4";
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// Initial state type now includes only the state properties, not the methods
interface InitialState {
  popularAnime: Anime[];
  upcomingAnime: Anime[];
  airingAnime: Anime[];
  pictures: any[];
  isSearch: boolean;
  searchResult: Anime[];
  loading: boolean;
}

const reducer = (state: InitialState, action: ActionType): InitialState => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResult: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    default:
      return state;
  }
};

const GlobalContext = createContext<State | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const initialState: InitialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResult: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsSearch(e.target.value === "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      alert("Please enter a search term");
    }
  };

  const fetchWithRetry = async (
    url: string,
    options: RequestInit = {},
    retries: number = 3,
    delay: number = 1000
  ): Promise<Response> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, options);

        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay;
          console.warn(`Rate limit exceeded. Retrying in ${waitTime}ms...`);
          await new Promise((res) => setTimeout(res, waitTime));
          continue; // Retry after the delay
        }

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response; // Return if successful
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt < retries) {
          console.log(`Retrying in ${delay}ms...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw new Error(`Failed after ${retries} retries: ${error}`);
        }
      }
    }
    throw new Error("This should not be reached.");
  };

  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetchWithRetry(`${baseUrl}/top/anime`);
      const data = await response.json();
      dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    } catch (error) {
      console.error("Error fetching popular anime:", error);
    }
  };

  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetchWithRetry(
        `${baseUrl}/top/anime?filter=upcoming`
      );
      const data = await response.json();
      dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
    } catch (error) {
      console.error("Error fetching upcoming anime:", error);
    }
  };

  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetchWithRetry(
        `${baseUrl}/top/anime?filter=airing`
      );
      const data = await response.json();
      dispatch({ type: GET_AIRING_ANIME, payload: data.data });
    } catch (error) {
      console.error("Error fetching airing anime:", error);
    }
  };

  const searchAnime = async (anime: string) => {
    dispatch({ type: LOADING });
    try {
      const response = await fetchWithRetry(
        `${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
      );
      const data = await response.json();
      dispatch({ type: SEARCH, payload: data.data });
    } catch (error) {
      console.error("Error searching anime:", error);
    }
  };

  React.useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        search,
        isSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): State => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
