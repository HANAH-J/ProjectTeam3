package com.reelreview.api;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ApiDataUnwrap {

    //============================================= TMDB API JSON 분해 ============================================
    public static List<String> unWrapTmdbImages(String json) throws ParseException {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONArray jArray = (JSONArray)jsonMain.get("results");

        List<String> tmdbImages = new ArrayList<>();

        if (jArray.size() > 0){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);

                tmdbImages.add((String)jsonObj.get("poster_path"));
            }
        }
        return tmdbImages;
    }


    public static List<String> unWrapTmdbTitles(String json) throws ParseException {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONArray jArray = (JSONArray)jsonMain.get("results");

        List<String> tmdbTitle = new ArrayList<>();

        if (jArray.size() > 0){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);

                tmdbTitle.add((String)jsonObj.get("title"));
            }
        }
        return tmdbTitle;
    }

    // TMDB 검색 데이터와 KRDB 날짜 매칭 메서드
    public static int matchReleaseDateWithTMDBKRDB(String json, String KRDBDate) throws ParseException {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONArray jArray = (JSONArray)jsonMain.get("results");
        int id = 0;
        List<JSONObject> topTen = new ArrayList<>();
        //검색 결과 매칭이 하나이상일때 출시일 비교
        if (jArray.size() > 1){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);
                System.out.println("TMDB 출시일"+jsonObj.get("release_date")+"  KRDB 출시일"+KRDBDate );
                if(jsonObj.get("release_date").equals(KRDBDate)){
                    topTen.add(jsonObj);
                    id=Integer.parseInt(String.valueOf(jsonObj.get("id")) );
                    return id;
                }else{
                    String TMDBDate = ""+jsonObj.get("release_date");
                    TMDBDate = TMDBDate.substring(0,4);
                    KRDBDate = KRDBDate.substring(0,4);
                    if(KRDBDate.equals(TMDBDate)){
                        return Integer.parseInt(String.valueOf(jsonObj.get("id")) );
                    }
                }
            }
        // 검색 결과 매칭이 하나일때 id값 반환
        }else if(jArray.size()==1){
            JSONObject jsonObj = (JSONObject)jArray.get(0);
            id=Integer.parseInt(String.valueOf(jsonObj.get("id")));
        }

        return id;

    }
    // TMDB에서 영화 ID로 하나씩 검색(영화id 리스트 받아서)
    public static JSONArray searchFromTMDBWithMovieId(List<Integer> json) throws ParseException {

        JSONArray fullData = new JSONArray();
        for(int i = 0 ; i < json.size() ; i++){
            int movieCd = json.get(i);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.themoviedb.org/3/movie/"+movieCd+"?append_to_response=videos%2Cimages&language=ko"))
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

            JSONObject tmdbData = new JSONObject();
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(response.body());
            JSONObject jsonMain = (JSONObject)obj;

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

            Double avg = Double.parseDouble(""+jsonMain.get("vote_average"));
            double avgdouble = Math.round(avg*10)/10.0;

            tmdbData.put("vote_average",avgdouble);
            tmdbData.put("vote_count",jsonMain.get("vote_count"));
            tmdbData.put("videos",jsonMain.get("videos"));
            tmdbData.put("images",jsonMain.get("images"));
            tmdbData.put("backdrop_path",jsonMain.get("backdrop_path"));
            fullData.add(tmdbData);

        }


        return fullData;
    }




    //============================================= 한국 영화 진흥회 API JSON 분해 ============================================
    public static List<String> unWrapKrdbTitle(String json) throws ParseException {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONObject jMain = (JSONObject) jsonMain.get("boxOfficeResult");
        JSONArray jArray = (JSONArray)jMain.get("dailyBoxOfficeList");

        List <String> krdbTitle = new ArrayList<>();

        if (jArray.size() > 0){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);

                krdbTitle.add((String)jsonObj.get("movieNm"));


            }

        }

        return krdbTitle;

    }
    public static List<String> unWrapKrdbDate(String json) throws ParseException{
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONObject jMain = (JSONObject) jsonMain.get("boxOfficeResult");
        JSONArray jArray = (JSONArray)jMain.get("dailyBoxOfficeList");

        List <String> krdbDate = new ArrayList<>();

        if (jArray.size() > 0){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);

                krdbDate.add((String)jsonObj.get("openDt"));

            }

        }

        return krdbDate;
    }
    public static JSONArray unWrapKrdb(String json) throws ParseException{
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(json);
        JSONObject jsonMain = (JSONObject)obj;
        JSONObject jMain = (JSONObject) jsonMain.get("boxOfficeResult");
        JSONArray jArray = (JSONArray)jMain.get("dailyBoxOfficeList");

        JSONArray add = new JSONArray();
        for(int i = 0 ; i < jArray.size() ; i++){
            JSONObject jsonobj = (JSONObject)jArray.get(i);
            JSONObject todayJson = new JSONObject();
            todayJson.put("rank",jsonobj.get("rank"));
            todayJson.put("salesShare",jsonobj.get("salesShare"));
            todayJson.put("audiAcc",jsonobj.get("audiAcc"));
            add.add(todayJson);
        }



        return add;
    }

}
