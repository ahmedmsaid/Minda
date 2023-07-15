package com.example.minda.pojo.instructor.content.quiz.response

data class PostingQuizResponse(
    val __v: Int,
    val _id: String,
    val courseId: String,
    val createdAt: String,
    val duration: String,
    val questions: List<Question>,
    val quizmark: Int,
    val quizname: String
)