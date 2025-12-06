package com.retail.retail_micro_servers.dto;

public class LoginResponse {
    private String username;
    private String role;
    private String mailId;

    public LoginResponse() {}

    public LoginResponse(String username, String role, String mailId) {
        this.username = username;
        this.role = role;
        this.mailId = mailId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMailId() {
        return mailId;
    }

    public void setMailId(String mailId) {
        this.mailId = mailId;
    }
}
