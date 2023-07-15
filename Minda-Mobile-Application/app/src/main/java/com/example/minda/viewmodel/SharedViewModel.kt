package com.example.minda.viewmodel


import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.minda.pojo.admin.AllCodesResponse
import com.example.minda.pojo.admin.EnrollRequest
import com.example.minda.pojo.admin.GeneratedCodeResponse
import com.example.minda.pojo.admin.ShowAllCoursesResponse
import com.example.minda.pojo.admin.ShowAllUsersResponse
import com.example.minda.pojo.assignment.AllAssignmentsResponse
import com.example.minda.pojo.assignment.UsersGradesResponse
import com.example.minda.pojo.course.CourseDetailsResponse
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.pojo.instructor.auth.RegisteredInstructorResponse
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.pojo.instructor.content.CreatedCourseResponse
import com.example.minda.pojo.instructor.content.InstructorProfileResponse
import com.example.minda.pojo.instructor.content.quiz.grades.studentQuizGradesInstructorResponse
import com.example.minda.pojo.instructor.content.quiz.post.PostQuizRequest
import com.example.minda.pojo.instructor.content.quiz.response.PostingQuizResponse
import com.example.minda.pojo.lecture.LectureInfoResponse
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.pojo.password.EmailForResetPasswordRequest
import com.example.minda.pojo.password.ResetPasswordRequest
import com.example.minda.pojo.password.VerifyCodeRequest
import com.example.minda.pojo.student.auth.RegisteredStudentResponse
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.pojo.student.content.AnswerQuizRequest
import com.example.minda.pojo.student.content.MyQuizMarksResponse
import com.example.minda.pojo.student.content.QuizQuestionsResponse
import com.example.minda.pojo.student.content.StudentProfileResponse
import com.example.minda.pojo.student.discussion.comment.CreatedCommentResponse
import com.example.minda.pojo.student.discussion.comment.SendCommentRequest
import com.example.minda.pojo.student.discussion.comment.updated_comments.AllCommentsOnSpecificCourse
import com.example.minda.pojo.student.discussion.post.AllPostsResponse
import com.example.minda.repository.SharedRepository
import com.example.minda.util.isInternetAvailable
import com.example.minda.util.showToast
import kotlinx.coroutines.launch

class SharedViewModel(application: Application) : AndroidViewModel(application) {

    companion object {
        val currentLoggedInUserToken = MutableLiveData<String>()
        val currentLoggedInUserEmail = MutableLiveData<String>()
        val currentLoggedInUserId = MutableLiveData<String>()
        val currentLoggedInUserName = MutableLiveData<String>()
        val currentLoggedInUserImage = MutableLiveData<String>()
        val fileName = MutableLiveData<String>()
    }

    private val repo = SharedRepository()
    private val app = application


    val studentLoginStatus = MutableLiveData<String>()
    val studentRegisterStatus = MutableLiveData<RegisteredStudentResponse?>()
    val instructorLoginStatus = MutableLiveData<String>()
    val adminLoginStatus = MutableLiveData<String>()
    val getAllUserForAdminStatus = MutableLiveData<ShowAllUsersResponse?>()
    val getAllCoursesForAdminStatus = MutableLiveData<ShowAllCoursesResponse?>()
    val getAllCodesForAdminStatus = MutableLiveData<AllCodesResponse?>()
    val enrollingInOperationForAdminStatus = MutableLiveData<String>()
    val deletingOperationForAdminStatus = MutableLiveData<String>()
    val generatingCodeOperationForAdminStatus = MutableLiveData<GeneratedCodeResponse?>()
    val instructorRegisterStatus = MutableLiveData<RegisteredInstructorResponse?>()
    val beginForgetPassStatus = MutableLiveData<String?>()
    val sendingTokenAndPassStatus = MutableLiveData<String?>()
    val validateTokenAndPassStatus = MutableLiveData<String?>()
    val instructorProfileStatus = MutableLiveData<InstructorProfileResponse?>()
    val studentProfileStatus = MutableLiveData<StudentProfileResponse?>()
    val instructorCreateCourseStatus = MutableLiveData<CreatedCourseResponse?>()
    val instructorCreateAssignmentStatus = MutableLiveData<String?>()
    val instructorCreateQuizStatus = MutableLiveData<PostingQuizResponse?>()
    val instructorDeleteQuizStatus = MutableLiveData<String>()
    val instructorDeleteAssignmentStatus = MutableLiveData<String>()
    val studentCourseDetailsStatus = MutableLiveData<CourseDetailsResponse?>()
    val instructorCourseDetailsStatus = MutableLiveData<CourseDetailsResponse?>()
    val studentQuizShowQuestionsStatus = MutableLiveData<QuizQuestionsResponse?>()
    val quizQuestionsOverViewStatus = MutableLiveData<QuizQuestionsResponse?>()
    val studentQuizAnsweringStatus = MutableLiveData<String?>()
    val studentGetQuizMarksStatus = MutableLiveData<MyQuizMarksResponse?>()
    val studentGetQuizMarksStatusInstructorPerspective =
        MutableLiveData<studentQuizGradesInstructorResponse?>()
    val lectureInfoStatus = MutableLiveData<LectureInfoResponse?>()
    val assignmentInfoStatus = MutableLiveData<AllAssignmentsResponse?>()
    val allInfoAboutAssignmentStatus = MutableLiveData<UsersGradesResponse?>()
    val allPostsResponseForStudentStatus = MutableLiveData<AllPostsResponse?>()
    val allCommentsOnPostStatus = MutableLiveData<AllCommentsOnSpecificCourse?>()
    val sendingCommentStatus = MutableLiveData<CreatedCommentResponse?>()
    val creatingNewPostStatus = MutableLiveData<Int?>()
    val deletingPostStatus = MutableLiveData<Int?>()
    val deletingCommentStatus = MutableLiveData<Int?>()

