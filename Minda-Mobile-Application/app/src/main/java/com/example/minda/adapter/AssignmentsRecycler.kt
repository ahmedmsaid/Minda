package com.example.minda.adapter

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.R
import com.example.minda.databinding.AssignmentItemLayoutBinding
import com.example.minda.pojo.assignment.AssignmentsData
import com.example.minda.util.showToast

class AssignmentAdapter(private val fragment: Fragment , private val source:String) :
    ListAdapter<AssignmentsData, AssignmentAdapter.ViewHolder>(ItemDiff()) {


    companion object {
        lateinit var courseId: String
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            AssignmentItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.assignmentTitle.text = getItem(position).title
        val assignmentId = getItem(position)._id
        holder.binding.root.setOnClickListener {

            val navController = NavHostFragment.findNavController(fragment)
            val bundle = Bundle().apply {
                putString("courseId", courseId)
                putString("assignmentId", assignmentId)
            }

            if (source == "student"){
                fragment.context?.let { it1 ->
                    showToast("Go to MINDA website to submit your work",
                        it1
                    )
                }
            }else{
                navController.navigate(R.id.action_courseInfoFragment_to_assignmentInfoFragment, bundle)
            }
        }
    }

    inner class ViewHolder(val binding: AssignmentItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<AssignmentsData>() {
        override fun areItemsTheSame(
            oldItem: AssignmentsData, newItem:
            AssignmentsData
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(
            oldItem: AssignmentsData,
            newItem: AssignmentsData
        ): Boolean {
            return oldItem == newItem
        }

    }

}