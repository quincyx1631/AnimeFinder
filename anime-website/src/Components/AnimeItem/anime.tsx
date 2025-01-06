export interface AnimeCharacter {
  role: string;
  character: {
    mal_id: number;
    name: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

export interface AnimeDetails {
  title: string;
  synopsis: string;
  trailer: {
    embed_url: string;
  };
  duration: string;
  aired: {
    string: string;
  };
  season: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  rank: number;
  score: number;
  scored_by: number;
  popularity: number;
  status: string;
  rating: string;
  source: string;
  genres: Array<{ mal_id: number; name: string }>;
}
