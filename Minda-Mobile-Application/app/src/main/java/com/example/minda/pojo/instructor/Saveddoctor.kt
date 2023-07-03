package com.example.minda.pojo.instructor

data class Saveddoctor(
    val __v: Int,
    val _id: String,
    val code: String,
    val confirmPassword: String,
    val courses: List<Any>,
    val email: String,
    val firstName: String,
    val lastName: String,
    val password: String
)