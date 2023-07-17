package com.reelreview.service;

import com.reelreview.config.oauth.provider.TokenProvider;
import com.reelreview.domain.user.*;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseDto<?> signUp(SignUpDto dto) {
        String userEmail = dto.getUserEmail();
        String userPassword = dto.getUserPassword();

        // userEmail 중복 확인
        try {
            if(userRepository.existsByUserEmail(userEmail)) {
                return ResponseDto.setFail("Existed Email");
            }
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userPassword);
        userEntity.setUserPassword(encodedPassword);

        // UserRepository 이용, 데이터베이스에 UserDomain 저장
        try {
            userEntity.setRole("ROLE_USER");
            userRepository.save(userEntity);
        } catch (Exception error) {
            return ResponseDto.setFail("Database Error");
        }
        
        // 성공 시 success response 반환
        return ResponseDto.setSuccess("SignUp Success", null);
    }

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

        String token = tokenProvider.create(userEmail);
        int exprTime = 3600000;

        SignInResponseDto signInResponseDto = new SignInResponseDto(token, exprTime, userEntity);
        return ResponseDto.setSuccess("Sign In Success", signInResponseDto);
    }
}
