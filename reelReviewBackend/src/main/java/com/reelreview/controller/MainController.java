package com.reelreview.controller;

//import com.reelreview.Service.MainService;
import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieUpcommingDTO;
import com.reelreview.api.service.MovieDataService;
import com.reelreview.service.MainService;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
public class MainController {

    @Autowired
    private MainService MS;


    @RequestMapping("api/popular_movielist")
    public List<MovieDetailsDTO> popularMovie(){

         return MS.getBoxOfficeToday();
     }

    @RequestMapping("api/upcomming")
    public List<MovieUpcommingDTO> upcommingMovie(){

        return MS.getUpcommingToday();
    }

    @RequestMapping("api/directorSearch")
    public List<MovieDetailsDTO> directorSearch(@RequestParam String name) throws IOException, InterruptedException, ParseException {

        return MS.getMovieListFromDirector(name);
    }





}
