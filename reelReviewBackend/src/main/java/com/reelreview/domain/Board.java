package com.reelreview.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "tbl_boards")
public class Board {

    @Id
    @Column(name = "bno", columnDefinition = "NUMBER") // 데이터 형식을 숫자형으로 변경
    private Long bno;

    @Column(name = "title", columnDefinition = "VARCHAR2(255)") // 데이터 형식을 적절한 크기의 문자열로 변경
    private String title;

    @Column(name = "writer", columnDefinition = "VARCHAR2(255)") // 데이터 형식을 적절한 크기의 문자열로 변경
    private String writer;

    @Column(name = "content", columnDefinition = "VARCHAR2(255)") // 데이터 형식을 CLOB로 변경 (대용량 문자열)
    private String content;




    public Long getBno() {
        return bno;
    }
    public void setBno(Long bno) {
        this.bno = bno;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getWriter() {
        return writer;
    }
    public void setWriter(String writer) {
        this.writer = writer;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }


}
