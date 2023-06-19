package com.example.minda.ui.student.signup

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentStudentSignupBinding


class StudentSignupFragment : Fragment() {

    private lateinit var binding:FragmentStudentSignupBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_student_signup,container,false)

        binding.studentSignInBtn.setOnClickListener {
            findNavController().navigate(R.id.action_studentSignupFragment_to_studentLoginFragment)
        }
        return binding.root
    }
}