package com.example.minda.ui.instructor.add_assignment

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity.RESULT_OK
import android.app.Application
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import com.example.minda.R
import com.example.minda.databinding.FragmentAddAssignmentBinding
import com.example.minda.util.getAvailableInternalMemorySize
import com.example.minda.util.getFilePathFromUri
import com.example.minda.util.getFileSize
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory
import java.io.File


class AddAssignmentFragment : Fragment() {

    private lateinit var binding: FragmentAddAssignmentBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    private lateinit var permReqLauncher: ActivityResultLauncher<Array<String>>
    private var selectedFile: Uri? = null
    private lateinit var courseId:String
    private var permissions = arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE)

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(
            layoutInflater,
            R.layout.fragment_add_assignment,
            container,
            false
        )

        courseId = requireArguments().getString("courseId")!!

        viewModel.instructorCreateAssignmentStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                showToast(it, requireContext())
                File(requireActivity().cacheDir, SharedViewModel.fileName.value.toString()).delete()
                viewModel.instructorCreateAssignmentStatus.value = null
            }
        }

        permReqLauncher =
            registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { permissions ->
                val granted = permissions.entries.all { it.value }
                if (granted) {
                    selectWantedFile()
                } else {
                    showToast("No Permission Granted", requireContext())

                }
            }

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.uploadAssignmentBtn.setOnClickListener {
            if (hasPermissions(requireContext(), permissions)) {
                selectWantedFile()

            } else {
                permReqLauncher.launch(permissions)
            }
        }



        binding.saveAssignmentBtn.setOnClickListener {
            val title = binding.assignmentTitleEt.text.toString()
            val description = binding.descriptionEt.text.toString()
            if (title.isEmpty() || description.isEmpty()) {
                showToast("All fields are required!", requireContext())
            } else {

                if (getFileSize(
                        requireContext(),
                        selectedFile!!
                    ) < getAvailableInternalMemorySize()
                ) {
                    showToast("uploading...", requireContext())

//                    viewModel.createNewAssignmentByInstructor(
//                        courseId,
//                        SharedViewModel.currentLoggedInUserToken.value.toString(),
//                        title,
//                        description,
//                        selectedFile!!,
//                        getFilePathFromUri(requireContext(), selectedFile!!)
//                    )

                } else {
                    showToast("no enough space", requireContext())
                }
            }
        }


    }

    @SuppressLint("SetTextI18n")
    private var resultLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult())
        { result ->
            if (result.resultCode == RESULT_OK && result.data != null) {
                // Get the file from data
                selectedFile = result.data!!.data!!

                Log.d("7egzz", "Bego Uploading Files: ${selectedFile!!.scheme}")
                Log.d("7egzz", "Bego Uploading Files: ${ContentResolver.SCHEME_CONTENT}")
                selectedFile!!.path?.let {
                    Log.d("7egzz", "Bego Uploading Files: $it")
                }
                Log.d("7egzz", "Bego Uploading Files: ${requireActivity().contentResolver.getType(selectedFile!!)}")

                if (selectedFile != null){
                    binding.selectedAssignmentHint.text = "File selected"
                }else{
                    binding.selectedAssignmentHint.text = "Not selected"
                }
            }else{
                showToast("File not selected",requireContext())
            }
        }

    private fun selectWantedFile() {
        val intent = Intent(Intent.ACTION_GET_CONTENT)
        intent.type = "application/pdf"
        resultLauncher.launch(intent)
    }
    private fun hasPermissions(context: Context, permissions: Array<String>): Boolean =
        permissions.all {
            ActivityCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
        }
}