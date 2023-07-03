package com.example.minda.viewmodel


import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.minda.pojo.instructor.InstructorRegisterRequest
import com.example.minda.pojo.LoginRequest
import com.example.minda.pojo.instructor.RegisteredInstructorResponse
import com.example.minda.pojo.student.RegisteredStudentResponse
import com.example.minda.pojo.student.StudentRegisterRequest
import com.example.minda.repository.SharedRepository
import com.example.minda.utile.isInternetAvailable
import com.example.minda.utile.showToast
import kotlinx.coroutines.launch

class SharedViewModel(application: Application) : AndroidViewModel(application) {

    private val repo = SharedRepository()
    private val app = application

    val studentLoginStatus = MutableLiveData<String>()
    val studentRegisterStatus = MutableLiveData<RegisteredStudentResponse?>()
    val instructorLoginStatus = MutableLiveData<String>()
    val instructorRegisterStatus = MutableLiveData<RegisteredInstructorResponse?>()


    val currentLoggedInUserToken = MutableLiveData<String>()


    fun loginForStudent(request: LoginRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.loginForStudent(request)
                    studentLoginStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy, try again", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun loginForInstructor(request: LoginRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.loginForInstructor(request)
                    instructorLoginStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy, try again", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun registerForStudent(request: StudentRegisterRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.registerForStudent(request)
                    studentRegisterStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy, try again", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun registerForInstructor(request: InstructorRegisterRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.registerForInstructor(request)
                    instructorRegisterStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy, try again", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }
}