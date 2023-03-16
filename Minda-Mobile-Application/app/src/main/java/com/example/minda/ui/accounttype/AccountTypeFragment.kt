package com.example.minda.ui.accounttype

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentAccountTypeBinding

class AccountTypeFragment : Fragment() {

    private lateinit var binding: FragmentAccountTypeBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_account_type,
            container,
            false
        )

        var choice:Int = -1

        binding.gettingStartedBtn.setOnClickListener {
            when (binding.accountTypeRadGroup.checkedRadioButtonId) {
                R.id.instructorRadBtn -> {
                    choice = 1
                }
                R.id.studentRadBtn -> {
                    choice = 2
                }
            }
            if (binding.accountTypeRadGroup.checkedRadioButtonId == -1){
                Toast.makeText(
                    requireContext(),
                  "Please select type!",
                    Toast.LENGTH_SHORT
                ).show()
            }else{
                if (choice == 1)
                    findNavController().navigate(R.id.action_accountTypeFragment_to_instructorLoginFragment)
                else
                    findNavController().navigate(R.id.action_accountTypeFragment_to_studentLoginFragment)
            }
        }
        return binding.root
    }
}