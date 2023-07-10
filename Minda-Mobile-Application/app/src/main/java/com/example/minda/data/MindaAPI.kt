package com.example.minda.data

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
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import java.util.concurrent.TimeUnit


private const val BASE_URL = "https://e-learning1.onrender.com/api/"

const val timeoutDuration = 5L // Timeout duration in seconds
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

    @POST("quiz/courses/{course-id}/quizze")
    suspend fun createNewQuizByInstructor(
        @Path("course-id") id: String,
        @Header("x-auth-token") token: String,
        @Body request: PostQuizRequest
    ): Response<PostingQuizResponse>

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

}

object ApiService {
    val retrofitService: MindaAPI by lazy {
        retrofit.create(MindaAPI::class.java)
    }
}

