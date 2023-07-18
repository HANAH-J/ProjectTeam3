package com.reelreview.controller;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.config.auth.PrincipalDetailsService;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

    @Autowired
    private PrincipalDetailsService principalDetailsService;

    @Autowired
    private ProfileService profileService;


    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage () {

        System.out.println("userProfilePage 메서드 실행중");

        PrincipalDetails principalDetails = profileService.getCurrentUserDetails();

        if(principalDetails == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            System.out.println("principalDetails is null");
            errorResponse.put("error", "사용자 인증 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        UserEntity userEntity = principalDetails.getUser();
        System.out.println("userEntity got User");

        //ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity.getUserCd());
        // 아직 남은 것 : Rating, WantToSee, Comment 가지고 와서 넣어주기
        // List<userRatingDTO> userRating = userRatingService.getMovieRatingsByUserCd(userDTO.getUserCd());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);
        //responseData.put("profileDTO", profileDTO);

        System.out.println(userEntity);
        System.out.println("Just for checking userEntity");

        return ResponseEntity.ok(responseData);

    }


    @ResponseBody
    @RequestMapping(value = "/userProfiles/updateUserStatus", method = RequestMethod.PUT)
    public ResponseEntity<String> updateProfileStatus
            (@RequestParam("userCd") int userCd, @RequestParam("editedText") String editedText) {

        // status 수정 로직 - ProfileService에 작성

        if(editedText != null) { // 수정 완료 조건
            return ResponseEntity.ok("수정완료");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("수정실패");
        }
    }


}