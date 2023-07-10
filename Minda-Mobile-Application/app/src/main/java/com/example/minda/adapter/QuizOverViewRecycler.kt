package com.example.minda.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RadioButton
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.QuizQuestionItemBinding
import com.example.minda.pojo.student.content.Question

class QuizOverViewAdapter:
    ListAdapter<Question, QuizOverViewAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            QuizQuestionItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.questionHeader.text = getItem(position).title
//        val myChoices = getItem(position).quiz.questions[position].choose
        val myChoices = getItem(position).choose
        // adding choices dynamically as radio buttons
        for (i in myChoices.indices) {
            val radioButton = RadioButton(holder.binding.root.context)
            if (myChoices[i].isCorrect){
                radioButton.isChecked = true
            }
            radioButton.isEnabled = false
            radioButton.id = i // Set a unique ID for each radio button if you need to track the selected option
            radioButton.text = myChoices[i].text
            radioButton.ellipsize = null // Disable ellipsis
            radioButton.maxLines = 4
            radioButton.tag = position
            holder.binding.dynamicQuizChoicesRadGroup.addView(radioButton)
        }
    }


    inner class ViewHolder(val binding: QuizQuestionItemBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<Question>() {
        override fun areItemsTheSame(
            oldItem: Question, newItem:
            Question
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(
            oldItem: Question,
            newItem: Question
        ): Boolean {
            return oldItem == newItem
        }

    }

}