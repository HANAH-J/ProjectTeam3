package com.reelreview.service;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.config.oauth.provider.TokenProvider;
import com.reelreview.config.jwt.JwtTokenProvider;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.*;
import com.reelreview.repository.ProfileRepository;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    // (J)
    @Autowired
    private ProfileRepository profileRepository;

    // 회원가입
//    public void signUp(SignUpDto signUpDto) throws Exception {
//
//        if (userRepository.findByuserEmail(signUpDto.getUserEmail()).isPresent()) {
//            throw new Exception("이미 존재하는 이메일입니다.");
//        }
//
//        if (userRepository.findByusername(signUpDto.getUsername()).isPresent()) {
//            throw new Exception("이미 존재하는 닉네임입니다.");
//        }
//
//        UserEntity userEntity = UserEntity.builder()
//                .username(signUpDto.getUsername())
//                .userEmail(signUpDto.getUserEmail())
//                .userPassword(signUpDto.getUserPassword())
//                .role(String.valueOf(Role.USER))
//                .build();
//
//        userEntity.passwordEncode(passwordEncoder);
//        userRepository.save(userEntity);
//    }

    public ResponseDto<?> signUp(SignUpDto dto) {
        String username = dto.getUsername();
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        // Null 검사
        if (StringUtils.isBlank(username)) {
            return ResponseDto.setFail("Username cannot be empty");
        }

        if (StringUtils.isBlank(userEmail)) {
            return ResponseDto.setFail("Email cannot be empty");
        }

        if (StringUtils.isBlank(userPassword)) {
            return ResponseDto.setFail("Password cannot be empty");
        }

        // 이메일 중복 검사
        try {
            if(userRepository.existsByUserEmail(userEmail)) {
                return ResponseDto.setFail("Existed Email");
            }
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }

        // 비밀번호 유효성 검사 로직
        // 비밀번호 : 영문, 숫자, 특수문자 중 2개 이상을 조합하여 최소 10자리 이상
        if (!userPassword.matches("^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\\d~!@#$%^&*()_+=]{10,}$")) {
            return ResponseDto.setFail("Invalid Password");
        }

        // UserEntity 생성
        dto.setRole("ROLE_USER");
        UserEntity userEntity = new UserEntity(dto);

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userPassword);
        userEntity.setUserPassword(encodedPassword);






        // ProfileDTO 생성(J)
        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setUserCd(userEntity);




        // UserRepository 이용, 데이터베이스에 UserEntity 저장
        try {
            userRepository.save(userEntity);
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }




        // ProfileRepository 이용, 데이터베이스에 ProfileDTO 저장 (J)
        try {
            profileRepository.save(profileDTO);
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }



        // 성공 시 success response 반환
        return ResponseDto.setSuccess("SignUp Success", null);
    }

    // 로그인
    public ResponseDto<SignInResponseDto> signIn(SignInDto dto) {
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByUserEmail(userEmail);

            // 잘못된 이메일
            if(userEntity == null) {
                return ResponseDto.setFail("Sign In Failed");
            }
            // 잘못된 비밀번호
            if(!passwordEncoder.matches(userPassword, userEntity.getUserPassword())) {
                return ResponseDto.setFail("Sign In Failed");
            }
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }

        userEntity.setUserPassword("");

        Authentication authentication = new UsernamePasswordAuthenticationToken(new PrincipalDetails(userEntity), null, null);

        String token = jwtTokenProvider.create(authentication);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);
        return ResponseDto.setSuccess("Sign In Success", signInResponseDto);
    }

    // 이메일 중복 검사
    public boolean emailCheck(EmailCheckDto dto) {
        String userEmail = dto.getUserEmail();
        try {
            if(userRepository.existsByUserEmail(userEmail)) {
                System.out.println("이메일 중복 : 중복");
                return false;
            }
        } catch (Exception error) {
            ResponseDto.setFail("Database Error");
        }
        System.out.println("이메일 중복 : 통과");
        return true;
    }





    // userCd를 통해 userEntity 조회 (J)
    public UserEntity getUserByUserCd(int userCd) {
        return userRepository.findByUserCd(userCd);
    }

}
