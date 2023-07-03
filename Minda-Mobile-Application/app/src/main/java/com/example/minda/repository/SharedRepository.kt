package com.example.minda.repository

import com.example.minda.data.ApiService
import com.example.minda.pojo.instructor.InstructorRegisterRequest
import com.example.minda.pojo.LoginRequest
import com.example.minda.pojo.instructor.RegisteredInstructorResponse
import com.example.minda.pojo.student.RegisteredStudentResponse
import com.example.minda.pojo.student.StudentRegisterRequest

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
}