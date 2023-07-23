package com.reelreview.repository;

import com.reelreview.domain.WantToSeeDataDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WantToSeeDataRepository extends JpaRepository<WantToSeeDataDto,String> {
}
