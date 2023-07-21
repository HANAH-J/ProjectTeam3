package com.reelreview.controller;

import com.reelreview.config.jwt.JwtTokenProvider;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    @Autowired
    private ProfileService profileService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage (HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) { // 토큰 형식 검사
            token = token.substring(7);
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "유효하지 않은 토큰 형식");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        // 토큰 유효성 검사 ... 만료된 토큰이거나, 서명 키가 일치하지 않는 토큰
        String userEmail = jwtTokenProvider.validate(token);
        if (userEmail == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "유효하지 않은 토큰");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        UserEntity userEntity = profileService.getCurrentUserDetails();

        if(userEntity == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "사용자 인증 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

//        아직 남은 것 : Rating, WantToSee, Comment 가지고 와서 넣어주기
//        List<userRatingDTO> userRating = userRatingService.getMovieRatingsByUserCd(userDTO.getUserCd());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);
        responseData.put("profileDTO", profileDTO);
        System.out.println(userEntity);
        System.out.println(profileDTO);

        return ResponseEntity.ok(responseData);
    }

    //유저 프로필 메시지 변경
    @ResponseBody
    @RequestMapping(value = "/userProfiles/updateUserStatus", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfileStatus (@RequestBody Map<String, String> requestData) {
        try {
            int userCd = Integer.parseInt(requestData.get("userCd"));
            String newStatus = requestData.get("status");
            profileService.updateProfileStatus(userCd, newStatus);
            return ResponseEntity.ok("Profile status updated");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userCd format");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile status");
        }
    }

    //유저 프로필 사진 업로드
    @RequestMapping(value ="/userProfiles/updateUserPFP", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfilePicture(@RequestParam("userCd") int userCd, @RequestParam("profilePicture")MultipartFile profilePicture) {
        return profileService.uploadImage("profile", userCd, profilePicture);
    }

    // 유저 프로필 사진 로드
    @RequestMapping(value ="/userProfiles/getProfilePicture", method = RequestMethod.GET)
    public ResponseEntity<Resource> getProfilePicture(@RequestParam("userCd") int userCd) {
        String filePath = profileService.getProfilePictureByUserCd(userCd);
        return profileService.getImageResourceResponse(filePath);
    }

    // 유저 프로필 배경 사진 업로드
    @RequestMapping(value ="/userProfiles/updateUserPFB", method = RequestMethod.PUT)
    public ResponseEntity<?> updateBackgroundImage(@RequestParam("userCd") int userCd, @RequestParam("backgroundImage")MultipartFile backgroundImage) {
        return profileService.uploadImage("background", userCd, backgroundImage);
    }

    // 유저 배경 사진 로드
    @RequestMapping(value ="/userProfiles/getBackgroundImage", method = RequestMethod.GET)
    public ResponseEntity<Resource> getBackgroundImage(@RequestParam("userCd") int userCd) {
        String filePath = profileService.getBackgroundImageByUserCd(userCd);
        return profileService.getImageResourceResponse(filePath);
    }

    // 프로필사진 or 배경사진 디폴트 값으로 설정
    @ResponseBody
    @RequestMapping(value = "/userProfiles/updateProfileToDefault", method = RequestMethod.PUT)
    public ResponseEntity<?> updateProfileToDefault(@RequestBody Map<String, String> requestData) {
        return profileService.updateUserImageToDefault(requestData);
    }

}