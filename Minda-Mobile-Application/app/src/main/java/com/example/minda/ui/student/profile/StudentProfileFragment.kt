package com.example.minda.ui.student.profile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.example.minda.MainActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentStudentProfileBinding

class StudentProfileFragment : Fragment() {

    private lateinit var binding:FragmentStudentProfileBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding= DataBindingUtil.inflate(layoutInflater,R.layout.fragment_student_profile,container,false)

        binding.studentLogOutBtn.setOnClickListener {
            Intent(requireActivity(),MainActivity::class.java).also {
                startActivity(it)
            }
        }

        return binding.root
    }
}