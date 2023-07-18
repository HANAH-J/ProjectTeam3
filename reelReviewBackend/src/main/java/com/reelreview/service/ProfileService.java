package com.reelreview.service;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public PrincipalDetails getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication : " + authentication);

        if (authentication == null) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if(principal instanceof PrincipalDetails) {
            return (PrincipalDetails) principal;
        }
        return null;
    }

    public ProfileDTO getProfileByUserCd(int userCd) {
        ProfileDTO profileDTO = profileRepository.findByUserCd(userCd);
        return profileDTO;
    }
}