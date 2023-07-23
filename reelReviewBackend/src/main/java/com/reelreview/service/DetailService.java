package com.reelreview.service;

import com.reelreview.api.domain.MovieDetailsDTO;
import com.reelreview.api.domain.MovieGenresDTO;
import com.reelreview.api.domain.MovieImagesDTO;
import com.reelreview.api.domain.MovieVideosDTO;
import com.reelreview.api.repo.ApiMovieDetailRepo;
import com.reelreview.api.repo.ApiMovieGenresRepo;
import com.reelreview.api.repo.ApiMovieImagesRepo;
import com.reelreview.api.repo.ApiMovieVideosRepo;
import com.reelreview.domain.CastDataDTO;
import com.reelreview.domain.CrewDataDTO;
import com.reelreview.domain.RatingDataDto;
import com.reelreview.domain.WantToSeeDataDto;
import com.reelreview.repository.CastDataRepository;
import com.reelreview.repository.CrewDataRepository;
import com.reelreview.repository.RatingDataRepository;
import com.reelreview.repository.WantToSeeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailService {
    @Autowired
    private ApiMovieImagesRepo MIR;
    @Autowired
    private CrewDataRepository CrewDR;
    @Autowired
    private CastDataRepository CastDR;
    @Autowired
    private ApiMovieVideosRepo MVR;
    @Autowired
    private ApiMovieGenresRepo MGR;
    @Autowired
    private ApiMovieDetailRepo MDR;
    @Autowired
    private RatingDataRepository RDR;
    @Autowired
    private WantToSeeDataRepository WDR;
    public List<MovieImagesDTO> findImagesByMovieCd(Long movieId) {
        List<MovieImagesDTO> m = MIR.findByMovieCd(movieId);
        System.out.println("Service : "+m);
        return m;
    }

    public List<CrewDataDTO> findCrewDataByMovieCd(Long movieCd) {
        List<CrewDataDTO> m = CrewDR.findByMovieCd(movieCd);
        return m;
    }

    public List<CastDataDTO> findCastDataByMoiveCd(Long movieCd) {
        List<CastDataDTO> m = CastDR.findByMovieCd(movieCd);
        return m;
    }

    public List<MovieVideosDTO> findVideosByMovieCd(Long movieCd) {
        List<MovieVideosDTO> m = MVR.findByMovieCd(movieCd);
        return m;
    }

    public List<MovieGenresDTO> findGenresByMovieCd(Long movieCd) {
        List<MovieGenresDTO> m = MGR.findByMovieCd(movieCd);
        return m;
    }

    public List<Integer> findMoviesByGenres(List<Integer> genres) {
        List<Integer> moviecodes = MGR.findByGenreIn(genres);
        return moviecodes;
    }

    public List<MovieDetailsDTO> findMoviesBymovieCd(List<Integer> simularMovieCd) {
        List<MovieDetailsDTO> movies = MDR.findByMovieIdIn(simularMovieCd);
        return movies;
    }

    public int saveRating(double rate, int userCd, int movieId) {
        RatingDataDto r = new RatingDataDto();
        int dataSaved = 0;
        r.setMovieId(movieId);
        r.setRate(rate);
        r.setUserCd(userCd);
        r.setRatingId(userCd,movieId);
        RatingDataDto a = RDR.save(r);
        if(a!=null){
            dataSaved = 1;
        }
        return dataSaved;
    }

    public int saveWantToSee(int userCd, int movieId) {
        int dataSaved = 0;
        WantToSeeDataDto m = new WantToSeeDataDto();
        m.setMovieId(movieId);
        m.setUserCd(userCd);
        m.setWantToSeeId(userCd,movieId);
        WantToSeeDataDto a  = WDR.save(m);
        if(a!=null){
            dataSaved = 1;
        }
        return dataSaved;
    }

    public int saveWantToSeeOut(int userCd, int movieId) {
        int dataSaved = 0;
        String m = String.valueOf(userCd)+" "+String.valueOf(movieId);
        WDR.deleteById(m);
        return dataSaved;
    }
}
