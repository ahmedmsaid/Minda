package com.example.minda.util

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.widget.Toast
import com.auth0.android.jwt.JWT

fun isValidEmail(email: String): Boolean {
    val emailRegex = Regex("[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}")
    return email.matches(emailRegex)
}

fun isValidPassword(password: String): Boolean {
    val pattern = Regex("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,}$")
    return pattern.matches(password)
}

 fun showToast(message: String,context:Context) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
}

fun isInternetAvailable(context: Context): Boolean {
    val connectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val networkCapabilities =
        connectivityManager.activeNetwork ?: return false
    val activeNetwork =
        connectivityManager.getNetworkCapabilities(networkCapabilities) ?: return false

    return activeNetwork.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
}

fun getIdOfLoggedInPerson(token: String): String? {
    val jwt = JWT(token)
    return jwt.getClaim("id").asString()
}

