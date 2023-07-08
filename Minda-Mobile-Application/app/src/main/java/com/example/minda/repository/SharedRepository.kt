package com.example.minda.repository

import com.example.minda.data.ApiService
import com.example.minda.pojo.course.CourseDetailsResponse
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.pojo.instructor.auth.RegisteredInstructorResponse
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.pojo.instructor.content.CreatedCourseResponse
import com.example.minda.pojo.instructor.content.InstructorProfileResponse
import com.example.minda.pojo.instructor.content.quiz.post.PostQuizRequest
import com.example.minda.pojo.instructor.content.quiz.response.PostingQuizResponse
import com.example.minda.pojo.lecture.LectureInfoResponse
import com.example.minda.pojo.student.auth.RegisteredStudentResponse
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.pojo.student.content.AnswerQuizRequest
import com.example.minda.pojo.student.content.MyQuizMarksResponse
import com.example.minda.pojo.student.content.QuizQuestionsResponse
import com.example.minda.pojo.student.content.StudentProfileResponse

class SharedRepository {

    suspend fun loginForStudent(request: LoginRequest): String {
        val response = ApiService.retrofitService.loginForStudent(request)
        return if (response.isSuccessful) {
            response.body()!!
        } else if (response.code() == 500) {
            "Your credential is not correct"
        } else {
            "Internal error"
        }
    }

    suspend fun loginForInstructor(request: LoginRequest): String {
        val response = ApiService.retrofitService.loginForInstructor(request)
        return if (response.isSuccessful) {
            response.body()!!
        } else if (response.code() == 500) {
            "Your credential is not correct"
        } else {
            "Internal error"
        }
    }

    suspend fun registerForStudent(request: StudentRegisterRequest): RegisteredStudentResponse? {
        val response = ApiService.retrofitService.registerForStudent(request)
        if (response.isSuccessful) {
            return response.body()!!
        }
        return null
    }

    suspend fun registerForInstructor(request: InstructorRegisterRequest): RegisteredInstructorResponse? {
        val response = ApiService.retrofitService.registerForInstructor(request)
        if (response.isSuccessful) {
            return response.body()!!
        }
        return null
    }

    suspend fun getInstructorProfile(id:String, token:String):InstructorProfileResponse?{
        val response = ApiService.retrofitService.getInstructorProfile(id,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }

    suspend fun getStudentProfile(id: String , token: String):StudentProfileResponse?{
        val response = ApiService.retrofitService.getStudentProfile(id,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun createNewCourseByInstructor(id:String,token:String,request: CreateCourseRequest):CreatedCourseResponse?{
        val response = ApiService.retrofitService.createNewCourseByInstructor(id,token,request)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }

    suspend fun createNewQuizByInstructor(id:String,token:String,request: PostQuizRequest):PostingQuizResponse?{
        val response = ApiService.retrofitService.createNewQuizByInstructor(id,token,request)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun deleteTheQuizByInstructor(id:String,token:String):String{
        val response = ApiService.retrofitService.deleteTheQuizByInstructor(id,token)
        if (response.isSuccessful){
            return "Deleted successfully"
        }
        return "Failed to delete"
    }

    suspend fun getEnrolledInCourseDetailsForStudent(id:String,token:String):CourseDetailsResponse?{
        val response = ApiService.retrofitService.getEnrolledInCourseDetailsForStudent(id,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }

    suspend fun getControlledCourseDetailsForInstructor(id:String,token:String):CourseDetailsResponse?{
        val response = ApiService.retrofitService.getControlledCourseDetailsForInstructor(id,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun getQuizQuestionsForStudentToAnswer(quizId:String,courseId:String,token:String):QuizQuestionsResponse?{
        val response = ApiService.retrofitService.getQuizQuestionsForStudentToAnswer(quizId,courseId,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun studentAnswerTheQuiz(courseId:String,quizId:String,token:String,request: AnswerQuizRequest):String?{
        val response = ApiService.retrofitService.studentAnswerTheQuiz(courseId,quizId,token,request)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun getQuizMarksForTheStudent(courseId:String,quizId:String,userId:String,token:String):MyQuizMarksResponse?{
        val response = ApiService.retrofitService.getQuizMarksForTheStudent(courseId,quizId,userId,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }

    suspend fun getLectureByIdToViewItsContentForStudent(lecId:String,token:String):LectureInfoResponse?{
        val response = ApiService.retrofitService.getLectureByIdToViewItsContentForStudent(lecId,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
    suspend fun getLectureByIdToViewItsContentForInstructor(lecId:String,courseId: String,token:String):LectureInfoResponse?{
        val response = ApiService.retrofitService.getLectureByIdToViewItsContentForInstructor(lecId,courseId,token)
        if (response.isSuccessful){
            return response.body()
        }
        return null
    }
}