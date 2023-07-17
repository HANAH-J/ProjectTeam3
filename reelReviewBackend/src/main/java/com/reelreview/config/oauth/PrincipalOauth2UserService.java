package com.reelreview.config.oauth;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.config.oauth.provider.GoogleUserInfo;
import com.reelreview.config.oauth.provider.NaverUserInfo;
import com.reelreview.config.oauth.provider.OAuth2UserInfo;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    @Lazy
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    @Lazy
    private UserRepository userRepository;

    // 구글로부터 받은 userRequest 데이터에 대한 후처리가 진행되는 함수
    // 함수 종료 시 @AuthenticationPrincipal 어노테이션이 만들어진다.
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // registrationId로 어떤 OAuth로 로그인했는지 확인 가능
        System.out.println("getClientRegistration : " + userRequest.getClientRegistration());
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser((userRequest));
        // 구글 로그인 버튼 클릭 -> 구글 로그인 창 -> 로그인 완료 -> code 리턴(OAuth-Client 라이브러리) -> AccessToken 요청
        // userRequest 정보 -> loadUser 함수 호출 -> 구글로부터 회원 프로필 수신
        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 회원가입 강제 진행
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
//        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")){
//            System.out.println("카카오 로그인 요청");
//            oAuth2UserInfo = new KakaoUserInfo((Map)oAuth2User.getAttributes().get("kakao_account"));
        } else {
            System.out.println("우리는 구글과 네이버만 지원합니다!");
        }
        String provider = oAuth2UserInfo.getProvider();
        String providerCd = oAuth2UserInfo.getProviderCd();
        String username = provider + "_" + providerCd; // google_sub
        String userPassword = bCryptPasswordEncoder.encode("겟인데어");
        String userEmail = oAuth2UserInfo.getUserEmail();
        String role = "ROLE_USER";

        UserEntity userEntity = userRepository.findByUsername(username);

        if (userEntity == null) {
            System.out.println("OAuth 로그인이 최초입니다.");
            userEntity = UserEntity.builder()
                    .username(username)
                    .userPassword(userPassword)
                    .userEmail(userEmail)
                    .role(role)
                    .provider(provider)
                    .providerCd(providerCd)
                    .build();
            userRepository.save(userEntity);
        } else {
            System.out.println("로그인을 이미 한 적이 있습니다. 당신은 자동 회원가입이 되어 있습니다.");
        }

        // 회원가입을 강제로 진행
        return new PrincipalDetails(userEntity, oAuth2User.getAttributes());
    }
}