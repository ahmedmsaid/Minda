package com.example.minda.ui.splash

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentSplashBinding

class SplashFragment : Fragment() {

    private lateinit var binding:FragmentSplashBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_splash,container,false)

        for (i in 0..5){
            Thread.sleep((i*100).toLong())
        }
        findNavController().navigate(R.id.action_splashFragment_to_gettingStartFragment)
        return binding.root
    }
}