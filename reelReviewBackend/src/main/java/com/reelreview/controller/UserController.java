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

    // [회원가입]
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        ResponseDto<?> result = userService.signUp(requestBody);
        return result;
    }

    // [이메일 중복 검사]
    @PostMapping("/emailCheck")
    public boolean emailCheck(@RequestBody EmailCheckDto requestBody) {
        boolean result = userService.emailCheck(requestBody);
        System.out.println(result);
        return result;
    }

    // [일반 로그인]
    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody) {
        ResponseDto<SignInResponseDto> result = userService.signIn(requestBody);
        return result;
    }

    // [소셜 로그인]
//    @GetMapping("/oauth/signIn")
//    public void oAuthSignIn(@RequestParam String provider, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        System.out.println(provider);
//        if (provider.equals("google")) {
//            System.out.println("통과 확인");
//            // 구글 로그인 요청을 처리하기 위해 리다이렉트
//            response.sendRedirect("http://localhost:8085/oauth2/authorization/google");
//        }
//    }

//    // 구글 로그인 이후 리다이렉트되는 엔드포인트
//    @GetMapping("/oauth/callback")
//    public String oAuthCallback(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        // 인증 코드를 받아와서 JWT 토큰 생성
//        String jwtToken = jwtTokenProvider.create(code);
//
//        // JWT 토큰을 리액트로 전송하거나 필요한 작업을 수행할 수 있습니다.
//        // 여기서는 단순히 "OAuth 세션 정보 확인하기"라는 문자열을 반환하도록 하겠습니다.
//        return jwtToken;
//    }

    // [임시 비밀번호]
    @PostMapping("/resetPw/sendEmail")
    public String sendEmail(@RequestBody EmailCheckDto requestBody) {
        MailDto dto = userService.createTempPassword(requestBody.getUserEmail());
        userService.sendMail(dto);
        return "";
    }

    // [회원탈퇴]
    @PostMapping("/signOutForever")
    public String signOutForever(@RequestBody EmailCheckDto requestBody) {
        String userEmail = String.valueOf(requestBody.getUserEmail());
        System.out.println("탈퇴 메일 : " + userEmail);
        userService.updateDeleteDate(userEmail);
        return "";
    }
}