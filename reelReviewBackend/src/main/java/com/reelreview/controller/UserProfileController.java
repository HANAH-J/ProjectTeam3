package com.reelreview.controller;

import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.service.ProfileService;
import com.reelreview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    @Autowired
    private ProfileService profileService;
    @Autowired
    private UserService userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage () {

        UserEntity userEntity = profileService.getCurrentUserDetails();
        ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

        if(userEntity == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "사용자 인증 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

//        아직 남은 것 : Rating, WantToSee, Comment 가지고 와서 넣어주기
//        List<userRatingDTO> userRating = userRatingService.getMovieRatingsByUserCd(userDTO.getUserCd());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);
        responseData.put("profileDTO", profileDTO);

        return ResponseEntity.ok(responseData);

    }

    //유저 프로필 메시지 변경
    @ResponseBody
    @RequestMapping(value = "/userProfiles/updateUserStatus", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfileStatus (@RequestBody Map<String, String> requestData) {

        try {
            int userCd = Integer.parseInt(requestData.get("userCd"));
            String newStatus = requestData.get("status");

            //userCd값을 통해 userEntity 조회
            UserEntity userEntity = userService.getUserByUserCd(userCd);
            if (userEntity == null) {
                return ResponseEntity.notFound().build();
            }

            //userEntity를 통해 profileDTO 조회
            ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

            if (profileDTO != null) {
                profileDTO.setStatus(newStatus);
                profileService.saveProfile(profileDTO);
                return ResponseEntity.ok("Profile status updated");
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userCd format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile status");
        }
    }

    //유저 프로필 사진 업로드
    @RequestMapping(value ="/userProfiles/updateUserPFP", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfilePicture(@RequestParam("userCd") int userCd, @RequestParam("profilePicture")MultipartFile profilePicture) {

        if (!profilePicture.isEmpty()) {
            // 파일 업로드 용량 제한 (2MB)
            long maxFileSize = 2 * 1024 * 1024; // 2MB
            if (profilePicture.getSize() > maxFileSize) {
                return ResponseEntity.badRequest().body("File size exceeds the maximum limit");
            }
            try {
                System.out.println("loaded " + userCd + "_" + profilePicture);
                String filePath = profileService.uploadProfilePicture(userCd, profilePicture);

                UserEntity userEntity = userService.getUserByUserCd(userCd);
                if (userEntity == null) {
                    return ResponseEntity.notFound().build();
                }
                //userEntity를 통해 profileDTO 조회
                ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

                if (profileDTO!=null) {
                    profileDTO.setPfImage(filePath);
                    profileService.saveProfile(profileDTO);
                    System.out.println(filePath + "uploaded");
                    return ResponseEntity.ok("Profile picture uploaded successfully");
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile picture");
            }
        } else {
            return ResponseEntity.badRequest().body("No file selected.");
        }

    }

    // 유저 프로필 사진 로드
    @RequestMapping(value ="/userProfiles/getProfilePicture", method = RequestMethod.GET)
    public ResponseEntity<Resource> getProfilePicture(@RequestParam("userCd") int userCd) {
        // userCd를 기반으로 해당 유저의 프로필 이미지 찾기
        String filePath = profileService.getProfilePictureByUserCd(userCd);

        // 파일의 확장자 추출 ... 이미지 타입 설정
        String fileExtension = getFileExtension(filePath);
        MediaType mediaType;
        if("jpg".equalsIgnoreCase(fileExtension) || "jpeg".equalsIgnoreCase(fileExtension)) {
            mediaType = MediaType.IMAGE_JPEG;
        } else if ("png".equalsIgnoreCase(fileExtension)) {
            mediaType = MediaType.IMAGE_PNG;
        } else {
            mediaType = MediaType.IMAGE_JPEG;
        }

        // 이미지 파일을 Resource로 변환하여 ResponseEntity로 반환 ... 파일 리소스를 표현하기 위해 사용되는 Spring Framework 클래스
        System.out.println("userCd : " + userCd);
        System.out.println("filePath : " + filePath);
        Resource resource = new FileSystemResource(filePath);
        return ResponseEntity.ok().contentType(mediaType).body(resource);
    }





    // 유저 프로필 배경 사진 업로드
    @RequestMapping(value ="/userProfiles/updateUserPFB", method = RequestMethod.PUT)
    public ResponseEntity<?> updateBackgroundImage(@RequestParam("userCd") int userCd, @RequestParam("backgroundImage")MultipartFile backgroundImage) {

        if (!backgroundImage.isEmpty()) {
            // 파일 업로드 용량 제한 (3MB)
            long maxFileSize = 3 * 1024 * 1024; // 2MB
            if (backgroundImage.getSize() > maxFileSize) {
                return ResponseEntity.badRequest().body("File size exceeds the maximum limit");
            }
            try {
                System.out.println("loaded " + userCd + "_" + backgroundImage);
                String filePath = profileService.uploadBackgroundImage(userCd, backgroundImage);

                UserEntity userEntity = userService.getUserByUserCd(userCd);
                if (userEntity == null) {
                    return ResponseEntity.notFound().build();
                }
                //userEntity를 통해 profileDTO 조회
                ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

                if (profileDTO!=null) {
                    profileDTO.setBgImage(filePath);
                    profileService.saveProfile(profileDTO);
                    System.out.println(filePath + "uploaded");
                    return ResponseEntity.ok("Profile picture uploaded successfully");
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile picture");
            }
        } else {
            return ResponseEntity.badRequest().body("No file selected.");
        }
    }

    // 유저 배경 사진 로드
    @RequestMapping(value ="/userProfiles/getBackgroundImage", method = RequestMethod.GET)
    public ResponseEntity<Resource> getBackgroundImage(@RequestParam("userCd") int userCd) {
        String filePath = profileService.getBackgroundImageByUserCd(userCd);

        String fileExtension = getFileExtension(filePath);
        MediaType mediaType;
        if("jpg".equalsIgnoreCase(fileExtension) || "jpeg".equalsIgnoreCase(fileExtension)) {
            mediaType = MediaType.IMAGE_JPEG;
        } else if ("png".equalsIgnoreCase(fileExtension)) {
            mediaType = MediaType.IMAGE_PNG;
        } else {
            mediaType = MediaType.IMAGE_JPEG;
        }

        Resource resource = new FileSystemResource(filePath);
        return ResponseEntity.ok().contentType(mediaType).body(resource);
    }







    private String getFileExtension(String filePath) { // 이미지 확장자 추출
        int dotIndex = filePath.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < filePath.length() - 1) {
            return filePath.substring(dotIndex + 1).toLowerCase();
        }
        return "";
    }

}