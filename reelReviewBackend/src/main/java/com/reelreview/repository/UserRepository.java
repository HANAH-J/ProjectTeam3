package com.reelreview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reelreview.domain.user.UserEntity;

/*
 * 회원 가입 기능
 * 로그인 (회원 조회:아이디)
 * 비밀번호 재설정(조회:아이디 수정)
 * 회원 정보 수정 (조회:아이디 수정)
 * 회원 탈퇴(조회:아이디 수정) 테이블 수정
 * */

// @Repository 어노테이션이 없어도 Ioc 가능 (JpaRepository(CRUD 함수 포함)를 상속했기 때문)
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
                                                  // <Entity, PRIMARY KEY TYPE>
    // findBy 규칙 -> UserName 문법
    // select * from member where userName = 1?
    public UserEntity findByUsername(String username);

    public UserEntity findByUserEmail(String userEmail);

    public boolean existsByUserEmail(String userEmail);
}
