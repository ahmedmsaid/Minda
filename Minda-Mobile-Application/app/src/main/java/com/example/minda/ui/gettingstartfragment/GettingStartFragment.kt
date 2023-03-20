package com.example.minda.ui.gettingstartfragment

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.preference.PreferenceManager
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentGettingStartBinding

class GettingStartFragment : Fragment() {

    private lateinit var binding:FragmentGettingStartBinding
    private lateinit var prefs:SharedPreferences

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_getting_start,container,false)

        prefs = requireActivity().getSharedPreferences("MyPref",Context.MODE_PRIVATE)
        val editor = prefs.edit()

        if (prefs.getString("isFirstTime","no") == "yes"){
            findNavController().navigate(R.id.action_gettingStartFragment_to_accountTypeFragment)
        }


        binding.gettingStartedTxtId.setOnClickListener {
            editor.putString("isFirstTime","yes").apply()
            it.findNavController().navigate(R.id.action_gettingStartFragment_to_accountTypeFragment)
        }
        return binding.root
    }
}