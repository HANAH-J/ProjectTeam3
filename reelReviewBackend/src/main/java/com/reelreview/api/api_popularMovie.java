package com.reelreview.api;

import kr.or.kobis.kobisopenapi.consumer.rest.KobisOpenAPIRestService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.text.DecimalFormat;
import java.time.LocalDate;

import static com.reelreview.api.ApiDataUnwrap.*;

@RestController
public class api_popularMovie {

    @RequestMapping("api/popular_movielist")
    public String popularMovie() throws ParseException, UnsupportedEncodingException {

        String key = "a0976f286b811f00895569b8ceab2459";
        KobisOpenAPIRestService service = new KobisOpenAPIRestService(key);
        String todayBoxOffice;
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = yesterday.format(formatter);

        try {
            todayBoxOffice = service.getDailyBoxOffice(true,""+yesterday,"20",null,null,null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        List<String> krdbTitle = unWrapKrdbTitle(todayBoxOffice);
        List<String> krdbDate = unWrapKrdbDate(todayBoxOffice);

        List<Integer> movieId = new ArrayList<>();


        for(int i = 0; i<krdbTitle.size() ; i++){

            String name = krdbTitle.get(i);
            String date = krdbDate.get(i);
            int id = 0;

//            name = name.substring(0, name.length() - 1);
            // 검색할 영화 제목 쿼리화
            String query = URLEncoder.encode(name,"UTF-8");

            // tmdb 한글 쿼리화 후 영화 제목으로 검색
            String fullUri = "https://api.themoviedb.org/3/search/movie?query="+query+"&include_adult=true&language=ko&page=1&region=KR";
            // tmdb api 접속 데이터 받아오기
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUri))
                    .header("accept", "application/json")
                    .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = null;
            try {
                response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            // 한글로 tmdb 검색해 받아온 영화 목록 제목만 list로
            List<String> titles= unWrapTmdbTitles(response.body());
            System.out.println("검색 결과 : "+titles);


            // tmdb 검색해 받아온 목록 이미지 DATA
            List<String> images = unWrapTmdbImages(response.body());


            // tmdb 검색해 받아온 목록 중 영화 개봉일 매칭

            id = matchReleaseDateWithTMDBKRDB(response.body(),date);

            movieId.add(id);
        }

        //movieId 리스트 받아서 TMDB에 검색
        JSONArray fullData = searchFromTMDBWithMovieId(movieId);

        String movieDetail = null;


        //KRDB 에서 rank, salesShare,audiAcc 만남기고 제거
        JSONArray KrdbBoxOfficeData = unWrapKrdb(todayBoxOffice);


        for(int i = 0 ; i < fullData.size() ; i++){
            JSONObject tmdb = (JSONObject)fullData.get(i);
            JSONObject krdb = (JSONObject)KrdbBoxOfficeData.get(i);
            tmdb.put("rank",krdb.get("rank"));
            tmdb.put("salesShare",krdb.get("salesShare"));

            int audi = Integer.parseInt(""+krdb.get("audiAcc"));
            double roundedNumber = Math.round(audi / 100) / 100.0;
            DecimalFormat formatter1 = new DecimalFormat("#,###.0");
            String formattedNumber = formatter1.format(roundedNumber);

            System.out.println(formattedNumber);
            tmdb.put("audiAcc",formattedNumber);
        }

        String fulldata = fullData.toString();




        return fulldata;
    }


}
