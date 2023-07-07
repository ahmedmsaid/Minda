package com.example.minda.pojo.instructor.content

import com.example.minda.pojo.profile_image.Profileimg

data class InstructorProfileResponse(
    val firstName: String?,
    val lastName: String?,
    val courses: List<Course>?,
    val profileimg: Profileimg?
)