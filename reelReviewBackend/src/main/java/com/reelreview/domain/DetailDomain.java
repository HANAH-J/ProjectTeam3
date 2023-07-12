package com.reelreview.Domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
public class DetailDomain {
    @Entity
    public class movieDetail{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
         private Integer movieCd;
        @Column(length = 1000)
         private String movieNm;
        @Column(length = 1000)
         private String movieNmEn;
        @Column(length = 1000)
         private Integer showTm;
        @Column
         private Date openDt;
         private Long overview;
         private Double vote_average;
         private Integer vote_count;
         private String poster_path;
         private String watchGradeNm;
         private Integer ourVoteAvg;
         private Integer ourVoteCount;
    }

    public class commentDetail{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer commentCd;
        private Integer movieCd;
        private Integer userCd;
        private String commentContents;
        private Date commentDate;
        private Integer commentGood;
    }
}
