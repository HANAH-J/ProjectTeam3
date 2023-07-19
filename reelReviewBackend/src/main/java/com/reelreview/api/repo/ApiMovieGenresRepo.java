package com.reelreview.api.repo;

import com.reelreview.api.domain.MovieGenresDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApiMovieGenresRepo extends JpaRepository<MovieGenresDTO,Long> {

    List<MovieGenresDTO> findByGenreName(String genre);
}
