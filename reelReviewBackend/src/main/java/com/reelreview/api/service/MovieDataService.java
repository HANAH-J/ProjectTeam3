package com.reelreview.api.service;


import com.reelreview.api.domain.*;
import com.reelreview.api.repo.*;
import com.reelreview.domain.CastDataDTO;
import com.reelreview.domain.CrewDataDTO;
import com.reelreview.repository.CastDataRepository;
import com.reelreview.repository.CrewDataRepository;
import kr.or.kobis.kobisopenapi.consumer.rest.KobisOpenAPIRestService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
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
    private ApiMovieUpcommingRepo movieUpcommingRepo;
    @Autowired
    private ApiMovieDetailRepo movieDetailRepo;
    @Autowired
    private ApiMovieVideosRepo movieVideosRepo;
    @Autowired
    private ApiMovieImagesRepo movieImagesRepo;
    @Autowired
    private ApiMovieGenresRepo movieGenresRepo;
    @Autowired
    private CastDataRepository castDataRepo;
    @Autowired
    private CrewDataRepository crewDataRepo;
    public void getBoxOfficeToday() throws ParseException, IOException, InterruptedException {

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
            if(name.contains(":")){
                name = name.substring(0,name.indexOf(":"));
            }
            System.out.println(name);

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

            // tmdb 검색해 받아온 목록 중 영화 개봉일 매칭 후 영화 ID 값만 불러와 LIST 로 저장
            id = unwrap.matchReleaseDateWithTMDBKRDB(response.body(),date);

            movieId.add(id);
        }

        //movieId 리스트 받아서 TMDB에 검색
        JSONArray fullData = unwrap.searchFromTMDBWithMovieId(movieId);

        //데이터에서 비디오 정보만 추리기
        JSONArray videoData = new JSONArray();
        //데이터에서 장르 정보만 추리기
        JSONArray genreData = new JSONArray();
        //데이터에서 배우 정보만 추리기
        JSONArray castData = new JSONArray();
        //데이터에서 관계자 정보만 추리기
        JSONArray crewData = new JSONArray();


        //movieId 리스트 받아서 TMDB에 이미지/유튜브 검색
        JSONArray imageData = unwrap.searchFromTMDBImagesWithMovieId(movieId);

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

            // 비디오 데이터만 추려서 videoData에 추가하기

            JSONObject jobj = (JSONObject) tmdb.get("videos");
            JSONArray videos = (JSONArray)jobj.get("results");
            for(int j = 0 ; j < videos.size() ; j++){
                JSONObject data = new JSONObject();
                JSONObject job = (JSONObject)videos.get(j);
                data.put("videoName",job.get("name"));
                data.put("videoKey",job.get("key"));
                data.put("videoId",job.get("id"));
                data.put("movieCd",tmdb.get("id"));
                videoData.add(data);
            }
            // 영화 참가 배우데이터만 추려서 castData에 추가하기
            JSONObject people = (JSONObject) tmdb.get("credits");
            JSONArray cast = (JSONArray) people.get("cast");
            JSONArray crew = (JSONArray) people.get("crew");
            for(int j = 0 ; j < cast.size() ; j++) {
                JSONObject data = new JSONObject();
                JSONObject castPerson = (JSONObject) cast.get(j);
                data.put("peopleCd", castPerson.get("id"));
                data.put("peopleName", castPerson.get("name"));
                data.put("movieCd", tmdb.get("id"));
                data.put("peopleImage", castPerson.get("profile_path"));
                data.put("character", castPerson.get("character"));
                castData.add(data);
            }

            // 영화 참가 관계자 데이터만 추려서 crewData에 추가하기
            for(int z = 0 ; z < crew.size() ; z++){
                JSONObject data = new JSONObject();
                JSONObject crewPerson = (JSONObject) crew.get(z);
                data.put("peopleCd",crewPerson.get("id"));
                data.put("peopleName",crewPerson.get("name"));
                data.put("movieCd",tmdb.get("id"));
                data.put("peopleImage",crewPerson.get("profile_path"));
                data.put("department", crewPerson.get("department"));
                data.put("job", crewPerson.get("job"));
                crewData.add(data);

            }

            // 장르 데이터만 추려서 genreData에 추가하기

            JSONArray genres = (JSONArray) tmdb.get("genres");

            for(int x = 0 ; x < genres.size() ; x++){
                JSONObject data = new JSONObject();
                JSONObject job = (JSONObject)genres.get(x);
                data.put("genreId",job.get("id"));
                data.put("genreName",job.get("name"));
                data.put("movieCd",tmdb.get("id"));
                genreData.add(data);
            }
        }
        //crewDTO 저장
        for(int i = 0 ; i < crewData.size() ; i++){
            CrewDataDTO crewDto = new CrewDataDTO();
            JSONObject data = (JSONObject) crewData.get(i);
            crewDto.setMovieCd((Long) data.get("movieCd"));
            crewDto.setJob((String) data.get("job"));
            crewDto.setDepartment((String) data.get("department"));
            crewDto.setPeopleCd((Long) data.get("peopleCd"));
            crewDto.setPeopleName((String) data.get("peopleName"));
            crewDto.setPeopleImage((String) data.get("peopleImage"));
            crewDto.setCrewId((Long) data.get("peopleCd"),(Long) data.get("movieCd"));
            crewDataRepo.save(crewDto);

        }
        //castDTO 저장
        for(int i = 0 ; i < castData.size() ; i++){
            CastDataDTO castDto = new CastDataDTO();
            JSONObject data = (JSONObject) castData.get(i);
            castDto.setMovieCd((Long) data.get("movieCd"));
            castDto.setCharacter((String) data.get("character"));
            castDto.setPeopleCd((Long) data.get("peopleCd"));
            castDto.setPeopleName((String) data.get("peopleName"));
            castDto.setPeopleImage((String) data.get("peopleImage"));
            castDto.setCastId((Long) data.get("peopleCd"),(Long) data.get("movieCd"));
            castDataRepo.save(castDto);
        }

        //imageDTO 저장
        for(int i = 0 ; i < imageData.size() ; i++){
            MovieImagesDTO imagesDTO = new MovieImagesDTO();
            JSONObject data = (JSONObject)imageData.get(i) ;
            imagesDTO.setMovieCd(Long.valueOf((Integer)data.get("movieCd")));
            imagesDTO.setBackdropPath((String) data.get("backdropPath"));

            movieImagesRepo.save(imagesDTO);

        }

        //movieVideoDTO 저장
        for(int i = 0 ; i < videoData.size() ; i++){
            MovieVideosDTO videosDTO = new MovieVideosDTO();
            JSONObject data = (JSONObject) videoData.get(i);
            videosDTO.setMovieCd((Long)data.get("movieCd"));
            videosDTO.setVideoKey((String)data.get("videoKey"));
            videosDTO.setVideoId((String)data.get("videoId"));
            videosDTO.setVideoName((String)data.get("videoName"));

            movieVideosRepo.save(videosDTO);
        }
        //GenreDto 저장
            for(int i = 0 ; i < genreData.size(); i++){
                MovieGenresDTO genresDTO = new MovieGenresDTO();
                JSONObject data = (JSONObject) genreData.get(i);
                genresDTO.setGenreId( ((Long)data.get("genreId")).intValue());
                genresDTO.setMovieCd((Long) data.get("movieCd"));
                genresDTO.setGenreName((String) data.get("genreName"));
                genresDTO.setGenreIndexId((Long) data.get("movieCd"),((Long)data.get("genreId")).intValue());
                movieGenresRepo.save(genresDTO);
            }



        // DetailDTO 저장
        for(int i = 0 ; i < fullData.size() ; i++){
            MovieDetailsDTO detailsDTO = new MovieDetailsDTO();

            JSONObject jobj = (JSONObject) fullData.get(i);

            detailsDTO.setMovieId(Integer.parseInt(""+jobj.get("id")) );
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
            detailsDTO.setAudiAcc(((String)jobj.get("audiAcc")));


            movieDetailRepo.save(detailsDTO);
        }



        // 개봉예정작 데이터 받고 저장

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.themoviedb.org/3/movie/upcoming?language=ko&region=KR"))
                    .header("accept", "application/json")
                    .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());



            JSONParser parser = new JSONParser();
            Object obj = parser.parse(response.body());
            JSONObject jsonMain = (JSONObject)obj;
            JSONArray jArray = (JSONArray)jsonMain.get("results");


            for(int i = 0 ; i < jArray.size() ; i++){
                MovieUpcommingDTO upcommingDTO = new MovieUpcommingDTO();


                JSONObject jobj = new JSONObject();
                jobj = (JSONObject) jArray.get(i);

                upcommingDTO.setMovieId((Long)jobj.get("id"));
                upcommingDTO.setOriginal_language((String) jobj.get("original_language"));
                upcommingDTO.setOriginal_title((String) jobj.get("original_title"));
                upcommingDTO.setOverview((String) jobj.get("overview"));
                upcommingDTO.setPoster_path((String) jobj.get("poster_path"));
                upcommingDTO.setRelease_date((String) jobj.get("release_date"));
                upcommingDTO.setRuntime((Long)jobj.get("runtime"));
                upcommingDTO.setTagline((String) jobj.get("tagline"));
                upcommingDTO.setTitle((String) jobj.get("title"));
                upcommingDTO.setVote_average(Double.parseDouble(""+jobj.get("vote_average")));
                upcommingDTO.setVote_count((Long) jobj.get("vote_count"));

                String formattedDate4 = getCurrentDateInStringFormat();
                upcommingDTO.setUpcommingDownloadDate(formattedDate4);

                movieUpcommingRepo.save(upcommingDTO);
            }

    }
    public static String getCurrentDateInStringFormat() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return currentDate.format(formatter);
    }
}
