package com.reelreview.Api;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

import static com.reelreview.Api.ApiDataUnwrap.matchReleaseDateWithTMDBKRDB;
import static com.reelreview.Api.ApiDataUnwrap.unWrapTmdbTitles;

public class ApiCollapse {


    public int findMovieFromKrdbtoTmdb(String name, String releaseDate) throws UnsupportedEncodingException, ParseException {
        int id = 0;

        name = name.substring(0, name.length() - 1);
        // 검색할 영화 제목 쿼리화
        String query = URLEncoder.encode(name,"UTF-8");
        System.out.println(query);

        // tmdb 한글 쿼리화 후 영화 제목으로 검색
        String fullUri = "https://api.themoviedb.org/3/search/movie?query="+query+"&include_adult=true&language=ko&page=1&region=ko";
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

        // tmdb 검색해 받아온 목록 중 영화 개봉일 매칭
        id = matchReleaseDateWithTMDBKRDB(response.body(),releaseDate);


        return id;
    }
}


