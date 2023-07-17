package com.reelreview.api.service;


import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieGenresDTO;
import com.reelreview.api.domain.MovieImagesDTO;
import com.reelreview.api.domain.MovieVideosDTO;
import com.reelreview.api.repo.ApiMovieDetailRepo;
import kr.or.kobis.kobisopenapi.consumer.rest.KobisOpenAPIRestService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.DecimalFormat;
import org.json.simple.parser.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieDataService{
    @Autowired
    private ApiMovieDetailRepo movieDetailRepo;
    public String getBoxOfficeToday() throws ParseException, IOException, InterruptedException {

        ApiDataUnwrap unwrap = new ApiDataUnwrap();

        // 한국 영화 진흥원 박스오피스 데이터 받아오기
        String key = "a0976f286b811f00895569b8ceab2459";
        KobisOpenAPIRestService service = new KobisOpenAPIRestService(key);
        String todayBoxOffice;
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = yesterday.format(formatter);

        try {
            todayBoxOffice = service.getDailyBoxOffice(true,""+formattedDate,"20",null,null,null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // todayBoxOffice == 한국영화진흥원에서 받아온 데이터

        List<String> krdbTitle = unwrap.unWrapKrdbTitle(todayBoxOffice);
        List<String> krdbDate = unwrap.unWrapKrdbDate(todayBoxOffice);

        List<Integer> movieId = new ArrayList<>();

        // 받아온 데이터 포문 돌려서 tmdb에 하나하나 검색
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

            //response.body() = tmdb에서 영화 제목 검색 후 받아온 영화 데이터

            // 한글로 tmdb 검색해 받아온 영화 목록 제목만 list로
            List<String> titles= unwrap.unWrapTmdbTitles(response.body());


            // tmdb 검색해 받아온 목록 중 영화 개봉일 매칭 후 영화 ID 값만 불러와 LIST 로 저장
            id = unwrap.matchReleaseDateWithTMDBKRDB(response.body(),date);

            movieId.add(id);
        }

        //movieId 리스트 받아서 TMDB에 검색
        JSONArray fullData = unwrap.searchFromTMDBWithMovieId(movieId);
        //movieId 리스트 받아서 TMDB에 이미지/유튜브 검색
        JSONArray imageData = unwrap.searchFromTMDBImagesWithMovieId(movieId);
//        JSONArray videoData = unwrap.searchFromTMDBVideosWithMovieId(movieId);

        //KRDB 에서 rank, salesShare,audiAcc 만남기고 제거
        JSONArray KrdbBoxOfficeData = unwrap.unWrapKrdb(todayBoxOffice);

        // 각각 정리된 데이터 포문 돌려서 합치기
        for(int i = 0 ; i < fullData.size() ; i++){
            JSONObject tmdb = (JSONObject)fullData.get(i);
            JSONObject krdb = (JSONObject)KrdbBoxOfficeData.get(i);
            tmdb.put("rank",krdb.get("rank"));
            tmdb.put("salesShare",krdb.get("salesShare"));

            int audi = Integer.parseInt(""+krdb.get("audiAcc"));
            double roundedNumber = Math.round(audi / 100) / 100.0;
            DecimalFormat formatter1 = new DecimalFormat("#,###.0");
            String formattedNumber = formatter1.format(roundedNumber);

            tmdb.put("audiAcc",formattedNumber);
        }

        List<MovieDetailsDTO> boxOfficeDetailDTO = new ArrayList<>();
//        List<MovieGenresDTO> boxOfficeGenreDTO = new ArrayList<>();
//        List<MovieImagesDTO> boxOfficeImagesDTO = new ArrayList<>();
//        List<MovieVideosDTO> boxOfficeVideosDTO = new ArrayList<>();


        for(int i = 0 ; i < fullData.size() ; i++){
            MovieDetailsDTO detailsDTO = new MovieDetailsDTO();
//            MovieGenresDTO genresDTO = new MovieGenresDTO();
//            MovieImagesDTO imagesDTO = new MovieImagesDTO();
//            MovieVideosDTO videosDTO = new MovieVideosDTO();

            JSONObject jobj = new JSONObject();
            jobj = (JSONObject) fullData.get(i);

            detailsDTO.setMovieId((Long)jobj.get("id"));
            detailsDTO.setOriginal_language((String) jobj.get("original_language"));
            detailsDTO.setOriginal_title((String) jobj.get("original_title"));
            detailsDTO.setOverview((String) jobj.get("overview"));
            detailsDTO.setPoster_path((String) jobj.get("poster_path"));
            detailsDTO.setRelease_date((String) jobj.get("release_date"));
            detailsDTO.setRuntime((Long)jobj.get("runtime"));
            detailsDTO.setTagline((String) jobj.get("tagline"));
            detailsDTO.setTitle((String) jobj.get("title"));
            detailsDTO.setVote_average((Double) jobj.get("vote_average"));
            detailsDTO.setVote_count((Long) jobj.get("vote_count"));

            //랭크데이터/ 퍼센트 데이터/ 누적관객 데이터
            detailsDTO.setRank((Integer.parseInt((String) jobj.get("rank"))));
            detailsDTO.setSalesShare(Double.parseDouble((String)jobj.get("salesShare")));
            detailsDTO.setAudiAcc((""+jobj.get("audiAcc")));


            boxOfficeDetailDTO.add(detailsDTO);
            movieDetailRepo.save(detailsDTO);
//            boxOfficeGenreDTO.add();


        }

//        boxOfficeImagesDTO.add();
//        boxOfficeVideosDTO.add();



        String fulldata = fullData.toString();





        return fulldata;
    }

}
