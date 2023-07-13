package com.example.minda.ui.instructor.add_quiz

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
import com.example.minda.databinding.FragmentAddQuizBinding
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class AddQuizFragment : Fragment() {

    private lateinit var binding:FragmentAddQuizBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar

    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View{
        // Inflate the layout for this fragment

        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_add_quiz, container, false)
        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        refreshData()


        return binding.root
    }

    private fun refreshData(){
        val courseId = requireArguments().getString("courseId")

        binding.nextQuizInfoBtn.setOnClickListener {
            val quizName = binding.quizNoEt.text.toString()
            val questionCount = binding.quizQuestionNumberEt.text.toString()
            val eachQuestionMark = binding.eachQuestionMarkEt.text.toString()

            if (quizName.isEmpty() || questionCount.isEmpty() || eachQuestionMark.isEmpty()){
                showToast("All fields are required!",requireContext())
            }else{
                val bundle = Bundle().apply {
                    putString("courseId",courseId)
                    putString("quizName",quizName)
                    putString("questionCount",questionCount)
                    putString("eachQuestionMark",eachQuestionMark)
                }

                findNavController().navigate(R.id.action_addQuizFragment_to_addQuizDetailFragment,bundle)
            }

        }

    }
//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }
}