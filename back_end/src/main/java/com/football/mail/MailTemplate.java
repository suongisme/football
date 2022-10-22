package com.football.mail;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MailTemplate {

    REGIS_USER("regis-user"), RE_GET_OTP("re-get-otp");

    String template;
}
