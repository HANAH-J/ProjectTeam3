
package com.reelreview.domain;

import com.reelreview.domain.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "profile")
@Table(name = "profile")
public class ProfileDTO implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_seq")
    @SequenceGenerator(name = "profile_seq", sequenceName = "PROFILE_SEQ", allocationSize = 1)
    private int profileDetailNum;

    @OneToOne
    @JoinColumn(name = "userCd", referencedColumnName = "userCd")
    private UserEntity userCd;

    private String status = "프로필이 없습니다.";
    private String bgImage = "defaultBgImage";
    private String pfImage = "defaultPfImage";
}
