package com.example.minda.ui.instructor.profile

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.example.minda.MainActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorProfileBinding


class InstructorProfileFragment : Fragment() {

    private lateinit var binding:FragmentInstructorProfileBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_instructor_profile,container,false)

        binding.instructorLogOutBtn.setOnClickListener {
            Intent(requireActivity(),MainActivity::class.java).also {
                startActivity(it)
            }
        }

        return binding.root
    }
}