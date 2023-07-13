package com.example.minda.ui.student.course_info

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.AssignmentAdapter
import com.example.minda.adapter.LecturesAdapter
import com.example.minda.adapter.QuizzesAdapter
import com.example.minda.databinding.FragmentCourseInfoForStudentBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class CourseInfoFragmentForStudent : Fragment() {

    private lateinit var binding: FragmentCourseInfoForStudentBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar
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
        bottomNavigationBar = activity?.findViewById(R.id.studentBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        refreshData()


        return binding.root
    }

    @SuppressLint("SetTextI18n")
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

                viewModel.getAllAssignmentsForStudent(
                    courseId,
                    SharedViewModel.currentLoggedInUserId.value.toString(),
                    it
                )
            }
        }




        viewModel.studentCourseDetailsStatus.observe(viewLifecycleOwner) { courseDetails ->

            if (courseDetails != null) {
                if (courseDetails.lectureId.isNotEmpty()) {
                    val lecAdapter = LecturesAdapter(this, "student")
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
                    val quizAdapter = QuizzesAdapter(this, "student")
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

        viewModel.assignmentInfoStatus.observe(viewLifecycleOwner){
            if (it != null){
                val allData = it.allAssignments.assignmentsData
                if (allData.isNotEmpty()){
                    binding.loadingAssignmentsIndicatorForStudent.visibility  = View.GONE
                    val assignmentsAdapter = AssignmentAdapter(this,"student")
                    AssignmentAdapter.courseId = courseId!!
                    assignmentsAdapter.submitList(allData)
                    binding.studentAssignmentsRecycler.apply {
                        adapter = assignmentsAdapter
                        visibility = View.VISIBLE
                    }
                }else{
                    binding.loadingAssignmentsIndicatorForStudent.visibility  = View.GONE
                    binding.assignmentHintForStudent.apply {
                        text = "No assignments for you!"
                        visibility  = View.VISIBLE
                    }

                }
            }else{
                binding.assignmentHintForStudent.visibility = View.VISIBLE
            }
        }



        binding.openDiscussionBtn.setOnClickListener {

        val bundle = Bundle().apply {
            putString("courseName",courseName)
            putString("courseId",courseId)
        }

            findNavController().navigate(R.id.action_courseInfoFragmentForStudent_to_discussionFragment,bundle)
        }


    }
//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }
}
