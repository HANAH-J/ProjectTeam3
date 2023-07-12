package com.reelreview.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reelreview.model.User;

// CRUD 함수를 JpaRepository가 들고 있다.
// @Repository 어노테이션이 없어도 Ioc가 되는데 이유는 JpaRepository를 상속했기 때문
public interface UserRepository extends JpaRepository<User, Integer> {

    // findBy 규칙 -> UserName 문법
    // select * from member where userName = 1?
    public User findByUsername(String username);
}
