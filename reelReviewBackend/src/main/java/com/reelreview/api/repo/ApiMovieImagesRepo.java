package com.reelreview.api.repo;

import com.reelreview.api.domain.MovieImagesDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiMovieImagesRepo extends JpaRepository<MovieImagesDTO,Long> {
}
