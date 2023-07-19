package com.reelreview.controller;

import com.reelreview.config.jwt.JwtTokenProvider;
import com.reelreview.domain.user.*;
import com.reelreview.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController // 해당 클래스를 Controller(+ ResponseBody)로 인식
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 회원가입 기능
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        ResponseDto<?> result = userService.signUp(requestBody);
        return result;
    }

//    @PostMapping("/signUp")
//    public String signUp(@RequestBody SignUpDto signUpDto) throws Exception {
//        userService.signUp(signUpDto);
//        return "회원가입 성공";
//    }

    // 이메일 중복 검사
    @PostMapping("/emailCheck")
    public boolean emailCheck(@RequestBody EmailCheckDto requestBody) {
        boolean result = userService.emailCheck(requestBody);
        System.out.println(result);
        return result;
    }

    // 일반 로그인 기능
    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody) {
        ResponseDto<SignInResponseDto> result = userService.signIn(requestBody);
        return result;
    }
    
    // 소셜 로그인 기능
//    @GetMapping("/oauth/signIn")
//    public String oAuthSignIn(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // 구글 로그인 요청을 처리하기 위해 리다이렉트
//        response.sendRedirect("http://localhost:8085/oauth2/authorization/google");
//        return null;
//    }

    // 구글 로그인 이후 리다이렉트되는 엔드포인트
//    @GetMapping("/oauth/callback")
//    public String oAuthCallback(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // 인증 코드를 받아와서 JWT 토큰 생성
//        String jwtToken = jwtTokenProvider.create(code);
//
//        // JWT 토큰을 리액트로 전송하거나 필요한 작업을 수행할 수 있습니다.
//        // 여기서는 단순히 "OAuth 세션 정보 확인하기"라는 문자열을 반환하도록 하겠습니다.
//        return jwtToken;
//    }
}