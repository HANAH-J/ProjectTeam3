package com.reelreview.config.oauth;

import com.reelreview.config.oauth.provider.TokenProvider;
import com.reelreview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    private static final String REDIRECT_URL = "http://localhost:3000/login/redirect?accessTpl=dsaf";

    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, IOException {
//        TokenMapping tokenMapping = saveUser(authentication);

        getRedirectStrategy().sendRedirect(request, response, REDIRECT_URL);
    }

//    private TokenMapping saveUser(Authentication authentication) {
//        CustomUser customUser = (CustomUser) authentication.getPrincipal();
//        String email = customUser.getEmail();
//        TokenProvider token = jwtService.create(email);
//
//        userRepository.findUserByEmail(email).get()
//                .updateRefreshToken(token.getRefreshToken());
//        return token;
//    }

//    private String getRedirectUrl(TokenMapping token) {
//        return UriComponentsBuilder.fromUriString(REDIRECT_URL) accessToken=eyqfdsfasdf.sadfsadf.asdfsadf
//                .queryParam(TOKEN, token.getAccessToken())
//                .queryParam(REFRESH_TOKEN, token.getRefreshToken())
//                .build().toUriString();
//    }
}
