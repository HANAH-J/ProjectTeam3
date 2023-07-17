package com.reelreview.config.oauth.provider;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

// JWT : 전자 서명이 된 토큰
// JSON 형태로 구성된 토큰
// (header).(payload).(signature)

// header: typ(해당 토큰의 타입), alg(토큰 서명을 위해 사용된 해시 알고리즘)
// payload: sub(해당 토큰의 주인), iat(토큰 발행시간), exp(토큰 만료시간)

@Service
public class TokenProvider {
    // JWT 생성 및 검증을 위한 키
    private static final String SECURITY_KEY = "jwtseckey!@";

    // JWT 생성 메서드
    public String create(String userEmail) {
        // 만료날짜 : 현재 날짜 + 1시간
        Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // JWT 생성
        return Jwts.builder()
                // 암호화에 사용될 알고리즘, 키
                .signWith(SignatureAlgorithm.HS512, SECURITY_KEY)
                // JWT 제목, 생성일, 만료일
                .setSubject(userEmail).setIssuedAt(new Date()).setExpiration(exprTime)
                // 생성
                .compact();
    }

    // JWT 검증
    public String validate(String token) {
        // 매개변수로 받은 token을 키를 사용하여 복호화(디코딩)
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY).parseClaimsJws(token).getBody();

        // 복호화된 token의 payload에서 제목을 가져온다.
        return claims.getSubject();
    }
}
