package com.reelreview.api.repo;

import com.reelreview.api.domain.MovieDetailsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ApiMovieDetailRepo extends JpaRepository<MovieDetailsDTO,Integer> {

    List<MovieDetailsDTO> findByRankIn(List<Integer> ranks);
}
