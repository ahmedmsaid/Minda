package com.example.minda.repository

import com.example.minda.data.ApiService
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

    suspend fun loginForAdmin(request: LoginRequest): String {
        val response = ApiService.retrofitService.loginForAdmin(request)
        return if (response.isSuccessful) {
            response.body()!!
        } else if (response.code() == 500) {
            "Your credential is not correct"
        } else {
            "Internal error"
        }
    }

    suspend fun getAllUsersForAdmin(token: String): ShowAllUsersResponse? {
        val response = ApiService.retrofitService.getAllUsersForAdmin(token)
        if (response.isSuccessful) {
            return response.body()!!
        }
        return null
    }

    suspend fun getAllCoursesForAdmin(token: String): ShowAllCoursesResponse? {
        val response = ApiService.retrofitService.getAllCoursesForAdmin(token)
        if (response.isSuccessful) {
            return response.body()!!
        }
        return null
    }

    suspend fun getAllCodesForAdmin(token: String): AllCodesResponse? {
        val response = ApiService.retrofitService.getAllCodesForAdmin(token)
        if (response.isSuccessful) {
            return response.body()!!
        }
        return null
    }

    suspend fun enrollAStudentIntoCourseByAdmin(
        courseId: String,
        token: String,
        request: EnrollRequest
    ): String {
        val response =
            ApiService.retrofitService.enrollAStudentIntoCourseByAdmin(courseId, token, request)
        if (response.isSuccessful) {
            return "Successfully enrolled in"
        }
        return "Failed enrolling in"
    }

    suspend fun deleteSpecificUserForAdmin(
        userId: String,
        token: String
    ): String {
        val response =
            ApiService.retrofitService.deleteSpecificUserForAdmin(userId, token)
        if (response.isSuccessful) {
            return "User is deleted successfully"
        }
        return "Failed deleting"
    }

    suspend fun generateInstructorCodeByAdmin(
        adminId: String,
        token: String
    ): GeneratedCodeResponse? {
        val response =
            ApiService.retrofitService.generateInstructorCodeByAdmin(adminId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
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

    suspend fun beginForgetPasswordForStudent(emailRequest: EmailForResetPasswordRequest): String? {
        val response = ApiService.retrofitService.beginForgetPasswordForStudent(emailRequest)
        if (response.isSuccessful) {
            return "Code sent to email"
        }
        return null
    }

    suspend fun sendingTokenAndPassForStudent(request: ResetPasswordRequest): String? {
        val response = ApiService.retrofitService.sendingTokenAndPassForStudent(request)
        if (response.isSuccessful) {
            return "Password reset successfully"
        }
        return null
    }

    suspend fun validateTokenAndPassForStudent(token: VerifyCodeRequest): String? {
        val response = ApiService.retrofitService.validateTokenAndPassForStudent(token)
        if (response.isSuccessful) {
            return "Valid"
        }
        return null
    }

    suspend fun beginForgetPasswordForInstructor(emailRequest: EmailForResetPasswordRequest): String? {
        val response = ApiService.retrofitService.beginForgetPasswordForInstructor(emailRequest)
        if (response.isSuccessful) {
            return "code sent to the email"
        }
        return null
    }

    suspend fun validateTokenAndPassForInstructor(token: VerifyCodeRequest): String? {
        val response = ApiService.retrofitService.validateTokenAndPassForInstructor(token)
        if (response.isSuccessful) {
            return "Valid"
        }
        return null
    }

    suspend fun sendingTokenAndPassForInstructor(request: ResetPasswordRequest): String? {
        val response = ApiService.retrofitService.sendingTokenAndPassForInstructor(request)
        if (response.isSuccessful) {
            return "Password rest successfully"
        }
        return null
    }

    suspend fun getInstructorProfile(id: String, token: String): InstructorProfileResponse? {
        val response = ApiService.retrofitService.getInstructorProfile(id, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getStudentProfile(id: String, token: String): StudentProfileResponse? {
        val response = ApiService.retrofitService.getStudentProfile(id, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun createNewCourseByInstructor(
        id: String,
        token: String,
        request: CreateCourseRequest
    ): CreatedCourseResponse? {
        val response = ApiService.retrofitService.createNewCourseByInstructor(id, token, request)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun createNewQuizByInstructor(
        id: String,
        token: String,
        request: PostQuizRequest
    ): PostingQuizResponse? {
        val response = ApiService.retrofitService.createNewQuizByInstructor(id, token, request)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    //    suspend fun createNewAssignmentByInstructor(courseId:String, token:String, title: String,
//                                                description:String, fileUri: Uri,fileRealPath: String):String?{
//
//
//        val fileToSend = prepareFilePart(title, fileRealPath,fileUri)
//        val assignmentTitleRequestBody: RequestBody = RequestBody.create(MediaType.parse("text/plain"), title)
//        val assignmentDescriptionRequestBody: RequestBody = RequestBody.create(MediaType.parse("text/plain"), description)
//
//        val response = ApiService.retrofitService.createNewAssignmentByInstructor(courseId,token,
//            assignmentTitleRequestBody,assignmentDescriptionRequestBody,fileToSend)
//
//        if (response.isSuccessful){
//            return "Uploaded successfully"
//        }
//        return null
//    }
    suspend fun deleteTheQuizByInstructor(id: String, token: String): String {
        val response = ApiService.retrofitService.deleteTheQuizByInstructor(id, token)
        if (response.isSuccessful) {
            return "Deleted successfully"
        }
        return "Failed to delete"
    }

    suspend fun deleteTheAssignmentByInstructor(id: String, token: String): String {
        val response = ApiService.retrofitService.deleteTheAssignmentByInstructor(id, token)
        if (response.isSuccessful) {
            return "Deleted successfully"
        }
        return "Failed to delete"
    }

    suspend fun getEnrolledInCourseDetailsForStudent(
        id: String,
        token: String
    ): CourseDetailsResponse? {
        val response = ApiService.retrofitService.getEnrolledInCourseDetailsForStudent(id, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getControlledCourseDetailsForInstructor(
        id: String,
        token: String
    ): CourseDetailsResponse? {
        val response = ApiService.retrofitService.getControlledCourseDetailsForInstructor(id, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getQuizQuestionsForStudentToAnswer(
        quizId: String,
        courseId: String,
        token: String
    ): QuizQuestionsResponse? {
        val response =
            ApiService.retrofitService.getQuizQuestionsForStudentToAnswer(quizId, courseId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getQuizQuestionsForInstructorOverView(
        quizId: String,
        courseId: String,
        token: String
    ): QuizQuestionsResponse? {
        val response = ApiService.retrofitService.getQuizQuestionsForInstructorOverView(
            quizId,
            courseId,
            token
        )
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun studentAnswerTheQuiz(
        courseId: String,
        quizId: String,
        token: String,
        request: AnswerQuizRequest
    ): String? {
        val response =
            ApiService.retrofitService.studentAnswerTheQuiz(courseId, quizId, token, request)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getQuizMarksForTheStudent(
        courseId: String,
        quizId: String,
        userId: String,
        token: String
    ): MyQuizMarksResponse? {
        val response =
            ApiService.retrofitService.getQuizMarksForTheStudent(courseId, quizId, userId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getQuizMarksForInstructor(
        courseId: String,
        quizId: String,
        token: String
    ): studentQuizGradesInstructorResponse? {
        val response = ApiService.retrofitService.getQuizMarksForInstructor(courseId, quizId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getLectureByIdToViewItsContentForStudent(
        lecId: String,
        token: String
    ): LectureInfoResponse? {
        val response =
            ApiService.retrofitService.getLectureByIdToViewItsContentForStudent(lecId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getLectureByIdToViewItsContentForInstructor(
        lecId: String,
        courseId: String,
        token: String
    ): LectureInfoResponse? {
        val response = ApiService.retrofitService.getLectureByIdToViewItsContentForInstructor(
            lecId,
            courseId,
            token
        )
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getAllAssignmentsForInstructor(
        courseId: String,
        docId: String,
        token: String
    ): AllAssignmentsResponse? {
        val response =
            ApiService.retrofitService.getAllAssignmentsForInstructor(courseId, docId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getAllAssignmentsGradesForInstructor(
        courseId: String,
        assignmentId: String,
        token: String
    ): UsersGradesResponse? {
        val response = ApiService.retrofitService.getAllAssignmentsGradesForInstructor(
            courseId,
            assignmentId,
            token
        )
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getAllAssignmentsForStudent(
        courseId: String,
        userId: String,
        token: String
    ): AllAssignmentsResponse? {
        val response =
            ApiService.retrofitService.getAllAssignmentsForStudent(courseId, userId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun getAllDiscussionPostsForStudent(
        courseId: String,token: String): AllPostsResponse? {
        val response = ApiService.retrofitService.getAllDiscussionPostsForStudent(courseId, token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }
    suspend fun getAllCommentsOnSpecificPost(
        courseId: String,postId:String,token: String): AllCommentsOnSpecificCourse? {
        val response = ApiService.retrofitService.getAllCommentsOnSpecificPost(courseId,postId,token)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }
    suspend fun sendCommentsOnSpecificPost(
        courseId: String,postId:String,token: String,content:SendCommentRequest): CreatedCommentResponse? {
        val response = ApiService.retrofitService.sendCommentsOnSpecificPost(courseId,postId,token,content)
        if (response.isSuccessful) {
            return response.body()
        }
        return null
    }

    suspend fun createNewPost(
        courseId: String,token: String,content:SendCommentRequest): Int? {
        val response = ApiService.retrofitService.createNewPost(courseId,token,content)
        if (response.isSuccessful) {
            return 1
        }
        return null
    }

//    private fun prepareFilePart(partName: String,fileRealPath: String,fileUri: Uri): MultipartBody.Part {
//        val file: File = File(fileRealPath)
//        val requestFile: RequestBody = RequestBody.create(
//            MediaType.parse(context.contentResolver.getType(fileUri)!!), file)
//        return MultipartBody.Part.createFormData(partName, file.name, requestFile)
//    }
}