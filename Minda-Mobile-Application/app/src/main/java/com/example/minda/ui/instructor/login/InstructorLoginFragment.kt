package com.example.minda.ui.instructor.login


import android.app.Application
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.InstructorContentActivity
import com.example.minda.R
import com.example.minda.databinding.FragmentInstructorLoginBinding
import com.example.minda.pojo.LoginRequest
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class InstructorLoginFragment : Fragment() {

    private lateinit var binding: FragmentInstructorLoginBinding
    private val viewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_instructor_login,
            container,
            false
        )

        binding.instructorLoginBtn.setOnClickListener {
            val email = binding.instructorEmailForLogin.editText?.text.toString()
            val password = binding.instructorPasswordForLogin.editText?.text.toString()
            if (email.isEmpty() || password.isEmpty()) {
                showToast("All fields are required!", requireContext())
            } else {
                val request = LoginRequest(email.lowercase(), password)
                viewModel.loginForInstructor(request)
            }
        }

        viewModel.instructorLoginStatus.observe(
            viewLifecycleOwner
        ) { status ->
            status.let { value ->
                if (value == "Your credential is not correct" || value == "Internal error") {
                    showToast(value, requireContext())
                } else {
                    viewModel.currentLoggedInUserToken.value = value
                    Intent(requireActivity(), InstructorContentActivity::class.java).also {
                        startActivity(it)
                    }
                }
            }
        }

        binding.instructorSignUpBtn.setOnClickListener {
            findNavController().navigate(R.id.action_instructorLoginFragment_to_instructorSignupFragment)
        }
        return binding.root
    }
}