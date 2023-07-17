package com.reelreview.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity                     // 해당 클래스를 Entity 클래스로 사용
@Table(name = "tbl_user")   // 데이터베이스에 해당 테이블과 현재 클래스를 매핑
public class UserEntity {
    @Id // PRIMARY KEY
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "USER_SEQ", allocationSize = 1)
    private int userCd;
    private String username;
    private String userEmail;
    private String userPassword;
    private String role; // ROLE_USER, ROLE_ADMIN
    private String provider;
    private String providerCd;
    @CreationTimestamp
    private Timestamp createDate;

//    @Builder
//    public UserDomain(String username, String userPassword, String userEmail, String role, String provider, String providerCd, Timestamp createDate) {
//        this.username = username;
//        this.userPassword = userPassword;
//        this.userEmail = userEmail;
//        this.role = role;
//        this.provider = provider;
//        this.providerCd = providerCd;
//        this.createDate = createDate;
//    }

    public UserEntity(SignUpDto dto) {
        this.username = dto.getUsername();
        this.userPassword = dto.getUserPassword();
        this.userEmail = dto.getUserEmail();
        this.role = dto.getRole();
        this.provider = dto.getProvider();
        this.providerCd = dto.getProviderCd();
        this.createDate = dto.getCreateDate();
    }
}
