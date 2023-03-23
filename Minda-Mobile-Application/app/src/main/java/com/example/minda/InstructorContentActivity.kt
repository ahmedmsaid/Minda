package com.example.minda

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import com.example.minda.databinding.ActivityInstructorContentBinding

class InstructorContentActivity : AppCompatActivity() {
    private lateinit var binding:ActivityInstructorContentBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInstructorContentBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.instructorBottomNavigationView.setItemSelected(R.id.home,true)

        binding.instructorBottomNavigationView.setOnItemSelectedListener {id->
            val page = binding.fragmentContainerView4.findNavController().currentDestination?.label
            when (id) {
                R.id.home -> {
                    if (page == "Profile"){
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_instructorProfileFragment_to_instructorHomeFragment)
                    }else if (page == "Add Course"){
                        Toast.makeText(this,"press back", Toast.LENGTH_SHORT).show()
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_addCourseFragment_to_instructorHomeFragment)
                    }
                }
                R.id.notification -> {
                    Toast.makeText(this,"Instructor Notification", Toast.LENGTH_SHORT).show()
                }
                R.id.profile -> {
                    if (page == "Home"){
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_instructorHomeFragment_to_instructorProfileFragment)
                    }else if (page == "Add Course"){
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_addCourseFragment_to_instructorProfileFragment)
                    }
                }
            }
        }
    }

//    private fun navigation(currentPage:CharSequence?){
//
//        when(currentPage){
//            "Profile"->{
//                binding.fragmentContainerView4
//                    .findNavController()
//                    .navigate(R.id.action_instructorProfileFragment_to_instructorHomeFragment)
//            }
//            "Home"-> {
//                binding.fragmentContainerView4
//                    .findNavController()
//                    .navigate(R.id.action_instructorHomeFragment_to_instructorProfileFragment)
//            }
//        }
//
//    }
}