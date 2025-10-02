export interface CreateTrack {
  title: string;
  artist: string;
  album: string;
  genres: string[];
  coverImage: string;
}

export interface GetModel {
  page: number;
  limit:number;
  sort?: string;
  order?: string;
  search?: string;
  genre?: string;
  artist?: string;
}