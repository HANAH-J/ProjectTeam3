package com.reelreview.repository;

import com.reelreview.domain.PeopleDataDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PeopleDataRepository extends JpaRepository<PeopleDataDTO,Long> {
    List<PeopleDataDTO> findPeopleDataDTOByPeopleName(String name);
}
