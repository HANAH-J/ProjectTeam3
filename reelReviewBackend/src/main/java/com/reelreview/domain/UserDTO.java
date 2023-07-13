package com.reelreview.domain;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "member")
public class UserDTO {
    @Id // PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    @SequenceGenerator(name = "member_seq", sequenceName = "MEMBER_SEQ", allocationSize = 1)
    private int userCd;
    private String username;
    private String userEmail;
    private String userPassword;
    private String role; // ROLE_USER, ROLE_ADMIN

    private String provider;
    private String providerId;
    @CreationTimestamp
    private Timestamp createDate;

    @Builder
    public UserDTO(String username, String userPassword, String userEmail, String role, String provider, String providerId, Timestamp createDate) {
        this.username = username;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.role = role;
        this.provider = provider;
        this.providerId = providerId;
        this.createDate = createDate;
    }
}
