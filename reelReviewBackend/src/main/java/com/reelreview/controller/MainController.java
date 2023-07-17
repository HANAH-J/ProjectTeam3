package com.reelreview.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/main")
public class MainController {

    @GetMapping("/")
    public String getMain(@AuthenticationPrincipal String userEmail) {
        return "로그인된 사용자는 " + userEmail + "입니다.";
    }
}
