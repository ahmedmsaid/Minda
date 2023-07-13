package com.example.minda.ui.admin.login

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
import com.example.minda.databinding.FragmentAdminLoginBinding
import com.example.minda.pojo.login.LoginRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class AdminLoginFragment : Fragment() {

    private lateinit var binding: FragmentAdminLoginBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_admin_login, container, false)



        viewModel.adminLoginStatus.observe(viewLifecycleOwner){response->
            when (response) {
                "Your credential is not correct" -> {
                    showToast(response , requireContext())
                }
                "Internal error" -> {
                    showToast(response,requireContext())
                }
                else -> {
                    findNavController().navigate(R.id.action_adminLoginFragment_to_adminHomeFragment)
                }
            }
        }




        binding.adminLoginBtn.setOnClickListener {
            val email = binding.adminEmailForLogin.editText!!.text.toString()
            val password = binding.adminPasswordForLogin.editText!!.text.toString()
            if (email.isEmpty() || password.isEmpty()) {
                showToast("All fields are required!", requireContext())
            } else {
                val request = LoginRequest(email = email , password = password)
                viewModel.loginForAdmin(request)
            }
        }

        return binding.root
    }
}