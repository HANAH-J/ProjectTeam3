package com.reelreview.controller;

import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieImagesDTO;

import com.reelreview.api.repo.ApiMovieImagesRepo;
import com.reelreview.service.DetailService;
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
        List<MovieImagesDTO> movieImages = DS.findByMovieCd(movieCd);
        System.out.println("Controller : "+movieImages);
        return movieImages;
    }
}
