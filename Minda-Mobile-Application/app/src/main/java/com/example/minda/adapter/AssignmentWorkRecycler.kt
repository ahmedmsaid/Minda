package com.example.minda.adapter

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.EachStudentGradeItemLayoutBinding
import com.example.minda.pojo.assignment.AssignmentResponse

class AssignmentWorkAdapter :
    ListAdapter<AssignmentResponse, AssignmentWorkAdapter.ViewHolder>(ItemDiff()) {


    companion object{
        var myList = listOf<AssignmentResponse>()
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

        holder.binding.studentFullNameTv.text =
            getItem(position).userId.firstName + " " + getItem(position).userId.lastName
        holder.binding.studentQuizGradeTv.text = getItem(position).score.toString()
    }


    inner class ViewHolder(val binding: EachStudentGradeItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<AssignmentResponse>() {
        override fun areItemsTheSame(
            oldItem: AssignmentResponse, newItem:
            AssignmentResponse
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(
            oldItem: AssignmentResponse,
            newItem: AssignmentResponse
        ): Boolean {
            return oldItem == newItem
        }

    }
}