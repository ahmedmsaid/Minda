package com.example.minda.adapter

import android.app.AlertDialog
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.databinding.CommentItemLayoutBinding
import com.example.minda.pojo.student.discussion.comment.updated_comments.Comment
import com.example.minda.pojo.student.discussion.post.Post
import com.example.minda.util.getIdOfLoggedInPerson
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel

class CommentsAdapter(private val fragment: Fragment, private val viewModel: SharedViewModel) :
    ListAdapter<Comment, CommentsAdapter.ViewHolder>(ItemDiff()) {

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
        val name = getItem(position).user.firstName + " " + getItem(position).user.lastName
        val content = getItem(position).content
        val date = getItem(position).createdAt
        val separatedDate = date.split("T")
        val filteredDate = separatedDate[0]
        val filteredTime = separatedDate[1].split(".")[0]
        val createdAt = "$filteredDate - $filteredTime"

        holder.binding.usernameInComment.text = name
        holder.binding.commentCreationDate.text = createdAt
        holder.binding.commentContentInPost.text = content


        holder.binding.root.setOnLongClickListener {
            val currentId =
                getIdOfLoggedInPerson(SharedViewModel.currentLoggedInUserToken.value.toString())
            if (currentId == getItem(position).user._id) {
                showDeleteDialog(getItem(position), viewModel)
            }
            true
        }
    }

    private fun showDeleteDialog(comment: Comment, viewModel: SharedViewModel) {
        val alertDialogBuilder = AlertDialog.Builder(fragment.requireContext())
        alertDialogBuilder.setTitle("Delete Post")
        alertDialogBuilder.setMessage("Are you sure you want to delete this post?")
        alertDialogBuilder.setPositiveButton("Delete") { _, _ ->
            viewModel.deleteComment(
                comment.post.course,
                comment.post._id,
                comment._id,
                SharedViewModel.currentLoggedInUserToken.value.toString()
            )
        }
        alertDialogBuilder.setNegativeButton("Cancel", null)
        alertDialogBuilder.create().show()
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