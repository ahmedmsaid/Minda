package com.example.minda.ui.instructor.course_info

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
import com.example.minda.databinding.FragmentCourseInfoBinding
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class CourseInfoFragmentForInstructor : Fragment() {

    private lateinit var binding: FragmentCourseInfoBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    private lateinit var bottomNavigationBar: ChipNavigationBar


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_course_info, container, false)

        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        refreshData()

        return binding.root
    }


    @SuppressLint("SetTextI18n")
    private fun refreshData() {
        val courseId = requireArguments().getString("courseId")
        val courseName = requireArguments().getString("courseName")
        val courseDesc = requireArguments().getString("courseDesc")


        // isolated call for assignments
        viewModel.getAllAssignmentsForInstructor(
            courseId!!,
            SharedViewModel.currentLoggedInUserId.value.toString(),
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )





        binding.courseInfoNameForInstructor.text = "$courseName"
        binding.courseDescriptionForInstructor.text = "$courseDesc"

        val bundle = Bundle().apply {
            putString("courseId", courseId)
        }
        binding.addNewQuizBtn.setOnClickListener {
            findNavController().navigate(R.id.action_courseInfoFragment_to_addQuizFragment, bundle)
        }

        SharedViewModel.currentLoggedInUserToken.value?.let {
            viewModel.getControlledCourseDetailsForInstructor(
                courseId,
                it,
            )
        }


        viewModel.instructorCourseDetailsStatus.observe(viewLifecycleOwner) { courseDetails ->

            if (courseDetails != null) {
                if (courseDetails.lectureId.isNotEmpty()) {
                    val lecAdapter = LecturesAdapter(this, "instructor")
                    LecturesAdapter.courseId = courseId
                    lecAdapter.submitList(courseDetails.lectureId)
                    binding.InstructorLecturesRecycler.apply {
                        adapter = lecAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingInstructorLecIndicator.visibility = View.GONE
                } else {
                    binding.noLecYetForInstructor.visibility = View.VISIBLE
                    binding.loadingInstructorLecIndicator.visibility = View.GONE

                }

                if (courseDetails.quizzes.isNotEmpty()) {
                    val quizAdapter = QuizzesAdapter(this, "instructor")
                    QuizzesAdapter.courseId = courseId!!
                    quizAdapter.submitList(courseDetails.quizzes)
                    binding.InstructorQuizzesRecycler.apply {
                        adapter = quizAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingInstructorQuizIndicator.visibility = View.GONE
                } else {
                    binding.noQuizYetForInstructor.visibility = View.VISIBLE
                    binding.loadingInstructorQuizIndicator.visibility = View.GONE
                }

            } else {
                binding.noLecYetForInstructor.visibility = View.VISIBLE
                binding.noQuizYetForInstructor.visibility = View.VISIBLE
                binding.loadingInstructorLecIndicator.visibility = View.INVISIBLE
                binding.loadingInstructorQuizIndicator.visibility = View.INVISIBLE
            }
        }



        viewModel.assignmentInfoStatus.observe(viewLifecycleOwner){allAssignmentsResponse->
            if (allAssignmentsResponse != null){
                val allData = allAssignmentsResponse.allAssignments.assignmentsData
                if (allData.isNotEmpty()){
                    val assignmentsAdapter = AssignmentAdapter(this,"instructor")
                    AssignmentAdapter.courseId = courseId
                    assignmentsAdapter.submitList(allData)
                    binding.instructorAssignmentsRecycler.apply {
                        adapter = assignmentsAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingAssignmentsIndicator.visibility = View.GONE
                }else{
                    binding.loadingAssignmentsIndicator.visibility = View.GONE
                    binding.noAssignmentHintForInstructor.visibility = View.VISIBLE
                }
            }else{
                binding.loadingAssignmentsIndicator.visibility = View.GONE
                binding.noAssignmentHintForInstructor.apply {
                    text = "Failed loading"
                    visibility = View.VISIBLE
                }

            }
        }


    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }

}