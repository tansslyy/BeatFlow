import axios, { AxiosResponse } from "axios";
import { Track } from "./models/Track";
import { PageList } from "../../types/PageList";
import { CreateTrack, GetModel } from "./models/CreateTrack";
import { EditTrack } from "./models/EditTrack";
import { DeleteTrack } from "./models/DeleteTrack";
import { DeleteTracksRequest } from "./models/DeleteTracksRequest";

export const fetchTracks = async (model: GetModel): Promise<PageList<Track> | undefined> => {
  try {
const params: any = {
    page: model.page ?? 1,
    limit: model.limit ?? 10,
}

if (model.order) params.order = model.order;
if (model.sort) params.sort = model.sort;
if (model.search && model.search.trim() !== "") params.search = model.search;
if (model.genre && model.genre.trim() !== "") params.genre = model.genre;
if (model.artist && model.artist.trim() !== "") params.artist = model.artist

    const response = await axios.get<PageList<Track>>("http://localhost:8000/api/tracks",  { params });
    console.log(response)
    if (response.status == 200 && response.data && response){
      return response.data;
    }
  }
  catch (error: any) {
    console.log(error);
  }
  return undefined;
};

export const createTrack = async (trackData: CreateTrack): Promise<Track|undefined> => {
  try{
    const response = await axios.post<CreateTrack, AxiosResponse<Track>>("http://localhost:8000/api/tracks", trackData);
    if(response.status == 201 && response.data) {
      return response.data;
    }
  }
    catch (error: any) {
    console.log(error);
  }
  return undefined;
};

export const fetchTrackbySlug = async(slug:string): Promise<Track|undefined> => {
  try{
    const response = await axios.get<Track>(`http://localhost:8000/api/tracks/${slug}`);
    if (response.status === 200 ) {
      return response.data;
    }
  }
  catch (error:any) {
    console.log(error);
  }
  return undefined;
};

export const editTrack = async (trackData : EditTrack): Promise<Track|undefined> => {
  try{
    const response = await axios.put<EditTrack, AxiosResponse<Track>>(`http://localhost:8000/api/tracks/${trackData.id}`, trackData);
    if(response.status == 200 && response.data) {
      return response.data;
    }
  }
   catch (error: any) {
    console.log(error);
  }
  return undefined;
};

export const deleteTrack = async({id}:DeleteTrack): Promise<void> => {
  try{
    const response = await axios.delete(`http://localhost:8000/api/tracks/${id}`);
    if(response.status === 204){
      console.log("Track deleted successfully");
    }
  }
   catch (error: any) {
    console.error("Failed to delete track:", error);
  }
};

export const deleteMultipleTracks = async(trackData: DeleteTracksRequest): Promise<void> => {
  try{
    const response = await axios.post("http://localhost:8000/api/tracks/delete", trackData);
    if(response.status === 200) {
      return response.data
    }
  }
   catch (error: any) {
    console.log(error);
  }
  return undefined;
};

export const uploadTrackFile = async(trackId: string, file: File): Promise<Track | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file)
    const response = await axios.post<Track>(`http://localhost:8000/api/tracks/${trackId}/upload`, formData, 
      {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }
  );
      if (response.status == 200 && response.data ){
      return response.data;
    }
  }
  catch (error: any) {
    console.log(error);
  }
  return undefined;
  
};

export const deleteTrackFile = async(trackId: string): Promise<Track | undefined> => {
  try {
    const response = await axios.delete<Track>(`http://localhost:8000/api/tracks/${trackId}/file`);
    if (response.status === 200 && response.data){
      return response.data;
    }
  }
  catch(error: any) {
    console.log(error);
  }
  return undefined;
};
