package com.reelreview.controller;

//import com.reelreview.Service.MainService;
import com.reelreview.api.service.MovieDataService;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
@RestController
public class MainController {

    @Autowired
    private MovieDataService MDS;


    @RequestMapping("api/popular_movielist")
    public String popularMovie() throws ParseException, IOException, InterruptedException {
         String todayBoxOffice = MDS.getBoxOfficeToday();

         if(todayBoxOffice != null){
             return todayBoxOffice;
         }else{
             return "exception";
         }

     }





}
