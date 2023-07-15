package com.example.minda.adapter

import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.NavHostFragment
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.minda.R
import com.example.minda.databinding.PostItemLayoutBinding
import com.example.minda.pojo.student.discussion.post.Post
import com.example.minda.util.getIdOfLoggedInPerson
import com.example.minda.viewmodel.SharedViewModel

class PostsAdapter(private val fragment: Fragment,private val viewModel: SharedViewModel) :
    ListAdapter<Post, PostsAdapter.ViewHolder>(ItemDiff()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(
            PostItemLayoutBinding.inflate(
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
        val courseId = getItem(position).course
        val postId = getItem(position)._id
        val separatedDate = date.split("T")
        val filteredDate = separatedDate[0]
        val filteredTime = separatedDate[1].split(".")[0]

        holder.binding.usernameInPost.text = name
        holder.binding.postContent.text = content
        val createdAt = "$filteredDate - $filteredTime"
        holder.binding.postCreationDate.text = createdAt

        holder.binding.root.setOnClickListener {
            val navController = NavHostFragment.findNavController(fragment)
            val bundle = Bundle().apply {
                putString("userName", name)
                putString("content", content)
                putString("date", createdAt)
                putString("courseId", courseId)
                putString("postId", postId)
            }
            navController.navigate(R.id.action_discussionFragment_to_postDetailsFragment, bundle)
        }

        holder.binding.root.setOnLongClickListener {
            val currentId = getIdOfLoggedInPerson(SharedViewModel.currentLoggedInUserToken.value.toString())
            if (currentId == getItem(position).user._id){
                showDeleteDialog(getItem(position),viewModel)
            }
            true
        }


    }

    private fun showDeleteDialog(post: Post, viewModel: SharedViewModel) {
        val alertDialogBuilder = AlertDialog.Builder(fragment.requireContext())
        alertDialogBuilder.setTitle("Delete Post")
        alertDialogBuilder.setMessage("Are you sure you want to delete this post?")
        alertDialogBuilder.setPositiveButton("Delete") { _, _ ->
            viewModel.deletePost(
                post.course,
                post._id,
                SharedViewModel.currentLoggedInUserToken.value.toString()
            )
        }
        alertDialogBuilder.setNegativeButton("Cancel", null)
        alertDialogBuilder.create().show()
    }


    inner class ViewHolder(val binding: PostItemLayoutBinding) :
        RecyclerView.ViewHolder(binding.root)

    class ItemDiff : DiffUtil.ItemCallback<Post>() {
        override fun areItemsTheSame(
            oldItem: Post, newItem:
            Post
        ): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: Post, newItem: Post): Boolean {
            return oldItem == newItem
        }
    }
}