package com.example.minda.ui.discussion

import android.app.Application
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.CommentsAdapter
import com.example.minda.databinding.FragmentPostDetailsBinding
import com.example.minda.pojo.student.discussion.comment.SendCommentRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class PostDetailsFragment : Fragment() {

    private lateinit var binding: FragmentPostDetailsBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }


    private lateinit var userName: String
    private lateinit var postContent: String
    private lateinit var postDate: String
    private lateinit var courseId: String
    private lateinit var postId: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_post_details,
            container,
            false
        )


        refreshData()

        return binding.root
    }

    private fun refreshData() {
        userName = requireArguments().getString("userName")!!
        postContent = requireArguments().getString("content")!!
        postDate = requireArguments().getString("date")!!
        courseId = requireArguments().getString("courseId")!!
        postId = requireArguments().getString("postId")!!

        binding.specificPostUsername.text = userName
        binding.specificPostCreationDate.text = postDate
        binding.specificPostContent.text = postContent


        binding.makeCommentBtn.setOnClickListener {
            val content = binding.writeCommentET.text.toString()
            if (content.isEmpty() || content.isBlank()){
                showToast("Fill comment first!",requireContext())
            }else{
                val request = SendCommentRequest(content)
                sendData(request)
            }
        }

        getData()
        observingData()
    }

    private fun getData() {
        viewModel.getAllCommentsOnSpecificPost(
            courseId,
            postId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )
    }

    private fun sendData(content: SendCommentRequest) {

        viewModel.sendCommentsOnSpecificPost(
            courseId,
            postId,
            SharedViewModel.currentLoggedInUserToken.value.toString(),
            content
        )

    }

    private fun observingData() {
        viewModel.allCommentsOnPostStatus.observe(viewLifecycleOwner) { commentsResponse ->
            binding.progressBar.visibility = View.GONE
            if (commentsResponse != null) {
                val comments = commentsResponse.commentsResponse.comments
                if (comments.isNotEmpty()) {
                    val commentsAdapter = CommentsAdapter(this,viewModel)
                    commentsAdapter.submitList(comments)
                    binding.commentsRecycler.apply {
                        adapter = commentsAdapter
                        visibility = View.VISIBLE
                    }
                } else {
                    val hint = "No comments on this post yet!"
                    binding.commentsHint.apply {
                        text = hint
                        visibility = View.VISIBLE
                    }
                }
            } else {
                val hint = "Error loading comment!"
                binding.commentsHint.apply {
                    text = hint
                    visibility = View.VISIBLE
                }
            }
        }


        viewModel.sendingCommentStatus.observe(viewLifecycleOwner){
            if (it != null){
                val bundle = Bundle().apply {
                    putString("userName",userName)
                    putString("content",postContent)
                    putString("date",postDate)
                    putString("courseId",courseId)
                    putString("postId",postId)
                }
                findNavController().navigate(R.id.action_postDetailsFragment_self,bundle)
            }else{
                showToast("Error while commenting, try again", requireContext())
            }
        }

        viewModel.deletingCommentStatus.observe(viewLifecycleOwner){
            if (it!=null){
                showToast("Comment deleted successfully",requireContext())
                val bundle = Bundle().apply {
                    putString("userName",userName)
                    putString("content",postContent)
                    putString("date",postDate)
                    putString("courseId",courseId)
                    putString("postId",postId)
                }
                findNavController().navigate(R.id.action_postDetailsFragment_self,bundle)
            }
        }
    }
}