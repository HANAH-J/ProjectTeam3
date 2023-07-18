package com.reelreview.config.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;

//@Component
//@RequiredArgsConstructor
//public class OAuth2Authentication extends SimpleUrlAuthenticationSuccessHandler {
//    private static final String TOKEN = "token";
//    private static final String REFRESH_TOKEN = "refreshToken";
//    private static final String REDIRECT_URL = "http://localhost:3000/login/redirect";
//
////    private final JwtService jwtService;
////    private final UserRepository userRepository;
//
//    @Override
//    @Transactional
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        TokenMapping tokenMapping = saveUser(authentication);
//        getRedirectStrategy().sendRedirect(request, response, getRedirectUrl(tokenMapping));
//    }
//
//    private TokenMapping saveUser(Authentication authentication) {
//        CustomUser customUser = (CustomUser) authentication.getPrincipal();
//        String email = customUser.getEmail();
//        TokenMapping token = jwtService.createToken(email);
//
//        userRepository.findUserByEmail(email).get()
//                .updateRefreshToken(token.getRefreshToken());
//        return token;
//    }
//
//    private String getRedirectUrl(TokenMapping token) {
//        return UriComponentsBuilder.fromUriString(REDIRECT_URL)
//                .queryParam(TOKEN, token.getAccessToken())
//                .queryParam(REFRESH_TOKEN, token.getRefreshToken())
//                .build().toUriString();
//    }
//}
