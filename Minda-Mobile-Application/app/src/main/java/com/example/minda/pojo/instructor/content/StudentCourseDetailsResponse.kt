package com.example.minda.pojo.instructor.content

data class StudentCourseDetailsResponse(
    val __v: Int,
    val _id: String,
    val averageRating: Double,
    val courseName: String,
    val description: String,
    val doctorData: DoctorData,
    val duration: String,
    val enroll: List<String>,
    val lectureId: List<String>,
    val quizResponses: List<QuizResponse>,
    val quizzes: List<String>,
    val reviews: List<String>
)