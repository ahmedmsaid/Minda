package com.example.minda.ui.instructor.home

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorHomeBinding
import com.example.minda.ui.instructor.add_course.AddCourseFragment

class InstructorHomeFragment : Fragment() {

    private lateinit var binding:FragmentInstructorHomeBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_instructor_home,container,false)

        binding.addNewCourseBtn.setOnClickListener {
//            findNavController().navigate(R.id.action_instructorHomeFragment_to_addCourseFragment)
            AddCourseFragment().show(requireActivity().supportFragmentManager,"addNewCourseSheet")
        }
        return binding.root
    }
}