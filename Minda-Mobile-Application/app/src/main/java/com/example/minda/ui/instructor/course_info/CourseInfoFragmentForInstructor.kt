package com.example.minda.ui.instructor.course_info

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
import com.example.minda.adapter.LecturesAdapter
import com.example.minda.adapter.QuizzesAdapter
import com.example.minda.databinding.FragmentCourseInfoBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class CourseInfoFragmentForInstructor : Fragment() {

    private lateinit var binding:FragmentCourseInfoBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    private lateinit var bottomNavigationBar: ChipNavigationBar


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_course_info,container,false)

        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        refreshData()

        return binding.root
    }


    private fun refreshData() {
        val courseId = requireArguments().getString("courseId")
        val courseName = requireArguments().getString("courseName")
        val courseDesc = requireArguments().getString("courseDesc")
        binding.courseInfoNameForInstructor.text = "$courseName"
        binding.courseDescriptionForInstructor.text = "$courseDesc"

        binding.addNewQuizBtn.setOnClickListener {
            val bundle = Bundle().apply {
                putString("courseId", courseId)
            }
            findNavController().navigate(R.id.action_courseInfoFragment_to_addQuizFragment , bundle)
        }

        SharedViewModel.currentLoggedInUserToken.value?.let {
            if (courseId != null) {
                viewModel.getControlledCourseDetailsForInstructor(
                    courseId,
                    it,
                )
            }
        }


        viewModel.instructorCourseDetailsStatus.observe(viewLifecycleOwner) { courseDetails ->

            if (courseDetails != null) {
                if (courseDetails.lectureId.isNotEmpty()) {
                    val lecAdapter = LecturesAdapter(this,"instructor")
                    LecturesAdapter.courseId = courseId!!
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
                    val quizAdapter = QuizzesAdapter(this,"instructor")
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

            }else{
                binding.noLecYetForInstructor.visibility = View.VISIBLE
                binding.noQuizYetForInstructor.visibility = View.VISIBLE
                binding.loadingInstructorLecIndicator.visibility= View.INVISIBLE
                binding.loadingInstructorQuizIndicator.visibility= View.INVISIBLE
            }
        }
    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }

}