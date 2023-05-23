package ionic.pupa

import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.annotation.RequiresApi

class LaunchAppActivity : AppCompatActivity() {
  @RequiresApi(Build.VERSION_CODES.M)
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val text = intent.getCharSequenceExtra(Intent.EXTRA_PROCESS_TEXT)
    if (text != null) {
      launchApp(text.toString())
    }

    finish()
  }

  private fun launchApp(text: String) {
    val appUrl = "ionic.pupa://home/$text"
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(appUrl))
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    startActivity(intent)
  }
}
