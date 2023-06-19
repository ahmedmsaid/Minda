package com.example.minda.ui.instructor.add_assignment

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.example.minda.R
import com.example.minda.databinding.FragmentAddAssignmentBinding
import com.google.android.material.bottomsheet.BottomSheetDialogFragment

class AddAssignmentFragment : BottomSheetDialogFragment() {

    private lateinit var binding:FragmentAddAssignmentBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_add_assignment,container,false)

        binding.saveAssignmentBtn.setOnClickListener {
            dismiss()
        }
        return binding.root
    }
}