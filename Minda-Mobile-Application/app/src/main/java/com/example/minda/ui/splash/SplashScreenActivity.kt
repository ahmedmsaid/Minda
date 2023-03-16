package com.example.minda.ui.splash

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.minda.MainActivity
import com.example.minda.R

class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)

        // Delay for 3 seconds before launching the MainActivity
        val delayMillis = 700L
        findViewById<View>(android.R.id.content).postDelayed({
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }, delayMillis)

    }
}