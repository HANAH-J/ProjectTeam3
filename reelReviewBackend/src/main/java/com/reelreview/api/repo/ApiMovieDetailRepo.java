package com.reelreview.api.repo;

import com.reelreview.api.domain.MovieDetailsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiMovieDetailRepo extends JpaRepository<MovieDetailsDTO,Long> {

}