    val timerStatus = MutableLiveData<String>()


    init {
        timerStatus.value = ""
    }

    fun loginForStudent(request: LoginRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.loginForStudent(request)
                    studentLoginStatus.value = result
                    currentLoggedInUserToken.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
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
                    showToast("Server is busy", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun loginForAdmin(request: LoginRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.loginForAdmin(request)
                    adminLoginStatus.value = result
                    currentLoggedInUserToken.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun getAllUsersForAdmin(token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllUsersForAdmin(token)
                    getAllUserForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun getAllCoursesForAdmin(token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllCoursesForAdmin(token)
                    getAllCoursesForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                    val result = repo.getAllCoursesForAdmin(token)
                    getAllCoursesForAdminStatus.value = result
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun getAllCodesForAdmin(token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllCodesForAdmin(token)
                    getAllCodesForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                    val result = repo.getAllCoursesForAdmin(token)
                    getAllCoursesForAdminStatus.value = result
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun enrollAStudentIntoCourseByAdmin(courseId: String, token: String, request: EnrollRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.enrollAStudentIntoCourseByAdmin(courseId, token, request)
                    enrollingInOperationForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }

    fun deleteSpecificUserForAdmin(userId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.deleteSpecificUserForAdmin(userId, token)
                    deletingOperationForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
                }
            } else {
                showToast(
                    "No Internet connection to complete the operation",
                    app.applicationContext
                )
            }
        }
    }


    fun generateInstructorCodeByAdmin(adminId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.generateInstructorCodeByAdmin(adminId, token)
                    generatingCodeOperationForAdminStatus.value = result

                } catch (e: Exception) {
                    showToast("Server is busy", app.applicationContext)
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

    fun beginForgetPasswordForStudent(emailRequest: EmailForResetPasswordRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.beginForgetPasswordForStudent(emailRequest)
                    beginForgetPassStatus.value = result

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

    fun sendingTokenAndPassForStudent(request: ResetPasswordRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.sendingTokenAndPassForStudent(request)
                    sendingTokenAndPassStatus.value = result

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

    fun validateTokenAndPassForStudent(token: VerifyCodeRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.validateTokenAndPassForStudent(token)
                    validateTokenAndPassStatus.value = result

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

    fun beginForgetPasswordForInstructor(emailRequest: EmailForResetPasswordRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.beginForgetPasswordForInstructor(emailRequest)
                    beginForgetPassStatus.value = result

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

    fun sendingTokenAndPassForInstructor(request: ResetPasswordRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.sendingTokenAndPassForInstructor(request)
                    sendingTokenAndPassStatus.value = result

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

    fun validateTokenAndPassForInstructor(token: VerifyCodeRequest) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.validateTokenAndPassForInstructor(token)
                    validateTokenAndPassStatus.value = result

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
                    showToast("Server is busy", app.applicationContext)
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
                    showToast("Server is busy", app.applicationContext)
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

    //    fun createNewAssignmentByInstructor(courseId:String, token:String, title: String,
//                                        description:String, fileUri: Uri, fileRealPath: String) {
//        viewModelScope.launch {
//            if (isInternetAvailable(app.applicationContext)) {
//                try {
//                    val result = repo.createNewAssignmentByInstructor(courseId, token, title,description,fileUri,fileRealPath)
//                    instructorCreateAssignmentStatus.value = result
//
//                } catch (e: Exception) {
//                    showToast("Server is busy, try again", app.applicationContext)
//                }
//            } else {
//                showToast(
//                    "No Internet connection to complete the operation",
//                    app.applicationContext
//                )
//            }
//        }
//    }
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

    fun deleteTheAssignmentByInstructor(assignmentId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.deleteTheAssignmentByInstructor(assignmentId, token)
                    instructorDeleteAssignmentStatus.value = result
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

    fun getQuizQuestionsForStudentToAnswer(quizId: String, courseId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizQuestionsForStudentToAnswer(quizId, courseId, token)
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

    fun getQuizQuestionsForInstructorOverView(quizId: String, courseId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizQuestionsForInstructorOverView(quizId, courseId, token)
                    quizQuestionsOverViewStatus.value = result

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

    fun studentAnswerTheQuiz(
        courseId: String,
        quizId: String,
        token: String,
        request: AnswerQuizRequest
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.studentAnswerTheQuiz(courseId, quizId, token, request)
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

    fun getQuizMarksForTheStudent(courseId: String, quizId: String, userId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizMarksForTheStudent(courseId, quizId, userId, token)
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

    fun getQuizMarksForInstructor(courseId: String, quizId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getQuizMarksForInstructor(courseId, quizId, token)
                    studentGetQuizMarksStatusInstructorPerspective.value = result

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

    fun getLectureByIdToViewItsContentForStudent(lecId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getLectureByIdToViewItsContentForStudent(lecId, token)
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

    fun getLectureByIdToViewItsContentForInstructor(
        lecId: String,
        courseId: String,
        token: String
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result =
                        repo.getLectureByIdToViewItsContentForInstructor(lecId, courseId, token)
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

    fun getAllAssignmentsForInstructor(courseId: String, docId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllAssignmentsForInstructor(courseId, docId, token)
                    assignmentInfoStatus.value = result

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

    fun getAllAssignmentsGradesForInstructor(
        courseId: String,
        assignmentsId: String,
        token: String
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result =
                        repo.getAllAssignmentsGradesForInstructor(courseId, assignmentsId, token)
                    allInfoAboutAssignmentStatus.value = result

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

    fun getAllAssignmentsForStudent(courseId: String, userId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllAssignmentsForStudent(courseId, userId, token)
                    assignmentInfoStatus.value = result
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

    fun getAllDiscussionPostsForStudent(courseId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllDiscussionPostsForStudent(courseId, token)
                    allPostsResponseForStudentStatus.value = result
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

    fun getAllCommentsOnSpecificPost(courseId: String, postId: String, token: String) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.getAllCommentsOnSpecificPost(courseId, postId, token)
                    allCommentsOnPostStatus.value = result
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

    fun sendCommentsOnSpecificPost(
        courseId: String,
        postId: String,
        token: String,
        content: SendCommentRequest
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.sendCommentsOnSpecificPost(courseId, postId, token, content)
                    sendingCommentStatus.value = result
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

    fun createNewPost(
        courseId: String,
        token: String,
        content: SendCommentRequest
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.createNewPost(courseId, token, content)
                    creatingNewPostStatus.value = result
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
    fun deletePost(
        courseId: String,
        postId: String,
        token: String,
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.deletePost(courseId, postId,token)
                    deletingPostStatus.value = result
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
    fun deleteComment(
        courseId: String,
        postId: String,
        commentId: String,
        token: String,
    ) {
        viewModelScope.launch {
            if (isInternetAvailable(app.applicationContext)) {
                try {
                    val result = repo.deleteComment(courseId, postId,commentId,token)
                    deletingCommentStatus.value = result
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

    fun updateTimer(time: Long) {
        val seconds = (time / 1000) % 60
        val minutes = (time / (1000 * 60)) % 60
        val hours = (time / (1000 * 60 * 60)) % 24
        val realTime = String.format("%02d:%02d:%02d", hours, minutes, seconds)
        timerStatus.value = realTime
        if (time == 0L){
            timerStatus.value = "Time is up!"
        }
    }


}