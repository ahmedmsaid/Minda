package com.example.minda.ui.student.home

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.example.minda.R
import com.example.minda.adapter.StudentCoursesAdapter
import com.example.minda.databinding.FragmentStudentHomeBinding
import com.example.minda.utile.getIdOfLoggedInPerson
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class StudentHomeFragment : Fragment() {
    private lateinit var binding: FragmentStudentHomeBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    private lateinit var token: String
    private var id: String? = null
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_student_home,
            container,
            false
        )

        refreshHome()

        return binding.root
    }


    @SuppressLint("SetTextI18n")
    private fun refreshHome() {
        token = SharedViewModel.currentLoggedInUserToken.value.toString()
        if (token != "Your credential is not correct" && token != "Internal error") {
            id = getIdOfLoggedInPerson(token)!!
        }

        binding.enrolledCoursesLoadingIndicator.visibility = View.VISIBLE
        viewModel.getStudentProfile(id!!, token)

        viewModel.studentProfileStatus.observe(viewLifecycleOwner) { studentProfile ->
            if (studentProfile != null) {
                binding.studentName.text =
                    "${studentProfile.firstName} ${studentProfile.lastName}"

                SharedViewModel.currentLoggedInUserId.value = id
                SharedViewModel.currentLoggedInUserName.value = binding.studentName.text.toString()

                binding.noCoursesYetForStudent.visibility = View.GONE
                val coursesAdapter = StudentCoursesAdapter(this)
                if (studentProfile.profileimg.url != null) {

                    SharedViewModel.currentLoggedInUserImage.value = studentProfile.profileimg.url

                    Glide.with(requireContext())
                        .load(studentProfile.profileimg.url)
                        .placeholder(R.drawable.loading)
                        .error(R.drawable.user_pic_default)
                        .into(binding.studentImage)
                }
                if (studentProfile.enrolledCourses.isNotEmpty()) {
                    coursesAdapter.submitList(studentProfile.enrolledCourses)
                    binding.studentCoursesRecycler.adapter = coursesAdapter
                    binding.enrolledCoursesLoadingIndicator.visibility = View.GONE
                    binding.studentCoursesRecycler.visibility = View.VISIBLE
                } else {
                    binding.enrolledCoursesLoadingIndicator.visibility = View.GONE
                    binding.noCoursesYetForStudent.visibility = View.VISIBLE
                }
            } else {
                binding.enrolledCoursesLoadingIndicator.visibility = View.GONE
            }
        }
    }

}