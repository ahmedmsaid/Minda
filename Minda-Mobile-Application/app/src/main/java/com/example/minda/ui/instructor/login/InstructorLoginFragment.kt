package com.example.minda.ui.instructor.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
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

        return binding.root
    }
}