package com.reelreview.service;

import com.reelreview.api.domain.MovieImagesDTO;
import com.reelreview.api.repo.ApiMovieImagesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailService {
    @Autowired
    private ApiMovieImagesRepo MIR;
    public List<MovieImagesDTO> findByMovieCd(Long movieId) {
        List<MovieImagesDTO> m = MIR.findByMovieCd(movieId);
        System.out.println("Service : "+m);
        return m;
    }
}
