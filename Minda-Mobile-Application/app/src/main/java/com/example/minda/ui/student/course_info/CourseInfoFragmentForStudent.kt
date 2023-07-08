package com.example.minda.ui.student.course_info

import android.app.Application
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.minda.R
import com.example.minda.adapter.LecturesAdapter
import com.example.minda.adapter.QuizzesAdapter
import com.example.minda.databinding.FragmentCourseInfoForStudentBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class CourseInfoFragmentForStudent : Fragment() {

    private lateinit var binding: FragmentCourseInfoForStudentBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_course_info_for_student,
            container,
            false
        )


        refreshData()


        return binding.root
    }

    private fun refreshData() {
        val courseId = requireArguments().getString("courseId")
        val courseName = requireArguments().getString("courseName")
        val courseDesc = requireArguments().getString("courseDesc")
        binding.courseInfoNameForStudent.text = "$courseName"
        binding.courseDescriptionForStudent.text = "$courseDesc"


        SharedViewModel.currentLoggedInUserToken.value?.let {
            if (courseId != null) {
                viewModel.getEnrolledInCourseDetailsForStudent(
                    courseId,
                    it,
                )
            }
        }


        viewModel.studentCourseDetailsStatus.observe(viewLifecycleOwner) { courseDetails ->

            if (courseDetails != null) {
                if (courseDetails.lectureId.isNotEmpty()) {
                    val lecAdapter = LecturesAdapter(this,"student")
                    LecturesAdapter.courseId = courseId!!
                    lecAdapter.submitList(courseDetails.lectureId)
                    binding.studentLecturesRecycler.apply {
                        adapter = lecAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingStudentsLecIndicator.visibility = View.GONE
                } else {
                    binding.noLecYetForStudent.visibility = View.VISIBLE
                    binding.loadingStudentsLecIndicator.visibility = View.GONE

                }

                if (courseDetails.quizzes.isNotEmpty()) {
                    val quizAdapter = QuizzesAdapter(this)
                    QuizzesAdapter.courseId = courseDetails._id
                    quizAdapter.submitList(courseDetails.quizzes)
                    binding.studentQuizzesRecycler.apply {
                        adapter = quizAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingStudentsQuizIndicator.visibility = View.GONE
                } else {
                    binding.noQuizYetForStudent.visibility = View.VISIBLE
                    binding.loadingStudentsQuizIndicator.visibility = View.GONE
                }

            } else {

                binding.noLecYetForStudent.visibility = View.VISIBLE
                binding.noQuizYetForStudent.visibility = View.VISIBLE
                binding.loadingStudentsLecIndicator.visibility = View.INVISIBLE
                binding.loadingStudentsQuizIndicator.visibility = View.INVISIBLE

            }
        }
    }
}
