package com.reelreview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ReelReviewApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReelReviewApplication.class, args);
    }

}
