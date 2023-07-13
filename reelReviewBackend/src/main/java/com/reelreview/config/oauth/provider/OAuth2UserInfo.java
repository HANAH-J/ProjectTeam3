package com.reelreview.config.oauth.provider;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getUserEmail();
    String getUserName();
}
