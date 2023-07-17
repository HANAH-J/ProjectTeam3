package com.reelreview.domain.user;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {

    private int userCd;
    private String username;
    private String userEmail;
    private String userPassword;
    private String role; // ROLE_USER, ROLE_ADMIN
    private String provider;
    private String providerCd;
    @CreationTimestamp
    private Timestamp createDate;

    public SignUpDto(String userEmail, String username, String userPassword, String role, String provider, String providerCd, Timestamp createDate) {
        this.username = username;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.role = role;
        this.provider = provider;
        this.providerCd = providerCd;
        this.createDate = createDate;
    }
}