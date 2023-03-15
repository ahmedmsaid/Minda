package com.example.minda.ui.gettingstartfragment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentGettingStartBinding

class GettingStartFragment : Fragment() {

    private lateinit var binding:FragmentGettingStartBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_getting_start,container,false)

        binding.gettingStartedTxtId.setOnClickListener {
            it.findNavController().navigate(R.id.action_gettingStartFragment_to_accountTypeFragment)
        }

        return binding.root
    }
}