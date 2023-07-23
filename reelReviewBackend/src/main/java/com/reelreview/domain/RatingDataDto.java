package com.reelreview.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tbl_ratingData")
public class RatingDataDto {
    @Id
    private String ratingId;
    private int userCd;
    private double rate;
    private long movieId;

    public void setRatingId(int userCd, long movieId){
        this.ratingId = String.valueOf(userCd)+" "+String.valueOf(movieId);
    }
}
