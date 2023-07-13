package com.example.minda.ui.instructor.home

import android.annotation.SuppressLint
import android.app.Application
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide
import com.example.minda.R
import com.example.minda.adapter.InstructorCoursesAdapter
import com.example.minda.databinding.FragmentInstructorHomeBinding
import com.example.minda.util.getIdOfLoggedInPerson
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class InstructorHomeFragment : Fragment() {

    private lateinit var binding: FragmentInstructorHomeBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar

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
            R.layout.fragment_instructor_home,
            container,
            false
        )
        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.VISIBLE

        refreshHome()

        binding.addNewCourseBtn.setOnClickListener {
            findNavController().navigate(R.id.action_instructorHomeFragment_to_addCourseFragment)
        }

        return binding.root
    }


    @SuppressLint("SetTextI18n")
    private fun refreshHome() {
        token = SharedViewModel.currentLoggedInUserToken.value.toString()
        if (token != "Your credential is not correct" && token != "Internal error") {
            id = getIdOfLoggedInPerson(token)!!


            binding.loadingCoursesIndicator.visibility = View.VISIBLE
            viewModel.getInstructorProfile(id!!, token)

            viewModel.instructorProfileStatus.observe(viewLifecycleOwner) { instructorProfile ->
                if (instructorProfile != null) {
                    SharedViewModel.currentLoggedInUserId.value = id

                    binding.instructorName.text =
                        "${instructorProfile.firstName} ${instructorProfile.lastName}"

                    SharedViewModel.currentLoggedInUserName.value =
                        binding.instructorName.text.toString()

                    binding.noCoursesYet.visibility = View.GONE
                    val coursesAdapter = InstructorCoursesAdapter(this)
                    if (instructorProfile.profileimg?.url != null) {
                        SharedViewModel.currentLoggedInUserImage.value =
                            instructorProfile.profileimg.url
                        Glide.with(requireContext())
                            .load(instructorProfile.profileimg.url)
                            .placeholder(R.drawable.loading)
                            .error(R.drawable.user_pic_default)
                            .into(binding.instructorImage)
                    }
                    if (!instructorProfile.courses.isNullOrEmpty()) {
                        coursesAdapter.submitList(instructorProfile.courses)
                        binding.instructorCoursesRecycler.adapter = coursesAdapter
                        binding.loadingCoursesIndicator.visibility = View.GONE
                        binding.instructorCoursesRecycler.visibility = View.VISIBLE
                    } else {
                        binding.loadingCoursesIndicator.visibility = View.GONE
                        binding.noCoursesYet.visibility = View.VISIBLE
                    }
                } else {
                    binding.loadingCoursesIndicator.visibility = View.GONE
                }
            }
        }
    }

}