package com.example.minda

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import com.example.minda.databinding.ActivityContentStudentBinding
import com.example.minda.viewmodel.SharedViewModel

class StudentContentActivity : AppCompatActivity() {
    private lateinit var binding:ActivityContentStudentBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityContentStudentBinding.inflate(layoutInflater)
        setContentView(binding.root)
        settingNavigateUp()

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
    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.fragmentContainerView2)
        return navController.navigateUp() || super.onSupportNavigateUp()
    }
    private fun settingNavigateUp() {
        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.fragmentContainerView2) as NavHostFragment
        val navController = navHostFragment.findNavController()
        navController.setGraph(R.navigation.student_inner_nav)
        val appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)
    }
}