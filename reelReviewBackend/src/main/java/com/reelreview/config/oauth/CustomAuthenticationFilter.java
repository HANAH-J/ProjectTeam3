package com.reelreview.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reelreview.domain.user.SignUpDto;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


//public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
//
//    private ObjectMapper objectMapper = new ObjectMapper();
//
//    public CustomAuthenticationFilter(String defaultFilterProcessesUrl) {
//        super(defaultFilterProcessesUrl);
//    }
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
//
////        ServletInputStream inputStream = request.getInputStream();
////        String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
////
////        LoginDto loginDto = objectMapper.readValue(messageBody, LoginDto.class);
////        SignUpDto signUpDto = new SignUpDto();
////
////        String username = signUpDto.getUserId();
////        String password = signUpDto.getUserPass();
////
////        return getAuthenticationManager()
////                .authenticate(new UsernamePasswordAuthenticationToken(username, password));
//    }
//}
