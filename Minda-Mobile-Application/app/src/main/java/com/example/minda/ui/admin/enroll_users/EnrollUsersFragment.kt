package com.example.minda.ui.admin.enroll_users

import android.app.AlertDialog
import android.app.Application
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentEnrollUsersBinding
import com.example.minda.pojo.admin.EnrollRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class EnrollUsersFragment : Fragment() {
    private lateinit var binding: FragmentEnrollUsersBinding
    private val usersNames = mutableListOf<String>()
    private val usersEmail = mutableListOf<String>()

    private val coursesNames = mutableListOf<String>()
    private val coursesIds = mutableListOf<String>()
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_enroll_users,
            container,
            false
        )

        viewModel.getAllUsersForAdmin(SharedViewModel.currentLoggedInUserToken.value.toString())
        viewModel.getAllCoursesForAdmin(SharedViewModel.currentLoggedInUserToken.value.toString())

        viewModel.getAllUserForAdminStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                if (it.allUsers.isNotEmpty()) {
                    val sortedData = it.allUsers.sortedBy { item -> item.firstName }
                    sortedData.forEach { user ->
                        usersNames.add(user.firstName + " " + user.lastName)
                        usersEmail.add(user.email!!)
                    }
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter<String>(
                    requireContext(),
                    android.R.layout.simple_spinner_item,
                    usersNames
                )
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                binding.namesSpinner.adapter = adapter

                binding.loadingAllDataIndicator.visibility = View.GONE
                binding.choosingLayout.visibility = View.VISIBLE

            }else{
                showToast("Noo users",requireContext())
            }
        }


        viewModel.getAllCoursesForAdminStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                if (it.course!!.isNotEmpty()) {
                    val sortedData = it.course.sortedBy { item -> item.courseName}
                    sortedData.forEach { course ->
                        coursesNames.add(course.courseName!!)
                        coursesIds.add(course._id!!)
                    }
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter<String>(
                    requireContext(),
                    android.R.layout.simple_spinner_item,
                    coursesNames
                )
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                binding.coursesSpinner.adapter = adapter
                binding.loadingAllDataIndicator.visibility = View.GONE
                binding.choosingLayout.visibility = View.VISIBLE
            }else{
                showToast("Noo courses",requireContext())
            }
        }


        binding.confirmEnrollingBtn.setOnClickListener {

            val userName: String = binding.namesSpinner.selectedItem.toString()
            val idIndexOfUser = usersNames.indexOf(userName)

            val courseName: String = binding.coursesSpinner.selectedItem.toString()
            val idIndexOfCourse = coursesNames.indexOf(courseName)

            val userEmail = usersEmail[idIndexOfUser]
            val courseId = coursesIds[idIndexOfCourse]

            val request = EnrollRequest(email = userEmail)

            showConfirmDialog(courseId,request,userName,courseName)

        }


        viewModel.enrollingInOperationForAdminStatus.observe(viewLifecycleOwner){
            if (it == "Successfully enrolled in"){
                showToast(it.toString(),requireContext())
                findNavController().navigate(R.id.action_enrollUsersFragment_to_adminHomeFragment)
            }else{
                showToast(it,requireContext())
            }
        }

        return binding.root
    }


    private fun showConfirmDialog(courseId:String , request: EnrollRequest , userName:String, courseName:String) {
        val builder = AlertDialog.Builder(requireContext())
        builder.setTitle("Confirm enrollment")
            .setMessage("Are you sure to enroll $userName in course $courseName?")
            .setPositiveButton("Confirm") { dialog, _ ->
                viewModel.enrollAStudentIntoCourseByAdmin(
                    courseId = courseId,
                    token = SharedViewModel.currentLoggedInUserToken.value.toString(),
                    request = request
                )
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
            .show()
    }

}