package com.reelreview.service;

import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.repository.Profile;
import com.reelreview.repository.ProfileRepository;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private UserRepository userRepository;

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
        System.out.println("ProfileService 초기화");
    }

    public UserEntity getCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication : " + authentication);
        String userEmail = (String) authentication.getPrincipal();

        if (authentication == null) {
            System.out.println("Authentication is null");
            return null;
        }

        UserEntity userEntity = userRepository.findByUserEmail(userEmail);
        System.out.println("userEntity : " + userEntity);

        if (userEntity != null) {

            System.out.println("userEntity" + userEntity);
            System.out.println("UserEmail: " + userEntity.getUserEmail());
            System.out.println("Username: " + userEntity.getUsername());
            System.out.println("Role: " + userEntity.getRole());

            return userEntity;
        } else {
            System.out.println("UserEntity is null");

        }

        return null;
    }

    public ProfileDTO getProfileByUserCd(UserEntity userCd) {
        ProfileDTO profileDTO = profileRepository.findByUserCd(userCd);
        return profileDTO;
    }

    public void saveProfile(ProfileDTO profileDTO) {
        profileRepository.save(profileDTO);
    }
}