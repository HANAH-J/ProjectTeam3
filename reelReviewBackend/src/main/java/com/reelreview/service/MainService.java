package com.reelreview.Service;

import com.reelreview.api.repo.ApiMovieDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {
    @Autowired
    private ApiMovieDetailRepo mdetail;
    public String getBoxOfficeToday() {
//            mdetail.getById();
        return null;
    }
}
