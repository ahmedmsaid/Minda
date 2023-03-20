package com.example.minda

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.minda.databinding.ActivityInstructorContentBinding

class InstructorContentActivity : AppCompatActivity() {
    private lateinit var binding:ActivityInstructorContentBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityInstructorContentBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.instructorBottomNavigationView.setItemSelected(R.id.profile,true)

        binding.instructorBottomNavigationView.setOnItemSelectedListener {id->
            when (id) {
                R.id.home -> {
                    Toast.makeText(this,"Instructor Home", Toast.LENGTH_SHORT).show()
                }
                R.id.notification -> {
                    Toast.makeText(this,"Instructor Notification", Toast.LENGTH_SHORT).show()
                }
                R.id.profile -> {
                    Toast.makeText(this,"Instructor Profile", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}