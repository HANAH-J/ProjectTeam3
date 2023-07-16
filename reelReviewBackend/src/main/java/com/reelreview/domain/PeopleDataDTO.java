package com.reelreview.domain;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Data
@Entity
@Table(name = "tbl_peopleData")
public class PeopleDataDTO {
    @Id
    private Long peopleCd;
    private String peopleName;
}
