package com.reelreview.service;

import com.reelreview.api.domain.*;
import com.reelreview.api.repo.*;
import com.reelreview.api.service.ApiDataUnwrap;
import com.reelreview.api.service.TMDBMovieDataManager;
import com.reelreview.domain.CastDataDTO;
import com.reelreview.domain.CrewDataDTO;
import com.reelreview.repository.CastDataRepository;
import com.reelreview.repository.CrewDataRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class MainService {
    @Autowired
    private ApiMovieDetailRepo movieDetailRepo;
    @Autowired
    private ApiMovieUpcommingRepo mUpcomming;
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
    public List<MovieDetailsDTO> getBoxOfficeToday() {
        List<Integer> ranky = new ArrayList<>();
        for(int i = 1 ; i < 11 ; i++){
            ranky.add(i);
        }
        List<MovieDetailsDTO> todaylist =  movieDetailRepo.findByRankIn(ranky);
        return todaylist;
    }
    public static String getCurrentDateInStringFormat() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return currentDate.format(formatter);
    }

    public List<MovieUpcommingDTO> getUpcommingToday() {

        List<MovieUpcommingDTO> upcommingList = mUpcomming.findByUpcommingDownloadDate(getCurrentDateInStringFormat());
        return upcommingList;
    }

    public List<MovieDetailsDTO> getMovieListFromDirector(String name) throws IOException, InterruptedException, ParseException {
        String query = URLEncoder.encode(name,"UTF-8");
        System.out.println(query);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/search/person?query="+query+"&include_adult=false&language=ko"))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        JSONParser parser = new JSONParser();
        Object obj = parser.parse(response.body());
        System.out.println(obj);
        JSONObject jobj = (JSONObject) obj;
        JSONArray jary = (JSONArray) jobj.get("results");
        //임시로 0번만
        JSONObject data = (JSONObject) jary.get(0);
        Long personId = (Long)data.get("id");

        // 인물 아이디로 검색해서 리스트받아오기

        HttpRequest request2 = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/person/"+personId+"/movie_credits?language=ko"))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response2 = HttpClient.newHttpClient().send(request2, HttpResponse.BodyHandlers.ofString());
        Object obj2 = parser.parse(response2.body());
        JSONObject jobj2 = (JSONObject) obj2;
        JSONArray jary2 = (JSONArray) jobj2.get("crew");
        List<MovieDetailsDTO> directorSearchDataList = new ArrayList<>();



        for(int i = 0 ; i < jary2.size() ; i++){
            JSONObject moviesSearchByDirector = (JSONObject)jary2.get(i);
            TMDBMovieDataManager t = new TMDBMovieDataManager();
            JSONObject jData = t.TMDBMovieJsonObjectToNeededDataJsonObject(moviesSearchByDirector);
            MovieDetailsDTO m = t.JSONObjectToMovieDetailsDTO(jData);


            if(!movieDetailRepo.existsById(m.getMovieId())){
                movieDetailRepo.save(m);
            }
            boolean isDuplicate = false;
            for (int j = 0; j < directorSearchDataList.size(); j++) {
                if (directorSearchDataList.get(j).equals(m)) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                directorSearchDataList.add(m);
            }
        }
        Collections.sort(directorSearchDataList, Comparator.comparing(MovieDetailsDTO::getRelease_date).reversed());
        System.out.println(directorSearchDataList);
        return directorSearchDataList;
    }

    public List<MovieDetailsDTO> getMovieListFromGenre(String genre) {
        List<MovieGenresDTO> list = movieGenresRepo.findByGenreName(genre);
        List<MovieDetailsDTO> listMovie = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            Long movieCd = list.get(i).getMovieCd();
            Optional<MovieDetailsDTO> optionalMovieDetailsDTO = movieDetailRepo.findById(movieCd.intValue());

            // Optional의 값이 존재하면 리스트에 추가
            optionalMovieDetailsDTO.ifPresent(listMovie::add);
        }

        Collections.sort(listMovie, Comparator.comparing(MovieDetailsDTO::getRelease_date).reversed());
        List<MovieDetailsDTO> finalList = getLimitedList(listMovie,20);

        return finalList;
    }
    private static <E> List<E> getLimitedList(List<E> dataList, int maxSize) {
        int size = dataList.size();
        int fromIndex = Math.max(0, size - maxSize);
        int toIndex = Math.min(size, maxSize);
        return new ArrayList<>(dataList.subList(fromIndex, toIndex));
    }
    public List<MovieDetailsDTO> getMovieListFromActor(String name) throws ParseException, IOException, InterruptedException {
        String query = URLEncoder.encode(name,"UTF-8");
        System.out.println(query);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/search/person?query="+query+"&include_adult=false&language=ko"))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        JSONParser parser = new JSONParser();
        Object obj = parser.parse(response.body());
        System.out.println(obj);
        JSONObject jobj = (JSONObject) obj;
        JSONArray jary = (JSONArray) jobj.get("results");
        //임시로 0번만
        JSONObject data = (JSONObject) jary.get(0);
        Long personId = (Long)data.get("id");

        // 인물 아이디로 검색해서 리스트받아오기

        HttpRequest request2 = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/person/"+personId+"/movie_credits?language=ko"))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZhYTU1NDc2ZTRjYTdjNzI3Nzg4ZjlmOTMwZDY0NCIsInN1YiI6IjY0OTk0OWQ1NjJmMzM1MDEyNzQ3MzI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FiFcp5Wrby8LZtoc_h9tQ2v6yOKyKwO2B8pqzavLsW0")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response2 = HttpClient.newHttpClient().send(request2, HttpResponse.BodyHandlers.ofString());
        Object obj2 = parser.parse(response2.body());
        JSONObject jobj2 = (JSONObject) obj2;
        JSONArray jary2 = (JSONArray) jobj2.get("cast");
        List<MovieDetailsDTO> actorSearchDataList = new ArrayList<>();

        List<Integer> movieIds = new ArrayList<>();
        ApiDataUnwrap apiDataUnwrap = new ApiDataUnwrap();

        TMDBMovieDataManager TDM = new TMDBMovieDataManager();
        for(int i = 0 ; i < jary2.size() ; i++) {
            JSONObject moviesSearchByActor = (JSONObject) jary2.get(i);
            JSONObject jData = TDM.TMDBMovieJsonObjectToNeededDataJsonObject(moviesSearchByActor);
            MovieDetailsDTO m = TDM.JSONObjectToMovieDetailsDTO(jData);
            boolean isDuplicate = false;
            for (int j = 0; j < actorSearchDataList.size(); j++) {
                if (actorSearchDataList.get(j).equals(m)) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                actorSearchDataList.add(m);
            }
            movieIds.add(m.getMovieId());
        }

        JSONArray fulldata = apiDataUnwrap.searchFromTMDBWithMovieId(movieIds);
        JSONArray imageData = apiDataUnwrap.searchFromTMDBImagesWithMovieId(movieIds);

        for(Object movie : fulldata){
            JSONObject joject = (JSONObject)movie;
            if(!movieDetailRepo.existsById(((Long)joject.get("id")).intValue())){
                movieDetailRepo.save(TDM.JSONObjectToMovieDetailsDTO(joject));
            }
            List<MovieVideosDTO> videoData = TDM.getVideoData(joject);
            for (MovieVideosDTO m : videoData){
                movieVideosRepo.save(m);
            }
            // 장르 데이터만 추려서 genreData에 추가하기

            List<MovieGenresDTO> genreDTO = TDM.getGenreData(joject);
            for(MovieGenresDTO m : genreDTO){
                movieGenresRepo.save(m);
            }
            // 영화 참가 배우데이터만 추려서 DTO 저장
            List<CastDataDTO> castDataDTOS = TDM.getCastData(joject);
            for(CastDataDTO m : castDataDTOS){
                castDataRepo.save(m);
            }
            // 영화 참가 관계자 데이터만 추려서 crewData에 추가하기
            List<CrewDataDTO> crewDataDTOS = TDM.getCrewData(joject);
            for(CrewDataDTO m : crewDataDTOS){
                crewDataRepo.save(m);
            }
        }
        for(int i = 0 ; i < imageData.size() ; i++){
            MovieImagesDTO imagesDTO = new MovieImagesDTO();
            JSONObject image = (JSONObject)imageData.get(i) ;
            imagesDTO.setMovieCd(Long.valueOf((Integer)image.get("movieCd")));
            imagesDTO.setBackdropPath((String) image.get("backdropPath"));

            movieImagesRepo.save(imagesDTO);

        }






        Collections.sort(actorSearchDataList, Comparator.comparing(MovieDetailsDTO::getRelease_date).reversed());
        return actorSearchDataList;
    }
}
