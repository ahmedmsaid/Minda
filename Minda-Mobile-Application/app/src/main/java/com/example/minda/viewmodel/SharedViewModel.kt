package com.example.minda.viewmodel


import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.minda.pojo.LoginRequest
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.pojo.instructor.auth.RegisteredInstructorResponse
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.pojo.instructor.content.CreatedCourseResponse
import com.example.minda.pojo.instructor.content.InstructorProfileResponse
import com.example.minda.pojo.student.auth.RegisteredStudentResponse
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.pojo.student.content.StudentProfileResponse
import com.example.minda.repository.SharedRepository
import com.example.minda.utile.isInternetAvailable
import com.example.minda.utile.showToast
import kotlinx.coroutines.launch

class SharedViewModel(application: Application) : AndroidViewModel(application) {

    companion object {
        val currentLoggedInUserToken = MutableLiveData<String>()
        val currentLoggedInUserEmail = MutableLiveData<String>()
        val currentLoggedInUserId = MutableLiveData<String>()
        val currentLoggedInUserName = MutableLiveData<String>()
        val currentLoggedInUserImage = MutableLiveData<String>()
    }

    private val repo = SharedRepository()
    private val app = application


    val studentLoginStatus = MutableLiveData<String>()
    val studentRegisterStatus = MutableLiveData<RegisteredStudentResponse?>()
    val instructorLoginStatus = MutableLiveData<String>()
    val instructorRegisterStatus = MutableLiveData<RegisteredInstructorResponse?>()
    val instructorProfileStatus = MutableLiveData<InstructorProfileResponse?>()
    val studentProfileStatus = MutableLiveData<StudentProfileResponse?>()
    val instructorCreateCourseStatus = MutableLiveData<CreatedCourseResponse?>()


    fun loginForStudent(request: LoginRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.loginForStudent(request)
                    studentLoginStatus.value = result
                    currentLoggedInUserToken.value = result

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
                    currentLoggedInUserToken.value = result

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

    fun getInstructorProfile(id: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getInstructorProfile(id, token)
                    instructorProfileStatus.value = result

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
    fun getStudentProfile(id: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getStudentProfile(id, token)
                    studentProfileStatus.value = result

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

    fun createNewCourseByInstructor(id: String, token: String, request: CreateCourseRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.createNewCourseByInstructor(id, token, request)
                    instructorCreateCourseStatus.value = result

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