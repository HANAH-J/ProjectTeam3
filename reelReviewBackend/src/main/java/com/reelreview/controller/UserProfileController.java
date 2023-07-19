package com.reelreview.controller;

import com.reelreview.config.auth.PrincipalDetailsService;
import com.reelreview.domain.ProfileDTO;
import com.reelreview.domain.user.UserEntity;
import com.reelreview.repository.Profile;
import com.reelreview.service.ProfileService;
import com.reelreview.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @Autowired
    private UserService userService;



    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage () {

        System.out.println("userProfilePage 메서드 실행중");

        UserEntity userEntity = profileService.getCurrentUserDetails();
        ProfileDTO profileDTO = profileService.getProfileByUserCd(userEntity);

        if(userEntity == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            System.out.println("principalDetails is null");
            errorResponse.put("error", "사용자 인증 필요");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

//        // 아직 남은 것 : Rating, WantToSee, Comment 가지고 와서 넣어주기
//        // List<userRatingDTO> userRating = userRatingService.getMovieRatingsByUserCd(userDTO.getUserCd());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);
        responseData.put("profileDTO", profileDTO);

        System.out.println("...checking data...");
        System.out.println(userEntity);
        System.out.println(profileDTO);


        return ResponseEntity.ok(responseData);

    }





    /*
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/userProfiles", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> userProfilePage(@AuthenticationPrincipal(errorOnInvalidType=true) PrincipalDetails principalDetails) {

        System.out.println(principalDetails.getUserEmail());


        System.out.println("userProfilePage 메서드 실행중");
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal()); // 이메일 주소 담기는데
        System.out.println("PrincipalDetails 정보 : " + principalDetails); // 왜 null 나오는고임?

        // principalDetails 객체를 통해 사용자 정보에 접근할 수 있습니다.
        UserEntity userEntity = principalDetails.getUserEntity();


        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userDTO", userEntity);

        System.out.println("Just for checking userEntity" + userEntity);

        return ResponseEntity.ok(responseData);
    }
*/


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



}