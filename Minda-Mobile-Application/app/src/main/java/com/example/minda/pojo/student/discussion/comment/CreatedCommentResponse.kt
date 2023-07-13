package com.example.minda.pojo.student.discussion.comment

data class CreatedCommentResponse(
    val _id: String,
    val content: String,
    val createdAt: String,
    val post: String,
    val user: String
)