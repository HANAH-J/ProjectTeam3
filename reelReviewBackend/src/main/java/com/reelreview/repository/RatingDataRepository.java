package com.reelreview.repository;

import com.reelreview.domain.RatingDataDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingDataRepository extends JpaRepository<RatingDataDto,String> {
}
