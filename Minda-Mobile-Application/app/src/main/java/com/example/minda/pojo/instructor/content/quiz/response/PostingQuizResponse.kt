package com.example.minda.pojo.instructor.content.quiz.response

data class PostingQuizResponse(
    val quizname: String,
    val questions: List<Question>,
    val quizmark: Int,
    val createdAt: String,
    val _id: String,
    val __v: Int
)