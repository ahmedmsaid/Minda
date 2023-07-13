package com.example.minda.ui.assignment_info

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.Application
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.AssignmentWorkAdapter
import com.example.minda.databinding.FragmentAssignmentInfoBinding
import com.example.minda.pojo.assignment.AssignmentResponse
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class AssignmentInfoFragment : Fragment() {

    private lateinit var binding: FragmentAssignmentInfoBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar
    private var allGradesGlobalList = listOf<AssignmentResponse>()
    private lateinit var assignmentId: String
    private lateinit var courseId: String
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
            R.layout.fragment_assignment_info,
            container,
            false
        )
        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE

        refreshData()

        return binding.root
    }


    @SuppressLint("SetTextI18n")
    private fun refreshData() {
        courseId = requireArguments().getString("courseId").toString()
        assignmentId = requireArguments().getString("assignmentId").toString()
        searchForResults()
        binding.deleteAssignmentBtn.setOnClickListener {
            showDeleteDialog()
        }


        viewModel.getAllAssignmentsGradesForInstructor(
            courseId,
            assignmentId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )


        viewModel.instructorDeleteAssignmentStatus.observe(viewLifecycleOwner){
            if (it == "Deleted successfully"){
                showToast(it,requireContext())
                findNavController().navigate(R.id.action_assignmentInfoFragment_to_instructorHomeFragment)
            }else{
                showToast(it,requireContext())
            }
        }

        viewModel.allInfoAboutAssignmentStatus.observe(viewLifecycleOwner) { grades ->
            if (grades != null) {
                binding.assignmentOverViewLoading.visibility = View.GONE
                val allData = grades.assignmentResponses
                if (allData.isNotEmpty()) {
                    val gradesAdapter = AssignmentWorkAdapter()
                    AssignmentWorkAdapter.myList = allData
                    gradesAdapter.submitList(allData)
                    allGradesGlobalList = allData
                    binding.assignmentSubmittedWorkRecycler.apply {
                        adapter = gradesAdapter
                        visibility = View.VISIBLE
                    }
                } else {
                    binding.assignmentOverViewLoading.visibility = View.GONE
                    binding.assignmentLoadingFailed.apply {
                        text = "No submitted work yet!"
                        visibility = View.VISIBLE
                    }
                }
            } else {
                binding.assignmentOverViewLoading.visibility = View.GONE
                binding.assignmentLoadingFailed.visibility = View.VISIBLE
            }
        }
    }


    private fun showDeleteDialog() {
        val builder = AlertDialog.Builder(context)
        builder.setTitle("Delete Item")
            .setMessage("Are you sure you want to delete this item?")
            .setPositiveButton("Delete") { dialog, _ ->
                deleteItem()
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
            .show()
    }

    private fun deleteItem() {
        viewModel.deleteTheAssignmentByInstructor(
            assignmentId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )
    }

    private fun searchForResults() {
        binding.findStudentGrade.visibility = View.VISIBLE
        binding.assignmentSubmittedWorkRecycler.visibility = View.GONE
        binding.assignmentOverViewLoading.visibility = View.VISIBLE


        binding.findStudentGrade.setOnClickListener {

            binding.assignmentSubmittedWorkRecycler.visibility = View.GONE
            val user = binding.searchInAssignmentGradesEt.text.toString()
            if (user.isEmpty() || user.isBlank()) {
                showToast("Enter a valid student name to search for", requireContext())
                binding.assignmentSubmittedWorkRecycler.visibility = View.VISIBLE
            } else {

                val matchedUsers: List<AssignmentResponse>
                val nameArgs = user.split(" ").map { it.trim() }.filter { it.isNotBlank() }
                when (nameArgs.size) {
                    1 -> {
                        matchedUsers = AssignmentWorkAdapter.myList.filter {
                            it.userId.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    2 -> {
                        matchedUsers = AssignmentWorkAdapter.myList.filter {
                            it.userId.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() }
                                    && it.userId.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    3 -> {
                        matchedUsers = AssignmentWorkAdapter.myList.filter {
                            it.userId.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.userId.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.userId.lastName.split(" ")[0] == nameArgs[2].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    else -> {
                        matchedUsers = AssignmentWorkAdapter.myList.filter {
                            it.userId.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.userId.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.userId.lastName.split(" ")[0] == nameArgs[2].lowercase().replaceFirstChar { first->first.uppercase() }
                                    && it.userId.lastName.split(" ")[1] == nameArgs[3].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                }


                val foundNamesAdapter = AssignmentWorkAdapter().apply {
                    submitList(matchedUsers)
                }
                binding.assignmentSubmittedWorkRecycler.apply {
                    adapter = foundNamesAdapter
                    visibility = View.VISIBLE
                }

            }

        }


        binding.searchInAssignmentGradesEt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                //Do nothing
            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                //Do nothing
            }

            override fun afterTextChanged(p0: Editable?) {
                if (p0.toString().isBlank() || p0.toString().isEmpty()) {
                    val newAdapter = AssignmentWorkAdapter().apply {
                        submitList(allGradesGlobalList)
                    }

                    binding.assignmentSubmittedWorkRecycler.apply {
                        adapter = newAdapter
                        visibility = View.VISIBLE
                    }
                }
            }
        })


    }

}