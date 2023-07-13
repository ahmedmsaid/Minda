package com.example.minda

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import com.example.minda.databinding.ActivityInstructorContentBinding

class InstructorContentActivity : AppCompatActivity() {
    private lateinit var binding: ActivityInstructorContentBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInstructorContentBinding.inflate(layoutInflater)
        setContentView(binding.root)
        settingNavigateUp()

        binding.instructorBottomNavigationView.setItemSelected(R.id.home, true)


        binding.instructorBottomNavigationView.setOnItemSelectedListener { id ->
            val page = binding.fragmentContainerView4.findNavController().currentDestination?.label
            when (id) {
                R.id.home -> {
                    if (page == "Profile") {
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_instructorProfileFragment_to_instructorHomeFragment)
                    }
                }

//                R.id.notification -> {
//                    Toast.makeText(this, "Instructor Notification", Toast.LENGTH_SHORT).show()
//                }

                R.id.profile -> {
                    if (page == "Home") {
                        binding.fragmentContainerView4
                            .findNavController()
                            .navigate(R.id.action_instructorHomeFragment_to_instructorProfileFragment)
                    }
                }
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.fragmentContainerView4)
        return navController.navigateUp() || super.onSupportNavigateUp()
    }

    private fun settingNavigateUp() {
        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.fragmentContainerView4) as NavHostFragment
        val navController = navHostFragment.findNavController()
        navController.setGraph(R.navigation.instructor_inner_nav)
        val appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)
    }

}