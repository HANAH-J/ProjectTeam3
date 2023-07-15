package com.reelreview.api.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Data
@Table(name = "tbl_movieImage")
public class MovieImagesDTO {
    @Id
    private Long imageCd;
    private Long movieCd;
    private String posterPath;
    private String backdropPath;
}
