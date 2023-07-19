package com.reelreview.config.oauth;

import com.reelreview.config.jwt.JwtTokenProvider;
import com.reelreview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private static final String TOKEN = "token";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String REDIRECT_URL = "http://localhost:3000/login-success";

    private final UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // JWT 토큰 생성
        String token = jwtTokenProvider.create(authentication);
        System.out.println("소셜 로그인 성공! jwt 토큰 리액트로 전송! : " + token);

        // JWT 토큰을 헤더에 포함하여 클라이언트에게 전달
        response.setHeader("Authorization", "Bearer " + token);

        // 로그인 성공 후 클라이언트로 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL);
    }
}
