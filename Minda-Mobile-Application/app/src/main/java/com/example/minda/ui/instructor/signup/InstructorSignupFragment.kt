package com.example.minda.ui.instructor.signup

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
import com.example.minda.databinding.FragmentInstructorSignupBinding
import com.example.minda.pojo.instructor.auth.InstructorRegisterRequest
import com.example.minda.util.isValidEmail
import com.example.minda.util.isValidPassword
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class InstructorSignupFragment : Fragment() {
    private lateinit var binding: FragmentInstructorSignupBinding
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
            R.layout.fragment_instructor_signup,
            container,
            false
        )

        binding.instructorRegisterBtn.setOnClickListener {
            val username =
                binding.instructorUsernameForRegister.editText?.text.toString().split(" ").map { it.trim() }.filter { it.isNotBlank() }
            val email = binding.instructorEmailForRegister.editText?.text.toString()
            val password = binding.instructorPasswordForRegister.editText?.text.toString()
            val confirmPassword =
                binding.instructorConfirmPasswordForRegister.editText?.text.toString()
            val code = binding.instructorIdEt.editText?.text.toString()

            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty() || code.isEmpty()) {
                showToast("All fields are required!", requireContext())
            } else if (password != confirmPassword) {
                showToast("Passwords must match", requireContext())
            } else {
                if (username.size <= 1) {
                    showToast("Please enter your full name separated by space ", requireContext())
                } else {
                    if (isValidEmail(email) && isValidPassword(password)) {
                        val firstName = username[0].trimIndent().replaceFirstChar { it.uppercase() }
                        val lastName = username[username.size - 1].trimIndent().replaceFirstChar { it.uppercase() }
                        val request = InstructorRegisterRequest(
                            email = email.lowercase(),
                            password = password,
                            confirmPassword = confirmPassword,
                            firstName = firstName,
                           lastName =  lastName,
                           code =  code
                        )

                        viewModel.registerForInstructor(request)

                    }else{
                        showToast("Enter valid email or password",requireContext())
                    }
                }
            }
        }


        viewModel.instructorRegisterStatus.observe(viewLifecycleOwner){
            if (it != null){
                showToast("Hi, ${it.saveddoctor?.firstName}",requireContext())
                findNavController().navigate(R.id.action_instructorSignupFragment_to_instructorLoginFragment)
            }else{
                showToast("Not valid request, try again or change data",requireContext())
            }
        }


        binding.instructorSingInBtn.setOnClickListener {
            findNavController().navigate(R.id.action_instructorSignupFragment_to_instructorLoginFragment)
        }
        return binding.root
    }
}