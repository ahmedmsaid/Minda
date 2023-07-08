package com.example.minda.viewmodel


import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.minda.pojo.course.CourseDetailsResponse
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
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
    val instructorCreateQuizStatus = MutableLiveData<PostingQuizResponse?>()
    val instructorDeleteQuizStatus = MutableLiveData<String>()
    val studentCourseDetailsStatus = MutableLiveData<CourseDetailsResponse?>()
    val instructorCourseDetailsStatus = MutableLiveData<CourseDetailsResponse?>()
    val studentQuizShowQuestionsStatus = MutableLiveData<QuizQuestionsResponse?>()
    val studentQuizAnsweringStatus = MutableLiveData<String?>()
    val studentGetQuizMarksStatus = MutableLiveData<MyQuizMarksResponse?>()
    val lectureInfoStatus = MutableLiveData<LectureInfoResponse?>()


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
    fun createNewQuizByInstructor(id: String, token: String, request: PostQuizRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.createNewQuizByInstructor(id, token, request)
                    instructorCreateQuizStatus.value = result
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
    fun deleteTheQuizByInstructor(quizID: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.deleteTheQuizByInstructor(quizID, token)
                    instructorDeleteQuizStatus.value = result
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


    fun getEnrolledInCourseDetailsForStudent(id: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getEnrolledInCourseDetailsForStudent(id, token)
                    studentCourseDetailsStatus.value = result

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
    fun getControlledCourseDetailsForInstructor(id: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getControlledCourseDetailsForInstructor(id, token)
                    instructorCourseDetailsStatus.value = result

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

    fun getQuizQuestionsForStudentToAnswer(quizId:String ,courseId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizQuestionsForStudentToAnswer(quizId,courseId, token)
                    studentQuizShowQuestionsStatus.value = result

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
    fun studentAnswerTheQuiz(courseId: String,quizId:String, token: String,request: AnswerQuizRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.studentAnswerTheQuiz(courseId,quizId, token,request)
                    studentQuizAnsweringStatus.value = result

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
    fun getQuizMarksForTheStudent(courseId: String,quizId:String,userId:String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizMarksForTheStudent(courseId,quizId,userId ,token)
                    studentGetQuizMarksStatus.value = result

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

    fun getLectureByIdToViewItsContentForStudent(lecId:String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getLectureByIdToViewItsContentForStudent(lecId ,token)
                    lectureInfoStatus.value = result

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
    } fun getLectureByIdToViewItsContentForInstructor(lecId:String,courseId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getLectureByIdToViewItsContentForInstructor(lecId ,courseId,token)
                    lectureInfoStatus.value = result

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