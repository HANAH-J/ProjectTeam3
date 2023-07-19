package com.reelreview.controller;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.config.oauth.provider.TokenProvider;
import com.reelreview.domain.user.*;
import com.reelreview.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController // 해당 클래스를 Controller(+ ResponseBody)로 인식
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Autowired
    private TokenProvider tokenProvider;

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
    @PostMapping("/oauth/signIn")
    public @ResponseBody String oAuthSignIn(Authentication authentication) { // DI(의존성 주입)
//        System.out.println("/api/oauth/signIn ==============================");
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        System.out.println("authentication : " + oAuth2User.getAttributes());
//        System.out.println("oauth2User : " + oauth.getAttributes());
//        return "OAuth 세션 정보 확인하기";

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String userEmail = principalDetails.getUserEntity().getUserEmail();

        // JWT 토큰 생성
        String jwtToken = tokenProvider.create(authentication);

        // 여기서 원하는 로직을 추가하여 필요한 정보를 처리하고 응답을 반환할 수 있습니다.
        // 예를 들어, 토큰을 JSON 형태로 반환하거나 추가 정보를 포함한 객체를 반환할 수 있습니다.
        // 여기서는 단순히 "OAuth 세션 정보 확인하기"라는 문자열을 반환하도록 하겠습니다.
        return jwtToken;
    }

    // OAuth 로그인 : PrincipalDetails
    // 일반 로그인 : PrincipalDetails
    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails : " + principalDetails.getUserEntity());
        return "user";
    }
}