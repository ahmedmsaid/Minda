package com.example.minda.pojo.student.content

data class Question(
    val __v: Int,
    val _id: String,
    val choose: List<Choose>,
    val mark: Int,
    val title: String
)