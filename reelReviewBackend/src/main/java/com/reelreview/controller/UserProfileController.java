package com.reelreview.controller;

import com.reelreview.config.auth.PrincipalDetails;
import com.reelreview.config.auth.PrincipalDetailsService;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserProfileController {

    @Autowired
    private PrincipalDetailsService principalDetailsService;

    @Autowired
    private ProfileService profileService;


    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage () {
        // @AuthenticationPrincipal = Spring Security에서 제공하는 어노테이션
        // 컨트롤러나 서비스 등에서 현재 인증된 사용자의 Principal객체를 주입받을 수 있게 해줌 (=현재 사용자의 정보를 쉽게 가져올 수 있음)

        PrincipalDetails principalDetails = profileService.getCurrentUserDetails();

        if(principalDetails == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "사용자 인증이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        UserEntity userEntity = principalDetails.getUserEntity();
        //ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity.getUserCd());
        // 아직 남은 것 : Rating, WantToSee, Comment 가지고 와서 넣어주기
        // List<userRatingDTO> userRating = userRatingService.getMovieRatingsByUserCd(userDTO.getUserCd());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);
        //responseData.put("profileDTO", profileDTO);

        System.out.println(userEntity);

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