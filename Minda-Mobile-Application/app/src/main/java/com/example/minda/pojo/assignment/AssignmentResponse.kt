package com.example.minda.pojo.assignment

data class AssignmentResponse(
    val _id: String,
    val score: Int,
    val submissionId: String,
    val userId: UserId
)