package com.example.minda.adapter

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.R
import com.example.minda.databinding.CourseItemLayoutBinding
import com.example.minda.pojo.student.content.EnrolledCourse

class StudentCoursesAdapter(private val fragment: Fragment) :
    ListAdapter<EnrolledCourse, StudentCoursesAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CourseItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.binding.courseName.text = getItem(position).courseName
        holder.binding.courseDescription.text = "Learn every thing from zero to hero"
        holder.binding.courseDuration.text = getItem(position).duration
        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)
            navController.navigate(R.id.action_studentHomeFragment_to_courseInfoFragmentForStudent)
        }
    }


    inner class ViewHolder(val binding: CourseItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<EnrolledCourse>() {
        override fun areItemsTheSame(
            oldItem: EnrolledCourse, newItem:
            EnrolledCourse
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: EnrolledCourse, newItem: EnrolledCourse): Boolean {
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