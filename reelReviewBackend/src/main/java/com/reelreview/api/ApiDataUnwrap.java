package com.reelreview.Api;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ApiDataUnwrap {

    //============================================= TMDB API JSON 분해 ============================================
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

                System.out.println((String)jsonObj.get("title"));
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

        
        
        // 여기 포문 돌려서 그럼 id 다시 확인
        if (jArray.size() > 0){
            for(int i=0; i<jArray.size(); i++){
                JSONObject jsonObj = (JSONObject)jArray.get(i);

                if(jsonObj.get("release_date").equals(KRDBDate)){
                    id=Integer.parseInt(String.valueOf(jsonObj.get("id")) );
                    return id;
                }else{
                    id = 0;
                }

                System.out.println(id);
            }

        }

        return id;

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

                System.out.println((String)jsonObj.get("movieNm"));
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

                System.out.println((String)jsonObj.get("openDt"));
            }

        }

        return krdbDate;
    }
}
