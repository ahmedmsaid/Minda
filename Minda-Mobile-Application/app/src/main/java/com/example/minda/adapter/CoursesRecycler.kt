package com.example.minda.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.R
import com.example.minda.databinding.CourseItemLayoutBinding
import com.example.minda.pojo.instructor.content.Course

class CoursesAdapter(private val fragment: Fragment) :
    ListAdapter<Course, CoursesAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CourseItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.courseName.text = getItem(position).courseName
        holder.binding.courseDescription.text = getItem(position).description
        holder.binding.courseDuration.text = getItem(position).duration
        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)
            navController.navigate(R.id.action_instructorHomeFragment_to_courseInfoFragment)
        }
    }


    inner class ViewHolder(val binding: CourseItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)


    class ItemDiff : DiffUtil.ItemCallback<Course>() {
        override fun areItemsTheSame(
            oldItem: Course, newItem:
            Course
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: Course, newItem: Course): Boolean {
            return oldItem == newItem
        }

    }
    /*inner class MyDiffUtil(
        private val oldList:List<Person>,
        private val newList:List<Person>
        ):DiffUtil.Callback(){

        override fun getOldListSize(): Int = oldList.size

        override fun getNewListSize(): Int = newList.size

        override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
            return oldList[oldItemPosition].id== newList[newItemPosition].id
        }

        override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
          return oldList[oldItemPosition] == newList[newItemPosition]
        }
    }*/
}