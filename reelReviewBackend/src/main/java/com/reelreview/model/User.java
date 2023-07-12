package com.reelreview.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "member")
public class User {
    @Id // PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    @SequenceGenerator(name = "member_seq", sequenceName = "MEMBER_SEQ", allocationSize = 1)
    private int id;
    private String username;
    private String password;
    private String email;
    private String role; // ROLE_USER, ROLE_ADMIN

    private String provider;
    private String providerId;
    @CreationTimestamp
    private Timestamp createDate;
}
