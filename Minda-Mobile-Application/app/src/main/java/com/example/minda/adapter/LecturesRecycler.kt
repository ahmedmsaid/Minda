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
import com.example.minda.databinding.LectureItemLayoutBinding
import com.example.minda.pojo.course.LectureId

class LecturesAdapter(
    private val fragment: Fragment,
    private val sourceIdentifier: String
) : ListAdapter<LectureId, LecturesAdapter.ViewHolder>(ItemDiff()) {

companion object{
     lateinit var courseId: String
}
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            LectureItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val lecId = getItem(position)._id
        val lecTitle = getItem(position).title
        holder.binding.lectureName.text = lecTitle

        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)

            val bundle = Bundle().apply {
                putString("lecId", lecId)
                putString("lecTitle", lecTitle)
                putString("courseId", courseId)
                putString("accountType", sourceIdentifier)
            }

            if (sourceIdentifier == "student"){
                navController.navigate(R.id.action_courseInfoFragmentForStudent_to_lectureInfoFragment,bundle)
            }else{
                navController.navigate(R.id.action_courseInfoFragment_to_lectureInfoFragment2,bundle)
            }
        }
    }

    inner class ViewHolder(val binding: LectureItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<LectureId>() {
        override fun areItemsTheSame(
            oldItem: LectureId, newItem:
            LectureId
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: LectureId, newItem: LectureId): Boolean {
            return oldItem == newItem
        }
    }
}