package com.example.minda.pojo.course

data class CourseDetailsResponse(
    val _id: String,
    val lectureId: List<LectureId>,
    val quizzes: List<Quizze>
)