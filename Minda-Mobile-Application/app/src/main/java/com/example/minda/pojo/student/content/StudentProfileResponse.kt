package com.example.minda.pojo.student.content

import com.example.minda.pojo.Profileimg

data class StudentProfileResponse(
    val enrolledCourses: List<EnrolledCourse>,
    val firstName: String,
    val lastName: String,
    val profileimg: Profileimg
)