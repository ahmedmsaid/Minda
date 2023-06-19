package com.example.minda.ui.instructor.lectures

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.example.minda.R
import com.example.minda.databinding.FragmentLectureInfoBinding

class LectureInfoFragment : Fragment() {
    private lateinit var binding:FragmentLectureInfoBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_lecture_info,container,false)


        return binding.root
    }
}