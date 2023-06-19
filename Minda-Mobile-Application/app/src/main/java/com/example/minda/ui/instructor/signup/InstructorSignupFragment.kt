package com.example.minda.ui.instructor.signup

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorSignupBinding

class InstructorSignupFragment : Fragment() {
    private lateinit var binding:FragmentInstructorSignupBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_instructor_signup,container,false)

        binding.instructorSingInBtn.setOnClickListener {
            findNavController().navigate(R.id.action_instructorSignupFragment_to_instructorLoginFragment)
        }
        return binding.root
    }
}