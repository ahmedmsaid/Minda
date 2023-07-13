package com.example.minda.pojo.student.discussion.post

data class Post(
    val __v: Int,
    val _id: String,
    val comments: List<Any>,
    val content: String,
    val course: String,
    val createdAt: String,
    val user: User
)