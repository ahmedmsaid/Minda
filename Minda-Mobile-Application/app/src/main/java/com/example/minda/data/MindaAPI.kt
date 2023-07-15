package com.example.minda.data

import com.example.minda.pojo.admin.AllCodesResponse
import com.example.minda.pojo.admin.EnrollRequest
import com.example.minda.pojo.admin.GeneratedCodeResponse
import com.example.minda.pojo.admin.ShowAllCoursesResponse
import com.example.minda.pojo.admin.ShowAllUsersResponse
import com.example.minda.pojo.assignment.AllAssignmentsResponse
import com.example.minda.pojo.assignment.UsersGradesResponse
import com.example.minda.pojo.course.CourseDetailsResponse
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.pojo.student.auth.RegisteredStudentResponse
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.pojo.instructor.auth.RegisteredInstructorResponse
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.pojo.instructor.content.CreatedCourseResponse
import com.example.minda.pojo.instructor.content.InstructorProfileResponse
import com.example.minda.pojo.instructor.content.quiz.grades.studentQuizGradesInstructorResponse
import com.example.minda.pojo.instructor.content.quiz.post.PostQuizRequest
import com.example.minda.pojo.instructor.content.quiz.response.PostingQuizResponse
import com.example.minda.pojo.lecture.LectureInfoResponse
import com.example.minda.pojo.password.EmailForResetPasswordRequest
import com.example.minda.pojo.password.ResetPasswordRequest
import com.example.minda.pojo.password.VerifyCodeRequest
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.pojo.student.content.AnswerQuizRequest
import com.example.minda.pojo.student.content.MyQuizMarksResponse
import com.example.minda.pojo.student.content.QuizQuestionsResponse
import com.example.minda.pojo.student.content.StudentProfileResponse
import com.example.minda.pojo.student.discussion.comment.CreatedCommentResponse
import com.example.minda.pojo.student.discussion.comment.SendCommentRequest
import com.example.minda.pojo.student.discussion.comment.updated_comments.AllCommentsOnSpecificCourse
import com.example.minda.pojo.student.discussion.post.AllPostsResponse
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Part
import retrofit2.http.Path
import java.util.concurrent.TimeUnit


private const val BASE_URL = "https://e-learning1.onrender.com/api/"

const val timeoutDuration = 10L // Timeout duration in seconds
val client: OkHttpClient = OkHttpClient.Builder()
    .connectTimeout(timeoutDuration, TimeUnit.SECONDS)
    .readTimeout(timeoutDuration, TimeUnit.SECONDS)
    .writeTimeout(timeoutDuration, TimeUnit.SECONDS)
    .build()

private val moshi = Moshi.Builder()
    .addLast(KotlinJsonAdapterFactory())
    .build()

var retrofit: Retrofit = Retrofit.Builder()
    .baseUrl(BASE_URL)
    .addConverterFactory(MoshiConverterFactory.create(moshi))
    .client(client)
    .build()


interface MindaAPI {

    @POST("auth/userlogin")
    suspend fun loginForStudent(@Body request: LoginRequest): Response<String>

    @POST("auth/doctorlogin")
    suspend fun loginForInstructor(@Body request: LoginRequest): Response<String>

    @POST("auth/userlogin")
    suspend fun loginForAdmin(@Body request: LoginRequest): Response<String>

    @GET("user/")
    suspend fun getAllUsersForAdmin(@Header("x-auth-token") token: String): Response<ShowAllUsersResponse>

    @GET("course/admin/getCourses")
    suspend fun getAllCoursesForAdmin(@Header("x-auth-token") token: String): Response<ShowAllCoursesResponse>

    @GET("specialCode/specialCodes")
    suspend fun getAllCodesForAdmin(@Header("x-auth-token") token: String): Response<AllCodesResponse>

    @DELETE("user/specficUser/{user-id}")
    suspend fun deleteSpecificUserForAdmin(
        @Path("user-id") userId: String,
        @Header("x-auth-token") token: String
    ): Response<ResponseBody>

