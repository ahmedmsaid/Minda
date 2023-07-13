package com.example.minda.ui.discussion

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
import com.example.minda.databinding.FragmentMakePostBinding
import com.example.minda.pojo.student.discussion.comment.SendCommentRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class MakePostFragment : Fragment() {
    private lateinit var binding: FragmentMakePostBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }
    private lateinit var courseId: String
    private lateinit var courseName: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding =
            DataBindingUtil.inflate(layoutInflater, R.layout.fragment_make_post, container, false)


        refreshData()


        return binding.root
    }

    private fun refreshData() {
        courseId = requireArguments().getString("courseId")!!
        courseName = requireArguments().getString("courseName")!!
        binding.postThePostBtn.setOnClickListener {
            val content = binding.writePostET.text.toString()
            if (content.isNotEmpty() || content.isNotBlank()) {
                val request = SendCommentRequest(content)
                sendData(request)
            }else{
                showToast("Can't create a blank post",requireContext())
            }
        }
        observingData()
    }

    private fun sendData(request: SendCommentRequest) {
        viewModel.createNewPost(
            courseId,
            SharedViewModel.currentLoggedInUserToken.value.toString(),
            request
        )
    }


    private fun observingData(){
        viewModel.creatingNewPostStatus.observe(viewLifecycleOwner){
            if (it == 1){
                val bundle = Bundle().apply {
                    putString("courseName",courseName)
                    putString("courseId",courseId)
                }
                showToast("Posted successfully!",requireContext())
                findNavController().navigate(R.id.action_makePostFragment_to_discussionFragment,bundle)
            }else{
                showToast("Error while creating the post",requireContext())
            }
        }
    }

}