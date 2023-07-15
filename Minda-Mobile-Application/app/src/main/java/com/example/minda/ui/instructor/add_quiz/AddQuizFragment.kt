package com.example.minda.ui.instructor.add_quiz

import android.app.TimePickerDialog
import android.content.DialogInterface
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TimePicker
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentAddQuizBinding
import com.example.minda.util.showToast
import com.ismaeldivita.chipnavigation.ChipNavigationBar
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class AddQuizFragment : Fragment() {

    private lateinit var binding: FragmentAddQuizBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar

    private val calendar: Calendar = Calendar.getInstance()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment

        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_add_quiz, container, false)
        bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
        bottomNavigationBar.visibility = View.GONE


        refreshData()


        return binding.root
    }

    private fun refreshData() {
        val courseId = requireArguments().getString("courseId")

        binding.applyTimingCBox.setOnCheckedChangeListener { _, checked ->
            applyTiming(checked)
        }

        binding.nextQuizInfoBtn.setOnClickListener {
            val quizName = binding.quizNoEt.text.toString()
            val questionCount = binding.quizQuestionNumberEt.text.toString()
            val eachQuestionMark = binding.eachQuestionMarkEt.text.toString()
            val quizTime = binding.quizInnerTime.text.toString()

            if (quizName.isEmpty() || questionCount.isEmpty() || eachQuestionMark.isEmpty() ) {
                showToast("All fields are required!", requireContext())
            } else {
                val bundle = Bundle().apply {
                    putString("courseId", courseId)
                    putString("quizName", quizName)
                    putString("questionCount", questionCount)
                    putString("eachQuestionMark", eachQuestionMark)
                    if (quizTime.isBlank()) putString("quizTime","00:00")
                }

                findNavController().navigate(
                    R.id.action_addQuizFragment_to_addQuizDetailFragment,
                    bundle
                )

            }
        }
    }

    private fun applyTiming(condition: Boolean) {

        showToast(condition.toString(), requireContext())
        if (condition) {

            binding.quizInnerTimeLayout.visibility = View.VISIBLE
        } else {

            binding.quizInnerTimeLayout.visibility = View.GONE
        }

        binding.pickQuizTimeBtn.setOnClickListener {
            showTimePickerDialog(binding.quizInnerTime)
        }
    }

    private fun showTimePickerDialog(view: EditText) {
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        val minute = calendar.get(Calendar.MINUTE)

        val timePickerDialog = object : TimePickerDialog(
            requireContext(),
            { _, hourOfDay, minuteOfDay ->
                val selectedTime = String.format("%02d:%02d", hourOfDay, minuteOfDay)
                view.setText(selectedTime)
            },
            hour,
            minute,
            true
        ) {
            override fun onTimeChanged(view: TimePicker?, hourOfDay: Int, minute: Int) {
                // Ignore the onTimeChanged event to prevent updates in the dialog
            }
        }

        timePickerDialog.setButton(DialogInterface.BUTTON_NEGATIVE, "Cancel") { dialog, which ->
            if (which == DialogInterface.BUTTON_NEGATIVE) {
                dialog.cancel()
            }
        }

        timePickerDialog.show()
    }

}