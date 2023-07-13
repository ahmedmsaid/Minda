package com.example.minda.ui.admin.delete

import android.app.AlertDialog
import android.app.Application
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.example.minda.R
import com.example.minda.databinding.FragmentDeleteUserBinding
import com.example.minda.pojo.admin.EnrollRequest
import com.example.minda.util.showToast
import com.example.minda.viewmodel.SharedViewModel
import com.example.minda.viewmodel.SharedViewModelFactory

class DeleteUserFragment : Fragment() {

    private lateinit var binding:FragmentDeleteUserBinding
    private val viewModel: SharedViewModel by lazy {
        val application = requireActivity().application as Application
        ViewModelProvider(this, SharedViewModelFactory(application))[SharedViewModel::class.java]
    }

    private val usersNames = mutableListOf<String>()
    private val usersIds= mutableListOf<String>()



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        binding = DataBindingUtil.inflate(layoutInflater,R.layout.fragment_delete_user, container, false)



        viewModel.getAllUsersForAdmin(SharedViewModel.currentLoggedInUserToken.value.toString())

        viewModel.getAllUserForAdminStatus.observe(viewLifecycleOwner){ it ->
            if (it != null){
                if (it.allUsers.isNotEmpty()) {
                    val sortedNames = it.allUsers.sortedBy { item->item.firstName}
                    sortedNames.forEach { user ->
                        usersNames.add(user.firstName + " " + user.lastName)
                        usersIds.add(user._id!!)
                    }

                    val adapter: ArrayAdapter<String> = ArrayAdapter<String>(
                        requireContext(),
                        android.R.layout.simple_spinner_item,
                        usersNames
                    )
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    binding.namesSpinnerForDelete.adapter = adapter

                }else{
                    showToast("Noo users",requireContext())
                }
            }
        }


        viewModel.deletingOperationForAdminStatus.observe(viewLifecycleOwner){
            if (it == "User is deleted successfully"){
                showToast(it,requireContext())
                findNavController().navigate(R.id.action_deleteUserFragment_to_adminHomeFragment)
            }else{
                showToast(it,requireContext())
            }
        }



        binding.deleteUserBtn.setOnClickListener {

            val userName: String = binding.namesSpinnerForDelete.selectedItem.toString()
            val idIndexOfUser = usersNames.indexOf(userName)
            val userIdToDelete = usersIds[idIndexOfUser]

            showConfirmDialog(userIdToDelete, userName)

        }


        return binding.root
    }

    private fun showConfirmDialog(userId:String,userName: String) {
        val builder = AlertDialog.Builder(requireContext())
        builder.setTitle("Confirm Deletion")
            .setMessage("Are you sure to delete everything about $userName ?")
            .setPositiveButton("Confirm") { dialog, _ ->
                viewModel.deleteSpecificUserForAdmin(
                    userId = userId,
                    token = SharedViewModel.currentLoggedInUserToken.value.toString(),
                )
                dialog.dismiss()
            }
            .setNegativeButton("Cancel") { dialog, _ ->
                dialog.dismiss()
            }
            .create()
            .show()
    }

}