package com.example.minda.ui.instructor.add_course

import android.app.Application
import android.os.Bundle
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.minda.R
import com.example.minda.databinding.FragmentAddCourseBinding
import com.example.minda.pojo.instructor.content.CreateCourseRequest
import com.example.minda.utile.getIdOfLoggedInPerson
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class AddCourseFragment : BottomSheetDialogFragment() {

    private lateinit var binding:FragmentAddCourseBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_add_course,container,false)

//        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
//        bottomNavigationBar.visibility = View.GONE

        val token:String?
        var id:String? = null

        token = SharedViewModel.currentLoggedInUserToken.value.toString()
        if (token != "Your credential is not correct" && token != "Internal error") {
            id = getIdOfLoggedInPerson(token)!!
//            viewModel.getLoggedInInstructorProfile(id, token)
        }


            binding.saveCourseBtn.setOnClickListener {
            val courseName = binding.courseTitleEt.text.toString()
            val description = binding.courseDescriptionEt.text.toString()

            if (validateInput(courseName,description)){
                Toast.makeText(requireContext(),"All fields are required!",Toast.LENGTH_SHORT).show()
            }else{
                val request = CreateCourseRequest(courseName,description)
                viewModel.createNewCourseByInstructor(id!!,token,request)
            }
        }

        viewModel.instructorCreateCourseStatus.observe(viewLifecycleOwner){
            if (it != null){
                dismiss()
            }else{
                showToast("Course creation failed!",requireContext())
            }
        }

        return binding.root
    }

    private fun validateInput(title:String , description:String ):Boolean{
        return (TextUtils.isEmpty(title) || TextUtils.isEmpty(description))
    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }
}