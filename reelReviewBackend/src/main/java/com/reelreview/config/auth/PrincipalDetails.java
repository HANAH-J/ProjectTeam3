package com.reelreview.config.auth;

// 시큐리티가 /login 주소 요청이 오면 가로채서 로그인을 진행
// 로그인 진행이 완료되면 시큐리티 session을 만들어 준다. (Security ContextHolder)
// 오브젝트 -> Authentication 타입 객체
// Authentication 내부에 User 정보가 있어야 된다.
// User 오브젝트 타입 -> UserDetails 타입 객체

import com.reelreview.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

// Security Session -> Authentication -> UserDetails(PrincipalDetails)

public class PrincipalDetails  implements UserDetails {
    
    private User user; // 컴포지션

    public PrincipalDetails(User user) {
        this.user = user;
    }

    // 해당 User의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getRole();
            }
        });
        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 사이트에서 1년 동안 로그인을 하지 않아 휴먼 계정으로 변환될 때
        // 현재시간 - 로그인시간 = 1년 초과 시 return false;
        return true;
    }
}
