package com.example.minda.pojo.instructor.content.quiz.grades

data class studentQuizGradesInstructorResponse(
    val quizMark: Int,
    val quizResponseData: List<QuizResponseData>
)