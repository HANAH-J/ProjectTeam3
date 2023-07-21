package com.reelreview.api.repo;

import com.reelreview.api.domain.MovieDetailsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ApiMovieDetailRepo extends JpaRepository<MovieDetailsDTO,Integer> {

    @Query("SELECT m FROM MovieDetailsDTO m WHERE m.rank IN :ranks ORDER BY m.rank ASC")
    List<MovieDetailsDTO> findByRankIn(@Param("ranks") List<Integer> ranks);

    @Query("SELECT m FROM MovieDetailsDTO m WHERE m.movieId IN :simularMovieCd")
    List<MovieDetailsDTO> findByMovieIdIn(@Param("simularMovieCd") List<Integer> simularMovieCd);
}
