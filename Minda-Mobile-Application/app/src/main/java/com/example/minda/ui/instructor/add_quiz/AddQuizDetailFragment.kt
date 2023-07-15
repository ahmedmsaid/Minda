package com.example.minda.ui.instructor.add_quiz

import android.app.Application
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentAddQuizDetailBinding
import com.example.minda.pojo.instructor.content.quiz.post.Choose
import com.example.minda.pojo.instructor.content.quiz.post.PostQuizRequest
import com.example.minda.pojo.instructor.content.quiz.post.Question
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar


class AddQuizDetailFragment : Fragment() {
    private lateinit var binding: FragmentAddQuizDetailBinding
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
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_add_quiz_detail,
            container,
            false
        )
        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE

        refreshData()

        return binding.root
    }

    private fun refreshData() {


        val courseId = requireArguments().getString("courseId")
        val quizName = requireArguments().getString("quizName")
        val questionCount = requireArguments().getString("questionCount")
        val eachQuestionMark = requireArguments().getString("eachQuestionMark")
        val quizTime = requireArguments().getString("quizTime")

        val listOfQuestion = mutableListOf<Question>()



        binding.nextQuizQuestionBtn.setOnClickListener {

            val title = binding.quizQuestionEt.text.toString()
            val c1 = binding.quizFirstChoiceEt.text.toString()
            val c2 = binding.quizSecondChoiceEt.text.toString()
            val c3 = binding.quizThirdChoiceEt.text.toString()
            val c4 = binding.quizFourthChoiceEt.text.toString()

            val choice1 = Choose(isCorrect = false, text = c1)
            val choice2 = Choose(isCorrect = false, text = c2)
            val choice3 = Choose(isCorrect = false, text = c3)
            val choice4 = Choose(isCorrect = false, text = c4)

            val listOfChoices = mutableListOf<Choose>()


            if (binding.selectedRightChoiceGroup.checkedRadioButtonId == -1) {
                showToast("You must specify the correct answer choice", requireContext())
            } else {
                if (c1.isNotEmpty() && c2.isNotEmpty() && (c3.isEmpty() && c4.isEmpty())) {
                    when (binding.selectedRightChoiceGroup.checkedRadioButtonId) {
                        R.id.firstChoiceRadioBtn -> {
                            choice1.isCorrect = true
                            listOfChoices.add(choice1)
                            listOfChoices.add(choice2)
                            val question = Question(
                                choose = listOfChoices,
                                mark = eachQuestionMark!!.toInt(),
                                title = title
                            )
                            listOfQuestion.add(question)

                            clearInput()
                        }

                        R.id.secondChoiceRadioBtn -> {
                            choice2.isCorrect = true
                            listOfChoices.add(choice1)
                            listOfChoices.add(choice2)
                            val question = Question(
                                choose = listOfChoices,
                                mark = eachQuestionMark!!.toInt(),
                                title = title
                            )
                            listOfQuestion.add(question)

                            clearInput()
                        }

                        else -> {
                            showToast(
                                "first two choices are the only applicable ones",
                                requireContext()
                            )
                        }
                    }


                } else if (c1.isNotEmpty() && c2.isNotEmpty() && c3.isNotEmpty() && c4.isEmpty()) {
                    when (binding.selectedRightChoiceGroup.checkedRadioButtonId) {
                        R.id.firstChoiceRadioBtn -> {
                            choice1.isCorrect = true
                            listOfChoices.add(choice1)
                            listOfChoices.add(choice2)
                            listOfChoices.add(choice3)
                            val question = Question(
                                choose = listOfChoices,
                                mark = eachQuestionMark!!.toInt(),
                                title = title
                            )
                            listOfQuestion.add(question)

                            clearInput()
                        }

                        R.id.secondChoiceRadioBtn -> {
                            choice2.isCorrect = true
                            listOfChoices.add(choice1)
                            listOfChoices.add(choice2)
                            listOfChoices.add(choice3)
                            val question = Question(
                                choose = listOfChoices,
                                mark = eachQuestionMark!!.toInt(),
                                title = title
                            )
                            listOfQuestion.add(question)

                            clearInput()
                        }

                        R.id.thirdChoiceRadioBtn -> {
                            choice3.isCorrect = true
                            listOfChoices.add(choice1)
                            listOfChoices.add(choice2)
                            listOfChoices.add(choice3)
                            val question = Question(
                                choose = listOfChoices,
                                mark = eachQuestionMark!!.toInt(),
                                title = title
                            )
                            listOfQuestion.add(question)

                            clearInput()
                        }

                        else -> {
                            showToast(
                                "first three choices are the only applicable ones",
                                requireContext()
                            )
                        }
                    }


                } else if (c1.isNotEmpty() && c2.isNotEmpty() && c3.isNotEmpty() && c4.isNotEmpty()) {

                    when (binding.selectedRightChoiceGroup.checkedRadioButtonId) {
                        R.id.firstChoiceRadioBtn -> {
                            choice1.isCorrect = true
                        }

                        R.id.secondChoiceRadioBtn -> {
                            choice2.isCorrect = true
                        }

                        R.id.thirdChoiceRadioBtn -> {
                            choice3.isCorrect = true
                        }

                        else -> {
                            choice4.isCorrect = true
                        }
                    }

                    listOfChoices.add(choice1)
                    listOfChoices.add(choice2)
                    listOfChoices.add(choice3)
                    listOfChoices.add(choice4)
                    val question = Question(
                        choose = listOfChoices,
                        mark = eachQuestionMark!!.toInt(),
                        title = title
                    )
                    listOfQuestion.add(question)
                    clearInput()
                } else {
                    showToast("require two choices at least", requireContext())
                }
                if (listOfQuestion.size == questionCount!!.toInt()){
                    binding.nextQuizQuestionBtn.visibility = View.GONE
                    binding.finishPreparingQuizBtn.visibility = View.VISIBLE
                }
            }
        }


        binding.finishPreparingQuizBtn.setOnClickListener {
            val quizRequest = PostQuizRequest(
                questions = listOfQuestion,
                quizname = quizName!!,
                duration = quizTime!!
            )
            viewModel.createNewQuizByInstructor(
                courseId!!,
                SharedViewModel.currentLoggedInUserToken.value.toString(),
                quizRequest
            )

            Log.d("7egzz", "refreshData: $quizRequest")
        }

        viewModel.instructorCreateQuizStatus.observe(viewLifecycleOwner) { quizCreated ->
            if (quizCreated != null) {
                showToast(
                    "${quizCreated.quizname} has been created successfully!",
                    requireContext()
                )

                findNavController().navigate(R.id.action_addQuizDetailFragment_to_instructorHomeFragment)
            }
        }
    }

    private fun clearInput() {
        binding.quizQuestionEt.text.clear()
        binding.quizFirstChoiceEt.text.clear()
        binding.quizSecondChoiceEt.text.clear()
        binding.quizThirdChoiceEt.text.clear()
        binding.quizFourthChoiceEt.text.clear()
        binding.selectedRightChoiceGroup.isSelected = false
    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }
}