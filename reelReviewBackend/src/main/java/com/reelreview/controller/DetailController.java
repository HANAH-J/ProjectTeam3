package com.reelreview.controller;

import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieGenresDTO;
import com.reelreview.api.domain.MovieImagesDTO;

import com.reelreview.api.domain.MovieVideosDTO;
import com.reelreview.api.repo.ApiMovieImagesRepo;
import com.reelreview.domain.CastDataDTO;
import com.reelreview.domain.CrewDataDTO;
import com.reelreview.service.DetailService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DetailController {

    @Autowired
    private DetailService DS;


    @RequestMapping("api/getMovieImages")
    public List<MovieImagesDTO> getMovieImages(@RequestParam("movieId") int movieId){
        Long movieCd = Long.valueOf(movieId);
        List<MovieImagesDTO> movieImages = DS.findImagesByMovieCd(movieCd);
        return movieImages;
    }
    @RequestMapping("api/getMovieFulldata")
    public JSONObject getMovieFulldata(@RequestParam("movieId") int movieId){
        JSONObject fulldata = new JSONObject();
        Long movieCd = Long.valueOf(movieId);
        List<MovieImagesDTO> movieImages = DS.findImagesByMovieCd(movieCd);
        List<CrewDataDTO> movieCrews = DS.findCrewDataByMovieCd(movieCd);
        List<CastDataDTO> movieCasts = DS.findCastDataByMoiveCd(movieCd);
        List<MovieVideosDTO> movieVideos = DS.findVideosByMovieCd(movieCd);
        List<MovieGenresDTO> movieGenres = DS.findGenresByMovieCd(movieCd);
        List<Integer> genres = new ArrayList<>();
        for(MovieGenresDTO genre:movieGenres){
            genres.add(genre.getGenreId());
        }
        List<Integer> simularMovieCd = DS.findMoviesByGenres(genres);
        List<MovieDetailsDTO> simularMovieDetails = DS.findMoviesBymovieCd(simularMovieCd);
        fulldata.put("movieImages",movieImages);
        fulldata.put("movieCrews",movieCrews);
        fulldata.put("movieCasts",movieCasts);
        fulldata.put("movieVideos",movieVideos);
        fulldata.put("simularMovieDetails",simularMovieDetails);
        System.out.println(movieCasts);
        System.out.println(movieCrews);
        System.out.println(movieImages);
        System.out.println(movieVideos);
        System.out.println(simularMovieDetails);
        return fulldata;
    }
}
