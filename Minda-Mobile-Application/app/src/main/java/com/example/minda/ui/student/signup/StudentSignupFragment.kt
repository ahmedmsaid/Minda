package com.example.minda.ui.student.signup

import android.app.Application
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentStudentSignupBinding
import com.example.minda.pojo.student.auth.StudentRegisterRequest
import com.example.minda.util.isValidEmail
import com.example.minda.util.isValidPassword
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class StudentSignupFragment : Fragment() {

    private lateinit var binding: FragmentStudentSignupBinding
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
            R.layout.fragment_student_signup,
            container,
            false
        )

        binding.studentRegisterBtn.setOnClickListener {
            val username =
                binding.studentUsernameRegister.editText?.text.toString()
            val email = binding.studentEmailForRegister.editText?.text.toString()
            val password = binding.studentPasswordForRegister.editText?.text.toString()
            val confirmPassword =
                binding.studentConfirmPasswordForRegister.editText?.text.toString()

            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
                showToast("All fields are required!", requireContext())
            } else if (password != confirmPassword) {
                showToast("Passwords must match", requireContext())
            } else {
                val updatedUsername = username.split(" ").map { it.trim() }.filter { it.isNotBlank() }
                if (updatedUsername.size != 4) {
                    showToast("Please enter your full name as in NAT.Id", requireContext())
                } else {
                    if (isValidEmail(email) && isValidPassword(password)) {
                        val firstName = updatedUsername[0].lowercase().replaceFirstChar { it.uppercase() } + " " + updatedUsername[1].lowercase().replaceFirstChar { it.uppercase() }
                        val lastName = updatedUsername[2].lowercase().replaceFirstChar { it.uppercase() } + " " + updatedUsername[3].lowercase().replaceFirstChar { it.uppercase() }
                        val request = StudentRegisterRequest(
                            email = email.lowercase(),
                            password = password,
                            confirmPassword = confirmPassword,
                            firstName = firstName,
                            lastName = lastName
                        )
                        viewModel.registerForStudent(request)

                    } else {
                        showToast("Enter valid email or password", requireContext())
                    }
                }
            }

        }


        viewModel.studentRegisterStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                showToast("Hi, ${it.firstName}", requireContext())
                findNavController().navigate(R.id.action_studentSignupFragment_to_studentLoginFragment)
            } else {
                showToast("Not valid request, try again or change data", requireContext())
            }
        }

        binding.studentSignInBtn.setOnClickListener {
            findNavController().navigate(R.id.action_studentSignupFragment_to_studentLoginFragment)
        }
        return binding.root
    }
}