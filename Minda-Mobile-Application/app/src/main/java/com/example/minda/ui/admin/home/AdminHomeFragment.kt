package com.example.minda.ui.admin.home

import android.app.Application
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentAdminHomeBinding
import com.example.minda.databinding.FragmentEnrollUsersBinding
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class AdminHomeFragment : Fragment() {
    private lateinit var binding: FragmentAdminHomeBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment

        binding = DataBindingUtil.inflate(layoutInflater, R.layout.fragment_admin_home, container, false)

        binding.enrollAStudentInCourse.setOnClickListener {
            findNavController().navigate(R.id.action_adminHomeFragment_to_enrollUsersFragment)
        }

        binding.generatACodeForInstructor.setOnClickListener {
            findNavController().navigate(R.id.action_adminHomeFragment_to_codesFragment)
        }

        binding.deleteAUserFromSystem.setOnClickListener {
            findNavController().navigate(R.id.action_adminHomeFragment_to_deleteUserFragment)
        }

        return binding.root
    }
}