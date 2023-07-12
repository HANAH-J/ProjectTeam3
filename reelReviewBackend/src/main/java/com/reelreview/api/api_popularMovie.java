package com.reelreview.Api;

import kr.or.kobis.kobisopenapi.consumer.rest.KobisOpenAPIRestService;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.reelreview.Api.ApiDataUnwrap.*;

@RestController
public class api_popularMovie {

    @RequestMapping("api/popular_movielist")
    public List<Integer> popularMovie() throws ParseException, UnsupportedEncodingException {


        String key = "a0976f286b811f00895569b8ceab2459";
        KobisOpenAPIRestService service = new KobisOpenAPIRestService(key);
        String todayBoxOffice;
        try {
            todayBoxOffice = service.getDailyBoxOffice(true,"20230710","20",null,null,null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<String> krdbTitle = unWrapKrdbTitle(todayBoxOffice);
        List<String> krdbDate = unWrapKrdbDate(todayBoxOffice);
        ApiCollapse api = new ApiCollapse();
        List<Integer> movieId = new ArrayList<>();

        for(int i = 0; i<krdbTitle.size() ; i++){
            int id = api.findMovieFromKrdbtoTmdb(krdbTitle.get(i),krdbDate.get(i));
            movieId.add(id);
        }

        return movieId;
    }

}
