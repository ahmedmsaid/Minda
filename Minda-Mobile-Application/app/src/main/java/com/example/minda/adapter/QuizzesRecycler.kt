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
import com.example.minda.databinding.QuizItemLayoutBinding
import com.example.minda.pojo.course.Quizze

class QuizzesAdapter(private val fragment: Fragment) : ListAdapter<Quizze, QuizzesAdapter.ViewHolder>(ItemDiff()) {


    companion object{
        lateinit var courseId:String
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            QuizItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        holder.binding.quizName.text = getItem(position).quizname
        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)
            val id = getItem(position)._id
            val bundle = Bundle().apply {
                putString("quizId",id)
                putString("courseId", courseId)
            }
            navController.navigate(R.id.action_courseInfoFragmentForStudent_to_takingQuizFragment,bundle)
        }
    }


    inner class ViewHolder(val binding: QuizItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<Quizze>() {
        override fun areItemsTheSame(
            oldItem: Quizze, newItem:
            Quizze
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: Quizze, newItem: Quizze): Boolean {
            return oldItem == newItem
        }

    }

}