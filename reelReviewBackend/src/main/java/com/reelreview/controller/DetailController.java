package com.reelreview.controller;

import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieGenresDTO;
import com.reelreview.api.domain.MovieImagesDTO;

import com.reelreview.api.domain.MovieVideosDTO;
import com.reelreview.api.repo.ApiMovieImagesRepo;
import com.reelreview.config.jwt.JwtTokenProvider;
import com.reelreview.domain.*;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.service.DetailService;
import com.reelreview.service.ProfileService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DetailController {

    @Autowired
    private DetailService DS;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @RequestMapping("api/getMovieImages")
    public List<MovieImagesDTO> getMovieImages(@RequestParam("movieId") int movieId){
        Long movieCd = Long.valueOf(movieId);
        List<MovieImagesDTO> movieImages = DS.findImagesByMovieCd(movieCd);
        return movieImages;
    }
    @RequestMapping("api/getMovieFulldata")
    public JSONObject getMovieFulldata(@RequestParam("movieId") int movieId){
        JSONObject fulldata = new JSONObject();
        Long movieCd = Long.valueOf(movieId);
        List<MovieImagesDTO> movieImages = DS.findImagesByMovieCd(movieCd);
        List<CrewDataDTO> movieCrews = DS.findCrewDataByMovieCd(movieCd);
        List<CastDataDTO> movieCasts = DS.findCastDataByMoiveCd(movieCd);
        List<MovieVideosDTO> movieVideos = DS.findVideosByMovieCd(movieCd);
        List<MovieGenresDTO> movieGenres = DS.findGenresByMovieCd(movieCd);
        List<Integer> genres = new ArrayList<>();
        for(MovieGenresDTO genre:movieGenres){
            genres.add(genre.getGenreId());
        }
        List<Integer> simularMovieCd = DS.findMoviesByGenres(genres);
        List<MovieDetailsDTO> simularMovieDetails = DS.findMoviesBymovieCd(simularMovieCd);
        List<CommentDataDto> comments = DS.findCommentsByMovieCd(movieId);
        fulldata.put("movieImages",movieImages);
        fulldata.put("movieCrews",movieCrews);
        fulldata.put("movieCasts",movieCasts);
        fulldata.put("movieVideos",movieVideos);
        fulldata.put("simularMovieDetails",simularMovieDetails);
        fulldata.put("comments",comments);
        System.out.println(movieCasts);
        System.out.println(movieCrews);
        System.out.println(movieImages);
        System.out.println(movieVideos);
        System.out.println(simularMovieDetails);
        return fulldata;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping("details/setRating")
    public String setUserRating(HttpServletRequest request, @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader;
        double rate = Double.parseDouble(request.getParameter("rate"));
        int movieId = Integer.parseInt(request.getParameter("movieId"));
        System.out.println(token);

        if (token != null && token.startsWith("Bearer ")) { // 토큰 형식 검사
            token = token.substring(7);
        } else {
            String errorResponse = "유효하지 않은 토큰 형식1";
            return errorResponse;
        }

        // 토큰 유효성 검사 ... 만료된 토큰이거나, 서명 키가 일치하지 않는 토큰
        String userEmail = jwtTokenProvider.validate(token);
        if (userEmail == null) {
            String errorResponse = "유효하지 않은 토큰 형식2";
            return errorResponse;
        }

        UserEntity userEntity = profileService.getCurrentUserDetails();

        if(userEntity == null) {
            String errorResponse = "유효하지 않은 토큰 형식3";
            return errorResponse;
        }
        int userCd = userEntity.getUserCd();
        int saved = 0;
        saved = DS.saveRating(rate,userCd,movieId);
        if(saved == 1){
            return "저장완료";
        }else{
            String errorResponse = "저장 실패";
            return errorResponse;
        }
    }


    @PreAuthorize("isAuthenticated()")
    @RequestMapping("details/wantToSee")
    public String setUserWantToSee(HttpServletRequest request, @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader;
        int movieId = Integer.parseInt(request.getParameter("movieId"));
        if (token != null && token.startsWith("Bearer ")) { // 토큰 형식 검사
            token = token.substring(7);
        } else {
            String errorResponse = "유효하지 않은 토큰 형식1";
            return errorResponse;
        }
        // 토큰 유효성 검사 ... 만료된 토큰이거나, 서명 키가 일치하지 않는 토큰
        String userEmail = jwtTokenProvider.validate(token);
        if (userEmail == null) {
            String errorResponse = "유효하지 않은 토큰 형식2";
            return errorResponse;
        }
        UserEntity userEntity = profileService.getCurrentUserDetails();
        if(userEntity == null) {
            String errorResponse = "유효하지 않은 토큰 형식3";
            return errorResponse;
        }
        int userCd = userEntity.getUserCd();
        int saved = 0;
        saved = DS.saveWantToSee(userCd,movieId);
        if(saved == 1){
            return "저장완료";
        }else{
            String errorResponse = "저장 실패";
            return errorResponse;
        }
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping("details/wantToSeeOut")
    public String setUserWantToSeeOut(HttpServletRequest request, @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader;
        int movieId = Integer.parseInt(request.getParameter("movieId"));

        if (token != null && token.startsWith("Bearer ")) { // 토큰 형식 검사
            token = token.substring(7);
        } else {
            String errorResponse = "유효하지 않은 토큰 형식1";
            return errorResponse;
        }

        // 토큰 유효성 검사 ... 만료된 토큰이거나, 서명 키가 일치하지 않는 토큰
        String userEmail = jwtTokenProvider.validate(token);
        if (userEmail == null) {
            String errorResponse = "유효하지 않은 토큰 형식2";
            return errorResponse;
        }

        UserEntity userEntity = profileService.getCurrentUserDetails();

        if(userEntity == null) {
            String errorResponse = "유효하지 않은 토큰 형식3";
            return errorResponse;
        }
        int userCd = userEntity.getUserCd();
        int saved = 0;
        saved = DS.saveWantToSeeOut(userCd,movieId);
        if(saved == 1){
            return "저장완료";
        }else{
            String errorResponse = "저장 실패";
            return errorResponse;
        }
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping("details/commentSave")
    public String commentSave(HttpServletRequest request, @RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader;
        int movieId = Integer.parseInt(request.getParameter("movieId"));

        if (token != null && token.startsWith("Bearer ")) { // 토큰 형식 검사
            token = token.substring(7);
        } else {
            String errorResponse = "유효하지 않은 토큰 형식1";
            return errorResponse;
        }

        // 토큰 유효성 검사 ... 만료된 토큰이거나, 서명 키가 일치하지 않는 토큰
        String userEmail = jwtTokenProvider.validate(token);
        if (userEmail == null) {
            String errorResponse = "유효하지 않은 토큰 형식2";
            return errorResponse;
        }

        UserEntity userEntity = profileService.getCurrentUserDetails();

        if(userEntity == null) {
            String errorResponse = "유효하지 않은 토큰 형식3";
            return errorResponse;
        }
        int userCd = userEntity.getUserCd();

        CommentDataDto dto = new CommentDataDto();

        LocalDate l = LocalDate.now();
        String now = l.toString();
        dto.setCommentDate(now);
        dto.setCommentContent(request.getParameter("commentContent"));
        dto.setUserCd(userCd);
        dto.setMovieId(movieId);


        String result = DS.saveCommentData(dto);

        return result;
    }

    @RequestMapping("details/commentGetUser")
    public CommentUserDTO getCommentUser(@RequestParam("userCd") int userCd){
        UserEntity user = DS.findUserByUserCd(userCd);
        ProfileDTO profile = DS.findProfileByUserCd(userCd);

        CommentUserDTO cud = new CommentUserDTO();
        cud.setUserName(user.getUsername());
        cud.setPFImage(profile.getPfImage());

        return cud;
    }
}
