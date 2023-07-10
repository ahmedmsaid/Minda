package com.example.minda.ui.instructor.add_quiz

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.Application
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.GradesAdapter
import com.example.minda.adapter.QuizOverViewAdapter
import com.example.minda.databinding.FragmentInstructorHomeBinding
import com.example.minda.databinding.FragmentQuizOverviewBinding
import com.example.minda.pojo.instructor.content.quiz.grades.QuizResponseData
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class QuizOverviewFragment : Fragment() {

    private lateinit var binding: FragmentQuizOverviewBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    private lateinit var quizId: String
    private lateinit var courseId: String
    private var allGradesGlobalList = listOf<QuizResponseData>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_quiz_overview,
            container,
            false
        )

        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        courseId = requireArguments().getString("courseId")!!
        quizId = requireArguments().getString("quizId")!!


        refreshData()

        return binding.root
    }

    private fun refreshData() {
        showQuestion()
        binding.showQuestionsBtn.setBackgroundResource(R.color.veryDarkGray)
        binding.searchBtn.setBackgroundResource(R.color.primary_dark_orange)
        binding.deleteBtn.setBackgroundResource(R.color.primary_dark_orange)

        binding.showQuestionsBtn.setOnClickListener {
            it.setBackgroundResource(R.color.veryDarkGray)
            binding.searchBtn.setBackgroundResource(R.color.primary_dark_orange)
            binding.deleteBtn.setBackgroundResource(R.color.primary_dark_orange)
            showQuestion()
        }

        binding.searchBtn.setOnClickListener {
            it.setBackgroundResource(R.color.veryDarkGray)
            binding.showQuestionsBtn.setBackgroundResource(R.color.primary_dark_orange)
            binding.deleteBtn.setBackgroundResource(R.color.primary_dark_orange)
            searchForResults()
        }
        binding.deleteBtn.setOnClickListener {
            it.setBackgroundResource(R.color.veryDarkGray)
            binding.showQuestionsBtn.setBackgroundResource(R.color.primary_dark_orange)
            binding.searchBtn.setBackgroundResource(R.color.primary_dark_orange)
            deleteQuiz()
        }

        observeData()
    }

    private fun showQuestion() {

        binding.overViewLoading.visibility = View.VISIBLE
        binding.textInputLayout.visibility = View.GONE
        binding.findUserGrade.visibility = View.GONE
        binding.questionLoadingFailed.visibility = View.GONE
        binding.quizOverviewRecycler.visibility = View.GONE

        viewModel.getQuizQuestionsForInstructorOverView(
            quizId,
            courseId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )
    }

    private fun searchForResults() {
        binding.textInputLayout.visibility = View.VISIBLE
        binding.findUserGrade.visibility = View.VISIBLE
        binding.quizOverviewRecycler.visibility = View.GONE
        binding.overViewLoading.visibility = View.VISIBLE

        viewModel.getQuizMarksForInstructor(
            courseId,
            quizId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )


        binding.findUserGrade.setOnClickListener {

            binding.quizOverviewRecycler.visibility = View.GONE
            val user = binding.searchInQuizGradesEt.text.toString()
            if (user.isEmpty() || user.isBlank()) {
                showToast("Enter a valid student name to search for", requireContext())
                binding.quizOverviewRecycler.visibility = View.VISIBLE
            } else {

                val matchedUsers: List<QuizResponseData>
                val nameArgs = user.split(" ").map { it.trim() }.filter { it.isNotBlank() }
                when (nameArgs.size) {
                    1 -> {
                        matchedUsers = GradesAdapter.myList.filter {
                            it.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    2 -> {
                        matchedUsers = GradesAdapter.myList.filter {
                            it.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() }
                                    && it.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    3 -> {
                        matchedUsers = GradesAdapter.myList.filter {
                            it.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.lastName.split(" ")[0] == nameArgs[2].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                    else -> {
                        matchedUsers = GradesAdapter.myList.filter {
                            it.firstName.split(" ")[0] == nameArgs[0].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.firstName.split(" ")[1] == nameArgs[1].lowercase().replaceFirstChar { first->first.uppercase() } &&
                                    it.lastName.split(" ")[0] == nameArgs[2].lowercase().replaceFirstChar { first->first.uppercase() }
                                    && it.lastName.split(" ")[1] == nameArgs[3].lowercase().replaceFirstChar { first->first.uppercase() }
                        }
                    }
                }


                val foundNamesAdapter = GradesAdapter().apply {
                    submitList(matchedUsers)
                }
                binding.quizOverviewRecycler.apply {
                    adapter = foundNamesAdapter
                    visibility = View.VISIBLE
                }

            }

        }



        binding.searchInQuizGradesEt.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                //Do nothing
            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                //Do nothing
            }

            override fun afterTextChanged(p0: Editable?) {
                if (p0.toString().isBlank() || p0.toString().isEmpty()) {
                    val newAdapter = GradesAdapter().apply {
                        submitList(allGradesGlobalList)
                    }

                    binding.quizOverviewRecycler.apply {
                        adapter = newAdapter
                        visibility = View.VISIBLE
                    }
                }
            }
        })


    }

    private fun deleteQuiz() {
        showDeleteDialog()
    }


    @SuppressLint("SetTextI18n")
    private fun observeData() {
        viewModel.QuizQuestionsOverViewStatus.observe(viewLifecycleOwner) { quizResponse ->
            if (quizResponse != null) {
                binding.overViewLoading.visibility = View.GONE
                val questionsAdapter = QuizOverViewAdapter()
                questionsAdapter.submitList(quizResponse.quiz.questions)
                binding.quizOverviewRecycler.apply {
                    adapter = questionsAdapter
                    visibility = View.VISIBLE
                }
                binding.quizTotalGrade.apply {
                    text = "Total Quiz Grade: " + quizResponse.quiz.quizmark.toString()
                    visibility = View.VISIBLE
                }
            } else {
                binding.overViewLoading.visibility = View.GONE
                binding.questionLoadingFailed.apply {
                    text = "Failed to load!"
                    visibility = View.VISIBLE
                }
            }
        }


        viewModel.studentGetQuizMarksStatusInstructorPerspective.observe(viewLifecycleOwner) { quizData ->
            if (quizData != null) {
                binding.overViewLoading.visibility = View.GONE
                if (quizData.quizResponseData.isNotEmpty()) {
                    val gradeAdapter = GradesAdapter()
                    gradeAdapter.submitList(quizData.quizResponseData)
                    binding.quizOverviewRecycler.apply {
                        adapter = gradeAdapter
                        visibility = View.VISIBLE
                    }

                    binding.quizTotalGrade.apply {
                        text = "Total Quiz Grade: " + quizData.quizMark.toString()
                        visibility = View.VISIBLE
                    }

                    allGradesGlobalList = quizData.quizResponseData

                } else {
                    binding.overViewLoading.visibility = View.GONE
                    binding.questionLoadingFailed.apply {
                        text = "No students have answered yet!"
                        visibility = View.VISIBLE
                    }
                }
            }
        }



        viewModel.instructorDeleteQuizStatus.observe(viewLifecycleOwner) { status ->

            if (status == "Deleted successfully") {
                showToast(status, requireContext())
                findNavController().navigate(R.id.action_quizOverviewFragment_to_instructorHomeFragment)
            } else {
                showToast(status, requireContext())
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
                // Step 3: Dismiss the dialog
                dialog.dismiss()
            }
            .create()
            .show()
    }

    private fun deleteItem() {
        viewModel.deleteTheQuizByInstructor(
            quizId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )
    }


}