package com.example.minda.pojo.lecture

data class Lecture(
    val __v: Int,
    val _id: String,
    val courseData: CourseData,
    val decument: List<Any>,
    val description: String,
    val doctorData: DoctorData,
    val img: List<Any>,
    val title: String,
    val vedios: List<Vedio>
)