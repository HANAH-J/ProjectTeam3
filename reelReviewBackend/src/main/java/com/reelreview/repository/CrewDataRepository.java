package com.reelreview.repository;

import com.reelreview.domain.CrewDataDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewDataRepository extends JpaRepository<CrewDataDTO,String> {
}
