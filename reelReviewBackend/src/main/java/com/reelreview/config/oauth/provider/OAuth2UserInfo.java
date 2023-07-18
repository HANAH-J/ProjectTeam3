package com.reelreview.config.oauth.provider;

public interface OAuth2UserInfo {
    String getProviderCd();
    String getProvider();
    String getUserEmail();
    String getUserName();
}
