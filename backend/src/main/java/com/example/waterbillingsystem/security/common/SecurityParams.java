package com.example.waterbillingsystem.security.common;

public interface SecurityParams {
    public static final String JWT_HEADER_NAME = "Authorization";
    public static final String SECRET = "f15e99cf-9e1a-4dd4-9d7f-9ba263229424";
    public static final long EXPIRATION = 86400000;
    public static final String HEADER_PREFIX = "Bearer ";
}
