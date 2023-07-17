package com.reelreview.controller;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.domain.user.ResponseDto;
import com.reelreview.domain.user.SignInDto;
import com.reelreview.domain.user.SignInResponseDto;
import com.reelreview.domain.user.SignUpDto;
import com.reelreview.repository.UserRepository;
import com.reelreview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController // 해당 클래스를 Controller(+ ResponseBody)로 인식
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    UserService userService;

    // 회원가입 기능
    @PostMapping("/signUp")
    public ResponseDto<?> signUp(@RequestBody SignUpDto requestBody) {
        ResponseDto<?> result = userService.signUp(requestBody);
        return result;
    }

    @PostMapping("/signIn")
    public ResponseDto<SignInResponseDto> signIn(@RequestBody SignInDto requestBody) {
        ResponseDto<SignInResponseDto> result = userService.signIn(requestBody);
        return result;
    }

    // 로그인
//    @PostMapping("/test/signIn")
//    public String signIn(@RequestBody SignUpDto signUpDto, Authentication authentication,
//                         @AuthenticationPrincipal PrincipalDetails userDetails) { // DI(의존성 주입)
//        System.out.println("/test/signIn ==============================");
//        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
//        System.out.println("authentication : " + principalDetails.getUser());
//
////        System.out.println("userDetails : " + userDetails.getUser());
//        return "세션 정보 확인하기";
//    }

    // 소셜 로그인
    @PostMapping("/test/oauth/signIn")
    public @ResponseBody String oAuthSignIn(
            Authentication authentication,
            @AuthenticationPrincipal OAuth2User oauth) { // DI(의존성 주입)
        System.out.println("/test/oauth/signIn ==============================");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("authentication : " + oAuth2User.getAttributes());
        System.out.println("oauth2User : " + oauth.getAttributes());
        return "OAuth 세션 정보 확인하기";
    }

    @GetMapping({"", "/"})
    public String index() {
        return "index"; // src/main/resources/templates/index
    }

    // OAuth 로그인 : PrincipalDetails
    // 일반 로그인 : PrincipalDetails
    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails : " + principalDetails.getUser());
        return "user";
    }

    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "admin";
    }

    // 스프링 시큐리티에서 해당 주소를 가로챈다. - SecurityConfig 파일 생성 후 작동X
    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/info")
    public @ResponseBody String info() {
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping("/data")
    public @ResponseBody String data() {
        return "데이터정보";
    }
}