    @POST("specialCode/{admin_id}")
    suspend fun generateInstructorCodeByAdmin(
        @Path("admin_id") adminId: String,
        @Header("x-auth-token") token: String
    ): Response<GeneratedCodeResponse>

    @PUT("course/{course-id}/enroll")
    suspend fun enrollAStudentIntoCourseByAdmin(
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
        @Body enrollRequest: EnrollRequest
    ): Response<ResponseBody>

    @POST("user/signup")
    suspend fun registerForStudent(@Body request: StudentRegisterRequest): Response<RegisteredStudentResponse>

    @POST("doctor/signup")
    suspend fun registerForInstructor(@Body request: InstructorRegisterRequest): Response<RegisteredInstructorResponse>

    @POST("forgetPass/reset")
    suspend fun beginForgetPasswordForStudent(@Body emailRequest: EmailForResetPasswordRequest): Response<ResponseBody>

    @POST("forgetPass/reset/check-token")
    suspend fun validateTokenAndPassForStudent(@Body token: VerifyCodeRequest): Response<ResponseBody>

    @POST("forgetPass/reset/new-password")
    suspend fun sendingTokenAndPassForStudent(@Body request: ResetPasswordRequest): Response<ResponseBody>

    @POST("forgetPass/resetDoc")
    suspend fun beginForgetPasswordForInstructor(@Body emailRequest: EmailForResetPasswordRequest): Response<ResponseBody>

    @POST("forgetPass/reset/checkToken/Doc")
    suspend fun validateTokenAndPassForInstructor(@Body token: VerifyCodeRequest): Response<ResponseBody>

    @POST("forgetPass/reset/new-password/Doc")
    suspend fun sendingTokenAndPassForInstructor(@Body request: ResetPasswordRequest): Response<ResponseBody>


    @GET("doctor/{doc-id}/doctorProfile")
    suspend fun getInstructorProfile(
        @Path("doc-id") id: String,
        @Header("x-auth-token") token: String
    ): Response<InstructorProfileResponse>

    @GET("user/{student-id}/userProfile")
    suspend fun getStudentProfile(
        @Path("student-id") id: String,
        @Header("x-auth-token") token: String
    ): Response<StudentProfileResponse>

    @POST("course/{doc-id}")
    suspend fun createNewCourseByInstructor(
        @Path("doc-id") id: String,
        @Header("x-auth-token") token: String,
        @Body request: CreateCourseRequest
    ): Response<CreatedCourseResponse>

    @POST("quiz/courses/{course-id}/quizzes")
    suspend fun createNewQuizByInstructor(
        @Path("course-id") id: String,
        @Header("x-auth-token") token: String,
        @Body request: PostQuizRequest
    ): Response<PostingQuizResponse>

    @Multipart
    @POST("assignment/courses/{course-id/assignments")
    suspend fun createNewAssignmentByInstructor(
        @Path("course-id") id: String,
        @Header("x-auth-token") token: String,
        @Part("title") title: RequestBody?,
        @Part("description") description: RequestBody?,
        @Part file: MultipartBody.Part?
    ): Response<ResponseBody>


    @DELETE("quiz/quizzes/{quiz-id}")
    suspend fun deleteTheQuizByInstructor(
        @Path("quiz-id") id: String,
        @Header("x-auth-token") token: String,
    ): Response<ResponseBody>

    @GET("course/courseDetails/{course-id}")
    suspend fun getEnrolledInCourseDetailsForStudent(
        @Path("course-id") id: String,
        @Header("x-auth-token") token: String,
    ): Response<CourseDetailsResponse>

    @GET("course/course-Details/{course-id}")
    suspend fun getControlledCourseDetailsForInstructor(
        @Path("course-id") id: String,
        @Header("x-auth-token") token: String,
    ): Response<CourseDetailsResponse>

    @GET("quiz/{quiz-id}/{course-id}")
    suspend fun getQuizQuestionsForStudentToAnswer(
        @Path("quiz-id") quizId: String,
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
    ): Response<QuizQuestionsResponse>

