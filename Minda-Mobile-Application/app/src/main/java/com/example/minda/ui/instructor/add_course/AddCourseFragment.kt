package com.example.minda.ui.instructor.add_course

import android.os.Bundle
import android.text.TextUtils
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.example.minda.R
import com.example.minda.databinding.FragmentAddCourseBinding

class AddCourseFragment : Fragment() {

    private lateinit var binding:FragmentAddCourseBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_add_course,container,false)

        binding.saveCourseBtn.setOnClickListener {
            val title = binding.courseTitleEt.text.toString()
            val description = binding.courseDescriptionEt.text.toString()
            val duration = binding.durationIdEt.text.toString()

            if (validateInput(title,description, duration)){
                Toast.makeText(requireContext(),"All fields are required!",Toast.LENGTH_SHORT).show()
            }
        }

        return binding.root
    }

    private fun validateInput(title:String , description:String , duration:String):Boolean{
        return (TextUtils.isEmpty(title) || TextUtils.isEmpty(description) || TextUtils.isEmpty(duration))
    }
}