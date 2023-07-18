package com.reelreview.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
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

    @Pattern(regexp = "^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$")
    // 이름 유효성 검사 로직
    // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글 (한글 초성 및 모음은 불가)
    private String username;

    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$")
    // 이메일 유효성 검사 로직
    // 이메일 : ex) 'hana@gmail.com' 형식
    private String userEmail;

    private String userPassword;

    @Column(columnDefinition = "VARCHAR2(10 CHAR) DEFAULT 'ROLE_USER'")
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
