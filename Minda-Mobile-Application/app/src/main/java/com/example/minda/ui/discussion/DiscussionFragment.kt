package com.example.minda.ui.discussion

import android.annotation.SuppressLint
import android.app.Application
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.PostsAdapter
import com.example.minda.databinding.FragmentDiscussionBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class DiscussionFragment : Fragment() {
    private lateinit var binding: FragmentDiscussionBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    private lateinit var courseName: String
    private lateinit var courseId: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment

        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_discussion, container, false)

        refreshData()

        return binding.root
    }

    private fun refreshData() {
        courseName = requireArguments().getString("courseName")!!
        courseId = requireArguments().getString("courseId")!!
        val header = "$courseName discussion"
        binding.discussionHeader.text = header

        getData()
        dataObserving()


        binding.makePostBtn.setOnClickListener {
            val bundle = Bundle().apply {
                putString("courseId",courseId)
                putString("courseName",courseName)
            }
            findNavController().navigate(R.id.action_discussionFragment_to_makePostFragment,bundle)
        }
    }

    private fun getData() {
        viewModel.getAllDiscussionPostsForStudent(
            courseId,
            SharedViewModel.currentLoggedInUserToken.value.toString()
        )
    }

    private fun dataObserving() {
        viewModel.allPostsResponseForStudentStatus.observe(viewLifecycleOwner) { allPostsResponse ->
            binding.loadingDiscussion.visibility = View.GONE
            if (allPostsResponse != null) {
                val posts = allPostsResponse.postsResponse.posts
                if (posts.isNotEmpty()) {
                    val postsAdapter = PostsAdapter(this)
                    postsAdapter.submitList(posts)
                    binding.courseAllPostsRecycler.apply {
                        adapter = postsAdapter
                        visibility = View.VISIBLE
                    }
                } else {
                    val hint = "No posts yet!"
                    binding.noPostsHint.apply {
                        text = hint
                        visibility = View.VISIBLE
                    }
                }

            } else {
                val hint = "Failed loading data"
                binding.noPostsHint.apply {
                    text = hint
                    visibility = View.VISIBLE
                }
            }
        }
    }
}