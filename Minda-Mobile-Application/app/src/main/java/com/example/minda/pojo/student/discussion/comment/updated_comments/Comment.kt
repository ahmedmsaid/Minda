package com.example.minda.pojo.student.discussion.comment.updated_comments

data class Comment(
    val __v: Int,
    val _id: String,
    val content: String,
    val createdAt: String,
    val post: Post,
    val user: User
)