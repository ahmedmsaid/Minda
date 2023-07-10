package com.example.minda.ui.instructor.profile

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.example.minda.MainActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorProfileBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar


class InstructorProfileFragment : Fragment() {

    private lateinit var binding: FragmentInstructorProfileBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar

    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_instructor_profile,
            container,
            false
        )

        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.VISIBLE

        refreshData()

        binding.instructorLogOutBtn.setOnClickListener {
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
            .into(binding.instructorProfilePic)


        binding.instructorName.text = SharedViewModel.currentLoggedInUserName.value
        binding.instructorEmail.text = SharedViewModel.currentLoggedInUserEmail.value

    }


}