package com.example.minda.pojo.instructor.content.quiz.post

data class Question(
    val title: String,
    val choose: List<Choose>,
    val mark: Int
)