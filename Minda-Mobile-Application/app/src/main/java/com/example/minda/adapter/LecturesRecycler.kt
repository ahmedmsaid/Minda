package com.example.minda.adapter

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

class LecturesAdapter(private val fragment:Fragment) : ListAdapter<LectureId, LecturesAdapter.ViewHolder>(ItemDiff()) {


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
        holder.binding.lectureName.text = getItem(position).title
        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)
            navController.navigate(R.id.action_courseInfoFragmentForStudent_to_lectureInfoFragment)
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