    @GET("quiz/{quiz-id}/{course-id}/forDoc")
    suspend fun getQuizQuestionsForInstructorOverView(
        @Path("quiz-id") quizId: String,
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
    ): Response<QuizQuestionsResponse>

    @POST("quiz/courses/{course-id}/quizzes/{quiz-id}/submit")
    suspend fun studentAnswerTheQuiz(
        @Path("course-id") courseId: String,
        @Path("quiz-id") quizId: String,
        @Header("x-auth-token") token: String,
        @Body request: AnswerQuizRequest
    ): Response<String>


    @GET("quiz/courses/{course-id}/quizzes/{quiz-id}/user/{user-id}")
    suspend fun getQuizMarksForTheStudent(
        @Path("course-id") courseId: String,
        @Path("quiz-id") quizId: String,
        @Path("user-id") userId: String,
        @Header("x-auth-token") token: String,
    ): Response<MyQuizMarksResponse>

    @GET("quiz/courseId/{course-id}/quizId/{quiz-id}")
    suspend fun getQuizMarksForInstructor(
        @Path("course-id") courseId: String,
        @Path("quiz-id") quizId: String,
        @Header("x-auth-token") token: String,
    ): Response<studentQuizGradesInstructorResponse>

    @GET("lecture/lec/{lec-id}")
    suspend fun getLectureByIdToViewItsContentForStudent(
        @Path("lec-id") lecId: String,
        @Header("x-auth-token") token: String,
    ): Response<LectureInfoResponse>

    @GET("lecture/lec/{lec-id}/course/{course-id}")
    suspend fun getLectureByIdToViewItsContentForInstructor(
        @Path("lec-id") lecId: String,
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
    ): Response<LectureInfoResponse>

    @GET("assignment/course/{course-id}/doctor/{doc-id}/allassignments")
    suspend fun getAllAssignmentsForInstructor(
        @Path("course-id") courseId: String,
        @Path("doc-id") docId: String,
        @Header("x-auth-token") token: String,
    ): Response<AllAssignmentsResponse>

    @GET("assignment/courses/{course-id}/assignments/{assignment-id}/responses")
    suspend fun getAllAssignmentsGradesForInstructor(
        @Path("course-id") courseId: String,
        @Path("assignment-id") assignmentId: String,
        @Header("x-auth-token") token: String,
    ): Response<UsersGradesResponse>

    @GET("assignment/course/{course-id}/user/{user-id}/allassignments")
    suspend fun getAllAssignmentsForStudent(
        @Path("course-id") courseId: String,
        @Path("user-id") docId: String,
        @Header("x-auth-token") token: String,
    ): Response<AllAssignmentsResponse>

    @DELETE("assignment/assignments/{assignment-id}")
    suspend fun deleteTheAssignmentByInstructor(
        @Path("assignment-id") courseId: String,
        @Header("x-auth-token") token: String,
    ): Response<ResponseBody>

    @GET("post/courses/{course-id}/posts/Mobile")
    suspend fun getAllDiscussionPostsForStudent(
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
    ): Response<AllPostsResponse>
    @GET("comment/courses/{course-id}/posts/{post-id}/comments/Mobile")
    suspend fun getAllCommentsOnSpecificPost(
        @Path("course-id") courseId: String,
        @Path("post-id") postId: String,
        @Header("x-auth-token") token: String,
    ): Response<AllCommentsOnSpecificCourse>

    @POST("comment/courses/{course-id}/posts/{post-id}/comments")
    suspend fun sendCommentsOnSpecificPost(
        @Path("course-id") courseId: String,
        @Path("post-id") postId: String,
        @Header("x-auth-token") token: String,
        @Body  content: SendCommentRequest,
    ): Response<CreatedCommentResponse>
    @POST("post/courses/{course-id}/posts")
    suspend fun createNewPost(
        @Path("course-id") courseId: String,
        @Header("x-auth-token") token: String,
        @Body  content: SendCommentRequest,
    ): Response<ResponseBody>



}

object ApiService {
    val retrofitService: MindaAPI by lazy {
        retrofit.create(MindaAPI::class.java)
    }
}

