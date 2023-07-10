package com.example.minda.ui.forget_pass

import android.annotation.SuppressLint
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
import com.example.minda.databinding.FragmentForgetPasswordBinding
import com.example.minda.pojo.password.EmailForResetPasswordRequest
import com.example.minda.pojo.password.VerifyCodeRequest
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class ForgetPasswordFragment : Fragment() {


    private lateinit var binding: FragmentForgetPasswordBinding
    private val viewModel: SharedViewModel by lazy {
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
            R.layout.fragment_forget_password,
            container,
            false
        )

        refreshData()

        return binding.root
    }


    @SuppressLint("SetTextI18n")
    private fun refreshData() {
        val email = requireArguments().getString("email")
        val type = requireArguments().getString("type")
        val noteText = binding.noteForForgetPass.text
        binding.noteForForgetPass.text = "$noteText \n $email"


        if (type == "student") {

            viewModel.beginForgetPasswordForStudent(EmailForResetPasswordRequest(email!!))
        } else {
            viewModel.beginForgetPasswordForInstructor(EmailForResetPasswordRequest(email!!))
        }

        viewModel.beginForgetPassStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                showToast(it, requireContext())
            } else {
                showToast("Try sending again", requireContext())
            }
        }

        var code = ""
        binding.verifyCodeBtn.setOnClickListener {
            code = binding.verificationCode.editText!!.text.toString()
            if (code.isEmpty() || code.isBlank()) {
                showToast("Enter code sent to your email!", requireContext())
            } else {
                val request = VerifyCodeRequest(code)
                if (type == "student"){

                    viewModel.validateTokenAndPassForStudent(request)
                }else{
                    viewModel.validateTokenAndPassForInstructor(request)
                }
            }
        }


        viewModel.validateTokenAndPassStatus.observe(viewLifecycleOwner) {
            showToast(it.toString() , requireContext())
            if (it != null) {
                val bundle = Bundle().apply {
                    putString("code", code)
                    putString("type", type)
                }
                    findNavController().navigate(
                        R.id.action_forgetPasswordFragment_to_resetPasswordFragment,
                        bundle
                    )

            }
        }
    }
}