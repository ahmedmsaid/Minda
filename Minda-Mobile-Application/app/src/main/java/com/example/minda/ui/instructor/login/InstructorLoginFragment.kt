package com.example.minda.ui.instructor.login


import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.minda.InstructorContentActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorLoginBinding


class InstructorLoginFragment : Fragment() {

    private lateinit var binding:FragmentInstructorLoginBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_instructor_login,container,false)

        binding.instructorLoginBtn.setOnClickListener {
            Intent(requireActivity(), InstructorContentActivity::class.java).also {
                startActivity(it)
            }
        }

        binding.instructorSignUpBtn.setOnClickListener {
            findNavController().navigate(R.id.action_instructorLoginFragment_to_instructorSignupFragment)
        }
        return binding.root
    }
}