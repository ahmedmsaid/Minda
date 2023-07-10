package com.example.minda.ui.lectures

import android.app.Application
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.MediaController
import androidx.core.content.ContextCompat
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.minda.R
import com.example.minda.databinding.FragmentLectureInfoBinding
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import com.ismaeldivita.chipnavigation.ChipNavigationBar

class LectureInfoFragment : Fragment() {
    private lateinit var binding: FragmentLectureInfoBinding
    private lateinit var bottomNavigationBar: ChipNavigationBar
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_lecture_info,
            container,
            false
        )

        refreshData(requireContext())

        return binding.root
    }

    private fun refreshData(cntx:Context) {
        binding.showLecVideoBtn.setBackgroundColor(ContextCompat.getColor(cntx, R.color.veryDarkGray))

        val lecId = requireArguments().getString("lecId")
        val lecTitle = requireArguments().getString("lecTitle")
        val courseId = requireArguments().getString("courseId")
        val accountType = requireArguments().getString("accountType")

        if (accountType == "instructor"){
            bottomNavigationBar = activity?.findViewById(R.id.instructorBottomNavigationView)!!
            bottomNavigationBar.visibility = View.GONE
        }else{
            bottomNavigationBar = activity?.findViewById(R.id.studentBottomNavigationView)!!
            bottomNavigationBar.visibility = View.GONE
        }

        if (accountType == "instructor"){
            viewModel.getLectureByIdToViewItsContentForInstructor(
                lecId!!,
                courseId!!,
                SharedViewModel.currentLoggedInUserToken.value.toString()
            )
        }else{
            viewModel.getLectureByIdToViewItsContentForStudent(
                lecId!!,
                SharedViewModel.currentLoggedInUserToken.value.toString()
            )
        }


        binding.lecTitleUnderVideo.text = lecTitle
        viewModel.lectureInfoStatus.observe(viewLifecycleOwner) { lecResponse ->
            if (lecResponse != null) {
                val videoUrl = lecResponse.lecture.vedios[0].url
                val updatedLink = videoUrl.replace("http://", "https://")
                val videoView = binding.lecVideoItem
                // Create a MediaController
                val mediaController = MediaController(requireContext())
                mediaController.setAnchorView(videoView)
                videoView.setMediaController(mediaController)
                mediaController.setMediaPlayer(videoView)
                // Set the video URI
                videoView.setVideoPath(updatedLink)
                // Start the video
                videoView.start()
                videoView.visibility = View.VISIBLE
                binding.loadingLecVideoIndicator.visibility = View.GONE
            }else{
                binding.loadingLecVideoIndicator.visibility = View.GONE
                binding.failedLoading.visibility = View.VISIBLE
            }
        }

        binding.showLecSlideBtn.setOnClickListener {
            binding.showLecSlideBtn.setBackgroundColor(ContextCompat.getColor(cntx, R.color.veryDarkGray))
            binding.showLecVideoBtn.setBackgroundColor(ContextCompat.getColor(cntx, R.color.primary_dark_orange))
            binding.lecVideoItem.visibility = View.GONE
            binding.lecTitleUnderVideo.visibility = View.GONE
        }

        binding.showLecVideoBtn.setOnClickListener {
            binding.showLecVideoBtn.setBackgroundColor(ContextCompat.getColor(cntx, R.color.veryDarkGray))
            binding.showLecSlideBtn.setBackgroundColor(ContextCompat.getColor(cntx, R.color.primary_dark_orange))
            binding.lecVideoItem.visibility = View.VISIBLE
            binding.lecTitleUnderVideo.visibility = View.VISIBLE
        }
    }

//    override fun onDestroyView() {
//        super.onDestroyView()
//        bottomNavigationBar.visibility = View.VISIBLE
//    }
}