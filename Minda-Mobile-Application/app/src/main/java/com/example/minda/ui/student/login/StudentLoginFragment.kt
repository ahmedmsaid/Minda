package com.example.minda.ui.student.login

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
import com.example.minda.R
import com.example.minda.StudentContentActivity
import com.example.minda.databinding.FragmentStudentLoginBinding
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class StudentLoginFragment : Fragment() {
    private lateinit var binding: FragmentStudentLoginBinding
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
            R.layout.fragment_student_login,
            container,
            false
        )

        binding.studentLoginBtn.setOnClickListener {
            val email = binding.studentEmailForLogin.editText?.text.toString()
            val password = binding.studentPasswordForLogin.editText?.text.toString()
            if (email.isEmpty() || password.isEmpty()) {
                showToast("All fields are required!",requireContext())
            } else {
                val request = LoginRequest(email.lowercase(), password)
                viewModel.loginForStudent(request)
            }
        }

        viewModel.studentLoginStatus.observe(
            viewLifecycleOwner
        ) { value ->
            value.let { status ->
                if (status == "Your credential is not correct" || status == "Internal error") {
                    showToast(status,requireContext())
                } else {
                    SharedViewModel.currentLoggedInUserEmail.value =
                        binding.studentEmailForLogin.editText!!.text.toString()
                    Intent(requireActivity(), StudentContentActivity::class.java).also {
                        startActivity(it)
                    }
                }
            }
        }

        binding.studentSignUpBtn.setOnClickListener {
            findNavController().navigate(R.id.action_studentLoginFragment_to_studentSignupFragment)
        }

        binding.studentForgetPassword.setOnClickListener{
            val email = binding.studentEmailForLogin.editText!!.text.toString()
            if (email.isEmpty() || email.isBlank()){
                showToast("Enter your email first!",requireContext())
            }else{
                val bundle = Bundle().apply {
                    putString("email",email.lowercase())
                    putString("type","student")
                }

                findNavController().navigate(R.id.action_studentLoginFragment_to_forgetPasswordFragment,bundle)
            }
        }

        return binding.root
    }

}