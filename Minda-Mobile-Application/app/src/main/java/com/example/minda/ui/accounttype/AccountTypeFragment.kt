package com.example.minda.ui.accounttype

import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentAccountTypeBinding

class AccountTypeFragment : Fragment() {

    private lateinit var binding: FragmentAccountTypeBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_account_type,
            container,
            false
        )

        binding.gettingStartedBtn.setOnClickListener {
            when (binding.accountTypeRadGroup.checkedRadioButtonId) {
                R.id.instructorRadBtn -> {
                    Toast.makeText(
                        requireContext(),
                        binding.instructorRadBtn.text.toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                }
                R.id.studentRadBtn -> {
                    Toast.makeText(
                        requireContext(),
                        binding.studentRadBtn.text.toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
            if (binding.accountTypeRadGroup.checkedRadioButtonId == -1){
                Toast.makeText(
                    requireContext(),
                  "Please select type!",
                    Toast.LENGTH_SHORT
                ).show()
            }else{
                findNavController().navigate(R.id.action_accountTypeFragment_to_splashFragment)
            }
        }
        return binding.root
    }
}