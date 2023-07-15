package com.example.minda.pojo.instructor.content.quiz.post

data class PostQuizRequest(
    val quizname: String,
    val questions: List<Question>,
    val duration:String
)