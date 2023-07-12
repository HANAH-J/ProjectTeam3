package com.reelreview.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Getter
@Setter
@Table(name="tbl_boards")
public class MainDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bno;
    private String title;
    private String writer;
    private String content;

    @CreationTimestamp
    private Timestamp regdate;





}
