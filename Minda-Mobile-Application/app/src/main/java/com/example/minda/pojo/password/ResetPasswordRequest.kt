package com.example.minda.pojo.password

data class ResetPasswordRequest(
    val token: String,
    val password: String
)