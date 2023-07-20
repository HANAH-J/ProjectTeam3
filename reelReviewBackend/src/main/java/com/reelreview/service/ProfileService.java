package com.reelreview.service;

import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.repository.ProfileRepository;
import com.reelreview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ProfileService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final ProfileRepository profileRepository;
    @Autowired
    private UserService userService;
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

    public String uploadProfilePicture(int userCd, MultipartFile profilePicture) throws IOException {

        String uploadDir = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\profilePictures\\";
        String fileName = UUID.randomUUID() + "_" + userCd + "_" + profilePicture.getOriginalFilename();
        String filePath = uploadDir + fileName;

        File dest = new File(filePath); // 업로드된 파일을 저장할 파일 경로를 나타내는 File 객체 생성
        profilePicture.transferTo(dest); // 프론트엔드에서 업로드한 파일을 백엔드에서 실제로 저장

        return filePath;
    }

    public String getProfilePictureByUserCd(int userCd) {
        UserEntity userEntity = userService.getUserByUserCd(userCd);
        if (userEntity == null) { return "defaultPfImage"; }
        //userEntity를 통해 profileDTO 조회
        ProfileDTO profileDTO = profileRepository.findByUserCd(userEntity);
        if(profileDTO != null) {
            return profileDTO.getPfImage();
        } else {
            return "defaultPfImage";
        }
    }




    public String uploadBackgroundImage(int userCd, MultipartFile backgroundImage) throws IOException {

        String uploadDir = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\backgroundImage\\";
        String fileName = UUID.randomUUID() + "_" + userCd + "_" + backgroundImage.getOriginalFilename();
        String filePath = uploadDir + fileName;

        File dest = new File(filePath); // 업로드된 파일을 저장할 파일 경로를 나타내는 File 객체 생성
        backgroundImage.transferTo(dest); // 프론트엔드에서 업로드한 파일을 백엔드에서 실제로 저장

        return filePath;
    }

    public String getBackgroundImageByUserCd(int userCd) {
        UserEntity userEntity = userService.getUserByUserCd(userCd);
        if (userEntity == null) { return "defaultBgImage"; }
        //userEntity를 통해 profileDTO 조회
        ProfileDTO profileDTO = profileRepository.findByUserCd(userEntity);
        if(profileDTO != null) {
            return profileDTO.getBgImage();
        } else {
            return "defaultBgImage";
        }
    }





}