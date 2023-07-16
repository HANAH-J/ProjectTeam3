package com.reelreview.api.controller;


import com.reelreview.api.service.MovieUpcomingService;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class ApiController {


    @Autowired
    private MovieUpcomingService MU;

   @RequestMapping("api/upcoming")
   public String getUpcoming() throws IOException, InterruptedException, ParseException {
       String movieUpcoming = MU.getMovieUpcoming();

       if(movieUpcoming!=null){
           return movieUpcoming;
       }else{
           return "exception";
       }
   }

}
