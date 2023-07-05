package com.example.minda.ui.student.profile

import android.annotation.SuppressLint
import android.app.Application
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.example.minda.MainActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentStudentProfileBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class StudentProfileFragment : Fragment() {

    private lateinit var binding: FragmentStudentProfileBinding
    private val viewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_student_profile,
            container,
            false
        )

        refreshData()

        binding.studentLogOutBtn.setOnClickListener {
            Intent(requireActivity(), MainActivity::class.java).also {
                startActivity(it)
            }
        }

        return binding.root
    }

    private fun refreshData() {
        Glide.with(requireContext())
            .load(SharedViewModel.currentLoggedInUserImage)
            .placeholder(R.drawable.loading)
            .error(R.drawable.user_pic_default)
            .into(binding.studentProfilePic)


        binding.studentName.text = SharedViewModel.currentLoggedInUserName.value
        binding.studentEmail.text = SharedViewModel.currentLoggedInUserEmail.value
    }
}