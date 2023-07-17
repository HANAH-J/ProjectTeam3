package com.reelreview.config;

// 1. 코드받기(인증), 2. 액세스 토큰(권한),
// 3. 사용자 프로필 정보 가져오기,
// 4-1. 정보를 토대로 회원가입을 자동으로 진행시키기도 한다.
// 4-2. (이메일, 전화번호, 이름, 아이디) 쇼핑몰 -> (집주소), 백화점몰 -> (등급)

import com.reelreview.config.oauth.PrincipalOauth2UserService;
import com.reelreview.filter.JwtAuthenticationFilter;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
                            // secured 어노테이션 활성화, preAuthorize, postAuthorize 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Autowired
    private UserRepository userRepository;

    public SecurityConfig() throws Exception {
    }

    @Bean // 해당 메서드의 리턴되는 오브젝트를 IoC로 등록
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws  Exception {
        http.
                // cors 정책 : 현재는 Application에서 작업을 해두었으므로 기본 설정 사용
                cors().and()
                // csrf 대책 : 현재는 CSRF에 대한 대책을 비활성화
                .csrf().disable()
                // Basic 인증 : 현재는 Bearer token 인증방법을 사용하기 때문에 비활성화
                .httpBasic().disable()
                // 세션 기반 인증 : 현재는 Session 기반 인증을 사용하지 않기 때문에 비활성화
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                // '/', '/api/auth' 모듈에 대해서는 모두 허용 : 인증없이 사용가능
                .authorizeRequests().antMatchers("/", "/api/auth/**").permitAll()
                // 나머지 Request에 대해서는 모두 인증된 사용자만 사용가능하게 한다.
                .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


//        http.authorizeRequests()
//                .antMatchers("/user/**").authenticated() // 인증만 되면 들어갈 수 있는 주소
//                .antMatchers("/admin").access("hasRole('ROLE_ADMIN')")
//                .anyRequest().permitAll()
//        .and()
//                .formLogin()
////                .loginPage("/test/signIn")
////                .loginProcessingUrl("/test/signIn") // /signIn 주소가 호출되면 시큐리티가 가로채서 대신 로그인 진행
////                .defaultSuccessUrl("/")
//                .and()
////                .addFilterBefore(customAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
//                .oauth2Login()
//                .loginPage("/loginForm")
//                .userInfoEndpoint();
////                .userService(principalOauth2UserService); // 소셜 로그인이 완료되고 후처리 필요. Tip. 코드X, (액세스 토큰 + 사용자 프로필 정보)O
    }


}
