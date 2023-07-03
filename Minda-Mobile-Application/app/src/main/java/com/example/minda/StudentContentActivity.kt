package com.example.minda

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import com.example.minda.databinding.ActivityContentStudentBinding
import com.example.minda.viewmodel.SharedViewModel

class StudentContentActivity : AppCompatActivity() {
    private lateinit var binding:ActivityContentStudentBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityContentStudentBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.studentBottomNavigationView.setItemSelected(R.id.home,true)

        binding.studentBottomNavigationView.setOnItemSelectedListener {id->
            val page = binding.fragmentContainerView2.findNavController().currentDestination?.label
            when (id) {
                R.id.home -> {
                    if (page == "Profile"){
                        binding.fragmentContainerView2
                            .findNavController()
                            .navigate(R.id.action_studentProfileFragment_to_studentHomeFragment)
                    }
                }
                R.id.notification -> {
                    Toast.makeText(this,"Student Notification",Toast.LENGTH_SHORT).show()
                }
                R.id.profile -> {
                    if (page == "Home"){
                        binding.fragmentContainerView2
                            .findNavController()
                            .navigate(R.id.action_studentHomeFragment_to_studentProfileFragment)
                    }
                }
            }
        }
    }
}