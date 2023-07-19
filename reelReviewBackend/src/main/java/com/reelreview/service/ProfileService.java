package com.reelreview.service;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
        System.out.println("ProfileService 초기화");
    }

    public PrincipalDetails getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication : " + authentication);

        if (authentication == null) {
            System.out.println("Authentication is null");
            return null;
        }

        Object principal = authentication.getPrincipal();
        System.out.println("principal" + principal);
        System.out.println(principal.toString());

        if(principal instanceof PrincipalDetails) { //여기서안됨................
            PrincipalDetails principalDetails = (PrincipalDetails) principal;

            // 로그를 추가하여 인증 정보와 사용자 정보 확인
            System.out.println("Authentication Name: " + principalDetails.getUsername());
            System.out.println("Authentication Authorities: " + principalDetails.getAuthorities());
            System.out.println("UserEntity: " + principalDetails.getUser());

            return principalDetails;
        }

        return null;
    }

    public ProfileDTO getProfileByUserCd(int userCd) {
        ProfileDTO profileDTO = profileRepository.findByUserCd(userCd);
        return profileDTO;
    }
}