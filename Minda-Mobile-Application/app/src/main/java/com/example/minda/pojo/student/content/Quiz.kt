package com.example.minda.pojo.student.content

data class Quiz(
    val __v: Int,
    val _id: String,
    val createdAt: String,
    val questions: List<Question>,
    val quizmark: Int,
    val quizname: String
)