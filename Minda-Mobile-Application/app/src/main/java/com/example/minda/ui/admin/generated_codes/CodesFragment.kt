package com.example.minda.ui.admin.generated_codes

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.Application
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.adapter.CodesAdapter
import com.example.minda.databinding.FragmentAdminHomeBinding
import com.example.minda.databinding.FragmentCodesBinding
import com.example.minda.pojo.admin.EnrollRequest
import com.example.minda.util.getIdOfLoggedInPerson
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class CodesFragment : Fragment() {
    private lateinit var binding: FragmentCodesBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater, R.layout.fragment_codes, container, false)

        val adminId = getIdOfLoggedInPerson(SharedViewModel.currentLoggedInUserToken.value.toString())


        viewModel.getAllCodesForAdmin(SharedViewModel.currentLoggedInUserToken.value.toString())


        viewModel.getAllCodesForAdminStatus.observe(viewLifecycleOwner) {
            if (it != null) {
                if (it.allcodes.isNotEmpty()) {
                    val codesAdapter = CodesAdapter()
                    codesAdapter.submitList(it.allcodes)
                    binding.loadingCodesIndicator.visibility = View.GONE
                    binding.codesRecycler.apply {
                        adapter = codesAdapter
                        visibility = View.VISIBLE
                    }
                } else {
                    binding.loadingCodesIndicator.visibility = View.GONE
                    binding.noCodes.visibility = View.VISIBLE
                }
            } else {
                binding.noCodes.apply {
                    text = "Failed loading!"
                    visibility = View.VISIBLE
                }
            }
        }





        binding.generateNewCodeBtn.setOnClickListener {

            viewModel.generateInstructorCodeByAdmin(
                adminId!!,
                SharedViewModel.currentLoggedInUserToken.value.toString()
            )

        }



        viewModel.generatingCodeOperationForAdminStatus.observe(viewLifecycleOwner){
            if (it != null){
                showCodeDialog(it.code!!)
            }else{
                showToast("Generation failed!",requireContext())
            }
        }


        return binding.root
    }


    private fun showCodeDialog(code:String){
        val builder = AlertDialog.Builder(requireContext())
        builder.setTitle("Success")
            .setMessage("Code generated \n $code")
            .setPositiveButton("Copy") { dialog, _ ->
                requireContext().copyToClipboard(code)
                dialog.dismiss()
                findNavController().navigate(R.id.action_codesFragment_self)
            }.create().show()
    }

    private fun Context.copyToClipboard(text: CharSequence) {
        val clipboard = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("code", text)
        clipboard.setPrimaryClip(clip)
    }

}