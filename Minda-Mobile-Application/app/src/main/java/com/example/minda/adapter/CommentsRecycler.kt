package com.example.minda.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.CommentItemLayoutBinding
import com.example.minda.pojo.student.discussion.comment.updated_comments.Comment

class CommentsAdapter : ListAdapter<Comment, CommentsAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            CommentItemLayoutBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val name = getItem(position).user.firstName +" "+getItem(position).user.lastName
        val content = getItem(position).content
        val date = getItem(position).createdAt
        val separatedDate = date.split("T")
        val filteredDate = separatedDate[0]
        val filteredTime = separatedDate[1].split(".")[0]
        val createdAt = "$filteredDate - $filteredTime"

        holder.binding.usernameInComment.text = name
        holder.binding.commentCreationDate.text = createdAt
        holder.binding.commentContentInPost.text = content
    }

    inner class ViewHolder(val binding: CommentItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<Comment>() {
        override fun areItemsTheSame(
            oldItem: Comment, newItem:
            Comment
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: Comment, newItem: Comment): Boolean {
            return oldItem == newItem
        }

    }
}