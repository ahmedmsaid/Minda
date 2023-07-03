package com.example.minda.pojo.student

data class StudentRegisterRequest(
    val email: String,
    val password: String,
    val confirmPassword: String,
    val firstName: String,
    val lastName:String
)
