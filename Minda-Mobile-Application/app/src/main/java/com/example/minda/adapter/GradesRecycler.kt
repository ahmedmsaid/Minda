package com.example.minda.adapter

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.EachStudentGradeItemLayoutBinding
import com.example.minda.pojo.instructor.content.quiz.grades.QuizResponseData

class GradesAdapter : ListAdapter<QuizResponseData, GradesAdapter.ViewHolder>(ItemDiff()) {

    companion object{
         var myList = mutableListOf<QuizResponseData>()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            EachStudentGradeItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.studentFullNameTv.text = getItem(position).firstName +" "+ getItem(position).lastName
        holder.binding.studentQuizGradeTv.text = "Grade: ${getItem(position).mark}"
        if (!myList.contains(getItem(position))){
            myList.add(getItem(position))
        }
    }



    inner class ViewHolder(val binding: EachStudentGradeItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<QuizResponseData>() {
        override fun areItemsTheSame(
            oldItem: QuizResponseData, newItem:
            QuizResponseData
        ): Boolean {
            return oldItem.userId == newItem.userId
        }

        override fun areContentsTheSame(
            oldItem: QuizResponseData,
            newItem: QuizResponseData
        ): Boolean {
            return oldItem == newItem
        }

    }
}