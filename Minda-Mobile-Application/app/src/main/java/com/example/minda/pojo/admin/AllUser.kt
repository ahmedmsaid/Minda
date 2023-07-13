package com.example.minda.pojo.admin

data class AllUser(
    val __v: Int?,
    val _id: String?,
    val confirmPassword: String?,
    val createdAt: String?,
    val email: String?,
    val enrolledCourses: List<String>?,
    val firstName: String?,
    val infoQuizs: List<InfoQuiz>?,
    val isAdmin: Boolean?,
    val lastName: String?,
    val password: String?,
    val profileimg: Profileimg?,
    val resetPasswordExpires: String?,
    val resetPasswordToken: String?
)