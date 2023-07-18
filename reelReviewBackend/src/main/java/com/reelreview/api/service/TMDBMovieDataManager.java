package com.reelreview.api.service;

import com.reelreview.api.domain.MovieDetailsDTO;
import org.json.simple.JSONObject;


public class TMDBMovieDataManager{
    public JSONObject TMDBMovieJsonObjectToNeededDataJsonObject(JSONObject jsonMain){
        JSONObject tmdbData = new JSONObject();

        tmdbData.put("genres",jsonMain.get("genres"));
        tmdbData.put("id",jsonMain.get("id"));
        tmdbData.put("original_language",jsonMain.get("original_language"));
        tmdbData.put("original_title",jsonMain.get("original_title"));
        tmdbData.put("overview",jsonMain.get("overview"));
        tmdbData.put("poster_path",jsonMain.get("poster_path"));
        tmdbData.put("release_date",jsonMain.get("release_date"));
        tmdbData.put("runtime",jsonMain.get("runtime"));
        tmdbData.put("tagline",jsonMain.get("tagline"));
        tmdbData.put("title",jsonMain.get("title"));
        Double avg = 0.0;
        if(jsonMain.get("vote_average")==null){
            avg = 0.0;
        }else{
            avg = Double.parseDouble(""+jsonMain.get("vote_average"));
        }
        double avgdouble = Math.round(avg*10)/10.0;
        tmdbData.put("vote_average",avgdouble);
        tmdbData.put("vote_count",jsonMain.get("vote_count"));
        tmdbData.put("backdrop_path",jsonMain.get("backdrop_path"));
        tmdbData.put("videos",jsonMain.get("videos"));
        tmdbData.put("credits",jsonMain.get("credits"));

        return tmdbData;
    }

    public MovieDetailsDTO JSONObjectToMovieDetailsDTO(JSONObject jobj){
        MovieDetailsDTO detailsDTO = new MovieDetailsDTO();

        detailsDTO.setMovieId(Integer.parseInt(""+jobj.get("id")) );
        detailsDTO.setOriginal_language((String) jobj.get("original_language"));
        detailsDTO.setOriginal_title((String) jobj.get("original_title"));
        detailsDTO.setOverview((String) jobj.get("overview"));
        detailsDTO.setPoster_path((String) jobj.get("poster_path"));
        detailsDTO.setRelease_date((String) jobj.get("release_date"));
        detailsDTO.setRuntime((Long)jobj.get("runtime"));
        detailsDTO.setTagline((String) jobj.get("tagline"));
        detailsDTO.setTitle((String) jobj.get("title"));
        detailsDTO.setVote_average((Double) jobj.get("vote_average"));
        detailsDTO.setVote_count((Long) jobj.get("vote_count"));

        return detailsDTO;
    }
}
