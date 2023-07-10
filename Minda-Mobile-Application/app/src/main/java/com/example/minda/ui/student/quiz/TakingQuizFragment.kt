package com.example.minda.ui.student.quiz

import android.annotation.SuppressLint
import android.app.Application
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioButton
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.minda.R
import com.example.minda.adapter.StudentTakingQuizAdapter
import com.example.minda.databinding.FragmentTakingQuizBinding
import com.example.minda.pojo.student.content.AnswerQuizRequest
import com.example.minda.utile.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar


class TakingQuizFragment : Fragment() {

    private lateinit var binding: FragmentTakingQuizBinding
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
        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_taking_quiz, container, false)

        bottomNavigationBar = activity?.findViewById(R.id.studentBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE

        refreshData()


        return binding.root
    }

    @SuppressLint("SetTextI18n")
    private fun refreshData() {

        val quizId = requireArguments().getString("quizId")
        val courseId = requireArguments().getString("courseId")



        viewModel.getQuizMarksForTheStudent(
            courseId!!,
            quizId!!,
            SharedViewModel.currentLoggedInUserId.value.toString(),
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )


        viewModel.studentGetQuizMarksStatus.observe(viewLifecycleOwner){studentMarks->
            if (studentMarks != null){

                binding.studentQuizGrade.apply {
                    text = "${studentMarks.userData.firstName} " +
                            "${studentMarks.userData.lastName} " +
                            "got ${studentMarks.userMark} from ${studentMarks.quizMark}"

                    visibility = View.VISIBLE
                }

                binding.loadingQuestionsIndicator.visibility = View.GONE
                binding.canNotAnswer.visibility = View.VISIBLE
                binding.submitAnswersBtn.isEnabled = false

            }else{
                showQuestionIfNoPreviousAnswerAndObserveTheRequest(quizId,courseId)
            }
        }





        binding.submitAnswersBtn.setOnClickListener {
            val selectedOptions = getSelectedOptionsFromAdapter()
            val selectedAnswers = mutableListOf<Int>()

            for (i in selectedOptions.indices) {
                selectedAnswers.add(selectedOptions[i].second)
            }
            val request = AnswerQuizRequest(selectedAnswers)

            viewModel.studentAnswerTheQuiz(
                courseId,
                quizId,
                SharedViewModel.currentLoggedInUserToken.value.toString(),
                request
            )
        }

    }


    @SuppressLint("SetTextI18n")
    private fun showQuestionIfNoPreviousAnswerAndObserveTheRequest(quizId:String, courseId:String){

        //sending showing questions request

        viewModel.getQuizQuestionsForStudentToAnswer(
            quizId,
            courseId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )

        // observing showing answers

        viewModel.studentQuizShowQuestionsStatus.observe(viewLifecycleOwner) { quizResponse ->
            if (quizResponse != null) {
                val quizQuestionsAdapter = StudentTakingQuizAdapter()
                if (quizResponse.quiz.questions.isNotEmpty()) {
                    quizQuestionsAdapter.submitList(quizResponse.quiz.questions)
                    binding.takingQuizRecyclerForStudent.apply {
                        adapter = quizQuestionsAdapter
                        visibility = View.VISIBLE
                    }
                    binding.loadingQuestionsIndicator.visibility = View.GONE
                } else {
                    showToast("No questions are set, come back later!", requireContext())
                }
            } else {
                binding.loadingQuestionsIndicator.visibility = View.GONE
            }
        }



      // observing sending answers response
        viewModel.studentQuizAnsweringStatus.observe(viewLifecycleOwner) { status ->

            if (status != null) {
                binding.studentQuizGrade.apply {
                    text = "Your score is $status"
                    visibility = View.VISIBLE
                }
                showToast(status, requireContext())
            } else {
                showToast("You can take the quiz only for once", requireContext())
            }
        }
    }


    private fun getSelectedOptionsFromAdapter(): List<Pair<Int, Int>> {
        val selectedOptions = mutableListOf<Pair<Int, Int>>()
        val adapter = binding.takingQuizRecyclerForStudent.adapter as? StudentTakingQuizAdapter
        adapter?.let {
            for (position in 0 until it.itemCount) {
                val viewHolder =
                    binding.takingQuizRecyclerForStudent.findViewHolderForAdapterPosition(position) as? StudentTakingQuizAdapter.ViewHolder
                viewHolder?.let { holder ->
                    val radioButtonGroup = holder.binding.dynamicQuizChoicesRadGroup
                    val selectedRadioButtonId = radioButtonGroup.checkedRadioButtonId
                    if (selectedRadioButtonId != -1) {
                        val radioButton =
                            radioButtonGroup.findViewById<RadioButton>(selectedRadioButtonId)
                        val questionPosition = radioButton.tag as Int
                        selectedOptions.add(Pair(questionPosition, selectedRadioButtonId))
                    }
                }
            }
        }
        return selectedOptions
    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }


}