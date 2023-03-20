package com.example.minda.ui.student.login

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.fragment.findNavController
import com.example.minda.StudentContentActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentStudentLoginBinding


class StudentLoginFragment : Fragment() {
    private lateinit var binding:FragmentStudentLoginBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_student_login,container,false)

        binding.studentLoginBtn.setOnClickListener {
            Intent(requireActivity(),StudentContentActivity::class.java).also {
                startActivity(it)
            }
        }

        binding.studentSignUpBtn.setOnClickListener {
            findNavController().navigate(R.id.action_studentLoginFragment_to_studentSignupFragment)
        }
        return binding.root
    }
}