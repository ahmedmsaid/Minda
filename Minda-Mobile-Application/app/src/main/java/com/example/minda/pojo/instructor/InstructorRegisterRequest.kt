package com.example.minda.pojo.instructor

data class InstructorRegisterRequest(
    val code: String,
    val confirmPassword: String,
    val email: String,
    val firstName: String,
    val lastName: String,
    val password: String
)