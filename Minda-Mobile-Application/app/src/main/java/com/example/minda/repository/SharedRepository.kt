package com.example.minda.repository

import com.example.minda.data.ApiService
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.pojo.LoginRequest
import com.example.minda.pojo.instructor.auth.RegisteredInstructorResponse
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.pojo.instructor.content.CreatedCourseResponse
import com.example.minda.pojo.instructor.content.InstructorProfileResponse
import com.example.minda.pojo.student.auth.RegisteredStudentResponse
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.pojo.student.content.EnrolledCourse
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

//

}