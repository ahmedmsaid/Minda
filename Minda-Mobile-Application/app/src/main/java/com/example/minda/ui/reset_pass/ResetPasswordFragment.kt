package com.example.minda.ui.reset_pass

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
import com.example.minda.databinding.FragmentResetPasswordBinding
import com.example.minda.pojo.password.ResetPasswordRequest
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory


class ResetPasswordFragment : Fragment() {

    private lateinit var binding:FragmentResetPasswordBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_reset_password, container, false)

        refreshData()

        return binding.root
    }

    private fun refreshData(){
        val code = requireArguments().getString("code")
        val type = requireArguments().getString("type")

        binding.resetPasswordBtn.setOnClickListener {
            val pass = binding.passwordForResetting.editText!!.text.toString()
            val confirmPass = binding.confirmPasswordForResetting.editText!!.text.toString()

            if (pass.isEmpty() || confirmPass.isEmpty()){
                showToast("All fields are required!",requireContext())
            }else{
                if (pass != confirmPass){
                    showToast("Passwords must match!",requireContext())
                }else{
                    val request = ResetPasswordRequest(password = pass , token =  code!!)
                    if (type == "student"){
                        viewModel.sendingTokenAndPassForStudent(request)
                    }else{
                        viewModel.sendingTokenAndPassForInstructor(request)
                    }
                }
            }
        }


        viewModel.sendingTokenAndPassStatus.observe(viewLifecycleOwner){
            if (it != null){
                showToast(it,requireContext())
                if (type == "student"){
                    findNavController().navigate(R.id.action_resetPasswordFragment_to_studentLoginFragment)
                }else{
                    findNavController().navigate(R.id.action_resetPasswordFragment_to_instructorLoginFragment)
                }
            }else{
                showToast("Resetting password failed",requireContext())
            }
        }
    }

}