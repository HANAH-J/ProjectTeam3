package com.reelreview.api.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name= "tbl_movieGenre")
public class MovieGenresDTO {

    @Id
    private Integer imageCd;
    private Integer movieCd;
    private String movieImage;
}
