package com.example.minda

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.minda.databinding.ActivityContentStudentBinding

class StudentContentActivity : AppCompatActivity() {
    private lateinit var binding:ActivityContentStudentBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityContentStudentBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.studentBottomNavigationView.setItemSelected(R.id.profile,true)

        binding.studentBottomNavigationView.setOnItemSelectedListener {id->
            when (id) {
                R.id.home -> {
                    Toast.makeText(this,"Student Home",Toast.LENGTH_SHORT).show()
                }
                R.id.notification -> {
                    Toast.makeText(this,"Student Notification",Toast.LENGTH_SHORT).show()
                }
                R.id.profile -> {
                    Toast.makeText(this,"Student Profile",Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}